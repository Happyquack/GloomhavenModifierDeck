import { chartHandler } from "./chartHandler.js";
var CUMULATIVE_EFFECTS = ["push", "pull", "healSelf", "shieldSelf", "pierce", "target"];
var CUMULATIVE_EFFECT_DISPLAY = ["Push", "Pull", "Heal (self)", "Shield (self)", "Pierce", "Target"];
var NORMAL_STORAGE;
// I know this looks quite redundant but it's in the name of readability
var CHART1 = 0; var CHART2 = 1; var CHART3 = 2; var CHART4 = 3; var CHART5 = 4; var CHART6 = 5;

var ATTACK_VALUE = 3; // Default
var THIS_INSTANCE = null;





// THIS IS A WORK IN PROGRESS CLASS - COMMENTING WILL NOT BE THOROUGH FOR READABILITY, NOR WILL THE CODE BE COMPLETE





class StatsHandler {

  constructor (deckHandler) {
    this.deckHandler = deckHandler;
    this.chartHandler = new chartHandler(this);
    this.createAttackValueConfig();
    NORMAL_STORAGE = new Map();
    THIS_INSTANCE = this;
  }

  // this is the function that is called outside of this class
  // when the deck is updated, this will run and update the statistics for both the overall deck and the current deck
  update() {
    this.normalDeck(this.deckHandler.deck.getPlayerDeck(), document.getElementById("generalStatsNormalText"),CHART1);
    this.normalDeck(this.deckHandler.deck.getPlayerDeck().filter(el => !el.isFlipped()), document.getElementById("currentStatsNormalText"),CHART4);
    this.advantageDeck(this.deckHandler.deck.getPlayerDeck(), document.getElementById("generalStatsAdvText"),CHART2);
    this.advantageDeck(this.deckHandler.deck.getPlayerDeck().filter(el => !el.isFlipped()), document.getElementById("currentStatsAdvText"),CHART5);
    this.disadvantageDeck(this.deckHandler.deck.getPlayerDeck(), document.getElementById("generalStatsDisText"),CHART3);
    this.disadvantageDeck(this.deckHandler.deck.getPlayerDeck().filter(el => !el.isFlipped()), document.getElementById("currentStatsDisText"),CHART6);
  }

  // this function takes a list of cards and finds statistics for normal drawing rules
  // it finds the odds of drawing each type of normal card to construct a chart and an average modifier/stdev
  // and also finds the odds of having any rolling modifiers
  normalDeck(currentDeck, targetDiv, targetChart) {
    //********************************************NORMAL*/
    // first step is to find the odds of each normal cards
    var possibleEndCards = currentDeck.filter(el => !el.isRolling());
    if (possibleEndCards.length == 0) {
      possibleEndCards = this.deckHandler.deck.getPlayerDeck().filter(el => !el.isRolling());
    }
    var endCardChances = new Map();
    // turn this list of end cards into a list of probabilities
    var probabilityPerEndCard = 1 / possibleEndCards.length;
    possibleEndCards.forEach(card => {
      var cardID = card.getCardSummary();
      if (endCardChances.has(cardID)) {
        endCardChances.set(cardID,endCardChances.get(cardID) + probabilityPerEndCard);
      } else {
        endCardChances.set(cardID, probabilityPerEndCard);
      }
    });
    //********************************************ROLLING*/
    // next we evaluate the rolling modifiers in the deck and determine the chances of each effect
    var endRollingChances = [];
    if (possibleEndCards.length != currentDeck.length) {
      this.normalDeckRollings(currentDeck, endRollingChances);
    }
    //********************************************DISPLAY*/
    // now we display the statistics to the page
    this.displayChart(endCardChances, endRollingChances, targetDiv, targetChart);
  }

