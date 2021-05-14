import {Deck} from './deck.js';

var MAX_CARDS_IN_COLUMN = 6;

// make class selection
var ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

var WHITELISTED_CLASSES = ["01","02","03","04","05","06","07","11","12","16"];

var classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "";

// create class icons and wrapping divs

var classIconImgs = [];

for (var i = 0; i < 18; i++) {
 var num = i + 1 + "";
 if (num < 10) {num = "0" + num;}
 var image = document.createElement('img');
 image.src = ICONPATH + num + "icon.png";
 image.classList.add("classSelectionIcon");
 
 var wrapper = document.createElement('div');
 wrapper.classList.add("classSelectionIconWrapper");
 
 var secondWrapper = document.createElement('div');
 secondWrapper.classList.add("classSelectionIconWrapperWrapper");
 secondWrapper.id = num;
 
 if (WHITELISTED_CLASSES.includes(num)) {
  secondWrapper.addEventListener("click", classSelectorClicked);
  secondWrapper.classList.add("classSelectionLegal");
 } else {
  secondWrapper.classList.add("classSelectionIllegal");
 }
 
 wrapper.appendChild(image);
 secondWrapper.appendChild(wrapper);
 classIconImgs.push(secondWrapper);
 classSelectionBox.appendChild(secondWrapper);
}

// create player deck

var deck = new Deck();

var deckOfCards = deck.getPlayerDeck();

// function triggers when class icon is selected and updates the deck

function classSelectorClicked(event) {
 var image = event.target;
 var wrapper = document.getElementById(image.src.slice().split("/").pop().substring(0,2));
 classIconImgs.forEach(el => {
  if (WHITELISTED_CLASSES.includes(el.id)) {
   el.classList.remove("classSelectionSelected");
  }
 });
 
 wrapper.classList.add("classSelectionSelected");
 deck.updateCharacter(wrapper.id);
 displayDeck();
 updatePerks();
}

// function triggers when card is selected and flips card

function flipCard(event) { deckOfCards.forEach(el => {
 if (el.getImg() == event.target) el.flip(); 
});}

// create deck display box

var deckDisplayBox = document.getElementById('deckDisplayBoxId');
deckDisplayBox.innerHTML = "";

// create the columns that will contain cards

var deckDisplayColumns = []
for (var i = 0; i < 20; i++) {
 deckDisplayColumns.push(document.createElement('div'));
}

// display deck layout

function displayDeck () {

 deckOfCards = deck.getPlayerDeck();

 // empty previous contents
 
 deckDisplayColumns.forEach(el => el.innerHTML = "");
 deckDisplayBox.innerHTML = "";
 
 // modify new contents
 
 var deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
 for (let card of deckOfCards) {
  if (card.isRolling()) {
   if (card.getValue() == 0) {
    deckSortingColumns[9].push(card);
   } else {
    deckSortingColumns[8].push(card);
  }
 } else {
  switch (card.getValue()) {
   case "null": deckSortingColumns[0].push(card); break;
   case -2: deckSortingColumns[1].push(card); break;
   case -1: deckSortingColumns[2].push(card); break;
   case 0: deckSortingColumns[3].push(card); break;
   case 1: deckSortingColumns[4].push(card); break;
   case 2: deckSortingColumns[5].push(card); break;
   case "x2": deckSortingColumns[7].push(card); break;
   default: deckSortingColumns[6].push(card); break;
  }
 }
}
 
 // add new contents
  
 var numberOfColumns = 0;
 for (let column of deckSortingColumns) {
  if (column.length > 0) {
   var numSplit = Math.round(Math.ceil(column.length/MAX_CARDS_IN_COLUMN),2);
   var numPerColumn = Math.round(Math.ceil(column.length/numSplit),2);
   
   for (var i = 0; i < column.length; i++) {
    deckDisplayColumns[numberOfColumns].appendChild(column[i].getImg());
    if ((i+1) % numPerColumn == 0) {
     deckDisplayBox.appendChild(deckDisplayColumns[numberOfColumns]);
     numberOfColumns++;
    }
   }
   if (numSplit > 1 && numSplit*numPerColumn != column.length) {
    deckDisplayBox.appendChild(deckDisplayColumns[numberOfColumns]);
    numberOfColumns++;
   }
  }
 }
  
 // format and display columns
 
 var deckDisplayBoxWidth = deckDisplayBox.offsetWidth;
 var deckDisplayColumnWidth = deckDisplayBoxWidth/numberOfColumns;
 Array.from(deckDisplayBox.children).forEach(column => {
  column.style.maxWidth = deckDisplayColumnWidth + "px";
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
var deckAdjustingBox = document.getElementById("deckAdjustingBox");
var perkBox = document.getElementById("perkBox");

controllerBox.appendChild(deckAdjustingBox);
controllerBox.appendChild(perkBox);

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
 checkboxes.forEach(el => el.checked = false);
 perkBox.innerHTML = "";
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
  var commandWords = ["air","bless","cold","curse","disarm","fire","heal","immobilize","invisible","muddle","night","pierce","plant","poison","push", "pull","rolling","shield","strengthen","stun","sun","target","wound"];
  instruction.forEach(el => {
   if (commandWords.includes(el)) {
    var newImage = document.createElement("img");
    newImage.src = "https://happyquack.github.io/GloomhavenModifierDeck/images/statusIcons/" + el + ".png";
    var fontSize = parseInt(window.getComputedStyle(controllerBox,null).getPropertyValue('font-size'));
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
    if (el.charAt(0) == "+" || el.charAt(0) == "-") {
      textToAdd.appendChild(document.createTextNode(" "));
      textToAdd.classList.add("numberModifier");
     }
    perkLine.appendChild(textToAdd);
   }
  });
  perkBox.appendChild(perkLine);
 });
}





