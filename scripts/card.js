
class Card {
  constructor(value, effect, rolling, imgPath, backPath) {
    this.value = value;
    this.effect = effect;
    this.rolling = rolling;
    this.imgPath = imgPath;
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
  
  getImg() {
    img = document.createElement('img');
    img.src = this.imgPath;
    return img;
  }
  
  getBack() {
    img = document.createElement('img');
    img.src = this.imgPath;
    return img;
  }
}
