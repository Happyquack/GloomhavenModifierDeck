// make class selection
ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "";
classSelectionBox.style.borderColor = "rgb(234,236,239)";
classSelectionBox.style.borderStyle = "solid";
classSelectionBox.style.borderWidth = "1px";

classIconImgs = []
for (i = 0; i < 18; i++) {
 num = i + 1;
 if (num < 10) {num = "0" + num;}
 classIconImgs.push(document.createElement('img'));
 classIconImgs[i].src = ICONPATH + num + "icon.png";
}

imageSideLength = classSelectionBox.offsetWidth/6 * 4/5;
for (let [index, image] of classIconImgs.entries()) {
 //image.style.position = "absolute";
 //image.style.top = Math.floor(index/6)*imageSideLength + "px";
 //image.style.left = (index%6)*imageSideLength + "px";
 image.width = imageSideLength + "";
 image.height = imageSideLength + "";
 image.style.margin = imageSideLength/8 + "px";
 classSelectionBox.appendChild(image);
}

// display deck layout

import {Deck} from 'deck.js';

deck = new Deck();

deckOfCards = deck.getPlayerDeck();

deckDisplayBox = document.getElementById('deckDisplayBoxId');
deckDisplayBox.innerHTML = "";
deckDisplayBox.style.borderColor = "rgb(134,136,139)";
deckDisplayBox.style.borderStyle = "solid";
deckDisplayBox.style.borderWidth = "1px";

function displayDeck() {
 // empty previous contents
 while (deckDisplayBox.firstChild) {
  deckDisplayBox.removeChild(deckDisplayBox.firstChild);
 }
 // modify new contents
 
 // add new contents
 for (let card of deckOfCards.entries()) {
  deckDisplaybox.appendChild(card);
 }
}
