
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
    img.style.pointerEvents = "none";
    var back = document.createElement('img');
    back.src = this.backPath;
    back.style.transform = "rotateY(180deg)";
    back.style.pointerEvents = "none";
    this.imgCard = document.createElement('div');
    this.imgCard.style.transition = "transform 0.6s";
    this.imgCard.transformStyle = "preserve-3d";
    this.imgCard.appendChild(img);
    this.imgCard.appendChild(back);
    this.outerCard = document.createElement('div')
    this.outerCard.appendChild(this.imgCard);
    this.outerCard.addEventListener("click", this.flip);
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
    console.log("FLIPPED");
    this.flipped = !this.flipped;
    event.target.firstChild.style.transform = "rotateY(180deg)";
  }
}

export {Card}
