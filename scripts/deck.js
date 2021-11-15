import {Card} from './card.js';

// This is used to determine priority of what type of -1 card to try to add/remove to the deck when prompted
// The fact that the class deck is included in this is not a spoiler - I did that preemptively, in case the event comes up.
// After all, Cragheart can add a -2, so you never know with the unlockable classes
const BASE_DECK = 0;
const CLASS_DECK = 1;
const ADDITIONAL_DECK = 2;

//            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT






// I'd like to warn the viewer that this file includes SPOILERS at the end of the code
// The method names and contents include the names of unlockable classes
// You will have a warning similar to this right before all of the spoiler methods






//            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT            IMPORTANT


class Deck {
  // some recurring variables:
  // this.baseDeck is the array of cards in any standard deck
  // this.characterDeck is the array of cards in the class-specific deck
  // this.playerDeck is the current deck of the player, taking into account perks and whatnot

  // Sets up the deck for character selection
  constructor() {
    this.characterLabel = 0;
    this.character = "";
    this.checkboxesChecked = new Array(15).fill(false);
    this.createDecks();
    this.perkList = [];
    this.deckSaves = new Array(19).fill(0);
    this.characterDecks = new Array(19);
    this.perkLists = new Array(19);
    this.perkInstructionLists = new Array(19);
  }
  
  // Loads up the base decks for modification
  createDecks() {
    this.loadBaseDeck();
    this.loadAdditions();
    this.formDeck();
  }
  
  // This loads the base deck that every character has
  loadBaseDeck() {
    // The list of cards from this collection
    this.baseDeck = [];
    // The directory of the image folder
    var dir = "images/modifierDecks/zBase/";
    // The names of the cards
    var cardDir = dir + "baseCard";
    var backDir = dir + "baseCardBack.png";
    // From baseCard01 to baseCard21, the numerical values of the cards
    var valueList = [0,0,0,0,0,0,1,1,1,1,1,-1,-1,-1,-1,-1,-2,2,"null","x2"];
    // The effects of the cards
    var effectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // Whether or not each card is rolling
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // Retrieves the card images and instantiates each Card element
    this.loadDeck(this.baseDeck, cardDir, backDir, valueList, effectList, rollingList);
  }

  // This loads the possible cards that can be added to the deck - -1's, blesses, and curses
  loadAdditions() {
    this.additionDeck = [];
    var dir = "images/modifierDecks/zGeneralAdditions/";
    var cardDir = dir + "addCard";
    var backDir = dir + "addCardBack.png";
    var valueList = ["null","null","null","null","null","null","null","null","null","null","x2","x2","x2","x2","x2","x2","x2","x2","x2","x2",-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    var effectList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.additionDeck, cardDir, backDir, valueList, effectList, rollingList);
  }

  // Given a target array, image directories, and lists of card values, effects, and if they are rolling,
  // Retrieve all of the images, make each card into a Card instance, and store the cards in order in the target array
  loadDeck(targetDeck, cardDir, backDir, valueList, effectList, rollingList) {
    var cardNum = 0;
    valueList.forEach( foo => {
      var cardStr = cardNum+1;
      if (cardNum < 9) cardStr = "0" + cardStr;
      targetDeck.push(new Card(valueList[cardNum], effectList[cardNum], rollingList[cardNum], cardDir + cardStr + ".png", backDir));
      cardNum++;
    });
  }
  
