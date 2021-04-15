class Deck {
  constructor(character) {
    this.character = character
    this.createBaseDeck()
  }
  
  createBaseDeck() {
    this.deckArray = []
    this.deckArray.push(new Card("null", 0, false, "../images/modifierDecks/baseCard01.png")
  }
}
