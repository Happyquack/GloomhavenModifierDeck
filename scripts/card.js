
class Card {
  constructor(value, effect, rolling, imgPath, backPath) {
    this.value = value;
    this.effect = effect;
    this.rolling = rolling;
    this.imgPath = imgPath;
    this.backPath = backPath;
    this.flipped = false;
    var img = document.createElement('img');
    img.src = this.imgPath;
    img.style.transition = "transform 0.6s";
    img.style.transformStyle = "preserve-3d";
    var back = document.createElement('img');
    back.src = this.backPath;
    back.style.transform = "rotateY(180deg)";
    back.style.transition = "transform 0.6s";
    back.style.transformStyle = "preserve-3d";
    this.imgCard = document.createElement('div');
    this.imgCard.appendChild(img);
    this.imgCard.appendChild(back);
    this.imgCard.addEventListener("click", this.flip);
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
    return this.imgCard;
  }
  
  flip(event) {
    console.log(this.imgPath);
    this.flipped = !this.flipped;
    Array.from(event.target.children).forEach(el => el.style.transform = "rotateY(180deg)");
  }
}

export {Card}
