import { Deck } from "./deck.js";
import { StatsHandler } from "./stats.js";

var MAX_CARDS_IN_COLUMN = 6;

class DeckHandler {

    constructor() {
        this.deck = new Deck();
        this.statsHandler = new StatsHandler(this);
        this.deckOfCards = this.deck.getPlayerDeck();
        this.deckDisplayBox = document.getElementById('deckDisplayBox');
        this.deckDisplayBox.innerHTML = "";
        this.deckDisplayColumns = [];
        for (var i = 0; i < 20; i++) {
            this.deckDisplayColumns.push(document.createElement('div'));
        }
    }

    displayDeck() {

        this.deckOfCards = this.deck.getPlayerDeck();
        
        // empty previous contents
        
        this.deckDisplayColumns.forEach(el => el.innerHTML = "");
        this.deckDisplayBox.innerHTML = "";
        
        // modify new contents
        
        var deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        for (let card of this.deckOfCards) {
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
                    this.deckDisplayColumns[numberOfColumns].appendChild(column[i].getImg());
                    if ((i+1) % numPerColumn == 0) {
                        this.deckDisplayBox.appendChild(this.deckDisplayColumns[numberOfColumns]);
                        numberOfColumns++;
                    }
                }
                if (numSplit > 1 && numSplit*numPerColumn != column.length) {
                    this.deckDisplayBox.appendChild(this.deckDisplayColumns[numberOfColumns]);
                    numberOfColumns++;
                }
            }
        }
        
        // format and display columns
    
        Array.from(this.deckDisplayBox.children).forEach(column => {
            Array.from(column.children).forEach(card => {
                if (!card.flippable) {
                    card.addEventListener("click", this.flipCard.bind(this));
                    card.flippable = true;
                }
            } );
        } );
    
        // update moddling arrows
        this.deck.numMinusOnes < 15 ? document.getElementById("minusOneAddBox").disabled = false : document.getElementById("minusOneAddBox").disabled = true;
        !this.deck.addedMinusOnes.every(el => el.length == 0) ? document.getElementById("minusOneRemoveBox").disabled = false : document.getElementById("minusOneRemoveBox").disabled = true;
        this.deck.numBlesses < 10 ? document.getElementById("blessAddBox").disabled = false : document.getElementById("blessAddBox").disabled = true;
        this.deck.numBlesses > 0 ? document.getElementById("blessRemoveBox").disabled = false : document.getElementById("blessRemoveBox").disabled = true;
        this.deck.numCurses < 10 ? document.getElementById("curseAddBox").disabled = false : document.getElementById("curseAddBox").disabled = true;
        this.deck.numCurses > 0 ? document.getElementById("curseRemoveBox").disabled = false : document.getElementById("curseRemoveBox").disabled = true;

        this.statsHandler.update();
    }

    updateCharacter(characterName) {
        this.deck.updateCharacter(characterName);
        this.displayDeck();
    }

    flipCard(event) { 
        console.log("Flipping card...");
        this.deckOfCards.forEach(el => {
            if (el.getImg() == event.target) el.flip();
        });
        this.statsHandler.update();
        console.log("Card flipped!");
    }
}

export {DeckHandler};