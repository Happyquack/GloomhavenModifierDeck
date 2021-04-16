
class Card {
  constructor(value, effect, rolling, imgPath, backPath) {
    this.value = value;
    this.effect = effect;
    this.rolling = rolling;
    this.imgPath = imgPath;
    this.backPath = backPath;
    this.flipped = false;
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
  
  flip () {
    this.flipped = !this.flipped;
  }
  
  getImg() {
    img = document.createElement('img');
    if (this.flipped) { img.src = this.backPath; } else { img.src = this.imgPath; }
    return img;
  }
}

export {Card}
