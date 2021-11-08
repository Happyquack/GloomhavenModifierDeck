import {Card} from './card.js';

var BASE_DECK = 0;
var CLASS_DECK = 1;
var ADDITIONAL_DECK = 2;

class Deck {
  constructor() {
    this.character = "";
    this.createDecks();
    this.perkList = [];
  }
  
  createDecks() {
    this.loadBaseDeck();
    this.loadAdditions();
    this.formDeck();
  }
  
  loadBaseDeck() {
    this.baseDeck = [];
    var dir = "images/modifierDecks/zBase/";
    var cardDir = dir + "baseCard";
    var backDir = dir + "baseCardBack.png";
    var valueList = [0,0,0,0,0,0,1,1,1,1,1,-1,-1,-1,-1,-1,-2,2,"null","x2"];
    var effectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.baseDeck, cardDir, backDir, valueList, effectList, rollingList);
  }

  loadAdditions() {
    this.additionDeck = [];
    var dir = "images/modifierDecks/zGeneralAdditions/";
    var cardDir = dir + "addCard";
    var backDir = dir + "addCardBack.png";
    var valueList = ["null","null","null","null","null","null","null","null","null","null","x2","x2","x2","x2","x2","x2","x2","x2","x2","x2",-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    var effectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.additionDeck, cardDir, backDir, valueList, effectList, rollingList);
  }
  
  updateCharacter(label)
  {
    this.formDeck();
    var characters = ["","brute","tinkerer","spellweaver","scoundrel","cragheart","mindthief","sunkeeper", "", "", "", "plagueherald", "berserker", "", "doomstalker", "", "elementalist", ""];
    this.character = characters[parseInt(label)];
    this.loadCharacterDeck();
    this.characterDeck.forEach(card => {
      if (card.getValue() == -1) {
        this.addedMinusOnes[CLASS_DECK].push(card);
      }
    });
  }
  
  loadCharacterDeck() {
    switch (this.character) {
      case "berserker": 
        this.loadBerserkerDeck(); 
        break;
      case "brute": 
        this.loadBruteDeck(); 
        break;
      case "cragheart": 
        this.loadCragheartDeck(); 
        break;
      case "doomstalker":
        this.loadDoomstalkerDeck();
        break;
      case "elementalist": 
        this.loadElementalistDeck(); 
        break;
      case "mindthief": 
        this.loadMindthiefDeck(); 
        break;
      case "plagueherald":
        this.loadPlagueHeraldDeck();
        break;
      case "scoundrel": 
        this.loadScoundrelDeck(); 
        break;
      case "spellweaver": 
        this.loadSpellweaverDeck(); 
        break;
      case "sunkeeper": 
        this.loadSunkeeperDeck(); 
        break;
      case "tinkerer": 
        this.loadTinkererDeck(); 
        break;
      default: break;
    }
  }
  
  loadBruteDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/01/";
    var cardDir = dir + "brCard";
    var backDir = dir + "brCardBack.png";
    var valueList = [1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
    var effectList = [0,0,0,0,0,0,0,"push1","push1","push1","push1","push1","push1","pierce3","pierce3","stun","stun","disarm","muddle","target1","target1","shieldSelf1"];
    var rollingList = [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-+0","+1-+2","+3-+4","+6","+7-+8-+9","+10-+11-+12","+13-+14","+15","+16","+17-+18","+19","+20","+21","+5"];
    this.perkInstructions = ["1Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+3= card","2Add three =rolling=push=1 cards","1Add two =rolling=pierce=3 cards","2Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card","2Add one =rolling=target= card","1Add one =+1=shield=1, Self card","1Ignore negative item effects and add one =+1= card"];
  }
  
  loadTinkererDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/02/";
    var cardDir = dir + "tiCard";
    var backDir = dir + "tiCardBack.png";
    var valueList = [0,1,1,3,0,0,0,0,0,1,1,1,1,1,1,0];
    var effectList = [0,0,0,0,"fire","fire","muddle","muddle","muddle","wound","wound","immobilize","immobilize","healSelf2","healSelf2","target1"];
    var rollingList = [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","x16-+0","+1-+2","+3","+4-+5","+6-+7-+8","+9","+10","+11","+12","+13","+14","+15"];
    this.perkInstructions = ["2Remove two =-1= cards","1Replace one =-2= card with one =+0= card","1Add two =+1= cards","1Add one =+3= card","1Add two =rolling=fire= cards","1Add three =rolling=muddle= cards","2Add one =+1=wound= card","2Add one =+1=immobilize= card","2Add one =+1=heal=2 card","1Add one =+0=target= card"];
  }
  
  loadSpellweaverDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/03/";
    var cardDir = dir + "spCard";
    var backDir = dir + "spCardBack.png";
    var valueList = [1,1,1,1,1,1,0,1,1,1,2,2,2,2,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"stun","wound","immobilize","curse","fire","fire","cold","cold","earth","air","sun","night"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["oooo","x11-+0","x12-+1","+2-+3","+4-+5","+6","+7","+8","+9","+10","+11","+12","+13","+14-+15","+16-+17"];
    this.perkInstructions = ["1Remove four =+0= cards","2Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+0=stun= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+1=curse= card","2Add one =+2=fire= card","2Add one =+2=cold= card","1Add one =rolling=earth= and one =rolling=air= card","1Add one =rolling=sun= and one =rolling=night= card"];
  }
  
  loadScoundrelDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/04/";
    var cardDir = dir + "scCard";
    var backDir = dir + "scCardBack.png";
    var valueList = [0,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,"pierce3","pierce3","poison","poison","poison","poison","muddle","muddle","invisible"];
    var rollingList = [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x16-+0","x15-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8-+9","+10-+11","+12-+13","+14-+15","+16"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card", "1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","1Add two =rolling=pierce=3 cards","2Add two =rolling=poison= cards","1Add two =rolling=muddle= cards","1Add one =rolling=invisible= card"];
  }
  
  loadCragheartDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/05/";
    var cardDir = dir + "crCard";
    var backDir = dir + "crCardBack.png";
    var valueList = [1,1,1,-2,2,2,1,1,2,2,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"immobilize","immobilize","muddle","muddle","push2","push2","earth","earth","earth","earth","air","air"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["oooo","x11-+0","x12-+1","x13-+2","+3-+4-+5","+6","+7","+8","+9","+10-+11","+12-+13","+14-+15","+16-+17"];
    this.perkInstructions = ["1Remove four =+0= cards","3Replace one =-1= card with one =+1= card","1Add one =-2= card and two =+2= cards","2Add one =+1=immobilize= card","2Add one =+2=muddle= card","1Add two =rolling=push=2 cards","2Add two =rolling=earth= cards","1Add two =rolling=air= cards"];
  }
  
  loadMindthiefDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/06/";
    var cardDir = dir + "miCard";
    var backDir = dir + "miCardBack.png";
    var valueList = [2,2,0,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,"cold","cold", 0,0,0,0,"pull1","pull1","pull1","muddle","muddle","muddle","muddle","immobilize","immobilize","stun","disarm"];
    var rollingList = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x6-x7-+0-+1","x16-+2","+3","+4","+5-+6","+7-+8","+9-+10-+11","+12-+13-+14","+16-+17","+18","+19-+15"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace two =+1= cards with two =+2= cards","1Replace one =-2= card with one =+0= card","2Add one =+2=cold= card","2Add two =rolling=+1= cards","1Add three =rolling=pull=1 cards","1Add three =rolling=muddle= cards","1Add two =rolling=immobilize= cards","1Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card"];
  }
  
  loadSunkeeperDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/07/";
    var cardDir = dir + "suCard";
    var backDir = dir + "suCardBack.png";
    var valueList = [0,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1];
    var effectList = [0,0,0,0,0,0,"healSelf1","healSelf1","healSelf1","healSelf1","stun","sun","sun","sun","sun","shieldSelf1","shieldSelf1",0,0];
    var rollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x16-+0","x0-+1","+2-+3","+4-+5","+6-+7","+8-+9","+10","+11-+12","+13-+14","+15-+16","+17-+18"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card","1Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","2Add two =rolling=heal=1 cards","1Add one =rolling=stun= card","2Add two =rolling=sun= cards","1Add two =rolling=shield=1, Self cards","1Ignore negative item effects and add two =+1= cards"];
  }
  
  loadPlagueHeraldDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/11/";
    var cardDir = dir + "phCard";
    var backDir = dir + "phCardBack.png";
    var valueList = [0,1,1,1,1,1,2,2,1,1,1,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,"air","air","air","poison","poison","poison","curse","curse","immobilize","immobilize","stun","stun"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x16-+0","x11-+1","x12-+2","x0-+6","x1-+7","+3-+4","+8","+9","+10","+11-+12-+13","+14-+15","+16-+17","+18","+19","+5"];
    this.perkInstructions = ["1Replace one =-2= card with one =+0= card","2Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add two =+1= cards","3Add one =+1=air= card","1Add three =rolling=poison= cards","1Add two =rolling=curse= cards","1Add two =rolling=immobilize= cards","2Add one =rolling=stun= card","1Ignore negative scenario effects and add one =+1= card"];
  }
  
  loadBerserkerDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/12/";
    var cardDir = dir + "beCard";
    var backDir = dir + "beCardBack.png";
    var valueList = [1,1,2,2,0,0,0,0,0,0,1,0,0,2,2];
    var effectList = [0,0,0,0,"wound","wound","wound","wound","stun","stun","disarm","healSelf1","healSelf1","fire","fire"];
    var rollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","oooo","x13-+0","x14-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8","+9","+10","+11-+12","+13","+14"];
    this.perkInstructions = ["1Remove two =-1= cards","1Remove four =+0= cards","2Replace one =-1= card with one =+1= card", "2Replace one =+0= card with one =rolling=+2= card","2Add two =rolling=wound= cards","2Add one =rolling=stun= card","1Add one =rolling=+1=disarm=card","1Add two =rolling=heal=1 cards","2Add one =+2=fire= card"];
  }

  loadDoomstalkerDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/14/";
    var cardDir = dir + "dsCard";
    var backDir = dir + "dsCardBack.png";
    var valueList = [1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,0,0,"muddle","poison","wound","immobilize","stun","target1","target1"];
    var rollingList = [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x0-x1-+0-+1","x2-x3-+2-+3","x4-x5-+4-+5","+6-+7","+8-+9","+10","+11","+12","+13","+14","+15","+16"];
    this.perkInstructions = ["1Remove two =-1= cards","3Replace two =+0= cards with two =+1= cards","2Add two =rolling=+1= cards","1Add one =+2=muddle= card","1Add one =+1=poison= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+0=stun= card","2Add one =rolling=target= card"];
  }
  
  loadElementalistDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/16/";
    var cardDir = dir + "elCard";
    var backDir = dir + "elCardBack.png";
    var valueList = [1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0];
    var effectList = [0,0,0,"fire","fire","fire","fire","cold","cold","cold","cold","air","air","air","air","earth","earth","earth","earth","push1","push1","wound","stun","target1"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","x15-+0","x0-+1","x1-+2","+3-+4-+5","+7-+8-+9","+11-+12-+13","+15-+16-+17","x2-x3-+6-+18","x4-x5-+10-+14","+19-+20","+21","+22","+23"];
    this.perkInstructions = ["2Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add three =+0=fire= cards","1Add three =+0=cold= cards","1Add three =+0=air= cards","1Add three =+0=earth= cards","1Replace two =+0= cards with one =+0=fire= and one =+0=earth= card","1Replace two =+0= cards with one =+0=cold= and one =+0=air= card","1Add two =+1=push=1 cards","1Add one =+1=wound= card","1Add one =+0=stun= card","1Add one =+0=target= card"];
  }
  
  loadDeck(targetDeck, cardDir, backDir, valueList, effectList, rollingList) {
    var cardNum = 0;
    valueList.forEach( foo => {
      var cardStr = cardNum+1;
      if (cardNum < 9) cardStr = "0" + cardStr;
      targetDeck.push(new Card(valueList[cardNum], effectList[cardNum], rollingList[cardNum], cardDir + cardStr + ".png", backDir));
      cardNum++;
    });
  }
  
  formDeck() {
    this.playerDeck = [];
    for (let baseCard of this.baseDeck) {
      this.playerDeck.push(baseCard);
    }
    this.numMinusOnes = 0;
    this.numBlesses = 0;
    this.numCurses = 0;
    this.removedMinusOnes = [[], [], []];
    this.addedMinusOnes = [[], [], []];
    this.blesses = [[],[]];
    this.curses = [[],[]];
    this.playerDeck.forEach(card => {
      if (card.getValue() == -1) {
        this.addedMinusOnes[BASE_DECK].push(card);
      }
    });
    this.additionDeck.forEach(card => {
      if (card.getValue() == -1) {
        this.removedMinusOnes[ADDITIONAL_DECK].push(card);
      } else if (card.getValue() == "x2") {
        this.blesses[0].push(card);
      } else {
        this.curses[0].push(card);
      }
    });
  }
  
  modPerk(checkmarkNum, turnPerkOn) {
    var checkmarkIndex = checkmarkNum - 1;
    var instructions = this.perkList[checkmarkIndex].slice();
    var steps = instructions.slice().split("-");
    steps.forEach(task => {
      if (task[0] == "x") {
        if (turnPerkOn) {
          this.removeCard(this.baseDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.addCard(this.baseDeck[parseInt(task.substring(1,task.length))]);
        }
      } else if (task[0] == "+") {
        if (turnPerkOn) {
          this.addCard(this.characterDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.removeCard(this.characterDeck[parseInt(task.substring(1,task.length))]);
        }
      } else {
        if (turnPerkOn) {
          this.removeFourZeroes();
        } else {
          this.addFourZeroes();
        }
      }
    });
    this.deckSort();
  }
    
  removeCard(card) {
    if (card.getValue() == -1) {
      this.removeMinusOne(false);
    } else {
     this.playerDeck.indexOf(card) !== -1 && this.playerDeck.splice(this.playerDeck.indexOf(card), 1);
    }
  }
  addCard(card) {
    if (card.getValue() == -1) {
      this.addMinusOne(false);
    } else {
      this.playerDeck.indexOf(card) == -1 && this.playerDeck.push(card);
    }
  }
  removeFourZeroes() {
    this.removeCard(this.baseDeck[0]); this.removeCard(this.baseDeck[1]); this.removeCard(this.baseDeck[2]); this.removeCard(this.baseDeck[3]);
  }
  addFourZeroes() {
    this.addCard(this.baseDeck[0]); this.addCard(this.baseDeck[1]); this.addCard(this.baseDeck[2]); this.addCard(this.baseDeck[3]);
  }

  deckSort() {
    for (var card in this.playerDeck) {
      for (var i = 0; i < this.playerDeck - 1; i++) {
        if (this.deckCompare(this.playerDeck[i], this.playerDeck[i+1])) {
          var temp = this.playerDeck[i];
          this.playerDeck[i] = this.playerDeck[i+1];
          this.playerDeck[i+1] = this.playerDeck[i];
        }
      }
    }
  }

  deckCompare(cardOne, cardTwo) {
    var cardOneValue = cardOne.getValue();
    var cardTwoValue = cardTwo.getValue();
    if (cardOneValue < cardTwoValue) {
      return false;
    } else if (cardOneValue == cardTwoValue) {
      var cardOnePath = cardTwo.backPath.slice().split("/");
      var cardTwoPath = cardOne.backPath.slice().split("/");
      var cardOneTieBreaker = 1;
      if (cardOnePath.includes("zBase")) { cardOneTieBreaker = 0;}
      if (cardOnePath.includes("zGeneralAdditions")) { cardOneTieBreaker = 2; }
      var cardTwoTieBreaker = 1;
      if (cardTwoTieBreaker.includes("zBase")) { cardOneTieBreaker = 0; }
      if (cardTwoTieBreaker.includes("zGeneralAdditions")) { cardOneTieBreaker = 2; }
      return (cardTwoTieBreaker >= cardOneTieBreaker);
    } else {
      return true;
    }
  }

  addMinusOne(manual) {
    var tryOrder = [BASE_DECK, CLASS_DECK, ADDITIONAL_DECK];
    if (manual) tryOrder = [BASE_DECK, ADDITIONAL_DECK, CLASS_DECK];
    var cardAdded = false;
    tryOrder.forEach ( el => {
      if (!cardAdded && this.removedMinusOnes[el].length > 0) {
        var minusOneBeingAdded = this.removedMinusOnes[el].pop();
        this.playerDeck.indexOf(minusOneBeingAdded) == -1 && this.playerDeck.push(minusOneBeingAdded);
        this.addedMinusOnes[el].push(minusOneBeingAdded);
        cardAdded = true;
        if (manual) this.numMinusOnes++;
      }
    });
    if (!cardAdded) console.log("Uh oh, tried to add a card but none were available to add.");
  }

  removeMinusOne(manual) {
    var tryOrder = [ADDITIONAL_DECK, CLASS_DECK, BASE_DECK];
    var cardAdded = false;
    tryOrder.forEach ( el => {
      if (!cardAdded && this.addedMinusOnes[el].length > 0) {
        var minusOneBeingRemoved = this.addedMinusOnes[el].pop();
        this.playerDeck.indexOf(minusOneBeingRemoved) !== -1 && this.playerDeck.splice(this.playerDeck.indexOf(minusOneBeingRemoved), 1);
        this.removedMinusOnes[el].push(minusOneBeingRemoved);
        cardAdded = true;
        if (manual) this.numMinusOnes--;
      }
    });
    if (!cardAdded) console.log("Uh oh, tried to remove a card but none were available to remove.");
  }

  // I chose "moddle" because "modify" and "toggle" both don't work but I 
  // couldn't think of a term that encompassed both "adding" and "removing"

  moddleBlesses(isAdding){
    if (isAdding) {
      if (this.blesses[0].length > 0) {
        var addedCard = this.blesses[0].pop();
        this.blesses[1].push(addedCard);
        this.addCard(addedCard);
        this.numBlesses++;
      }
    } else {
      if (this.blesses[1].length > 0) {
        var removedCard = this.blesses[1].pop();
        this.blesses[0].push(removedCard);
        this.removeCard(removedCard);
        this.numBlesses--;
      }
    }
  }

  moddleCurses(isAdding){
    if (isAdding) {
      if (this.curses[0].length > 0) {
        var addedCard = this.curses[0].pop();
        this.curses[1].push(addedCard);
        this.addCard(addedCard);
        this.numCurses++;
      }
    } else {
      if (this.curses[1].length > 0) {
        var removedCard = this.curses[1].pop();
        this.curses[0].push(removedCard);
        this.removeCard(removedCard);
        this.numCurses--;
      }
    }
  }
  
  getPlayerDeck() {
    return this.playerDeck;
  }
  
  getPerkInstructions() {
    return this.perkInstructions;
  }
}

export {Deck};