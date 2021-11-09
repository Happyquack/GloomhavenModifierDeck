
// The class that represents each card and its HTML elements
// Each Card is composed of the face image and the back image (rotated 180 degrees), together wrapped in one div
class Card {
  constructor(value, effect, rolling, imgPath, backPath) {
    this.value = value;
    this.effect = effect;
    this.rolling = rolling;
    this.imgPath = imgPath;
    this.backPath = backPath;
    this.flipped = false;
    this.img = document.createElement('img');
    this.img.classList.add("cardFront");
    this.img.src = this.imgPath;
    this.back = document.createElement('img');
    this.back.src = this.backPath;
    this.back.classList.add("cardBack");
    this.cardDiv = document.createElement('div');
    this.cardDiv.appendChild(this.img);
    this.cardDiv.appendChild(this.back);
    this.flippable = false;
  }
  
  // Returns the numerical modifier of a card, including "null" and "x2"
  getValue() {
    return this.value;
  }
  
  // Returns the status effect a card gives - no status effect results in a value of "0"
  getEffect() {
    return this.effect;
  }
  
  // This is 1 if the card is rolling, and 0 if it isn't
  isRolling() {
    return this.rolling;
  }
  
  // Remembers if the card has already been drawn
  isFlipped() {
    return this.flipped;
  }
  
  // You might think this gives the actual icon of the card, but no, this gives the wrapping div for both the front and back card icons
  getImg() {
    return this.cardDiv;
  }

  // This is a compact way to represent the card, used in the statistics part of the program
  getCardSummary() {
    return this.value + ":" + this.effect;
  }
  
  // Registers the card as flipped and transforms HTML elements to reflect this
  flip() {
    this.flipped = !this.flipped;
    if (this.flipped) {
      this.img.style.transform = "rotateY(180deg)";
      this.back.style.transform = "rotateY(0deg)";
    } else {
      this.img.style.transform = "rotateY(0deg)";
      this.back.style.transform = "rotateY(180deg)";
    }
    
  }
}

export {Card}