  advantageDeck(currentDeck, targetDiv, targetChart) {
    //********************************************NORMAL*/
    // Filter out rollings, and reshuffle if needed
    var possibleEndCards = currentDeck.filter(el => !el.isRolling());
    if (possibleEndCards.length == 0) {
      possibleEndCards = this.deckHandler.deck.getPlayerDeck().filter(el => !el.isRolling());
    }
    // check for lone card
    var loneCard = null;
    if (possibleEndCards.length == 1) {
      loneCard = possibleEndCards[0];
      possibleEndCards = this.deckHandler.deck.getPlayerDeck().filter(el => !el.isRolling());
    }
    // turn this list of end cards into a frequency distribution
    var endCardFreq = new Map();
    possibleEndCards.forEach(card => {
      var cardID = card.getCardSummary();
      if (endCardFreq.has(cardID)) {
        endCardFreq.set(cardID,endCardFreq.get(cardID) + 1);
      } else {
        endCardFreq.set(cardID, 1);
      }
    });
    // calculate the actual probabilities
    var endCardChances = new Map();
    var numEndCards = possibleEndCards.length;
    var numRollings = this.deckHandler.deck.getPlayerDeck().length - numEndCards;
    var numCards = numEndCards+numRollings;
    var chanceFromRollings = numRollings/(numCards*numEndCards);
    if (loneCard == null) { // there is more than one card left in the deck
      endCardFreq.forEach((compCardFreq, comparingCard) => {
        var compVars = this.endCardComparisons(comparingCard, endCardFreq);
        var numBeats = compVars[0];
        var numAmbs = compVars[2];
        numAmbs = numAmbs-1; // we can't have it count itself
        // advantage formula
        var probabilityOfThisCard = chanceFromRollings + (numRollings+2*numBeats+numAmbs)/(numCards*(numCards-1));

        endCardChances.set(comparingCard, probabilityOfThisCard * compCardFreq);
      });
    } else {
      //                                                              This will be taken care of later, I don't really care about it right now
    }
    //********************************************ROLLING*/
    // next we evaluate the rolling modifiers in the deck and determine the chances of each effect
    var endRollingChances = [];
    if (possibleEndCards.length != currentDeck.length) {
      this.advantageDeckRollings(currentDeck, endRollingChances);
    }
    //********************************************DISPLAY*/
    // now we display the statistics to the page
    this.displayChart(endCardChances, endRollingChances, targetDiv, targetChart);
  }//                                                                                                                             TODO Lone card

  disadvantageDeck(currentDeck, targetDiv, targetChart) {
    //********************************************NORMAL*/
    // Filter out rollings, and reshuffle if needed
    var possibleEndCards = currentDeck.filter(el => !el.isRolling());
    if (possibleEndCards.length == 0) {
      possibleEndCards = this.deckHandler.deck.getPlayerDeck().filter(el => !el.isRolling());
    }
    // check for lone card
    var loneCard = null;
    if (possibleEndCards.length == 1) {
      loneCard = possibleEndCards[0];
      possibleEndCards = this.deckHandler.deck.getPlayerDeck().filter(el => !el.isRolling());
    }
    // turn this list of end cards into a frequency distribution
    var endCardFreq = new Map();
    possibleEndCards.forEach(card => {
      var cardID = card.getCardSummary();
      if (endCardFreq.has(cardID)) {
        endCardFreq.set(cardID,endCardFreq.get(cardID) + 1);
      } else {
        endCardFreq.set(cardID, 1);
      }
    });
    // calculate the actual probabilities
    var endCardChances = new Map();
    var numEndCards = possibleEndCards.length;
    var numRollings = this.deckHandler.deck.getPlayerDeck().length - numEndCards;
    var numCards = numEndCards+numRollings;
    var chanceFromRollings = numRollings/(numCards*numEndCards);
    if (loneCard == null) { // there is more than one card left in the deck
      endCardFreq.forEach((compCardFreq, comparingCard) => {
        var compVars = this.endCardComparisons(comparingCard, endCardFreq);
        var numLoses = compVars[1];
        var numAmbs = compVars[2];
        numAmbs = numAmbs-1; // we can't have it count itself
        // advantage formula
        var probabilityOfThisCard = chanceFromRollings + (numRollings+2*numLoses+numAmbs)/(numCards*(numCards-1));

        endCardChances.set(comparingCard, probabilityOfThisCard * compCardFreq);
      });
    } else {
      //                                                              This will be taken care of later, I don't really care about it right now
    }
    //********************************************ROLLING*/
    // rollings are not counted
    var endRollingChances = [];
    //********************************************DISPLAY*/
    // now we display the statistics to the page
    this.displayChart(endCardChances, endRollingChances, targetDiv, targetChart);
  }//                                                                                                                             TODO Lone card

