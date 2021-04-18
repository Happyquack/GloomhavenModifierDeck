import {Card} from './card.js';

class Deck {
  constructor(character) {
    this.character = character;
    this.createDecks();
    this.perks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  }
  
  createDecks() {
    this.loadBaseDeck();
    this.loadCharacterDeck();
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
    var rollinglist = [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
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
  }
  
  loadMindthiefDeck() {
    this.characterDeck = [];
    var dir = "https://happyquack.github.io/GloomhavenModifierDeck/images/modifierDecks/06/";
    var cardDir = dir + "miCard";
    var backDir = dir + "miCardBack.png";
    var valueList = [2,2,0,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,0,"push1","push1","push1","muddle","muddle","muddle","muddle","immobilize","immobilize","stun","disarm"];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
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
    switch(this.character) {
        case "berserker": 
        this.modBerserkerPerk(checkmarkNum, turnPerkOn); 
        break;
      case "brute": 
        this.modBrutePerk(checkmarkNum, turnPerkOn); 
        break;
      case "cragheart": 
        this.modCragheartPerk(checkmarkNum, turnPerkOn); 
        break;
      case "elementalist": 
        this.modElementalistPerk(checkmarkNum, turnPerkOn); 
        break;
      case "mindthief": 
        this.modMindthiefPerk(checkmarkNum, turnPerkOn); 
        break;
      case "scoundrel": 
        this.modScoundrelPerk(checkmarkNum, turnPerkOn); 
        break;
      case "spellweaver": 
        this.modSpellweaverPerk(checkmarkNum, turnPerkOn); 
        break;
      case "sunkeeper": 
        this.modSunkeeperPerk(checkmarkNum, turnPerkOn); 
        break;
      case "tinkerer": 
        this.modTinkererPerk(checkmarkNum, turnPerkOn); 
        break;
      default: break;
    }
  }
  
  modBerserkerPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[11]); this.removeCard(this.playerDeck, this.baseDeck[12]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[11]); this.addCard(this.playerDeck, this.baseDeck[12]);
        }
        break;
      case 1:
        if (turnPerkOn) {
          this.removeFourZeroes();
        } else {
          this.addFourZeroes();
        }
        break;
      case 2:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[13]); this.addCard(this.playerDeck, this.characterDeck[0]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[13]); this.removeCard(this.playerDeck, this.characterDeck[0]);
        }
        break;
      case 3:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[14]); this.addCard(this.playerDeck, this.characterDeck[1]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[14]); this.removeCard(this.playerDeck, this.characterDeck[1]);
        }
        break;
      case 4:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[4]); this.addCard(this.playerDeck, this.characterDeck[2]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[4]); this.removeCard(this.playerDeck, this.characterDeck[2]);
        }
        break;
      case 5:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[5]); this.addCard(this.playerDeck, this.characterDeck[3]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[5]); this.removeCard(this.playerDeck, this.characterDeck[3]);
        }
        break;
      case 6:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[4]); this.addCard(this.playerDeck, this.characterDeck[5]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[4]); this.removeCard(this.playerDeck, this.characterDeck[5]);
        }
        break;
      case 7:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[6]); this.addCard(this.playerDeck, this.characterDeck[7]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[6]); this.removeCard(this.playerDeck, this.characterDeck[7]);
        }
        break;
      case 8:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[8]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[8]);
        }
        break;
      case 9:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[9]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[9]);
        }
        break;
      case 10:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[10]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[10]);
        }
        break;
      case 11:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[11]); this.addCard(this.playerDeck, this.characterDeck[12]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[11]); this.removeCard(this.playerDeck, this.characterDeck[12]);
        }
        break;
      case 12:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[13]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[13]);
        }
        break;
      case 13:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[14]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[14]);
        }
        break;
      default:
        break;
    }
  }
  
  modBrutePerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[11]); this.removeCard(this.playerDeck, this.baseDeck[12]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[11]); this.addCard(this.playerDeck, this.baseDeck[12]);
        }
        break;
      case 1:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[13]); this.addCard(this.playerDeck, this.characterDeck[0]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[13]); this.removeCard(this.playerDeck, this.characterDeck[0]);
        }
        break;
      case 2:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[1]); this.addCard(this.playerDeck, this.characterDeck[2]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[1]); this.removeCard(this.playerDeck, this.characterDeck[2]);
        }
        break;
      case 3:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[3]); this.addCard(this.playerDeck, this.characterDeck[4]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[3]); this.removeCard(this.playerDeck, this.characterDeck[4]);
        }
        break;
      case 4:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[6]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[6]);
        }
        break;
      case 5:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[7]); this.addCard(this.playerDeck, this.characterDeck[8]); this.addCard(this.playerDeck, this.characterDeck[9]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[7]); this.removeCard(this.playerDeck, this.characterDeck[8]); this.removeCard(this.playerDeck, this.characterDeck[9]);
        }
        break;
      case 6:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[10]); this.addCard(this.playerDeck, this.characterDeck[11]); this.addCard(this.playerDeck, this.characterDeck[12]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[10]); this.removeCard(this.playerDeck, this.characterDeck[11]); this.removeCard(this.playerDeck, this.characterDeck[12]);
        }
        break;
      case 7:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[13]); this.addCard(this.playerDeck, this.characterDeck[14]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[13]); this.removeCard(this.playerDeck, this.characterDeck[14]);
        }
        break;
      case 8:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[15]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[15]);
        }
        break;
      case 9:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[16]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[16]);
        }
        break;
      case 10:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[17]); this.addCard(this.playerDeck, this.characterDeck[18]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[17]); this.removeCard(this.playerDeck, this.characterDeck[18]);
        }
        break;
      case 11:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[19]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[19]);
        }
        break;
      case 12:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[20]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[20]);
        }
        break;
      case 13:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[21]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[21]);
        }
        break;
      case 14:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[6]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[6]);
        }
        break;
      default:
        break;
    }
  }
  
  modCragheartPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          this.removeFourZeroes();
        } else {
          this.addFourZeroes();
        }
        break;
      case 1:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[11]); this.addCard(this.playerDeck, this.characterDeck[0]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[11]); this.removeCard(this.playerDeck, this.characterDeck[0]);
        }
        break;
      case 2:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[12]); this.addCard(this.playerDeck, this.characterDeck[1]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[12]); this.removeCard(this.playerDeck, this.characterDeck[1]);
        }
        break;
      case 3:
        if (turnPerkOn) {
          this.removeCard(this.playerDeck, this.baseDeck[13]); this.addCard(this.playerDeck, this.characterDeck[2]);
        } else {
          this.addCard(this.playerDeck, this.baseDeck[13]); this.removeCard(this.playerDeck, this.characterDeck[2]);
        }
        break;
      case 4:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[3]); this.addCard(this.playerDeck, this.characterDeck[4]); this.addCard(this.playerDeck, this.characterDeck[5]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[3]); this.removeCard(this.playerDeck, this.characterDeck[4]); this.removeCard(this.playerDeck, this.characterDeck[5]);
        }
        break;
      case 5:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[6]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[6]);
        }
        break;
      case 6:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[7]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[7]);
        }
        break;
      case 7:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[8]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[8]);
        }
        break;
      case 8:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[9]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[9]);
        }
        break;
      case 9:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[10]); this.addCard(this.playerDeck, this.characterDeck[11]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[10]); this.removeCard(this.playerDeck, this.characterDeck[11]);
        }
        break;
      case 10:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[12]); this.addCard(this.playerDeck, this.characterDeck[13]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[12]); this.removeCard(this.playerDeck, this.characterDeck[13]);
        }
        break;
      case 11:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[14]); this.addCard(this.playerDeck, this.characterDeck[15]);
        } else {
          this.removeCard(this.playerDeck, this.characterDeck[14]); this.removeCard(this.playerDeck, this.characterDeck[15]);
        }
        break;
      case 12:
        if (turnPerkOn) {
          this.addCard(this.playerDeck, this.characterDeck[16]); this.addCard(this.playerDeck, this.characterDeck[17]);
        } else {
          this.addCard(this.playerDeck, this.characterDeck[16]); this.addCard(this.playerDeck, this.characterDeck[17]);
        }
        break;
      default:
        break;
    }
  }
  
  modElementalistPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
  }
  
  modMindthiefPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
  }
  
  modScoundrelPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
  }
  
  modSpellweaverPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
  }
  
  modSunkeeperPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
  }
  
  modTinkererPerk(checkmarkNum, turnPerkOn) {
    switch (checkmarkNum) {
      case 0:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 1:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 2:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 3:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 4:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 5:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 6:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 7:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 8:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 9:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 10:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 11:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 12:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 13:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      case 14:
        if (turnPerkOn) {
          
        } else {
          
        }
        break;
      default:
        break;
    }
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
}

export {Deck};
