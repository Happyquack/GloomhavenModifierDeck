import { Deck } from "./deck.js";
import { Card } from "./card.js";
import { StatsHandler } from "./statsHandler.js";

// This variable handles how long columns displaying cards can be before they are split up to perserve scaling
const MAX_CARDS_IN_COLUMN = 6;

class DeckHandler {

    constructor() {

        this.classes = new Array(18);
        this.classNumber = 0; // default class is class 0
        this.baseDeck = [...Array(4)].map(e => new Array());
        this.blesses = [];
        this.curses = [];
        this.minusOnes = [...Array(4)].map(e => new Array());
        this.loadGlobalDecks();
        this.globalDecks = [this.baseDeck, this.blesses, this.curses, this.minusOnes];
        this.completeClassInfo = this.getClassInfo();
        this.spoilerCheck = false;
        this.makeBaseDeckSwitchingButtons();

        this.statsHandler = new StatsHandler(this);
        this.deckDisplayBox = document.getElementById('deckDisplayBox');
        this.deckDisplayBox.innerHTML = "";
        this.deckDisplayColumns = [];
        // Creates up to 20 possible columns the deck can be seperated into - this number is completely arbitrary
        for (var i = 0; i < 20; i++) {
            this.deckDisplayColumns.push(document.createElement('div'));
        }
    }

