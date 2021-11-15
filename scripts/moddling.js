
// This exists specifically to display a controller to manually change the amount of -1's, blesses, and curses in the deck
class ModdlingBox {

    constructor(deckHandler) {
        this.deckHandler = deckHandler;
        var self = this;
        this.drawBoxes("minusOne", function() {self.manualAddMinusOne(self.deckHandler)}, function(){self.manualRemoveMinusOne(self.deckHandler)});
        this.drawBoxes("bless", function() {self.manualAddBless(self.deckHandler)}, function(){self.manualRemoveBless(self.deckHandler)});
        this.drawBoxes("curse", function() {self.manualAddCurse(self.deckHandler)}, function(){self.manualRemoveCurse(self.deckHandler)});
    }

    //For each of the three cards to moddle, create the buttons, tie them to moddling methods, and display them
    drawBoxes(boxType, addFunction, removeFunction) {
        var moddlingBox = document.getElementById(boxType + "ModdlingBox");
        var image = document.createElement("img");
        image.src = "images/statusIcons/" + boxType + ".png";
        moddlingBox.appendChild(image);
        var removeBox = document.createElement("button");
        removeBox.type = "button";
        removeBox.innerHTML = "←";
        removeBox.onclick = removeFunction;
        removeBox.id = boxType + "RemoveBox";
        var addBox = document.createElement("button");
        addBox.type = "button";
        addBox.innerHTML = "→";
        addBox.onclick = addFunction;
        addBox.id = boxType + "AddBox";
        moddlingBox.appendChild(removeBox);
        moddlingBox.appendChild(addBox);
    }

    // These are all of the moddling functions
    manualAddMinusOne(deckHandler) {
        deckHandler.getDeck().addMinusOne(true);
        deckHandler.displayDeck();
    }
      
    manualRemoveMinusOne(deckHandler) {
        deckHandler.getDeck().removeMinusOne(true);
        deckHandler.displayDeck();
    }

    manualAddBless(deckHandler) {
        deckHandler.getDeck().moddleBlesses(true);
        deckHandler.displayDeck();
    }
      
    manualRemoveBless(deckHandler) {
        deckHandler.getDeck().moddleBlesses(false);
        deckHandler.displayDeck();
    }

    manualAddCurse(deckHandler) {
        if (deckHandler.getDeck().numCurses < 10) {
            deckHandler.getDeck().moddleCurses(true);
            deckHandler.displayDeck();
        }
    }
      
    manualRemoveCurse(deckHandler) {
        if (deckHandler.getDeck().numCurses > 0) {
            deckHandler.getDeck().moddleCurses(false);
            deckHandler.displayDeck();
        }
    }

}

export {ModdlingBox};