  // Resets the actual player deck, filling it with all of the base cards
  formDeck() {
    this.checkboxesChecked.fill(false);
    this.playerDeck = [];
    for (let baseCard of this.baseDeck) {
      this.playerDeck.push(baseCard);
    }

    // The number of -1's, blesses, and curses in the deck are always kept track of
    // These variables reflect the number of cards that have been manually added
    // I'm not sure these are actually used though
    this.numMinusOnes = 0;
    this.numBlesses = 0;
    this.numCurses = 0;
    // Array of -1's not in the player deck, sorted by deck of origin
    this.removedMinusOnes = [[], [], []];
    // Array of -1's currently in the player deck, sorted by deck of origin
    this.addedMinusOnes = [[], [], []];
    // Arrays of blesses and curses in the player deck, sorted by whether they aren't added or if they are
    this.blesses = [[],[]];
    this.curses = [[],[]];

    // The -1's in the base deck need to be accounted for
    this.playerDeck.forEach(card => {
      if (card.getValue() == -1) {
        this.addedMinusOnes[BASE_DECK].push(card);
      }
    });
    // The cards in the auxillary deck are now sorted into these arrays
    this.additionDeck.forEach(card => {
      if (card.getValue() == -1) {
        this.removedMinusOnes[ADDITIONAL_DECK].push(card);
      } else if (card.getValue() == "x2") {
        this.blesses[0].push(card);
      } else {
        this.curses[0].push(card);
      }
    });
  }

  // When we update characters, save the current settings so we can get back to it
  saveDeck() {
    // list of things to save:
    // this.playerDeck
    var savedPlayerDeck = this.playerDeck.slice();
    // flip status of every card
    var playerDeckIsFlipped = savedPlayerDeck.map(card => {return card.isFlipped()});
    // perks checked
    var savedCheckboxesChecked = this.checkboxesChecked.slice();
    // this.numMinusOnes
    var savedNumMinusOnes = this.numMinusOnes;
    // this.numBlesses
    var savedNumBlesses = this.numBlesses;
    // this.numCurses
    var savedNumCurses = this.numCurses;
    // this.removedMinusOnes
    var savedRemovedMinusOnes = [this.removedMinusOnes[0].slice(),this.removedMinusOnes[1].slice(),this.removedMinusOnes[2].slice()];
    // this.addedMinusOnes
    var savedAddedMinusOnes = [this.addedMinusOnes[0].slice(),this.addedMinusOnes[1].slice(),this.addedMinusOnes[2].slice()];
    // this.blesses
    var savedBlesses = [this.blesses[0].slice(), this.blesses[1].slice()];
    // this.curses
    var savedCurses = [this.curses[0].slice(), this.curses[1].slice()];
    // finally save it all to a master array
    this.deckSaves[this.characterLabel] = [savedPlayerDeck, playerDeckIsFlipped, savedCheckboxesChecked, savedNumMinusOnes, savedNumBlesses, savedNumCurses, savedRemovedMinusOnes, savedAddedMinusOnes, savedBlesses, savedCurses];
  }

  // When we load a character we've already put settings for, load those specific settings
  loadSavedCharacter() {
    var oldData = this.deckSaves[this.characterLabel];
    // list of things we saved:
    // this.playerDeck
    this.playerDeck = oldData[0];
    // flip status of every card
    this.playerDeck.forEach((card, key) => {
      if (card.isFlipped() != oldData[1][key]) card.flip();
    });
    // perks checked
    this.checkboxesChecked = oldData[2];
    // this.numMinusOnes
    this.numMinusOnes = oldData[3];
    // this.numBlesses
    this.numBlesses = oldData[4];
    // this.numCurses
    this.numCurses = oldData[5];
    // this.removedMinusOnes
    this.removedMinusOnes = oldData[6];
    // this.addedMinusOnes
    this.addedMinusOnes = oldData[7];
    // this.blesses
    this.blesses = oldData[8];
    // this.curses
    this.curses =oldData[9];

    // Finally, we need to retrieve the pre-loaded deck information
    this.characterDeck = this.characterDecks[this.characterLabel];
    this.perkList = this.perkLists[this.characterLabel];
    this.perkInstructions = this.perkInstructionLists[this.characterLabel];
  }
  
