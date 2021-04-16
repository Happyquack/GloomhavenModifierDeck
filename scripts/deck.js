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
    var dir = "../images/modifierDecks/zbase/";
    var cardDir = dir + "baseCard";
    var backDir = dir + "baseCardBack.png";
    this.baseDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(-1, 0, false, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(-1, 0, false, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(-1, 0, false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(-1, 0, false, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(-1, 0, false, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(-2, 0, false, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "18.png", backDir));
    this.baseDeck.push(new Card("null", 0, false, cardDir + "19.png", backDir));
    this.baseDeck.push(new Card("x2", 0, false, cardDir + "20.png", backDir));
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
    var dir = "../images/modifierDecks/01/";
    var cardDir = dir + "brCard";
    var backDir = dir + "brCardBack.png";
    this.characterDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "pierce3", true, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "pierce3", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(0, "disarm", true, cardDir + "18.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "19.png", backDir));
    this.characterDeck.push(new Card(0, "target", true, cardDir + "20.png", backDir));
    this.characterDeck.push(new Card(0, "target", true, cardDir + "21.png", backDir));
    this.characterDeck.push(new Card(0, "target", true, cardDir + "21.png", backDir));
    this.characterDeck.push(new Card(1, "shieldSelf1", false, cardDir + "22.png", backDir));
  }
  
  loadTinkererDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/02/";
    var cardDir = dir + "tiCard";
    var backDir = dir + "tiCardBack.png";
    this.characterDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(3, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(0, "flame", true, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(0, "flame", true, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(1, "wound", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(1, "wound", false, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(1, "immobilize", false, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(1, "immobilize", false, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(1, "healSelf2", false, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(1, "healSelf2", false, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "target", false, cardDir + "16.png", backDir));
  }
  
  loadSpellweaverDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/03/";
    var cardDir = dir + "spCard";
    var backDir = dir + "spCardBack.png";
    this.characterDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "stun", false, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(1, "wound", false, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(1, "immobilize", false, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(1, "curse", false, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(2, "flame", false, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(2, "flame", false, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(2, "frost", false, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(2, "frost", false, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "earth", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "wind", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "sun", true, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(0, "night", true, cardDir + "18.png", backDir));
  }
  
  loadScoundrelDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/04/";
    var cardDir = dir + "scCard";
    var backDir = dir + "scCardBack.png";
    this.characterDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "pierce3", true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "pierce3", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "poison", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "poison", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "poison", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "poison", true, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "invisible", true, cardDir + "17.png", backDir));
  }
  
  loadCragheartDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/05/";
    var cardDir = dir + "crCard";
    var backDir = dir + "crCardBack.png";
    this.characterDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(-2, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(+2, 0, false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(+2, 0, false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(1, "immobilize", false, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(1, "immobilize", false, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(2, "muddle", false, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(2, "muddle", false, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "push2", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "push2", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "earth", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "earth", true, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "earth", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "earth", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "wind", true, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(0, "wind", true, cardDir + "18.png", backDir));
  }
  
  loadMindthiefDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/06/";
    var cardDir = dir + "miCard";
    var backDir = dir + "miCardBack.png";
    this.characterDeck.push(new Card(2, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "push1", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "muddle", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "immobilize", true, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(0, "immobilize", true, cardDir + "18.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "19.png", backDir));
    this.characterDeck.push(new Card(0, "disarm", true, cardDir + "20.png", backDir));
  }
  
  loadSunkeeperDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/07/";
    var cardDir = dir + "suCard";
    var backDir = dir + "suCardBack.png";
    this.characterDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(1, 0, true, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "sun", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "sun", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "sun", true, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "sun", true, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "shieldSelf1", true, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "shieldSelf1", true, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "18.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "19.png", backDir));
  }
  
    loadBerserkerDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/12/";
    var cardDir = dir + "beCard";
    var backDir = dir + "beCardBack.png";
    this.characterDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(2, 0, true, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(2, 0, true, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(0, "wound", true, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(0, "wound", true, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "wound", true, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, "wound", true, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "stun", true, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(1, "disarm", true, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "healSelf1", true, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(2, "fire", false, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(2, "fire", false, cardDir + "15.png", backDir));
  }
  
  loadElementalistDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/16/";
    var cardDir = dir + "elCard";
    var backDir = dir + "elCardBack.png";
    this.characterDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(3, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(0, "flame", false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(0, "flame", false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(0, "flame", false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, "flame", false, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, "frost", false, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, "frost", false, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, "frost", false, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, "frost", false, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, "wind", false, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, "wind", false, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, "wind", false, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, "wind", false, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, "earth", false, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, "earth", false, cardDir + "17.png", backDir));
    this.characterDeck.push(new Card(0, "earth", false, cardDir + "18.png", backDir));
    this.characterDeck.push(new Card(0, "earth", false, cardDir + "19.png", backDir));
    this.characterDeck.push(new Card(1, "push1", false, cardDir + "20.png", backDir));
    this.characterDeck.push(new Card(1, "push1", false, cardDir + "21.png", backDir));
    this.characterDeck.push(new Card(1, "wound", false, cardDir + "22.png", backDir));
    this.characterDeck.push(new Card(0, "stun", false, cardDir + "23.png", backDir));
    this.characterDeck.push(new Card(0, "target", false, cardDir + "24.png", backDir));
  }
  
  /*
  loadTEMPLATEDeck() {
    this.characterDeck = [];
    var dir = "../images/modifierDecks/TEMPLATE/";
    var cardDir = dir + "TECard";
    var backDir = dir + "TECardBack.png";
    this.characterDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "02.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "03.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "04.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "05.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "06.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "07.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "08.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "09.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "10.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "11.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "12.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "13.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "14.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "15.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "16.png", backDir));
    this.characterDeck.push(new Card(0, 0, false, cardDir + "17.png", backDir));
  }
  */
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
