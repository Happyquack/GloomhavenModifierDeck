class Deck {
  constructor(character) {
    this.character = character;
    this.createDecks();
  }
  
  createDecks() {
    this.loadBaseDeck();
    this.loadCharacterDeck();
  }
  
  loadBaseDeck() {
    this.baseDeck = []
    dir = "../images/modifierDecks/zbase/"
    cardDir = dir + "baseCard";
    backDir = dir + "baseCardBack.png";
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
    switch (character) {
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
  
  loadBerserkerDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/berserker/"
    cardDir = dir + "beCard";
    backDir = dir + "beCardBack.png";
    this.baseDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(2, 0, true, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(2, 0, true, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(0, "wound", true, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(0, "wound", true, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "wound", true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, "wound", true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(1, "disarm", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(2, "fire", false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(2, "fire", false, cardDir + "15.png", backDir));
  }
  
  loadBruteDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/brute/"
    cardDir = dir + "brCard";
    backDir = dir + "brCardBack.png";
    this.baseDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "pierce3", true, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "pierce3", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(0, "disarm", true, cardDir + "18.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "19.png", backDir));
    this.baseDeck.push(new Card(0, "target", true, cardDir + "20.png", backDir));
    this.baseDeck.push(new Card(0, "target", true, cardDir + "21.png", backDir));
    this.baseDeck.push(new Card(0, "target", true, cardDir + "21.png", backDir));
    this.baseDeck.push(new Card(1, "shieldSelf1", false, cardDir + "22.png", backDir));
  }
  
  loadCragheartDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/cragheart/"
    cardDir = dir + "crCard";
    backDir = dir + "crCardBack.png";
    this.baseDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(-2, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(+2, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(+2, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(1, "immobilize", false, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(1, "immobilize", false, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(2, "muddle", false, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(2, "muddle", false, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "push2", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "push2", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "earth", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "earth", true, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "earth", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "earth", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "wind", true, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(0, "wind", true, cardDir + "18.png", backDir));
  }
  
  loadElementalistDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/elementalist/"
    cardDir = dir + "elCard";
    backDir = dir + "elCardBack.png";
    this.baseDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(3, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(0, "flame", false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(0, "flame", false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(0, "flame", false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "flame", false, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, "frost", false, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "frost", false, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "frost", false, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "frost", false, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "wind", false, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "wind", false, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "wind", false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "wind", false, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "earth", false, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "earth", false, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(0, "earth", false, cardDir + "18.png", backDir));
    this.baseDeck.push(new Card(0, "earth", false, cardDir + "19.png", backDir));
    this.baseDeck.push(new Card(1, "push1", false, cardDir + "20.png", backDir));
    this.baseDeck.push(new Card(1, "push1", false, cardDir + "21.png", backDir));
    this.baseDeck.push(new Card(1, "wound", false, cardDir + "22.png", backDir));
    this.baseDeck.push(new Card(0, "stun", false, cardDir + "23.png", backDir));
    this.baseDeck.push(new Card(0, "target", false, cardDir + "24.png", backDir));
  }
  
  loadMindthiefDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/mindthief/"
    cardDir = dir + "miCard";
    backDir = dir + "miCardBack.png";
    this.baseDeck.push(new Card(2, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "push1", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "immobilize", true, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(0, "immobilize", true, cardDir + "18.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "19.png", backDir));
    this.baseDeck.push(new Card(0, "disarm", true, cardDir + "20.png", backDir));
  }
  
  loadScoundrelDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/scoundrel/"
    cardDir = dir + "scCard";
    backDir = dir + "scCardBack.png";
    this.baseDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "pierce3", true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "pierce3", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "poison", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "poison", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "poison", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "poison", true, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "invisible", true, cardDir + "17.png", backDir));
  }
  
  loadSpellweaverDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/spellweaver/"
    cardDir = dir + "spCard";
    backDir = dir + "spCardBack.png";
    this.baseDeck.push(new Card(1, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "stun", false, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(1, "wound", false, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(1, "immobilize", false, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(1, "curse", false, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(2, "flame", false, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(2, "flame", false, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(2, "frost", false, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(2, "frost", false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "earth", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "wind", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "sun", true, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(0, "night", true, cardDir + "18.png", backDir));
  }
  
  loadSunkeeperDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/sunkeeper/"
    cardDir = dir + "suCard";
    backDir = dir + "suCardBack.png";
    this.baseDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(2, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(1, 0, true, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, "healSelf1", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, "stun", true, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, "sun", true, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, "sun", true, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, "sun", true, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, "sun", true, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "shieldSelf1", true, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, "shieldSelf1", true, cardDir + "17.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "18.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "19.png", backDir));
  }
  
  loadTinkererDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/tinkerer/"
    cardDir = dir + "tiCard";
    backDir = dir + "tiCardBack.png";
    this.baseDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(1, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(3, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(0, "flame", true, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(0, "flame", true, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, "muddle", true, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(1, "wound", true, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(1, "wound", false, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(1, "immobilize", false, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(1, "immobilize", false, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(1, "healSelf2", false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(1, "healSelf2", false, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, "target", false, cardDir + "16.png", backDir));
  }
  
  loadTEMPLATEDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/TEMPLATE/"
    cardDir = dir + "TECard";
    backDir = dir + "TECardBack.png";
    this.baseDeck.push(new Card(0, 0, false, cardDir + "01.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "02.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "03.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "04.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "05.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "06.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "07.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "08.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "09.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "10.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "11.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "12.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "13.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "14.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "15.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "16.png", backDir));
    this.baseDeck.push(new Card(0, 0, false, cardDir + "17.png", backDir));
  }
}
