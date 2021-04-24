function displayStats(outputDiv, deck) {
  
}

function simulateDeck(deck, runningVals, rollingVal) {
  deck.forEach (card => {
    if (card.isRolling) {
      var newDeck = deck.slice();
      this.simulateDeck(newDeck, runningVals, rollingVal + card.getValue());
    } else {
      if (card.getValue() == "null") {
        runningVals[0]++;
      } else if (card.getValue() == "x2") {
        runningVals[1]++;
      } else {
        runningVals.push(rollingVal + card.getValue());
      }
      this.simulateDeck(deck, runningVals, 0);
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
