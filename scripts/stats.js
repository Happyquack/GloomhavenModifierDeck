
var CUMULATIVE_EFFECTS = ["push", "pull", "healSelf", "shieldSelf", "pierce", "target"];
var CUMULATIVE_EFFECT_DISPLAY = ["Push", "Pull", "Heal (self)", "Shield (self)", "Pierce", "Target"];
var STORAGE;

class StatsHandler {

  constructor (deckHandler) {
    this.deckHandler = deckHandler;
    STORAGE = new Map();
  }

  update() {
    this.normalDeck(this.deckHandler.deck.getPlayerDeck(), document.getElementById("generalStatsNormalBox"));
    this.normalDeck(this.deckHandler.deck.getPlayerDeck().filter(el => !el.isFlipped()), document.getElementById("currentStatsNormalBox"));
  }

  // what I want this to do, given a "currentDeck":
  //    return array of all possible end cards
  //    return 2d array of rolling effects along with chances
  //         ex: [["fire", 0.78],[+1, 0.01]]
  normalDeck(currentDeck, targetDiv) {
    // first we look at all of the non-rolling cards
    var possibleEndCards = currentDeck.filter(el => !el.isRolling());
    // if this list is empty we have to start from a fresh reshuffle
    if (possibleEndCards.length == 0) {
      currentDeck = [...this.deckHandler.deck.getPlayerDeck()];
      possibleEndCards = currentDeck.filter(el => !el.isRolling());
    }
    // now that we have the end cards taken care of, we take a look at rolling cards
    var endRollingChances = [];
    if (possibleEndCards.length != currentDeck.length) {
      this.normalDeckEvaluation(currentDeck, endRollingChances);
    }
    this.displayChart(possibleEndCards, endRollingChances, targetDiv);
  }

  normalDeckEvaluation(currentDeck, endRolling) {
    // first we need to make sure that there are non-rolling cards, and store the rollings if there are none.
    var cumulativeRollingCards = [];
    if (currentDeck.filter(el => !el.isRolling()).length == 0) {
      cumulativeRollingCards = currentDeck;
      currentDeck = [...this.deckHandler.deck.getPlayerDeck()];
    }
    var rollingCards = currentDeck.filter(el => el.isRolling());
    // now we have to look at how many there are of each rolling card
    var summarizedRollings = new Map();
    rollingCards.forEach(card => {
      var effect = card.getEffect();
      if (summarizedRollings.has(effect)) { summarizedRollings.set(effect, summarizedRollings.get(effect) + 1)}
      else {summarizedRollings.set(effect, 1)}
    });

    // next, we calculate the chances of pulling each number of card
    var numberStorage = new Map();
    var totalNum = currentDeck.length;
    var rollingNum = rollingCards.length;
    for (var [key, val] of summarizedRollings.entries()) {
      if (key != 0) {
        if (CUMULATIVE_EFFECTS.includes(key.slice(0,-1))) {
          for (let i = 1; i <= val; i++) { // if the modifier is cumulative then we have to calculate probabilities for each amount of the card there is
            endRolling.push([key.slice(0,-1) + (parseInt(key.charAt(key.length-1)) * (i)), this.probabilityOfDesiredNumberOfCards(i, rollingNum-(val-i), totalNum, statisticsStorage)*(val-i+1)])
          }
        } else { // if the modifier is not cumulative then calculate the P of drawing one and multiply it by the num of cards
          endRolling.push([key, this.probabilityOfDesiredNumberOfCards(1, rollingNum, totalNum)*val]);
        }
      }
    }
    // now we gotta take care of those pesky number modifiers
    var listOfNums = [];
    var maxVal = 0;
    var numPosMods = 0;
    rollingCards.forEach(card => {
      var value = card.getValue();
      maxVal += value;
      if (value > 0) {
        numPosMods++;
        listOfNums.push(value);
      }
    });
    // make a 2d array to store information needed for probability calculations
    // each index of the outer array pertains to a total that can be added up to, 
    // each index of the inner array pertains to how many cards are needed,
    // and the values inside keep track of how many unique ways that can be achieved.
    var modifierInfo = [...Array(maxVal)].map(e => Array(numPosMods).fill(0)); // thank you https://stackoverflow.com/a/52727729
    // next steps - loop through list of nums and do nested loops until a desired num is hit and add it to modifier info
    this.recursiveRollingModCalculator(0,0,listOfNums,modifierInfo);

    // now what we can do is find the chance of getting any ending value x by, for every value in the xth array in modifierInfo, 
    // calculating the probability of drawing A cards (where A in the index in the xth array) and multiplying it by the value.

    for (let endVal = 1; endVal <= maxVal; endVal++) {
      let numberModifierProbability = 0;
      for (let numNeededCards = 1; numNeededCards <= numPosMods; numNeededCards++) {
        if (modifierInfo[endVal-1][numNeededCards-1] != 0) {
          var baseProbability = this.probabilityOfDesiredNumberOfCards(numNeededCards, rollingCards.length-(numPosMods-numNeededCards), currentDeck.length);
          numberModifierProbability += modifierInfo[endVal-1][numNeededCards-1] * baseProbability;
        }
      }
      endRolling.push([endVal, numberModifierProbability]);
    }
  }

