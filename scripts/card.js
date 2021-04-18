
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
    img.style.backfaceVisibility = "hidden";
    var back = document.createElement('img');
    back.src = this.backPath;
    back.style.transform = "rotateY(180deg)";
    back.style.pointerEvents = "none";
    back.style.backfaceVisibility = "hidden";
    this.imgCard = document.createElement('div');
    this.imgCard.style.transition = "transform 0.6s";
    this.imgCard.transformStyle = "preserve-3d";
    this.imgCard.appendChild(img);
    this.imgCard.appendChild(back);
    this.outerCard = document.createElement('div')
    this.outerCard.appendChild(this.imgCard);
    //this.outerCard.addEventListener("click", this.flip);
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
    return this.outerCard;
  }
  
  flip() {
    console.log("FLIPPED");
    this.flipped = !this.flipped;
    if (this.flipped) {
      //this.imgCard.style.transform = "rotateY(180deg)";
      this.outerCard.style.transform = "rotateY(180deg)";
    } else {
      //this.imgCard.style.transform = "rotateY(0deg)";
      this.outerCard.style.transform = "rotateY(0deg)";
    }
    
  }
}

export {Card}
