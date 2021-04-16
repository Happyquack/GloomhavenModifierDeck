import {Deck} from './deck.js';

// make class selection
var ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

var classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "";
classSelectionBox.style.borderColor = "rgb(234,236,239)";
classSelectionBox.style.borderStyle = "solid";
classSelectionBox.style.borderWidth = "1px";

var classIconImgs = []
for (var i = 0; i < 18; i++) {
 var num = i + 1;
 if (num < 10) {num = "0" + num;}
 classIconImgs.push(document.createElement('img'));
 classIconImgs[i].src = ICONPATH + num + "icon.png";
}

var imageSideLength = classSelectionBox.offsetWidth/6 * 4/5;
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

var deck = new Deck();

var deckOfCards = deck.getPlayerDeck();

var deckDisplayBox = document.getElementById('deckDisplayBoxId');
deckDisplayBox.innerHTML = "";
deckDisplayBox.style.borderColor = "rgb(134,136,139)";
deckDisplayBox.style.borderStyle = "solid";
deckDisplayBox.style.borderWidth = "1px";

var deckDisplayColumns = []
for (var i = 0; i < 15; i++) {
 deckDisplayColumns.push(document.createElement('div'));
}

// empty previous contents
for (let column of deckDisplayColumns) {
 while (column.firstChild) {
  column.removeChild(column.firstChild);
 }
}
while (deckDisplayBox.firstChild) {
 deckDisplayBox.removeChild(column.firstChild);
}
// modify new contents
var deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
for (let card of deckOfCards) {
 if (card.isRolling()) {
  if (card.getValue() == 0) {
   deckSortingColumns[12].push(card); break;
  } else {
   deckSortingColumns[10].push(card); break;
  }
 } else {
  switch (card.getValue()) {
   case "null": deckSortingColumns[0].push(card); break;
   case -2: deckSortingColumns[1].push(card); break;
   case -1: deckSortingColumns[2].push(card); break;
   case 0: if (card.getEffect() == 0) {deckSortingColumns[3].push(card); break;}
   case 1: deckSortingColumns[4].push(card); break;
   case 2: deckSortingColumns[6].push(card); break;
   case "x2": deckSortingColumns[9].push(card); break;
   default: deckSortingColumns[7].push(card); break;
  }
 }
 for (let [index, column] of deckSortingColumns.entries()) {
  if (column.length > 9) deckSortingColumns[index+1] = column[index].splice(Math.floor(column.length/2), column.length - Math.floor(column.length/2));
 }
}
// add new contents
var numberOfColumns = 0;
for (let column of deckSortingColumns) {
 if (column.length > 0) {
  column.innerHTML = "";
  column.forEach(el => deckDisplayColumns[numberOfColumns].appendChild(el.getImg()));
  numberOfColumns++;
 }
}
// format and display columns

var deckDisplayBoxWidth = deckDisplayBox.offsetWidth;
var deckDisplayColumnWidth = deckDisplayBoxWidth/numberOfColumns;
deckDisplayColumns.forEach(column => {
 column.width = deckDisplayColumnWidth;
 column.style.display = "flex";
 column.style.flexWrap = "wrap";
 Array.from(column.children).forEach(card => {
  card.width = deckDisplayColumnWidth*4/5;
  card.style.margin = deckDisplayColumnWidth/10 + "px";
 } );
} );