    loadGlobalDecks() {
        // first we load all four base decks
        var baseValueList = [0,0,0,0,0,0,1,1,1,1,1,-1,-1,-1,-1,-1,-2,2,"null","x2"];
        var baseEffectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var baseRollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.loadDeck(this.baseDeck[0], "images/modifierDecks/zBase/gh-am-p1-", baseValueList, baseEffectList, baseRollingList);
        this.loadDeck(this.baseDeck[1], "images/modifierDecks/zBase/gh-am-p2-", baseValueList, baseEffectList, baseRollingList);
        this.loadDeck(this.baseDeck[2], "images/modifierDecks/zBase/gh-am-p3-", baseValueList, baseEffectList, baseRollingList);
        this.loadDeck(this.baseDeck[3], "images/modifierDecks/zBase/gh-am-p4-", baseValueList, baseEffectList, baseRollingList);
        this.minusOnes[0] = this.baseDeck[0].slice(11,16);
        this.minusOnes[1] = this.baseDeck[1].slice(11,16);
        this.minusOnes[2] = this.baseDeck[2].slice(11,16);
        this.minusOnes[3] = this.baseDeck[3].slice(11,16);
        this.additionDeck = [];
        var addValueList = ["null","null","null","null","null","null","null","null","null","null","x2","x2","x2","x2","x2","x2","x2","x2","x2","x2",-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        var addEffectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var addRollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.loadDeck(this.additionDeck, "images/modifierDecks/zGeneralAdditions/addCard", addValueList, addEffectList, addRollingList);
        this.curses = this.additionDeck.slice(0,10);
        this.blesses = this.additionDeck.slice(10,20);
        this.minusOnes[0].push(...this.additionDeck.slice(20));
        this.minusOnes[1].push(...this.additionDeck.slice(20));
        this.minusOnes[2].push(...this.additionDeck.slice(20));
        this.minusOnes[3].push(...this.additionDeck.slice(20));
    }

    // Given a target array, image directory, and lists of card values, effects, and if they are rolling,
    // Retrieve all of the images, make each card into a Card instance, and store the cards in order in the target array
    loadDeck(targetDeck, cardDir, valueList, effectList, rollingList) {
        var cardNum = 0;
        valueList.forEach( foo => {
            var cardStr = cardNum+1;
            if (cardNum < 9) cardStr = "0" + cardStr;
            targetDeck.push(new Card(valueList[cardNum], effectList[cardNum], rollingList[cardNum], cardDir + cardStr + ".png", cardDir + "Back.png"));
            cardNum++;
        });
    }

    createNewClassDeck(newClassNum) {
        var newClassInfo = this.completeClassInfo[newClassNum];
        this.classes[newClassNum] = new Deck(newClassInfo[0], newClassInfo.slice(1,4), newClassInfo.slice(4,6), this.globalDecks);
    }

    updateCharacter(newClassNum) {
        this.classes[this.classNumber] == null ? {} : this.classes[this.classNumber].saveGameState();
        this.classNumber = newClassNum;
        if (this.classes[this.classNumber] == null) {
            if (this.classNumber < 6) {
                this.spoilerCheck = false;
                this.createNewClassDeck(this.classNumber);
                this.classes[this.classNumber].loadGameState();
                this.displayDeck();
            } else {
                this.spoilerCheck = true;
            }
        } else {
            this.classes[this.classNumber].loadGameState();
            this.spoilerCheck = false;
            this.displayDeck();
        }
    }

    needSpoilerCheck() {
        return this.spoilerCheck;
    }

    spoilerAccepted() {
        this.spoilerCheck = false;
        this.createNewClassDeck(this.classNumber);
        this.classes[this.classNumber].loadGameState();
        this.displayDeck();
    }

    // This method is called to redisplay the entire player deck, then runs stats calculations
    displayDeck() {

        this.deckOfCards = this.getDeck().getPlayerDeck();
        
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
        this.getDeck().numMinusOnes < 20 ? document.getElementById("minusOneAddBox").disabled = false : document.getElementById("minusOneAddBox").disabled = true;
        this.getDeck().numMinusOnes > 0 ? document.getElementById("minusOneRemoveBox").disabled = false : document.getElementById("minusOneRemoveBox").disabled = true;
        this.getDeck().numBlesses < 10 ? document.getElementById("blessAddBox").disabled = false : document.getElementById("blessAddBox").disabled = true;
        this.getDeck().numBlesses > 0 ? document.getElementById("blessRemoveBox").disabled = false : document.getElementById("blessRemoveBox").disabled = true;
        this.getDeck().numCurses < 10 ? document.getElementById("curseAddBox").disabled = false : document.getElementById("curseAddBox").disabled = true;
        this.getDeck().numCurses > 0 ? document.getElementById("curseRemoveBox").disabled = false : document.getElementById("curseRemoveBox").disabled = true;

        // Have the stats module recalculate to reflect deck changes
        this.statsHandler.update(false);
    }

    // When a card is clicked, flip it over and have the stats update
    flipCard(event) { 
        this.deckOfCards.forEach(el => {
            if (el.getImg() == event.target) el.flip();
        });
        this.statsHandler.update(true);
    }

    // Getter function for deck
    getDeck() {
        return this.classes[this.classNumber];
    }

    // Goes off when reshuffle button pressed - called by StatsHandler
    reshuffleDeck() {
        this.getDeck().getPlayerDeck().forEach(card => {
            if (card.isFlipped()) card.flip();
        });
    }

    getClassInfo() {
        return [
            ["images/modifierDecks/01/brCard",
            [1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,"push1","push1","push1","push1","push1","push1","pierce3","pierce3","stun","stun","disarm","muddle","target1","target1","shieldSelf1"],
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            ["x11-x12","x13-+0","+1-+2","+3-+4","+6","+7-+8-+9","+10-+11-+12","+13-+14","+15","+16","+17-+18","+19","+20","+21","+5"],
            ["1Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+3= card","2Add three =rolling=push=1 cards","1Add two =rolling=pierce=3 cards","2Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card","2Add one =rolling=target= card","1Add one =+1=shield=1, Self card","1Ignore negative item effects and add one =+1= card"]
        ],
        [
            "images/modifierDecks/02/tiCard",
            [0,1,1,3,0,0,0,0,0,1,1,1,1,1,1,0],
            [0,0,0,0,"fire","fire","muddle","muddle","muddle","wound","wound","immobilize","immobilize","healSelf2","healSelf2","target1"],
            [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
            ["x11-x12","x13-x14","x16-+0","+1-+2","+3","+4-+5","+6-+7-+8","+9","+10","+11","+12","+13","+14","+15"],
            ["2Remove two =-1= cards","1Replace one =-2= card with one =+0= card","1Add two =+1= cards","1Add one =+3= card","1Add two =rolling=fire= cards","1Add three =rolling=muddle= cards","2Add one =+1=wound= card","2Add one =+1=immobilize= card","2Add one =+1=heal=2 card","1Add one =+0=target= card"]
        ],
        [
            "images/modifierDecks/03/spCard",
            [1,1,1,1,1,1,0,1,1,1,2,2,2,2,0,0,0,0],
            [0,0,0,0,0,0,"stun","wound","immobilize","curse","fire","fire","cold","cold","earth","air","sun","night"],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
            ["oooo","x11-+0","x12-+1","+2-+3","+4-+5","+6","+7","+8","+9","+10","+11","+12","+13","+14-+15","+16-+17"],
            ["1Remove four =+0= cards","2Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+0=stun= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+1=curse= card","2Add one =+2=fire= card","2Add one =+2=cold= card","1Add one =rolling=earth= and one =rolling=air= card","1Add one =rolling=sun= and one =rolling=night= card"]
        ],
        [
            "images/modifierDecks/04/scCard",
            [0,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,"pierce3","pierce3","poison","poison","poison","poison","muddle","muddle","invisible"],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ["x11-x12","x13-x14","oooo","x16-+0","x15-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8-+9","+10-+11","+12-+13","+14-+15","+16"],
            ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card", "1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","1Add two =rolling=pierce=3 cards","2Add two =rolling=poison= cards","1Add two =rolling=muddle= cards","1Add one =rolling=invisible= card"]
        ],
        [
            "images/modifierDecks/05/crCard",
            [1,1,1,-2,2,2,1,1,2,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,"immobilize","immobilize","muddle","muddle","push2","push2","earth","earth","earth","earth","air","air"],
            [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            ["oooo","x11-+0","x12-+1","x13-+2","+3-+4-+5","+6","+7","+8","+9","+10-+11","+12-+13","+14-+15","+16-+17"],
            ["1Remove four =+0= cards","3Replace one =-1= card with one =+1= card","1Add one =-2= card and two =+2= cards","2Add one =+1=immobilize= card","2Add one =+2=muddle= card","1Add two =rolling=push=2 cards","2Add two =rolling=earth= cards","1Add two =rolling=air= cards"]
        ],
        [
            "images/modifierDecks/06/miCard",
            [2,2,0,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,"cold","cold", 0,0,0,0,"pull1","pull1","pull1","muddle","muddle","muddle","muddle","immobilize","immobilize","stun","disarm"],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ["x11-x12","x13-x14","oooo","x6-x7-+0-+1","x16-+2","+3","+4","+5-+6","+7-+8","+9-+10-+11","+12-+13-+14","+16-+17","+18","+19-+15"],
            ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace two =+1= cards with two =+2= cards","1Replace one =-2= card with one =+0= card","2Add one =+2=cold= card","2Add two =rolling=+1= cards","1Add three =rolling=pull=1 cards","1Add three =rolling=muddle= cards","1Add two =rolling=immobilize= cards","1Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card"]
        ],
        [
            "images/modifierDecks/07/suCard",
            [0,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [0,0,0,0,0,0,"healSelf1","healSelf1","healSelf1","healSelf1","stun","sun","sun","sun","sun","shieldSelf1","shieldSelf1",0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            ["x11-x12","x13-x14","oooo","x16-+0","x0-+1","+2-+3","+4-+5","+6-+7","+8-+9","+10","+11-+12","+13-+14","+15-+16","+17-+18"],
            ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card","1Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","2Add two =rolling=heal=1 cards","1Add one =rolling=stun= card","2Add two =rolling=sun= cards","1Add two =rolling=shield=1, Self cards","1Ignore negative item effects and add two =+1= cards"]
        ],
        [
        
        ],
        [
        
        ],
        [
        
        ],
        [
            "images/modifierDecks/11/phCard",
            [0,1,1,1,1,1,2,2,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,"air","air","air","poison","poison","poison","curse","curse","immobilize","immobilize","stun","stun"],
            [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
            ["x16-+0","x11-+1","x12-+2","x0-+6","x1-+7","+3-+4","+8","+9","+10","+11-+12-+13","+14-+15","+16-+17","+18","+19","+5"],
            ["1Replace one =-2= card with one =+0= card","2Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add two =+1= cards","3Add one =+1=air= card","1Add three =rolling=poison= cards","1Add two =rolling=curse= cards","1Add two =rolling=immobilize= cards","2Add one =rolling=stun= card","1Ignore negative scenario effects and add one =+1= card"]
        ],
        [
            "images/modifierDecks/12/beCard",
            [1,1,2,2,0,0,0,0,0,0,1,0,0,2,2],
            [0,0,0,0,"wound","wound","wound","wound","stun","stun","disarm","healSelf1","healSelf1","fire","fire"],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
            ["x11-x12","oooo","x13-+0","x14-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8","+9","+10","+11-+12","+13","+14"],
            ["1Remove two =-1= cards","1Remove four =+0= cards","2Replace one =-1= card with one =+1= card", "2Replace one =+0= card with one =rolling=+2= card","2Add two =rolling=wound= cards","2Add one =rolling=stun= card","1Add one =rolling=+1=disarm=card","1Add two =rolling=heal=1 cards","2Add one =+2=fire= card"]
        ],
        [
            "images/modifierDecks/13/ssCard",
            [4,4,1,1,2,2,2,3,0,1,1,1,0,0,0,0],
            [0,0,"immobilize","disarm","wound","poison","curse","muddle","stun",0,0,0,"curse","curse","curse","curse"],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
            ["x11-x12","x13-x14","x16","x6-x7-+0","x8-x9-+1","x0-+2","x1-+3","x2-+4","x3-+5","x4-+6","x5-+7","x14-+8","+9-+10-+11","+12-+13", "+14-+15"],
            ["2Remove two =-1= cards","1Remove one =-2= card", "2Replace two =+1= cards with one =+4= card", "1Replace one =+0= card with one =+1=immobilize= card", "1Replace one =+0= card with one =+1=disarm= card", "1Replace one =+0= card with one =+2=wound= card", "1Replace one =+0= card with one =+2=poison= card", "1Replace one =+0= card with one =+2=curse= card", "1Replace one =+0= card with one =+3=muddle= card", "1Replace one =-1= card with one =+0=stun= card", "1Add three =rolling=+1= cards", "2Add two =rolling=curse= cards"]
        ],
        [
            "images/modifierDecks/14/dsCard",
            [1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,"muddle","poison","wound","immobilize","stun","target1","target1"],
            [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1],
            ["x11-x12","x13-x14","x0-x1-+0-+1","x2-x3-+2-+3","x4-x5-+4-+5","+6-+7","+8-+9","+10","+11","+12","+13","+14","+15","+16"],
            ["2Remove two =-1= cards","3Replace two =+0= cards with two =+1= cards","2Add two =rolling=+1= cards","1Add one =+2=muddle= card","1Add one =+1=poison= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+0=stun= card","2Add one =rolling=target= card"]
        ],
        [
            "images/modifierDecks/15/sbCard",
            [2,2,2,2,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,"immobilize","immobilize","wound","wound","wound","wound","stun","healSelf3","healSelf3","itemRefresh"],
            [0,0,1,1,0,0,1,1,1,1,1,1,1,0],
            ["x11-x12","x13-x14","oooo","x4-+0","x5-+1","+2","+3","+4","+5","+6-+7","+8-+9","+10","+11","+12","+13"],
            ["2Remove two =-1= cards","1Remove four =+0= cards","2Replace one =+0= card with one =+2= card","2Add one =rolling=+2= cards","2Add one =+1=immobilize= card","2Add two =rolling=wound= cards","1Add one =rolling=stun= card","2Add one =rolling=heal=3 cards","1Add one =+0= Refresh an item card"]
        ],
        [
            "images/modifierDecks/16/elCard",
            [1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
            [0,0,0,"fire","fire","fire","fire","cold","cold","cold","cold","air","air","air","air","earth","earth","earth","earth","push1","push1","wound","stun","target1"],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ["x11-x12","x13-x14","x15-+0","x0-+1","x1-+2","+3-+4-+5","+7-+8-+9","+11-+12-+13","+15-+16-+17","x2-x3-+6-+18","x4-x5-+10-+14","+19-+20","+21","+22","+23"],
            ["2Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add three =+0=fire= cards","1Add three =+0=cold= cards","1Add three =+0=air= cards","1Add three =+0=earth= cards","1Replace two =+0= cards with one =+0=fire= and one =+0=earth= card","1Replace two =+0= cards with one =+0=cold= and one =+0=air= card","1Add two =+1=push=1 cards","1Add one =+1=wound= card","1Add one =+0=stun= card","1Add one =+0=target= card"]
        ],
        [
            "images/modifierDecks/17/btCard",
            [1,1,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,"wound","wound","immobilize","immobilize","healSelf1","healSelf1","healSelf1","healSelf1","healSelf1","healSelf1","earth","earth"],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            ["x11-x12","x13-+0","x14+1","x15-+2","x0-+3","x1-+4","+5","+6","+7","+8","+9-+10","+11-+12","+13-+14","+15-+16"],
            ["1Remove two =-1= cards","3Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card", "2Add one =+1=wound= card","2Add one =+1=immobilize= card","3Add two =rolling=heal=1 cards","1Add two =rolling=earth= cards"]
        ]
        ];
    }

    makeBaseDeckSwitchingButtons() {
        var baseDeckSwitcher = document.getElementById("baseDeckSwitcher");
        var boxInfo = [["baseDeck1","Base deck 1 selected",0],["baseDeck2","Switch to base deck 2",1],["baseDeck3","Switch to base deck 3",2],["baseDeck4","Switch to base deck 4",3]];
        boxInfo.forEach(arr => {
            var button = document.createElement("button");
            button.type = "button";
            button.id = arr[0];
            button.innerHTML = arr[1];
            button.onclick = this.changeBaseDeck.bind(this,arr[2]);
            baseDeckSwitcher.appendChild(button);
        });
        document.getElementById("baseDeck1").disabled = true;
    }

    changeBaseDeck(newBaseDeck) {
        this.getDeck().changeBaseDeck(newBaseDeck);
        this.displayDeck();
    }
}

export {DeckHandler};