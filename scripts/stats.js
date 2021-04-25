const effectsList = ["x2","null","air","bless","cold","curse","disarm","fire","heal","immobilize","invisible","muddle", "night","pierce","plant","poison","push", "pull","rolling","shield","strengthen","stun","sun","target","wound"];

function displayStats(outputDiv, deck) {
  
}

function simulateNormalDeck(deck, runningVals, rollingVals, effects, rollingVal) {
  deck.forEach (card => {
    if (card.isRolling) {
      var newDeck = deck.slice();
      this.simulateDeck(newDeck, runningVals, rollingVals, rollingVal + card.getValue());
    } else {
      if () {
          
      } else {
        runningVals.push(rollingVal);
      
      }
      this.simulateDeck(deck, runningVals, rollingVals ,0);
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
