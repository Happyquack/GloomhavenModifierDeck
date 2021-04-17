
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
  
  getImg() {
    var img = document.createElement('img');
    img.src = this.imgPath;
    var back = document.createElement('img');
    back.src = this.backPath;
    back.style.transform = "rotateY(180deg)";
    this.imgCard = document.createElement('div');
    this.imgCard.appendChild(img);
    this.imgCard.appendChild(back);
    this.imgCard.style.transition = "transform 0.6s";
    this.imgCard.style.transformStyle = "preserve-3d";
    this.imgCard.onClick = this.flip();
    return this.imgCard;
  }
  
  flip() {
    this.flipped = !this.flipped;
    this.imgCard.style.transform = "rotateY(180deg)";
  }
}

export {Card}