  // This function is triggered whenever a new class is selected, and loads the new character deck
  // Label is the number of the class, starting from 1
  updateCharacter(label) {
    // Save the previous deck
    this.saveDeck();
    // Begin switching to a new character
    this.characterLabel = label;
    // Check to see if this character already has saved settings - if not, reset the deck
    if (!this.deckSaves[label]) { // Character has no saved data
      this.formDeck();
      // Based on which class number is selected, load the respective deck
      // THE CODE OF THIS FUNCTION HAS SPOILERS, DON'T GO LOOKING FOR IT IF YOU DON'T WANT CHARACTER NAME SPOILED
      this.loadCharacterDeck(label);
      // Keep track of any -1s in the class-specific cards
      this.characterDeck.forEach(card => {
        if (card.getValue() == -1) {
          this.addedMinusOnes[CLASS_DECK].push(card);
        }
      });
    } else {
      this.loadSavedCharacter();
    }
  }

  // Getter method so the perkhandler knows what checkboxes to start checked when switching characters
  getCheckboxList() {
    return this.checkboxesChecked;
  }

  // The next 6 methods each load one of the 6 starting classes
  // I will only comment loadBruteDeck() as doing any more would be overly redundant
  // This is very similar to loadBaseDeck() so comments on old stuff will be brief
  loadBruteDeck() {
    // Clear the previous class info
    this.characterDeck = [];
    // Directories for finding card images
    var dir = "images/modifierDecks/01/";
    var cardDir = dir + "brCard";
    var backDir = dir + "brCardBack.png";
    // Value, effect, and rolling card information
    var valueList = [1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
    var effectList = [0,0,0,0,0,0,0,"push1","push1","push1","push1","push1","push1","pierce3","pierce3","stun","stun","disarm","muddle","target1","target1","shieldSelf1"];
    var rollingList = [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    // Fill this.characterDeck with the class deck
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    // Perks will be displayed on screen in the form of checkboxes - this.perkList is an array of instructions in order of the checkboxes
    // Meaning, if you check off perk box number 1 (which is remove two -1 cards), it will execute the first entry in perkList (index 0)
    // The syntax is this: 
    //    card modifications are separated by "-", so "x13-+0" is two modifications: "x13" and "+0"
    //    Within each modification, if it is of the form "x#", then it removes the Card at index # of this.baseDeck from this.playerDeck
    //        "x13" removes the Card object at index 13 of this.baseDeck (which is a -1) from this.playerDeck
    //    If the modification is of the form "+#", then it adds the Card at index # of this.characterDeck to this.playerDeck
    //        "+0" adds the Card object at index 0 of this.characterDeck (which is a +1) to this.playerDeck
    //    Alternatively, "oooo" is the instruction to remove 4 +0's from this.playerDeck. This shorthand was included because this perk is extremely common
    this.perkList = ["x11-x12","x13-+0","+1-+2","+3-+4","+6","+7-+8-+9","+10-+11-+12","+13-+14","+15","+16","+17-+18","+19","+20","+21","+5"];
    // This array pertains to what is actually displayed on the perk sheet, each string being a seperate type of perk
    // The syntax is this:
    //    The first digit of each string is the number of checkboxes in front of the text. This is done in order to reflect the order of this.perkList
    //    The rest of the string is divided into sections separated by "="
    //        If an effect is between the "=", then the program will know to display that effect in a special way
    //        If a number is between the "=", then the program will know to display that with seperate style settings
    //        Otherwise, the text is displayed as normal
    this.perkInstructions = ["1Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+3= card","2Add three =rolling=push=1 cards","1Add two =rolling=pierce=3 cards","2Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card","2Add one =rolling=target= card","1Add one =+1=shield=1, Self card","1Ignore negative item effects and add one =+1= card"];
  }
  
  loadTinkererDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/02/";
    var cardDir = dir + "tiCard";
    var backDir = dir + "tiCardBack.png";
    var valueList = [0,1,1,3,0,0,0,0,0,1,1,1,1,1,1,0];
    var effectList = [0,0,0,0,"fire","fire","muddle","muddle","muddle","wound","wound","immobilize","immobilize","healSelf2","healSelf2","target1"];
    var rollingList = [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","x16-+0","+1-+2","+3","+4-+5","+6-+7-+8","+9","+10","+11","+12","+13","+14","+15"];
    this.perkInstructions = ["2Remove two =-1= cards","1Replace one =-2= card with one =+0= card","1Add two =+1= cards","1Add one =+3= card","1Add two =rolling=fire= cards","1Add three =rolling=muddle= cards","2Add one =+1=wound= card","2Add one =+1=immobilize= card","2Add one =+1=heal=2 card","1Add one =+0=target= card"];
  }
  
  loadSpellweaverDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/03/";
    var cardDir = dir + "spCard";
    var backDir = dir + "spCardBack.png";
    var valueList = [1,1,1,1,1,1,0,1,1,1,2,2,2,2,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"stun","wound","immobilize","curse","fire","fire","cold","cold","earth","air","sun","night"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["oooo","x11-+0","x12-+1","+2-+3","+4-+5","+6","+7","+8","+9","+10","+11","+12","+13","+14-+15","+16-+17"];
    this.perkInstructions = ["1Remove four =+0= cards","2Replace one =-1= card with one =+1= card","2Add two =+1= cards","1Add one =+0=stun= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+1=curse= card","2Add one =+2=fire= card","2Add one =+2=cold= card","1Add one =rolling=earth= and one =rolling=air= card","1Add one =rolling=sun= and one =rolling=night= card"];
  }
  
  loadScoundrelDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/04/";
    var cardDir = dir + "scCard";
    var backDir = dir + "scCardBack.png";
    var valueList = [0,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,"pierce3","pierce3","poison","poison","poison","poison","muddle","muddle","invisible"];
    var rollingList = [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x16-+0","x15-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8-+9","+10-+11","+12-+13","+14-+15","+16"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card", "1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","1Add two =rolling=pierce=3 cards","2Add two =rolling=poison= cards","1Add two =rolling=muddle= cards","1Add one =rolling=invisible= card"];
  }
  
  loadCragheartDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/05/";
    var cardDir = dir + "crCard";
    var backDir = dir + "crCardBack.png";
    var valueList = [1,1,1,-2,2,2,1,1,2,2,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,"immobilize","immobilize","muddle","muddle","push2","push2","earth","earth","earth","earth","air","air"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["oooo","x11-+0","x12-+1","x13-+2","+3-+4-+5","+6","+7","+8","+9","+10-+11","+12-+13","+14-+15","+16-+17"];
    this.perkInstructions = ["1Remove four =+0= cards","3Replace one =-1= card with one =+1= card","1Add one =-2= card and two =+2= cards","2Add one =+1=immobilize= card","2Add one =+2=muddle= card","1Add two =rolling=push=2 cards","2Add two =rolling=earth= cards","1Add two =rolling=air= cards"];
  }
  
  loadMindthiefDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/06/";
    var cardDir = dir + "miCard";
    var backDir = dir + "miCardBack.png";
    var valueList = [2,2,0,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,"cold","cold", 0,0,0,0,"pull1","pull1","pull1","muddle","muddle","muddle","muddle","immobilize","immobilize","stun","disarm"];
    var rollingList = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x6-x7-+0-+1","x16-+2","+3","+4","+5-+6","+7-+8","+9-+10-+11","+12-+13-+14","+16-+17","+18","+19-+15"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace two =+1= cards with two =+2= cards","1Replace one =-2= card with one =+0= card","2Add one =+2=cold= card","2Add two =rolling=+1= cards","1Add three =rolling=pull=1 cards","1Add three =rolling=muddle= cards","1Add two =rolling=immobilize= cards","1Add one =rolling=stun= card","1Add one =rolling=disarm= and one =rolling=muddle= card"];
  }
  
  // This function is triggered when a checkbox is interacted with
  // The parameters are which checkbox is interacted with, and whether or not the box is being turned on or turned off
  modPerk(checkmarkNum, turnPerkOn) {
    // First we determine which instruction this pertains to
    var checkmarkIndex = checkmarkNum - 1;
    this.checkboxesChecked[checkmarkIndex] = !this.checkboxesChecked[checkmarkIndex];
    var instructions = this.perkList[checkmarkIndex].slice();
    // Now we have to parse the instructions and perform the deck changes
    var steps = instructions.slice().split("-");
    steps.forEach(task => {
      if (task[0] == "x") {
        if (turnPerkOn) {
          this.removeCard(this.baseDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.addCard(this.baseDeck[parseInt(task.substring(1,task.length))]);
        }
      } else if (task[0] == "+") {
        if (turnPerkOn) {
          this.addCard(this.characterDeck[parseInt(task.substring(1,task.length))]);
        } else {
          this.removeCard(this.characterDeck[parseInt(task.substring(1,task.length))]);
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
    this.deckSort();
  }
  
  // Utility method to remove a certain card from the player deck, if possible
  removeCard(card) {
    // Note that special care is taken with -1's
    if (card.getValue() == -1) {
      this.removeMinusOne(false);
    } else {
      if (this.playerDeck.indexOf(card) !== -1) {
        if(card.isFlipped()) card.flip();
        this.playerDeck.splice(this.playerDeck.indexOf(card), 1);
      }
    }
  }
  // Utility method to add a certain card to the player deck, if possible
  addCard(card) {
    // Note that special care is taken with -1's
    if (card.getValue() == -1) {
      this.addMinusOne(false);
    } else {
      if (this.playerDeck.indexOf(card) == -1) {
        if(card.isFlipped()) card.flip();
        this.playerDeck.push(card);
      }
    }
  }
  // Utility method to remove 4 +0's from the player deck - note that these are specific cards
  removeFourZeroes() {
    this.removeCard(this.baseDeck[0]); this.removeCard(this.baseDeck[1]); this.removeCard(this.baseDeck[2]); this.removeCard(this.baseDeck[3]);
  }
  // Utility method to add 4 +0's from the player deck - note that these are specific cards
  addFourZeroes() {
    this.addCard(this.baseDeck[0]); this.addCard(this.baseDeck[1]); this.addCard(this.baseDeck[2]); this.addCard(this.baseDeck[3]);
  }

  // Cleans up the order of the cards in the array for display purposes
  // This sorts the deck in order of value and then by deck origin
  //    Extra additions > class deck > base deck
  deckSort() {
    for (var card in this.playerDeck) {
      for (var i = 0; i < this.playerDeck - 1; i++) {
        if (this.deckCompare(this.playerDeck[i], this.playerDeck[i+1])) {
          var temp = this.playerDeck[i];
          this.playerDeck[i] = this.playerDeck[i+1];
          this.playerDeck[i+1] = this.playerDeck[i];
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
      if (cardTwoTieBreaker.includes("zBase")) { cardOneTieBreaker = 0; }
      if (cardTwoTieBreaker.includes("zGeneralAdditions")) { cardOneTieBreaker = 2; }
      if (cardOneTieBreaker == 1 && cardTwoTieBreaker == 1) {
        return(cardTwo.getEffect() < cardOne.getEffect());
      }
      return (cardTwoTieBreaker >= cardOneTieBreaker);
    } else {
      return true;
    }
  }

  // Special method to handle -1 card addition
  // This is because the act of manually adding -1 cards could confuse the program whilist keeping track of all of the cards added or taken away
  //    The perk system is designed around the adding and removing of specific cards, and minus ones circumvent this if there aren't enough to take away or add
  // Parameter manual is whether or not this card is manually being added to the deck ex) from a scenario effect or item
  addMinusOne(manual) {
    // If adding a card through perks, we use this order of card origins to try adding the card
    var tryOrder = [BASE_DECK, CLASS_DECK, ADDITIONAL_DECK];
    // If adding a card manually, we use this order instead. This is to reflect the fact that you're adding extra cards, not class cards
    if (manual) tryOrder = [BASE_DECK, ADDITIONAL_DECK, CLASS_DECK];
    var cardAdded = false;
    // Keep trying each source of minus ones until one can be added
    tryOrder.forEach ( el => {
      if (!cardAdded && this.removedMinusOnes[el].length > 0) {
        var minusOneBeingAdded = this.removedMinusOnes[el].pop();
        this.playerDeck.indexOf(minusOneBeingAdded) == -1 && this.playerDeck.push(minusOneBeingAdded);
        this.addedMinusOnes[el].push(minusOneBeingAdded);
        cardAdded = true;
        if (manual) this.numMinusOnes++;
      }
    });
    if (!cardAdded) console.log("Uh oh, tried to add a card but none were available to add.");
  }
  // Special method to handle -1 card removal
  removeMinusOne(manual) {
    // If removing a card, we use this order of card origins, the thought process being "extra" -1's should be disposed of first
    var tryOrder = [ADDITIONAL_DECK, CLASS_DECK, BASE_DECK];
    var cardAdded = false;
    // Keep trying each source of minus ones until one can be removed
    tryOrder.forEach ( el => {
      if (!cardAdded && this.addedMinusOnes[el].length > 0) {
        var minusOneBeingRemoved = this.addedMinusOnes[el].pop();
        this.playerDeck.indexOf(minusOneBeingRemoved) !== -1 && this.playerDeck.splice(this.playerDeck.indexOf(minusOneBeingRemoved), 1);
        this.removedMinusOnes[el].push(minusOneBeingRemoved);
        cardAdded = true;
        if (manual) this.numMinusOnes--;
      }
    });
    if (!cardAdded) console.log("Uh oh, tried to remove a card but none were available to remove.");
  }

  // So a quick note on the word "moddle"
  // I chose "moddle" because "modify" and "toggle" both don't work but I 
  // couldn't think of a term that encompassed both "adding" and "removing"
  // Anyways this function handles moddling blesses in the player deck
  moddleBlesses(isAdding){
    if (isAdding) {
      if (this.blesses[0].length > 0) {
        var addedCard = this.blesses[0].pop();
        this.blesses[1].push(addedCard);
        this.addCard(addedCard);
        this.numBlesses++;
      }
    } else {
      if (this.blesses[1].length > 0) {
        var removedCard = this.blesses[1].pop();
        this.blesses[0].push(removedCard);
        this.removeCard(removedCard);
        this.numBlesses--;
      }
    }
  }
  // And this function handles moddling curses in the player deck
  moddleCurses(isAdding){
    if (isAdding) {
      if (this.curses[0].length > 0) {
        var addedCard = this.curses[0].pop();
        this.curses[1].push(addedCard);
        this.addCard(addedCard);
        this.numCurses++;
      }
    } else {
      if (this.curses[1].length > 0) {
        var removedCard = this.curses[1].pop();
        this.curses[0].push(removedCard);
        this.removeCard(removedCard);
        this.numCurses--;
      }
    }
  }
  
  // Just your everyday getter method
  getPlayerDeck() {
    return this.playerDeck;
  }
  
  // Export perk instructions so they can be displayed
  getPerkInstructions() {
    return this.perkInstructions;
  }

  //    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING








  //                        SPOILERS AHEAD                                               SPOILERS AHEAD








  //    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING    WARNING


  // Massive switch statement taking in a class name and loading its respective class deck
  loadCharacterDeck(label) {
    // This converts a numerical class value to the actual name of the class
    // Simply for convenience of looking at code and knowing what class it refers to
    var characters = ["","brute","tinkerer","spellweaver","scoundrel","cragheart","mindthief","sunkeeper", "", "", "", "plagueherald", "berserker", "", "doomstalker", "sawbones", "elementalist", "beasttyrant"];
    this.character = characters[parseInt(label)];
    switch (this.character) {
      case "beasttyrant":
        this.loadBeastTyrantDeck();
        break;
      case "berserker": 
        this.loadBerserkerDeck(); 
        break;
      case "brute": 
        this.loadBruteDeck(); 
        break;
      case "cragheart": 
        this.loadCragheartDeck(); 
        break;
      case "doomstalker":
        this.loadDoomstalkerDeck();
        break;
      case "elementalist": 
        this.loadElementalistDeck(); 
        break;
      case "mindthief": 
        this.loadMindthiefDeck(); 
        break;
      case "plagueherald":
        this.loadPlagueHeraldDeck();
        break;
      case "sawbones":
        this.loadSawbonesDeck();
        break;
      case "scoundrel": 
        this.loadScoundrelDeck(); 
        break;
      case "spellweaver": 
        this.loadSpellweaverDeck(); 
        break;
      case "sunkeeper": 
        this.loadSunkeeperDeck(); 
        break;
      case "tinkerer": 
        this.loadTinkererDeck(); 
        break;
      default: break;
    }
    this.characterDecks[this.characterLabel] = this.characterDeck;
    this.perkLists[this.characterLabel] = this.perkList;
    this.perkInstructionLists[this.characterLabel] = this.perkInstructions;
  }

  // Same as all of the basic class loading methods from above, except these have spoilers
  loadSunkeeperDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/07/";
    var cardDir = dir + "suCard";
    var backDir = dir + "suCardBack.png";
    var valueList = [0,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1];
    var effectList = [0,0,0,0,0,0,"healSelf1","healSelf1","healSelf1","healSelf1","stun","sun","sun","sun","sun","shieldSelf1","shieldSelf1",0,0];
    var rollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x16-+0","x0-+1","+2-+3","+4-+5","+6-+7","+8-+9","+10","+11-+12","+13-+14","+15-+16","+17-+18"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","1Replace one =-2= card with one =+0= card","1Replace one =+0= card with one =+2= card","2Add two =rolling=+1= cards","2Add two =rolling=heal=1 cards","1Add one =rolling=stun= card","2Add two =rolling=sun= cards","1Add two =rolling=shield=1, Self cards","1Ignore negative item effects and add two =+1= cards"];
  }
  
  loadPlagueHeraldDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/11/";
    var cardDir = dir + "phCard";
    var backDir = dir + "phCardBack.png";
    var valueList = [0,1,1,1,1,1,2,2,1,1,1,0,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,"air","air","air","poison","poison","poison","curse","curse","immobilize","immobilize","stun","stun"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x16-+0","x11-+1","x12-+2","x0-+6","x1-+7","+3-+4","+8","+9","+10","+11-+12-+13","+14-+15","+16-+17","+18","+19","+5"];
    this.perkInstructions = ["1Replace one =-2= card with one =+0= card","2Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add two =+1= cards","3Add one =+1=air= card","1Add three =rolling=poison= cards","1Add two =rolling=curse= cards","1Add two =rolling=immobilize= cards","2Add one =rolling=stun= card","1Ignore negative scenario effects and add one =+1= card"];
  }
  
  loadBerserkerDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/12/";
    var cardDir = dir + "beCard";
    var backDir = dir + "beCardBack.png";
    var valueList = [1,1,2,2,0,0,0,0,0,0,1,0,0,2,2];
    var effectList = [0,0,0,0,"wound","wound","wound","wound","stun","stun","disarm","healSelf1","healSelf1","fire","fire"];
    var rollingList = [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","oooo","x13-+0","x14-+1","x4-+2","x5-+3","+4-+5","+6-+7","+8","+9","+10","+11-+12","+13","+14"];
    this.perkInstructions = ["1Remove two =-1= cards","1Remove four =+0= cards","2Replace one =-1= card with one =+1= card", "2Replace one =+0= card with one =rolling=+2= card","2Add two =rolling=wound= cards","2Add one =rolling=stun= card","1Add one =rolling=+1=disarm=card","1Add two =rolling=heal=1 cards","2Add one =+2=fire= card"];
  }

  loadDoomstalkerDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/14/";
    var cardDir = dir + "dsCard";
    var backDir = dir + "dsCardBack.png";
    var valueList = [1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,0,0];
    var effectList = [0,0,0,0,0,0,0,0,0,0,"muddle","poison","wound","immobilize","stun","target1","target1"];
    var rollingList = [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","x0-x1-+0-+1","x2-x3-+2-+3","x4-x5-+4-+5","+6-+7","+8-+9","+10","+11","+12","+13","+14","+15","+16"];
    this.perkInstructions = ["2Remove two =-1= cards","3Replace two =+0= cards with two =+1= cards","2Add two =rolling=+1= cards","1Add one =+2=muddle= card","1Add one =+1=poison= card","1Add one =+1=wound= card","1Add one =+1=immobilize= card","1Add one =+0=stun= card","2Add one =rolling=target= card"];
  }

  loadSawbonesDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/15/";
    var cardDir = dir + "sbCard";
    var backDir = dir + "sbCardBack.png";
    var valueList = [2,2,2,2,1,1,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,"immobilize","immobilize","wound","wound","wound","wound","stun","healSelf3","healSelf3","itemRefresh"];
    var rollingList = [0,0,1,1,0,0,1,1,1,1,1,1,1,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","oooo","x4-+0","x5-+1","+2","+3","+4","+5","+6-+7","+8-+9","+10","+11","+12","+13"];
    this.perkInstructions = ["2Remove two =-1= cards","1Remove four =+0= cards","2Replace one =+0= card with one =+2= card","2Add one =rolling=+2= cards","2Add one =+1=immobilize= card","2Add two =rolling=wound= cards","1Add one =rolling=stun= card","2Add one =rolling=heal=3 cards","1Add one =+0= Refresh an item card"];
  }
  
  loadElementalistDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/16/";
    var cardDir = dir + "elCard";
    var backDir = dir + "elCardBack.png";
    var valueList = [1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0];
    var effectList = [0,0,0,"fire","fire","fire","fire","cold","cold","cold","cold","air","air","air","air","earth","earth","earth","earth","push1","push1","wound","stun","target1"];
    var rollingList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-x14","x15-+0","x0-+1","x1-+2","+3-+4-+5","+7-+8-+9","+11-+12-+13","+15-+16-+17","x2-x3-+6-+18","x4-x5-+10-+14","+19-+20","+21","+22","+23"];
    this.perkInstructions = ["2Remove two =-1= cards","1Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card","1Add three =+0=fire= cards","1Add three =+0=cold= cards","1Add three =+0=air= cards","1Add three =+0=earth= cards","1Replace two =+0= cards with one =+0=fire= and one =+0=earth= card","1Replace two =+0= cards with one =+0=cold= and one =+0=air= card","1Add two =+1=push=1 cards","1Add one =+1=wound= card","1Add one =+0=stun= card","1Add one =+0=target= card"];
  }

  loadBeastTyrantDeck() {
    this.characterDeck = [];
    var dir = "images/modifierDecks/17/";
    var cardDir = dir + "btCard";
    var backDir = dir + "btCardBack.png";
    var valueList = [1,1,1,2,2,1,1,1,1,0,0,0,0,0,0,0,0];
    var effectList = [0,0,0,0,0,"wound","wound","immobilize","immobilize","healSelf1","healSelf1","healSelf1","healSelf1","healSelf1","healSelf1","earth","earth"];
    var rollingList = [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
    this.loadDeck(this.characterDeck, cardDir, backDir, valueList, effectList, rollingList);
    this.perkList = ["x11-x12","x13-+0","x14+1","x15-+2","x0-+3","x1-+4","+5","+6","+7","+8","+9-+10","+11-+12","+13-+14","+15-+16"];
    this.perkInstructions = ["1Remove two =-1= cards","3Replace one =-1= card with one =+1= card","2Replace one =+0= card with one =+2= card", "2Add one =+1=wound= card","2Add one =+1=immobilize= card","3Add two =rolling=heal=1 cards","1Add two =rolling=earth= cards"];
  }
}


export {Deck};