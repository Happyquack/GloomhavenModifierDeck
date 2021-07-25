
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
  
  getValue() {
    return this.value;
  }
  
  getEffect() {
    return this.effect;
  }
  
  isRolling() {
    return this.rolling;
  }
  
  isFlipped() {
    return this.flipped;
  }
  
  getImg() {
    return this.cardDiv;
  }
  
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