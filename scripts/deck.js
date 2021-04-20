import {Card} from './card.js';

class Deck {
  constructor() {
    this.character = "";
    this.createDecks();
    this.perkList = [];
  }
  
  createDecks() {
    this.loadBaseDeck();
    this.formDeck();
  }
  
  loadBaseDeck() {
    this.baseDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/zBase/";
    var cardDir = dir + "baseCard";
    var backDir = dir + "baseCardBack.png";
    var valueList = [0,0,0,0,0,0,1,1,1,1,1,-1,-1,-1,-1,-1,-2,2,"null","x2"];
    var effectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.baseDeck, cardDir, backDir, valueList, effectList, rollingList);
  }
  
  updateCharacter(label)
  {
    this.formDeck();
    var characters = ["","brute","tinkerer","spellweaver","scoundrel","cragheart","mindthief","sunkeeper", "", "", "", "", "berserker", "", "", "", "elementalist", ""];
    this.character = characters[parseInt(label)];
    this.loadCharacterDeck();
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
      case "elementalist": 
        this.loadElementalistDeck(); 
        break;
      case "mindthief": 
        this.loadMindthiefDeck(); 
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
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/01/";
    var cardDir = dir + "brCard";
    var backDir = dir + "brCardBack.png";
    var valueList = [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
    var effectList = [0,0,0,0,0,0,"push1","push1","push1","push1","push1","push1","push1","pierce3","pierce3","stun","stun","disarm","muddle","target","target","shieldSelf1"];
    var rollingList = [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-+0","+1-+2","+3-+4","+6","+7-+8-+9","+10-+11-+12","+13-+14","+15","+16","+17-+18","+19","+20","+21","+5"];
    this.perkInstructions = ["1Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+3= card","2Add three =rolling=push=1 cards","1Add two =rolling=pierce=3 cards","2Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card","2Add one =rolling=target= card","1Add one =+1=shield=1, Self card","1Ignore negative item effects and add one =+1= card"];
  }
  
  loadTinkererDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/02/";
    var cardDir = dir + "tiCard";
    var backDir = dir + "tiCardBack.png";
    var valueList = [0,1,1,3,0,0,0,0,0,1,1,1,1,1,1,0];
    var effectList = [0,0,0,0,"fire","fire","muddle","muddle","muddle","wound","wound","immobilize","immobilize","healSelf2","healSelf2","target"];
    var rollingList = [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
  }
  
  loadSpellweaverDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/03/";
    var cardDir = dir + "spCard";
    var backDir = dir + "spCardBack.png";
    var valueList = [1,1,1,1,1,1,0,1,1,1,2,2,2,2,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"stun","wound","immobilize","curse","fire","fire","cold","cold","earth","wind","sun","night"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
  }
  
  loadScoundrelDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/04/";
    var cardDir = dir + "scCard";
    var backDir = dir + "scCardBack.png";
    var valueList = [0,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,"pierce3","pierce3","poison","poison","poison","poison","muddle",",muddle","invisible"];
    var rollingList = [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
  }
  
  loadCragheartDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/05/";
    var cardDir = dir + "crCard";
    var backDir = dir + "crCardBack.png";
    var valueList = [1,1,1,-2,2,2,1,1,2,2,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"immobilize","immobilize","muddle","muddle","push2","push2","earth","earth","earth","earth","wind","wind"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["oooo","x11-+0","x12-+1","x13-+2","+3-+4-+5","+6","+7","+8","+9","+10-+11","+12-+13","+14-+15","+16-+17"];
    this.perkInstructions = []; //TODO
  }
  
  loadMindthiefDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/06/";
    var cardDir = dir + "miCard";
    var backDir = dir + "miCardBack.png";
    var valueList = [2,2,0,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,0,"push1","push1","push1","muddle","muddle","muddle","muddle","immobilize","immobilize","stun","disarm"];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
  }
  
  loadSunkeeperDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/07/";
    var cardDir = dir + "suCard";
    var backDir = dir + "suCardBack.png";
    var valueList = [0,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1];
    var effectList = [0,0,0,0,0,0,"healSelf1","healSelf1","healSelf1","healSelf1","stun","sun","sun","sun","sun","shieldSelf1","shieldSelf1",0,0];
    var RollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
  }
  
  loadBerserkerDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/12/";
    var cardDir = dir + "beCard";
    var backDir = dir + "beCardBack.png";
    var valueList = [1,1,2,2,0,0,0,0,0,0,1,0,0,2,2];
    var effectList = [0,0,0,0,"wound","wound","wound","wound","stun","stun","disarm","healSelf1","healSelf1","fire","fire"];
    var rollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","oooo","x13-+0","x14-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8","+9","+10","+11-+12","+13","+14"];
    this.perkInstructions = []; //TODO
  }
  
  loadElementalistDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/16/";
    var cardDir = dir + "elCard";
    var backDir = dir + "elCardBack.png";
    var valueList = [1,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0];
    var effectList = [0,0,0,"fire","fire","fire","fire","cold","cold","cold","cold","wind","wind","wind","wind","earth","earth","earth","earth","push1","push1","wound","stun","target"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = []; //TODO
    this.perkInstructions = []; //TODO
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
  }
  
  modPerk(checkmarkNum, turnPerkOn) {
    var checkmarkIndex = checkmarkNum - 1;
    var instructions = this.perkList[checkmarkIndex].slice();
    var steps = instructions.split("-");
    console.log(instructions);
    console.log(steps);
    steps.forEach(task => {
      if (task[0] == "x") {
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[parseInt(task.substring(1,task.length))]);
        }
      } else if (task[0] == "+") {
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[parseInt(task.substring(1,task.length))]);
        }
      } else {
        if (turnPerkOn) {
          this.removeFourZeroes();
        } else {
          this.addFourZeroes();
        }
      }
    });
  }
    
  removeCard(arr, card) {
    arr.indexOf(card) !== -1 && arr.splice(arr.indexOf(card), 1);
  }
  addCard(arr, card) {
    arr.indexOf(card) == -1 && arr.push(card);
  }
  removeFourZeroes() {
    this.removeCard(this.playerDeck, this.baseDeck[0]); this.removeCard(this.playerDeck, this.baseDeck[1]); this.removeCard(this.playerDeck, this.baseDeck[2]); this.removeCard(this.playerDeck, this.baseDeck[3]);
  }
  addFourZeroes() {
    this.addCard(this.playerDeck, this.baseDeck[0]); this.addCard(this.playerDeck, this.baseDeck[1]); this.addCard(this.playerDeck, this.baseDeck[2]); this.addCard(this.playerDeck, this.baseDeck[3]);
  }
  
  getPlayerDeck() {
    return this.playerDeck;
  }
  
  getPerkInstructions() {
    return this.perkInstructions;
  }
}

export {Deck};
