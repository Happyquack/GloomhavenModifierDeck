function displayStats(outputDiv, deck) {
  
}

function simulateNormalDeck(deck, runningVals, runningEffects, rollingVals, rollingEffects, rollingVal) {
  deck.forEach (card => {
    if (card.isRolling) {
      var newDeck = deck.slice();
      if (card.getEffect != 0) {rollingEffects.push(card.getEffect()}
      this.simulateDeck(newDeck, runningVals, runningEffects, rollingVals, rollingEffects, rollingVal + card.getValue());
    } else {
      if (card.getEffect != 0) {runningEffects.push(card.getEffect())}
      if (card.getValue == "x2") {runningEffects.push(
      runningVals.push(rollingVal);
      this.simulateDeck(deck, runningVals, runningEffects, rollingVals, rollingEffects, 0);
    }
  });
}

function getAverage (vals) { 
  var tot = 0;
  val.forEach( el => tot += el);
  return tot/vals.length;
}

function basicStats (vals) {
  var tot = 0;
  var avg = getAverage(vals);
  vals.forEach( el => tot += Math.pow(el - avg, 2));
  var stdev = Math.sqrt(tot/(vals.length - 1));
  return [avg, stdev];
}
