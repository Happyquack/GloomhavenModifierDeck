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
    dir = "../images/modifierDecks/zBase/"
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard01.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard02.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard03.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard04.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard05.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "baseCard06.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "baseCard07.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "baseCard08.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "baseCard09.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "baseCard10.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "baseCard11.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-1, 0, false, dir + "baseCard12.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-1, 0, false, dir + "baseCard13.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-1, 0, false, dir + "baseCard14.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-1, 0, false, dir + "baseCard15.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-1, 0, false, dir + "baseCard16.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(-2, 0, false, dir + "baseCard17.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card(2, 0, false, dir + "baseCard18.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card("null", 0, false, dir + "baseCard19.png", dir + "baseCardBack.png"));
    this.baseDeck.push(new Card("x2", 0, false, dir + "baseCard20.png", dir + "baseCardBack.png"));
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
    this.baseDeck.push(new Card(1, 0, false, dir + "beCard01.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "beCard02.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(2, 0, true, dir + "beCard03.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(2, 0, true, dir + "beCard04.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "wound", true, dir + "beCard05.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "wound", true, dir + "beCard06.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "wound", true, dir + "beCard07.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "wound", true, dir + "beCard08.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", true, dir + "beCard09.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", true, dir + "beCard10.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(1, "disarm", true, dir + "beCard11.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "healSelf1", true, dir + "beCard12.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(0, "healSelf1", true, dir + "beCard13.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(2, "fire", false, dir + "beCard14.png", dir + "beCardBack.png"));
    this.baseDeck.push(new Card(2, "fire", false, dir + "beCard15.png", dir + "beCardBack.png"));
  }
  
  loadBruteDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/brute/"
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard01.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard02.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard03.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard04.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard05.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "brCard06.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard07.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard08.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard09.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard10.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard11.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard12.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "brCard13.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "pierce3", true, dir + "brCard14.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "pierce3", true, dir + "brCard15.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", true, dir + "brCard16.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", true, dir + "brCard17.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "disarm", true, dir + "brCard18.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "muddle", true, dir + "brCard19.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "target", true, dir + "brCard20.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "target", true, dir + "brCard21.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(0, "target", true, dir + "brCard21.png", dir + "brCardBack.png"));
    this.baseDeck.push(new Card(1, "shieldSelf1", false, dir + "brCard22.png", dir + "brCardBack.png"));
  }
  
  loadCragheartDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/cragheart/"
    this.baseDeck.push(new Card(1, 0, false, dir + "crCard01.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "crCard02.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "crCard03.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(-2, 0, false, dir + "crCard04.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(+2, 0, false, dir + "crCard05.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(+2, 0, false, dir + "crCard06.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(1, "immobilize", false, dir + "crCard07.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(1, "immobilize", false, dir + "crCard08.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(2, "muddle", false, dir + "crCard09.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(2, "muddle", false, dir + "crCard10.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "push2", true, dir + "crCard11.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "push2", true, dir + "crCard12.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", true, dir + "crCard13.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", true, dir + "crCard14.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", true, dir + "crCard15.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", true, dir + "crCard16.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", true, dir + "crCard17.png", dir + "crCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", true, dir + "crCard18.png", dir + "crCardBack.png"));
  }
  
  loadElementalistDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/elementalist/"
    this.baseDeck.push(new Card(1, 0, false, dir + "elCard01.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(2, 0, false, dir + "elCard02.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(3, 0, false, dir + "elCard03.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "flame", false, dir + "elCard04.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "flame", false, dir + "elCard05.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "flame", false, dir + "elCard06.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "flame", false, dir + "elCard07.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "frost", false, dir + "elCard08.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "frost", false, dir + "elCard09.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "frost", false, dir + "elCard10.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "frost", false, dir + "elCard11.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", false, dir + "elCard12.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", false, dir + "elCard13.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", false, dir + "elCard14.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "wind", false, dir + "elCard15.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", false, dir + "elCard16.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", false, dir + "elCard17.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", false, dir + "elCard18.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "earth", false, dir + "elCard19.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(1, "push1", false, dir + "elCard20.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(1, "push1", false, dir + "elCard21.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(1, "wound", false, dir + "elCard22.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", false, dir + "elCard23.png", dir + "elCardBack.png"));
    this.baseDeck.push(new Card(0, "target", false, dir + "elCard24.png", dir + "elCardBack.png"));
  }
  
  loadMindthiefDeck() {
    this.characterDeck = []
    dir = "../images/modifierDecks/mindthief/"
    this.baseDeck.push(new Card(2, 0, false, dir + "miCard01.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(2, 0, false, dir + "miCard02.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, 0, false, dir + "miCard03.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(2, 0, false, dir + "miCard04.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(2, 0, false, dir + "miCard05.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(1, 0, false, dir + "miCard06.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(1, 0, true, dir + "miCard07.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(1, 0, true, dir + "miCard08.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(1, 0, true, dir + "miCard09.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "miCard10.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "miCard11.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "push1", true, dir + "miCard12.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "muddle", true, dir + "miCard13.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "muddle", true, dir + "miCard14.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "muddle", true, dir + "miCard15.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "muddle", true, dir + "miCard16.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "immobilize", true, dir + "miCard17.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "immobilize", true, dir + "miCard18.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "stun", true, dir + "miCard19.png", dir + "miCardBack.png"));
    this.baseDeck.push(new Card(0, "disarm", true, dir + "miCard20.png", dir + "miCardBack.png"));
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
