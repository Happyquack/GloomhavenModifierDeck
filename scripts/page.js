import {Deck} from './deck.js';

// make class selection
var ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

var classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "";
classSelectionBox.style.outlineColor = "rgb(234,236,239)";
classSelectionBox.style.outlineStyle = "solid";
classSelectionBox.style.outlineWidth = "1px";

var classIconImgs = []
for (var i = 0; i < 18; i++) {
 var num = i + 1;
 if (num < 10) {num = "0" + num;}
 classIconImgs.push(document.createElement('img'));
 classIconImgs[i].src = ICONPATH + num + "icon.png";
}

var deck = new Deck();

var deckOfCards = deck.getPlayerDeck();

function classSelectorClicked(event) {
 var image = event.target;
 classIconImgs.forEach(el => el.style.borderColor = "white");
 image.style.borderColor = "black";
}

var imageSideLength = classSelectionBox.offsetWidth/6;
for (let [index, image] of classIconImgs.entries()) {
 if (image.width > image.height) {
  image.height = image.height/image.width*imageSideLength*3/4 + "";
  image.width = imageSideLength*3/4 + "";
  image.style.padding = (imageSideLength - image.height)/2 + "px " + (imageSideLength/8) + "px " + (imageSideLength - image.height)/2 + "px " + (imageSideLength/8) + "px";
 } else {
  image.width = image.width/image.height*imageSideLength*3/4 + "";
  image.height = imageSideLength*3*4 + "";
  image.style.padding = (imageSideLength/8) + "px " + (imageSideLength - image.width)/2 + "px " + (imageSideLength/8) + "px " + (imageSideLength - image.width)/2 + "px";
 }
 image.style.borderStyle = "solid";
 image.style.borderColor = "white";
 var label = index + 1 + "";
 if (index < 9) label = "0" + label;
 image.id = "label";
 image.addEventListener("click", classSelectorClicked);
 classSelectionBox.appendChild(image);
}

//make card flipping function

function flipCard(event) { deckOfCards.forEach(el => {
 if (el.getImg() == event.target) el.flip(); 
});}

// display deck layout
function displayDeck () {

 deckOfCards = deck.getPlayerDeck();

 var deckDisplayBox = document.getElementById('deckDisplayBoxId');
 deckDisplayBox.innerHTML = "";
 deckDisplayBox.style.outlineColor = "rgb(134,136,139)";
 deckDisplayBox.style.outlineStyle = "solid";
 deckDisplayBox.style.outlineWidth = "1px";

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
  deckDisplayBox.appendChild(deckDisplayColumns[numberOfColumns]);
  numberOfColumns++;
 }
}
 
 // format and display columns

var deckDisplayBoxWidth = deckDisplayBox.offsetWidth;
var deckDisplayColumnWidth = deckDisplayBoxWidth/numberOfColumns;
Array.from(deckDisplayBox.children).forEach(column => {
 column.style.maxWidth = deckDisplayColumnWidth + "px";
 column.style.display = "flex";
 column.style.flexDirection = "column";
 Array.from(column.children).forEach(card => {
  card.style.width = deckDisplayColumnWidth + "px";
  card.style.height = deckDisplayColumnWidth*2/3 + "px";
  card.addEventListener("click", flipCard);
  Array.from(card.firstChild.children).forEach(images => {
   images.width = deckDisplayColumnWidth*4/5;
   images.height = images.width*2/3;
   images.style.margin = deckDisplayColumnWidth/10 + "px";
   images.style.borderRadius = deckDisplayColumnWidth/10 + "px";
   images.style.position = "absolute";
  } );
 } );
} );
 
}

displayDeck();
