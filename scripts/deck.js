import {Card} from './card.js';

class Deck {

    // charModDirectory is the string "images/modifierDecks/CLASSNUM/CLASSCODECard" and then we will slap "##.png" or "back.png" on
    // charModInfo is [deckValues, deckEffects, deckRollings]
    // perkInfo is [characterPerkCodes, characterPerkText]
    // globalDecks is [[baseDeckOne, baseDeckTwo, baseDeckThree, baseDeckFour], curses, blesses, [minusOnesOne, minusOnesTwo, minusOnesThree, minusOnesFour]]
    constructor(charModDirectory, charModInfo, perkInfo, globalDecks) {
        this.charModDirectory = charModDirectory;
        this.charModInfo = charModInfo;
        this.perkEncoding = perkInfo[0];
        this.perkText = perkInfo[1];

        this.baseDeck = globalDecks[0]; // [baseDeckOne, baseDeckTwo, baseDeckThree, baseDeckFour]
        this.baseDeckNum = 0; // baseDeckOne is default
        this.blesses = globalDecks[1];
        this.curses = globalDecks[2];
        this.minusOnes = globalDecks[3]; // [minusOnesOne, minusOnesTwo, minusOnesThree, minusOnesFour] - includes base deck minus ones
        this.hellFrozeOver = false; // this turns true when a character perk deck adds a flat -1 card

        this.numBlesses = 0; // Base decks do not start with bless cards
        this.numCurses = 0;  // Base decks do not start with curse cards
        this.numMinusOnes = 5; // Base decks start with 5 minus one cards

        this.perkboxesChecked = new Array(15).fill(false);
        this.playerDeck = this.getBaseDeck().slice();
        this.cardsFlipped = new Array(this.playerDeck.length).fill(false);
        this.chararcterModifiers = [];
        this.loadCharacterModifiers();
    }

    getBaseDeckNum() {
        return this.baseDeckNum;
    }

    getBaseDeck() {
        return this.baseDeck[this.baseDeckNum];
    }

    getPlayerDeck() {
        return this.playerDeck;
    }

    getCharacterModifiers() {
        return this.chararcterModifiers;
    }

    getCheckboxList() {
        return this.perkboxesChecked;
    }

    // perkInfo is [characterPerkCodes, characterPerkText]
    getPerkInstructions() {
        return this.perkText;
    }

    // surely there is a better way of doing this
    loadCharacterModifiers() {
        // charModDirectory is the string "images/modifierDecks/CLASSNUM/CLASSCODECard" and then we will slap "##.png" or "back.png" on
        // charModInfo is [deckValues, deckRollings, deckEffects]
        var cardNum = 0;
        this.charModInfo[0].forEach( foo => {
          var cardStr = cardNum+1;
          if (cardNum < 9) cardStr = "0" + cardStr;
          this.chararcterModifiers.push(new Card(this.charModInfo[0][cardNum], this.charModInfo[1][cardNum], this.charModInfo[2][cardNum], this.charModDirectory + cardStr + ".png", this.charModDirectory + "Back.png"));
          if (this.chararcterModifiers[cardNum].getCardSummary() === "-1:0") console.log(this.hellFrozeOver = true);
          cardNum++;
        });
    }

    saveGameState() {
        this.cardsFlipped = this.getPlayerDeck().map(card => card.isFlipped());
    }

    loadGameState() {
        this.cardsFlipped.forEach((flip, index) => flip != this.getPlayerDeck()[index].isFlipped() ? this.getPlayerDeck()[index].flip() : {});
    }

    changeBaseDeck(newBaseDeck) {
        if (this.BaseDeckNum == newBaseDeck) {
            console.log("Tried to change to Base Deck " + newBaseDeck + ", but we were already there.");
        } else {
            for (var i = 0; i < this.playerDeck.length; i++) {
                if (this.playerDeck[i] in this.getBaseDeck()) {
                    var flipQuestionMark = this.playerDeck[i].isFlipped();
                    this.playerDeck[i] = this.baseDeck[newBaseDeck][this.getBaseDeck().indexOf(this.playerDeck[i])]
                    if (flipQuestionMark) this.playerDeck[i].flip();
                }
            }
            this.baseDeckNum = newBaseDeck;
        }
    }

    // This function is triggered when a checkbox is interacted with
    // The parameters are which checkbox is interacted with, and whether or not the box is being turned on or turned off
    modPerk(checkmarkNum, turnPerkOn) {
        // First we determine which instruction this pertains to
        var checkmarkIndex = checkmarkNum - 1;
        this.perkboxesChecked[checkmarkIndex] = !this.perkboxesChecked[checkmarkIndex];
        var instructions = this.perkEncoding[checkmarkIndex].slice();
        // Now we have to parse the instructions and perform the deck changes
        var steps = instructions.slice().split("-");
        steps.forEach(task => {
            if (task[0] == "x") {
                if (turnPerkOn) {
                    this.removeCard(this.getBaseDeck()[parseInt(task.substring(1,task.length))]);
                } else {
                    this.addCard(this.getBaseDeck()[parseInt(task.substring(1,task.length))]);
                }
            } else if (task[0] == "+") {
                if (turnPerkOn) {
                    this.addCard(this.chararcterModifiers[parseInt(task.substring(1,task.length))]);
                } else {
                    this.removeCard(this.chararcterModifiers[parseInt(task.substring(1,task.length))]);
                }
            } else {
                if (turnPerkOn) {
                    this.removeFourZeroes();
                } else {
                    this.addFourZeroes();
                }
            }
        });
        // Resort the order of cards in the array for aesthetic purposes
        // this.deckSort(); (METHOD WIP)
    }
  
