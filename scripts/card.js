
class Card {
  constructor(value, effect, rolling, imgPath, backPath) {
    this.value = value;
    this.effect = effect;
    this.rolling = rolling;
    this.imgPath = imgPath;
    this.backPath = backPath;
    this.flipped = false;
    this.img = document.createElement('img');
    this.img.src = this.imgPath;
    this.img.style.pointerEvents = "none";
    this.img.style.backfaceVisibility = "hidden";
    this.img.style.WebkitBackfaceVisibility = "hidden";
    this.img.style.transformStyle = "preserve-3d";
    this.img.style.opacity = "0.99";
    this.img.style.transition = "transform 0.6s";
    this.back = document.createElement('img');
    this.back.src = this.backPath;
    this.back.style.transform = "rotateY(180deg)";
    this.back.style.pointerEvents = "none";
    this.back.style.backfaceVisibility = "hidden";
    this.back.style.WebkitBackfaceVisibility = "hidden";
    this.back.style.transformStyle = "preserve-3d";
    this.imgCard.style.transition = "transform 0.6s";
    this.img.style.opacity = "0.99";
    this.imgCard = document.createElement('div');
    //this.imgCard.style.transition = "transform 0.6s";
    //this.imgCard.transformStyle = "preserve-3d";
    this.imgCard.appendChild(this.img);
    this.imgCard.appendChild(this.back);
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
      this.img.style.transform = "rotateY(180deg)";
      this.back.style.transform = "rotateY(0deg)";
    } else {
      this.img.style.transform = "rotateY(0deg)";
      this.back.style.transform = "rotateY(180deg)";
    }
    
  }
}

export {Card}