  rollingStatsPrep(currentDeck, cumulativeRollingEffects, summarizedRollings) {
    // first we need to make sure that there are non-rolling cards, and store the rollings if there are none.
    var cumulativeRollingValue = 0;
    if (currentDeck.filter(el => !el.isRolling()).length == 0) { // if the deck doesn't have non-rollings we will need to reshuffle
      if (currentDeck.length > 0) { // if the deck still has cards they must be rolling and will be drawn
        // here we store the guaranteed rolling effects
        currentDeck.forEach(card => {
          cumulativeRollingValue += card.getValue();
          var effect = card.getEffect();
          if (cumulativeRollingEffects.has(effect)) { cumulativeRollingEffects.set(effect, cumulativeRollingEffects.get(effect) + 1)}
          else {cumulativeRollingEffects.set(effect, 1)}
        });
      }
      currentDeck = [...this.deckHandler.deck.getPlayerDeck()];
    }

    // now we have to look at how many there are of each rolling card, which we will use as a probability distribution
    var rollingCards = currentDeck.filter(el => el.isRolling());
    rollingCards.forEach(card => {
      var effect = card.getEffect();
      if (summarizedRollings.has(effect)) { summarizedRollings.set(effect, summarizedRollings.get(effect) + 1)}
      else {summarizedRollings.set(effect, 1)}
    });

    //return the values used in the rest of the rolling methods 
    return [cumulativeRollingValue, currentDeck, rollingCards];
  }