    // Utility method to remove a certain card from the player deck, if possible
    removeCard(card) {
    // Note that special care is taken with -1's
        if (card.getCardSummary() === "-1:0") card = this.minusOnes[this.getBaseDeckNum()][--this.numMinusOnes];
        if (this.playerDeck.indexOf(card) !== -1) {
            if(card.isFlipped()) card.flip();
            this.playerDeck.splice(this.playerDeck.indexOf(card), 1);
        }
    }
    // Utility method to add a certain card to the player deck, if possible
    addCard(card) {
        // Note that special care is taken with -1's
        if (card.getCardSummary() === "-1:0") card = this.minusOnes[this.getBaseDeckNum()][this.numMinusOnes++];
        if (this.playerDeck.indexOf(card) == -1) {
            if(card.isFlipped()) card.flip();
            this.playerDeck.push(card);
        }
    }
    // Utility method to remove 4 +0's from the player deck - note that these are specific cards
    removeFourZeroes() {
        this.removeCard(this.getBaseDeck()[0]); this.removeCard(this.getBaseDeck()[1]); this.removeCard(this.getBaseDeck()[2]); this.removeCard(this.getBaseDeck()[3]);
    }
    // Utility method to add 4 +0's from the player deck - note that these are specific cards
    addFourZeroes() {
        this.addCard(this.getBaseDeck()[0]); this.addCard(this.getBaseDeck()[1]); this.addCard(this.getBaseDeck()[2]); this.addCard(this.getBaseDeck()[3]);
    }

    // So a quick note on the word "moddle"
    // I chose "moddle" because "modify" and "toggle" both don't work but I 
    // couldn't think of a term that encompassed both "adding" and "removing"
    // Anyways this function handles moddling blesses in the player deck
    moddleBlesses(isAdding){
        if (isAdding) {
            this.addCard(this.blesses[this.numBlesses++])
        } else {
            this.removeCard(this.blesses[--this.numBlesses]);
        }
    }
    // And this function handles moddling curses in the player deck
    moddleCurses(isAdding){
        if (isAdding) {
            this.addCard(this.curses[this.numCurses++])
        } else {
            this.removeCard(this.curses[--this.numCurses]);
        }
    }

    moddleMinusOnes(isAdding){
        if (isAdding) {
            this.addCard(this.minusOnes[this.getBaseDeckNum()][0])
        } else {
            this.removeCard(this.minusOnes[this.getBaseDeckNum()][0]);
        }
    }

    // The below doesn't seem to work - I can't tell why it runs when it does and why the results seem to be minimal
    // Investigation is required

    /*

    // Cleans up the order of the cards in the array for display purposes
    // This sorts the deck in order of value and then by deck origin
    //    Extra additions > class deck > base deck
    deckSort() {
        for (var foo = 0; foo < this.playerDeck.length - 1; foo++) {
            for (var i = 0; i < this.playerDeck.length - 1; i++) {
              if (this.deckCompare(this.playerDeck[i], this.playerDeck[i+1])) {
                var temp = this.playerDeck[i];
                this.playerDeck[i] = this.playerDeck[i+1];
                this.playerDeck[i+1] = temp;
              }
            }
          }
    }
  
    // Comparison method in this.deckSort() to prioritize higher values and then a heirarchy of card origin
    //    Extra additions > class deck > base deck
    deckCompare(cardOne, cardTwo) {
        var cardOneValue = cardOne.getValue();
        var cardTwoValue = cardTwo.getValue();
        if (cardOneValue < cardTwoValue) {
            return false;
        } else if (cardOneValue == cardTwoValue) {
            var cardOnePath = cardTwo.backPath.slice().split("/");
            var cardTwoPath = cardOne.backPath.slice().split("/");
            var cardOneTieBreaker = 1;
            if (cardOnePath.includes("zBase")) { cardOneTieBreaker = 0;}
            if (cardOnePath.includes("zGeneralAdditions")) { cardOneTieBreaker = 2; }
            var cardTwoTieBreaker = 1;
            if (cardTwoPath.includes("zBase")) { cardTwoTieBreaker = 0; }
            if (cardTwoPath.includes("zGeneralAdditions")) { cardTwoTieBreaker = 2; }
            if (cardOneTieBreaker == 1 && cardTwoTieBreaker == 1) {
                return(cardTwo.getEffect() < cardOne.getEffect());
            }
            return (cardTwoTieBreaker >= cardOneTieBreaker);
        } else {
            return true;
        }
    }

    */
}

export {Deck};