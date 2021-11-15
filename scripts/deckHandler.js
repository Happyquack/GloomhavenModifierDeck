import { Deck } from "./deck.js";
import { StatsHandler } from "./stats.js";

// This variable handles how long columns displaying cards can be before they are split up to perserve scaling
const MAX_CARDS_IN_COLUMN = 6;

class DeckHandler {

    constructor() {
        this.deck = new Deck();
        this.statsHandler = new StatsHandler(this);
        this.deckOfCards = this.deck.getPlayerDeck();
        this.deckDisplayBox = document.getElementById('deckDisplayBox');
        this.deckDisplayBox.innerHTML = "";
        this.deckDisplayColumns = [];
        // Creates up to 20 possible columns the deck can be seperated into - this number is completely arbitrary
        for (var i = 0; i < 20; i++) {
            this.deckDisplayColumns.push(document.createElement('div'));
        }
    }

    // This method is called to redisplay the entire player deck, tnen runs stats calculations
    displayDeck() {

        this.deckOfCards = this.deck.getPlayerDeck();
        
        // Clear the previous display
        
        this.deckDisplayColumns.forEach(el => el.innerHTML = "");
        this.deckDisplayBox.innerHTML = "";
        
        // Sort the player deck into their own display columns
        
        var deckSortingColumns = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        for (let card of this.deckOfCards) {
            // Rolling modifiers are displayed off to the side to not interrupt the main distribution
            if (card.isRolling()) {
                if (card.getValue() == 0) {
                    deckSortingColumns[9].push(card);
                } else {
                    deckSortingColumns[8].push(card);
                }
            } else {
                // Organize the cards from least to greatest value
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
        
        // Display each column to the page   
        var numberOfColumns = 0;
        for (let column of deckSortingColumns) {
            if (column.length > 0) {
                // If any columns are too large, then split them into equal parts 
                var numSplit = Math.round(Math.ceil(column.length/MAX_CARDS_IN_COLUMN),2);
                var numPerColumn = Math.round(Math.ceil(column.length/numSplit),2);
                
                // Add each Card's div to the next empty display column, stopping a moving to a new column once the desired length is reached
                for (var i = 0; i < column.length; i++) {
                    this.deckDisplayColumns[numberOfColumns].appendChild(column[i].getImg());
                    // Once the column is filled, display it and move to a new one
                    if ((i+1) % numPerColumn == 0) {
                        this.deckDisplayBox.appendChild(this.deckDisplayColumns[numberOfColumns]);
                        numberOfColumns++;
                    }
                }
                // If there's left over cards, make sure they aren't forgotten if they didn't fill the column
                if (numSplit > 1 && numSplit*numPerColumn != column.length) {
                    this.deckDisplayBox.appendChild(this.deckDisplayColumns[numberOfColumns]);
                    numberOfColumns++;
                }
            }
        }
        
        // Engage each card to be flippable
        Array.from(this.deckDisplayBox.children).forEach(column => {
            Array.from(column.children).forEach(card => {
                if (!card.flippable) {
                    card.addEventListener("click", this.flipCard.bind(this));
                    card.flippable = true;
                }
            } );
        } );
    
        // Update moddling arrow to reflect whether or not there are cards that can be added or subtracted
        this.deck.numMinusOnes < 15 ? document.getElementById("minusOneAddBox").disabled = false : document.getElementById("minusOneAddBox").disabled = true;
        !this.deck.addedMinusOnes.every(el => el.length == 0) ? document.getElementById("minusOneRemoveBox").disabled = false : document.getElementById("minusOneRemoveBox").disabled = true;
        this.deck.numBlesses < 10 ? document.getElementById("blessAddBox").disabled = false : document.getElementById("blessAddBox").disabled = true;
        this.deck.numBlesses > 0 ? document.getElementById("blessRemoveBox").disabled = false : document.getElementById("blessRemoveBox").disabled = true;
        this.deck.numCurses < 10 ? document.getElementById("curseAddBox").disabled = false : document.getElementById("curseAddBox").disabled = true;
        this.deck.numCurses > 0 ? document.getElementById("curseRemoveBox").disabled = false : document.getElementById("curseRemoveBox").disabled = true;

        // Have the stats module recalculate to reflect deck changes
        this.statsHandler.update();
    }

    // When the class is changed, update the deck and then update the display/stats
    updateCharacter(characterName) {
        this.deck.updateCharacter(characterName);
        this.displayDeck();
    }

    // When a card is clicked, flip it over and have the stats update
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