  // this function determines statistics of rolling modifiers when there is no advantage or disadvantage
  normalDeckRollings(currentDeck, endRolling) {
    // first we need to make sure that there are non-rolling cards, and store the rollings if there are none.
    // then we have to look at how many there are of each rolling card, which we will use as a probability distribution
    // multiple functions do this so this was condensed
    var cumulativeRollingEffects = new Map();
    var summarizedRollings = new Map();
    var prepResults = this.rollingStatsPrep(currentDeck, cumulativeRollingEffects, summarizedRollings);
    var cumulativeRollingValue = prepResults[0];
    var currentDeck = prepResults[1];
    var rollingCards = prepResults[2];

    // next, we calculate the chances of pulling each number of card
    // we store it into the end rolling map in the form [effectLabel, chanceOfEffect]
    var totalNum = currentDeck.length;
    var rollingNum = rollingCards.length;
    for (var [key, val] of summarizedRollings.entries()) {
      if (key != 0) {
        var offset = 0; // this variable will be used in case the effect here is one that was deemed as guaranteed earlier
        if (CUMULATIVE_EFFECTS.includes(key.slice(0,-1))) {
          if (cumulativeRollingEffects.has(key)) {
            offset = cumulativeRollingEffects.get(key);
            endRolling.push([key.slice(0,-1) + parseInt(key.charAt(key.length-1)) * (offset), 1]);
          }
          for (let i = 1; i <= val; i++) { // if the modifier is cumulative then we have to calculate probabilities for each amount of the card there is
            endRolling.push([key.slice(0,-1) + (parseInt(key.charAt(key.length-1)) * (i + offset)), this.probabilityOfDesiredNumberOfCards(i, rollingNum-(val-i), totalNum)*(val-i+1)]);
          }
        } else { // if the modifier is not cumulative then calculate the P of drawing one and multiply it by the num of cards
          if (cumulativeRollingEffects.has(key)) { // if this was a guaranteed effect, we make sure we log it as a 100% chance
            endRolling.push([key, 1]);
          } else {
            endRolling.push([key, this.probabilityOfDesiredNumberOfCards(1, rollingNum, totalNum)*val]);
          }
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

    if (cumulativeRollingValue > 0) { // if there were rolling modifiers drawn before a reshuffle, then that is a guaranteed effect and is added on afterwards
      endRolling.push([cumulativeRollingValue, 1]);
    }

    for (let endVal = 1; endVal <= maxVal; endVal++) {
      let numberModifierProbability = 0;
      for (let numNeededCards = 1; numNeededCards <= numPosMods; numNeededCards++) {
        if (modifierInfo[endVal-1][numNeededCards-1] != 0) {
          var baseProbability = this.probabilityOfDesiredNumberOfCards(numNeededCards, rollingCards.length-(numPosMods-numNeededCards), currentDeck.length);
          numberModifierProbability += modifierInfo[endVal-1][numNeededCards-1] * baseProbability;
        }
      }
      endRolling.push([endVal + cumulativeRollingValue, numberModifierProbability]);
    }
  }//                                                                                                                                 CONDENSE

  // this function determines statistics of rolling modifiers when there is advantage
  advantageDeckRollings(currentDeck, endRolling) {
    // first we need to make sure that there are non-rolling cards, and store the rollings if there are none.
    // then we have to look at how many there are of each rolling card, which we will use as a probability distribution
    // multiple functions do this so this was condensed
    var cumulativeRollingEffects = new Map();
    var summarizedRollings = new Map();
    var prepResults = this.rollingStatsPrep(currentDeck, cumulativeRollingEffects, summarizedRollings);
    var cumulativeRollingValue = prepResults[0];
    var currentDeck = prepResults[1];
    var rollingCards = prepResults[2];

    // next, we calculate the chances of pulling each number of card
    // we store it into the end rolling map in the form [effectLabel, chanceOfEffect]
    var totalNum = currentDeck.length;
    var rollingNum = rollingCards.length;
    // with advantage, there's a chance that a rolling will be drawn after an end card, so we have to add that probability in
    var advantageOffset = (totalNum-rollingNum)/(totalNum*(totalNum-1));
    for (var [key, val] of summarizedRollings.entries()) {
      if (key != 0) {
        var offset = 0; // this variable will be used in case the effect here is one that was deemed as guaranteed earlier
        if (CUMULATIVE_EFFECTS.includes(key.slice(0,-1))) {
          if (cumulativeRollingEffects.has(key)) {
            offset = cumulativeRollingEffects.get(key);
            endRolling.push([key.slice(0,-1) + parseInt(key.charAt(key.length-1)) * (offset), 1]);
          }
          endRolling.push([key.slice(0,-1) + (parseInt(key.charAt(key.length-1)) * (1+offset)), (this.probabilityOfDesiredNumberOfCards(1, rollingNum-(val-1), totalNum)+advantageOffset)*(val)]);
          for (let i = 2; i <= val; i++) { // if the modifier is cumulative then we have to calculate probabilities for each amount of the card there is
            endRolling.push([key.slice(0,-1) + (parseInt(key.charAt(key.length-1)) * (i + offset)), this.probabilityOfDesiredNumberOfCards(i, rollingNum-(val-i), totalNum)*(val-i+1)]);
          }
        } else { // if the modifier is not cumulative then calculate the P of drawing one and multiply it by the num of cards
          if (cumulativeRollingEffects.has(key)) { // if this was a guaranteed effect, we make sure we log it as a 100% chance
            endRolling.push([key, 1]);
          } else {
            endRolling.push([key, (this.probabilityOfDesiredNumberOfCards(1, rollingNum, totalNum)+advantageOffset)*val]);
          }
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

    if (cumulativeRollingValue > 0) { // if there were rolling modifiers drawn before a reshuffle, then that is a guaranteed effect and is added on afterwards
      endRolling.push([cumulativeRollingValue, 1]);
    }

    for (let endVal = 1; endVal <= maxVal; endVal++) {
      let numberModifierProbability = 0;
      for (let numNeededCards = 1; numNeededCards <= numPosMods; numNeededCards++) {
        if (modifierInfo[endVal-1][numNeededCards-1] != 0) {
          var baseProbability = this.probabilityOfDesiredNumberOfCards(numNeededCards, rollingCards.length-(numPosMods-numNeededCards), currentDeck.length);
          numberModifierProbability += modifierInfo[endVal-1][numNeededCards-1] * baseProbability;
        }
      }
      endRolling.push([endVal + cumulativeRollingValue, numberModifierProbability]);
    }
  }//                                                                                                                                 CONDENSE

  // this recursive function is used to determine, based on a list of numbers, how many ways that any number can be made by adding up the list
  recursiveRollingModCalculator(runningVal, numCards, listOfAvailableMods, modifierInfo) {
    for (let i = 0; i < listOfAvailableMods.length; i++)
    {
      var newVal = runningVal + listOfAvailableMods[i];
      modifierInfo[newVal-1][numCards]++;
      this.recursiveRollingModCalculator(newVal, numCards+1, listOfAvailableMods.slice(i+1), modifierInfo);
    }
  }

  // inputs cardID and Map() [[cardID, freq]...] for the whole of deck
  // outputs [alpha, beta, gamma] where alpha is the sum of freq in the deck that the first cardID beats, 
  // beta counts losses, gamma counts ambiguities (including same-card comparisons).
  endCardComparisons(cardID, deckInfo) {
    var output = [0, 0, 0];
    // cardID is composed of the numerical modifer and the effect
    var [cardMod, cardEffect] = cardID.split(":");
    if (cardMod == "x2") cardMod = ATTACK_VALUE;
    if (cardMod == "null") cardMod = ATTACK_VALUE * -1;
    cardMod = parseInt(cardMod);
    var cardHasEffect = cardEffect != "0";
    deckInfo.forEach((compCardFreq, comparingCard) => {
      var [compCardMod, compCardEffect] = comparingCard.split(":");
      if (compCardMod == "x2") compCardMod = ATTACK_VALUE;
      if (compCardMod == "null") compCardMod = ATTACK_VALUE * -1;
      compCardMod = parseInt(compCardMod);
      var compHasEffect = compCardEffect != "0";
      // order of operations is to compare numerical modifiers
      //    if they are the same, compare effects
      if (compCardMod == cardMod) {
        //        if only one has an effect, that one wins (+alpha/beta)
        if ((compHasEffect && !cardHasEffect) || (!compHasEffect && cardHasEffect)) {
          if (compHasEffect) {
            output[1] += compCardFreq;
          } else {
            output[0] += compCardFreq;
          }
        }
        //        else, they are ambiguities (+gamma)
        output[2] += compCardFreq;
      } else { //    if they are different, compare effects
        //        if the lower one has an effect and the effects are different, they are ambiguities (+gamma)
        if ((compCardEffect != cardEffect) && ((compHasEffect && (compCardMod < cardMod )) || (cardHasEffect && (cardMod < compCardMod)))) {
          output[2] += compCardFreq;
        } else { //        else, higher modifier gets counted
          output[compCardMod > cardMod ? 1 : 0] += compCardFreq;
        }
      }
    });
    return output;
  }

  probabilityOfDesiredNumberOfCards(numWant, numRolling, numTotal) {
    if (numWant == 0) return 1; // this is the default
    if (numWant > numRolling) return 0; // this is impossible
    // check to see if this has been calculated yet
    if (NORMAL_STORAGE.has("" + numWant + "x" + numRolling + "x" + numTotal)) return NORMAL_STORAGE.get("" + numWant + "x" + numRolling + "x" + numTotal);
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
    NORMAL_STORAGE.set("" + numWant + "x" + numRolling + "x" + numTotal, output);
    return output;
  }

  displayChart(endStats, rollingStats, targetDiv, targetChart) {
    while (targetDiv.firstChild) {
      targetDiv.removeChild(targetDiv.firstChild);
    }
    // the whole chart thing once we have it
    this.chartHandler.printChart(endStats,targetChart);
    // print end card stats
    if (endStats.size > 1) {
      var [avg, stdev] = this.basicStats(endStats);
      var endCardStatOutput = document.createElement("p");
      endCardStatOutput.innerHTML = "Typical deck average: " + avg.toFixed(3);
      var endCardStatOutputTwo = document.createElement("p");
      endCardStatOutputTwo.innerHTML = "Standard deviation: " + stdev.toFixed(3) + "?";
      targetDiv.appendChild(endCardStatOutput);
      targetDiv.appendChild(endCardStatOutputTwo);
    } else if (endStats.size == 1) {
      var endCardStatOutput = document.createElement("p");
      endCardStatOutput.innerHTML = "Typical deck average: " + endStats.keys().next().value;
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

  basicStats (cardIDs) {
    var avg = 0;
    var weightSum = 0;
    cardIDs.forEach((dist, cardID) => {
      var cardValue = cardID.slice(0,cardID.indexOf(":"));
      if (cardValue == "x2") cardValue = ATTACK_VALUE;
      if (cardValue == "null") cardValue = -1 * ATTACK_VALUE;
      avg += (parseInt(cardValue)+ATTACK_VALUE)*dist;
      weightSum += dist;
    });
    avg = avg / weightSum;
    var stdev = 0
    cardIDs.forEach((dist, cardID) => {
      var cardValue = cardID.slice(0,cardID.indexOf(":"));
      if (cardValue == "x2") cardValue = ATTACK_VALUE;
      if (cardValue == "null") cardValue = -1 * ATTACK_VALUE;
      stdev += Math.pow((parseInt(cardValue)+ATTACK_VALUE)*dist-avg,2);
    });
    stdev = Math.pow(stdev,1/2);
    return [avg, stdev];
  }

  //                                                                                                                      COMMENT
  createAttackValueConfig() {
    var attackValueBox = document.getElementById("attackValueBox");
    this.decreaseBox = document.createElement("button");
    this.decreaseBox.type = "button";
    this.decreaseBox.innerHTML = "-";
    this.decreaseBox.onclick = this.decreaseAttack;
    this.decreaseBox.id = "DecreaseBox"
    this.increaseBox = document.createElement("button");
    this.increaseBox.type = "button";
    this.increaseBox.innerHTML = "+";
    this.increaseBox.onclick = this.increaseAttack;
    this.increaseBox.id = "IncreaseBox";
    attackValueBox.appendChild(this.decreaseBox);
    this.attackValueSpan = document.createElement("span");
    this.attackValueSpan.id = "AttackValueSpan";
    this.attackValueSpan.textContent = "  Attack value:  " + ATTACK_VALUE + "  ";
    attackValueBox.appendChild(this.attackValueSpan);
    attackValueBox.appendChild(this.increaseBox);
  }

  decreaseAttack() {
    ATTACK_VALUE--;
    document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + ATTACK_VALUE + "  ";
    if (ATTACK_VALUE == 0) document.getElementById("DecreaseBox").disabled = true;
    THIS_INSTANCE.update();
  }

  increaseAttack() {
    document.getElementById("DecreaseBox").disabled = false;
    ATTACK_VALUE++;
    document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + ATTACK_VALUE + "  ";
    THIS_INSTANCE.update();
  }
}

export {StatsHandler};