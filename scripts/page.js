import {Deck} from './deck.js';

// make class selection
var ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

var WHITELISTED_CLASSES = ["01","02","03","04","05","06","07","12","16"];

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
 classIconImgs.forEach(el => {
  if (WHITELISTED_CLASSES.includes(el.id)) {el.style.borderColor = "black";}
 });
 image.style.borderColor = "green";
 deck.updateCharacter(image.src.slice().split("/").pop());
 updatePerks();
}

var boxSideLength = classSelectionBox.clientWidth/6;
var imageSideLength = boxSideLength*15/16;
for (let [index, image] of classIconImgs.entries()) {
 if (image.width > image.height) {
  image.height = image.height/image.width*imageSideLength*3/4 + "";
  image.width = imageSideLength*3/4 + "";
  image.style.padding = (imageSideLength - image.height)/2 + "px " + (imageSideLength/8) + "px";
 } else {
  image.width = image.width/image.height*imageSideLength*3/4 + "";
  image.height = imageSideLength*3/4 + "";
  image.style.padding = (imageSideLength/8) + "px " + (imageSideLength - image.width)/2 + "px";
 }
 image.style.borderWidth = boxSideLength/8
 image.style.borderStyle = "solid";
 image.style.borderColor = "black";
 var label = index + 1 + "";
 if (index < 9) label = "0" + label;
 image.id = label;
 if (WHITELISTED_CLASSES.includes(label)) {
  image.addEventListener("click", classSelectorClicked);
 } else {
  image.style.borderColor = "grey";
 }
 classSelectionBox.appendChild(image);
}

//make card flipping function

function flipCard(event) { deckOfCards.forEach(el => {
 if (el.getImg() == event.target) el.flip(); 
});}

var deckDisplayBox = document.getElementById('deckDisplayBoxId');
 deckDisplayBox.innerHTML = "";
 deckDisplayBox.style.outlineColor = "rgb(134,136,139)";
 deckDisplayBox.style.outlineStyle = "solid";
 deckDisplayBox.style.outlineWidth = "1px";

 var deckDisplayColumns = []
 for (var i = 0; i < 15; i++) {
  deckDisplayColumns.push(document.createElement('div'));
 }

// display deck layout
function displayDeck () {

 deckOfCards = deck.getPlayerDeck();
 //console.log(deckDisplayColumns);

 // empty previous contents
 
 deckDisplayColumns.forEach(el => el.innerHTML = "");
 deckDisplayBox.innerHTML = "";
 
 
 //for (let column of deckDisplayColumns) {
  //while (column.firstChild) {
   //column.removeChild(column.firstChild);
  //}
 //}
 //while (deckDisplayBox.firstChild) {
  //deckDisplayBox.removeChild(deckDisplayBox.firstChild);
  //console.log("poppin");
 //}
 
 //console.log(deckDisplayColumns);
 // modify new contents
 var deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
 for (let card of deckOfCards) {
  if (card.isRolling()) {
   if (card.getValue() == 0) {
    deckSortingColumns[12].push(card);
   } else {
    deckSortingColumns[10].push(card);
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
}
for (var i = 0; i < deckSortingColumns.length; i++) {
 var column = deckSortingColumns[i];
 if (column.length > 9) {
  deckSortingColumns[i+1] = deckSortingColumns[i].splice(Math.ceiling(column.length/2), column.length - Math.floor(column.length/2));
  i++;
 }
}
 console.log(deckSortingColumns);
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

// make stat/perk box

var controllerBox = document.getElementById("controllerBox");
var statsBox = document.createElement("div");
var perkBox = document.createElement("div");

controllerBox.appendChild(statsBox);
controllerBox.appendChild(perkBox);

statsBox.style.width = controllerBox.offsetWidth*3/5 + "px";
statsBox.id = "statsBox";

perkBox.style.width = controllerBox.offsetWidth*2/5 + "px";
perkBox.id = "perkBox";

// make checkbox event function

function checkboxTriggered(event) {
 var checkbox = event.target;
 var checkboxNum = parseInt(checkbox.id.substring(8,checkbox.id.length));
 deck.modPerk(checkboxNum, checkbox.checked);
 displayDeck();
}

// make perk checkboxes
var checkboxes = [];
for (i = 15; i > 0; i--) {
 var checkbox = document.createElement("input");
 checkbox.type = "checkbox";
 checkbox.style.content = "■";
 checkbox.id = "checkbox" + i;
 checkbox.addEventListener("click", checkboxTriggered);
 checkboxes.push(checkbox);
}


function updatePerks() {
 var thePerkBox = document.getElementById("perkBox");
 thePerkBox.innerHTML = "";
 var perkInstructions = deck.getPerkInstructions();
 var checkboxQueue = checkboxes.slice();
 perkInstructions.forEach(el => {
  var instruction = el.slice()
  var perkLine = document.createElement("div");
  var numOfCheckboxes = instruction[0];
  instruction = instruction.slice(1,instruction.length);
  for (i = 0; i < numOfCheckboxes; i++) {
   perkLine.appendChild(checkboxQueue.pop());
   var spacer = document.createElement("span");
   spacer.innerHTML = " ";
   perkLine.appendChild(spacer);
  }
  instruction = instruction.split("=");
  var commandWords = ["air","bless","cold","curse","disarm","fire","heal","immobilize","invisible","muddle","night","pierce","plant","poison","push","rolling","shield","strengthen","stun","sun","target"];
  instruction.forEach(el => {
   if (commandWords.includes(el)) {
    var newImage = document.createElement("img");
    newImage.src = "https://happyquack.github.io/GloomhavenModifierDeck/images/statusIcons/" + el + ".png";
    var fontSize = parseInt(window.getComputedStyle(document.getElementById("controllerBox"),null).getPropertyValue('font-size'));
    newImage.width = 1.5*fontSize;
    newImage.height = 1.5*fontSize;
    if (!["air","cold","fire","night","plant","rolling","sun"].includes(el)) {
     var textToAdd = document.createElement("span");
     switch (el) {
      case "heal":
       textToAdd.innerHTML = "Heal"; break;
      case "shield":
       textToAdd.innerHTML = "Shield"; break;
      case "target":
       textToAdd.innerHTML = "ADD TARGET"; break;
      default:
       textToAdd.innerHTML = el.toUpperCase(); break;
     }
     perkLine.appendChild(textToAdd);
    }
    perkLine.appendChild(newImage);
   } else {
    var textToAdd = document.createElement("span");
    textToAdd.innerHTML = el;
    perkLine.appendChild(textToAdd);
   }
  });
  thePerkBox.appendChild(perkLine);
 });
}





