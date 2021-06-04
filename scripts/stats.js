
var CUMULATIVE_EFFECTS = ["push", "pull", "healSelf", "shieldSelf", "pierce", "target"];
var CUMULATIVE_EFFECT_DISPLAY = ["Push", "Pull", "Heal (self)", "Shield (self)", "Pierce", "Target"];

class StatsHandler {

  constructor (deckHandler) {
    this.deckHandler = deckHandler;
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
    var possibleEndCards = [];
    var rollingEndCounts = new Map();
    var tempRolling = new Map();
    tempRolling.set("value", 0);
    this.normalDeckEvaluation(currentDeck, tempRolling, currentDeck.length, possibleEndCards, rollingEndCounts);
    var totalOutcomes = possibleEndCards.length;
    var endRollingChances = [];
    for (var [key, val] of rollingEndCounts.entries()) {
      endRollingChances.push([key, val]);
    }
    this.displayChart(possibleEndCards, endRollingChances, targetDiv);
  }

  normalDeckEvaluation(currentDeck, runningRolling, runningBigN, endCards, endRolling) {
    currentDeck.forEach(card => {
      if (card.isRolling()) {
        var cardValue = card.getValue();
        var newRolling = new Map();
        for (var [key,val] of runningRolling.entries()) {
          newRolling.set(key, val);
        }
        newRolling.set("value", newRolling.get("value") + cardValue);
        this.parseRollingEffects(card, newRolling);
        var nextDeck = currentDeck.filter(el => el != card);
        if (nextDeck.length == 0) nextDeck = [...this.deckHandler.deck.getPlayerDeck()];
        this.normalDeckEvaluation(nextDeck, newRolling, runningBigN * currentDeck.length, endCards, endRolling);
      } else {
        endCards.push(card);
        this.saveRollingEffects(runningRolling, runningBigN, endRolling);
      }
    });
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

    if (rollingStats.length > 1) {

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