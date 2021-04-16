import {Deck} from './deck.js';

// make class selection
var ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

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

deck = new Deck();

deckOfCards = deck.getPlayerDeck();

deckDisplayBox = document.getElementById('deckDisplayBoxId');
deckDisplayBox.innerHTML = "";
deckDisplayBox.style.borderColor = "rgb(134,136,139)";
deckDisplayBox.style.borderStyle = "solid";
deckDisplayBox.style.borderWidth = "1px";

deckDisplayColumns = []
for (i = 0; i < 15; i++) {
 deckDisplayColumns.push(document.createElement('div'));
}

// empty previous contents
for (column of deckDisplayColumns.entries()) {
 while (column.firstChild) {
  column.removeChild(column.firstChild);
 }
}
while (deckDisplayBox.firstChild) {
 deckDisplayBox.removeChild(column.firstChild);
}
// modify new contents
deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
for (card of deckOfCards.entries()) {
 if (card.isRolling()) {
  if (card.getValue() == 0) {
   deckSortingColumns[12].append(card); break;
  } else {
   deckSortingColumns[10].append(card); break;
  }
 } else {
  switch (card.getValue()) {
   case "null": deckSortingColumns[0].append(card); break;
   case -2: deckSortingColumns[1].append(card); break;
   case -1: deckSortingColumns[2].append(card); break;
   case 0: if (card.getEffect() == 0) {deckSortingColumns[3].append(card); break;}
   case 1: deckSortingColumns[4].append(card); break;
   case 2: deckSortingColumns[6].append(card); break;
   case "x2": deckSortingColumns[9].append(card); break;
   default: deckSortingColumns[7].append(card); break;
  }
 }
 for (let [index, column] of deckSortingColumns.entries()) {
  if (column.length > 9) deckSortingColumns[index+1] = column[index].splice(Math.floor(column.length/2), column.length - Math.floor(column.length/2));
 }
}
// add new contents
numberOfColumns = 0;
for (column of deckSortingColumns.entries()) {
 if (column.length > 0) {
  deckDisplayColumns[numberOfColumns] = column;
  numberOfColumns++;
 }
}
// format and display columns

