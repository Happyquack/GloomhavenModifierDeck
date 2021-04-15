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
}
