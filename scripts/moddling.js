
class ModdlingBox {

    constructor(deckHandler) {
        this.deckHandler = deckHandler;
        var self = this;
        this.drawBoxes("minusOne", function() {self.manualAddMinusOne(self.deckHandler)}, function(){self.manualRemoveMinusOne(self.deckHandler)});
        this.drawBoxes("bless", function() {self.manualAddBless(self.deckHandler)}, function(){self.manualRemoveBless(self.deckHandler)});
        this.drawBoxes("curse", function() {self.manualAddCurse(self.deckHandler)}, function(){self.manualRemoveCurse(self.deckHandler)});
    }

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

    manualAddMinusOne(deckHandler) {
        deckHandler.deck.addMinusOne(true);
        deckHandler.displayDeck();
    }
      
    manualRemoveMinusOne(deckHandler) {
        deckHandler.deck.removeMinusOne(true);
        deckHandler.displayDeck();
    }

    manualAddBless(deckHandler) {
        deckHandler.deck.moddleBlesses(true);
        deckHandler.displayDeck();
    }
      
    manualRemoveBless(deckHandler) {
        deckHandler.deck.moddleBlesses(false);
        deckHandler.displayDeck();
    }

    manualAddCurse(deckHandler) {
        if (deckHandler.deck.numCurses < 10) {
            deckHandler.deck.moddleCurses(true);
            deckHandler.displayDeck();
        }
    }
      
    manualRemoveCurse(deckHandler) {
        if (deckHandler.deck.numCurses > 0) {
            deckHandler.deck.moddleCurses(false);
            deckHandler.displayDeck();
        }
    }

}

export {ModdlingBox};