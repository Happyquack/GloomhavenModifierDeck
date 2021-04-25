function displayStats(outputDiv, deck) {
  
}

function simulateNormalDeck(deck, runningVals, rollingVals, rollingEffects, rollingVal) {
  deck.forEach (card => {
    if (card.isRolling) {
      deck = deck.filter(el => el != card);
      if (card.getEffect != 0) {rollingEffects.push(card.getEffect())}
      simulateNormalDeck(deck, runningVals, rollingVals, rollingEffects, rollingVal + card.getValue());
    } else {
      if (card.getValue == "null") {
        runningVals[0]++;
      } else if (card.getValue == "x2") {
        runningVals[1]++;
      } else {
        runningVals.push(card.getValue());
      }
      runningVals.push(rollingVal);
    }
  });
}

function simulateAdvDeck(deck, runningVals, rollingVals, rollingEffects, rollingVal, first) {
  deck.forEach (card => {
    if (card.isRolling && first) {
      deck = deck.filter(el => el != card);
      if (card.getEffect != 0) {rollingEffects.push(card.getEffect()}
      simulateAdvDeck(deck, runningVals, rollingVals, rollingEffects, rollingVal + card.getValue(), false);
    } else {
      if (card.getValue == "null") {
        runningVals[0]++;
      } else if (card.getValue == "x2") {
        runningVals[1]++;
      } else {
        runningVals.push(card.getValue());
      }
      runningVals.push(rollingVal);
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