  recursiveRollingModCalculator(runningVal, numCards, listOfAvailableMods, modifierInfo) {
    for (let i = 0; i < listOfAvailableMods.length; i++)
    {
      var newVal = runningVal + listOfAvailableMods[i];
      modifierInfo[newVal-1][numCards]++;
      this.recursiveRollingModCalculator(newVal, numCards+1, listOfAvailableMods.slice(i+1), modifierInfo);
    }
  }

  probabilityOfDesiredNumberOfCards(numWant, numRolling, numTotal) {
    if (numWant == 0) return 1; // this is the default
    if (numWant > numRolling) return 0; // this is impossible
    // check to see if this has been calculated yet
    if (STORAGE.has("" + numWant + "x" + numRolling + "x" + numTotal)) return STORAGE.get("" + numWant + "x" + numRolling + "x" + numTotal);
    // now calculate a new probability using a formula I conjected
    var output = 0;
    for (let i = 0; i <= numRolling-1; i++) {
      var product = numWant/(numTotal-i) * (numTotal + 1) / (numRolling + 1 - numWant) * this.probabilityOfDesiredNumberOfCards(numWant-1, numRolling-1-i, numTotal-1-i);
      for (let j = 0; j <= i; j++) {
        product = product * (numRolling + 1 - numWant - j) / (numTotal + 1 - j);
      }
      output += product;
    }
    // save the result so that we can refer back to it
    STORAGE.set("" + numWant + "x" + numRolling + "x" + numTotal, output);
    console.log(numWant, numRolling, numTotal);
    console.log(output);
    return output;
  }

  parseRollingEffects(card, rollingMap) {
    var effect = card.getEffect();
    if (effect == parseInt(effect)) {
      rollingMap.set("value", rollingMap.get("value") + effect);
    } else if (CUMULATIVE_EFFECTS.includes(effect.slice(0,-1))) {
      var addon = parseInt(effect.slice(-1));
      effect = effect.slice(0,-1);
      if (rollingMap.has(effect)) {
        rollingMap.set(effect, rollingMap.get(effect) + addon);
      } else {
        rollingMap.set(effect, addon);
      }
    } else {
      if (rollingMap.has(effect)) {
        rollingMap.set(effect, rollingMap.get(effect) + 1);
      } else {
        rollingMap.set(effect, 1);
      }
    }
  }

  saveRollingEffects(tempRolling, bigN, endRolling) {
    for (var [key, val] of tempRolling.entries()) {
      if (key == "value") {
        key = "" + val;
      } else if (CUMULATIVE_EFFECTS.includes(key)) {
        key = key + val;
      }
      if (endRolling.has(key)) {
        endRolling.set(key, endRolling.get(key) + 1/bigN);
      } else {
        endRolling.set(key, 1/bigN);
      }
    }
  }

  displayChart(endCards, rollingStats, targetDiv) {
    while (targetDiv.firstChild) {
      targetDiv.removeChild(targetDiv.firstChild);
    }
    // the whole chart thing once we have it

    // print end card stats
    var endCardValues = [];
    endCards.forEach(el => {
      var val = el.getValue();
      if (val == parseInt(val)) {
        endCardValues.push(val);
      } 
    });
    if (endCardValues.length > 1) {
      var [avg, stdev] = this.basicStats(endCardValues);
      var endCardStatOutput = document.createElement("p");
      endCardStatOutput.innerHTML = "Typical deck average: " + avg.toFixed(3);
      var endCardStatOutputTwo = document.createElement("p");
      endCardStatOutputTwo.innerHTML = "Standard deviation: " + stdev.toFixed(3);
      targetDiv.appendChild(endCardStatOutput);
      targetDiv.appendChild(endCardStatOutputTwo);
    } else if (endCardValues.length == 1) {
      endCardStatOutput.innerHTML = "Typical deck average: " + endCardStatOutput[0];
      var endCardStatOutput = document.createElement("p");
      targetDiv.appendChild(endCardStatOutput);
    }

    //print rolling modifiers

    if (rollingStats.length > 0) {

      var rollingBox = document.createElement("div");
      rollingBox.classList.add("rollingModifierBox");
      rollingStats.forEach( el => {
        var key = el[0];
        var chance = (el[1] * 100).toFixed(2);
        var entry = document.createElement("div");
        if (!isNaN(key) && parseInt(key) != 0) {
          entry.innerHTML = "Attack modifier +" + key + ": " + chance + "%";
        } else if (CUMULATIVE_EFFECTS.includes(key.slice(0,key.length-1))) {
          var index = CUMULATIVE_EFFECTS.indexOf(key.slice(0,key.length-1));
          entry.innerHTML = CUMULATIVE_EFFECT_DISPLAY[index] + " " + key.charAt(key.length-1) + ": " + chance + "%";
        } else if (isNaN(key)) {
          entry.innerHTML = key.charAt(0).toUpperCase() + key.slice(1) + ": " + chance + "%";
        }
        rollingBox.appendChild(entry);
      });

      var rollingModiferTitle = document.createElement("h4");
      rollingModiferTitle.innerHTML = "Rolling modifier stats:";
      targetDiv.appendChild(rollingModiferTitle);
      targetDiv.appendChild(rollingBox);
    }
  }

  getAverage (vals) {
    var tot = 0;
    vals.forEach( el => tot += el);
    return tot/vals.length;
  }

  basicStats (vals) {
    var tot = 0;
    var avg = this.getAverage(vals);
    vals.forEach( el => tot += Math.pow(el - avg, 2));
    var stdev = Math.sqrt(tot/(vals.length - 1));
    return [avg, stdev];
  }
}

export {StatsHandler};