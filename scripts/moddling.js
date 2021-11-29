const MINUS_ONE = 0;
const BLESS = 1;
const CURSE = 2;
// This exists specifically to display a controller to manually change the amount of -1's, blesses, and curses in the deck
class ModdlingBox {

    constructor(deckHandler) {
        this.deckHandler = deckHandler;
        this.drawBoxes("minusOne", this.moddle.bind(this,MINUS_ONE,true), this.moddle.bind(this,MINUS_ONE,false));
        this.drawBoxes("bless", this.moddle.bind(this,BLESS,true), this.moddle.bind(this,BLESS,false));
        this.drawBoxes("curse", this.moddle.bind(this,CURSE,true), this.moddle.bind(this,CURSE,false));
    }

    //For each of the three cards to moddle, create the buttons, tie them to moddling methods, and display them
    drawBoxes(boxType, addFunction, removeFunction) {
        var moddlingBox = document.getElementById(boxType + "ModdlingBox");
        var image = document.createElement("img");
        image.src = "images/statusIcons/" + boxType + ".png";
        moddlingBox.appendChild(image);
        var boxInfo = [["RemoveBox","←",removeFunction],["AddBox","→",addFunction]];
        boxInfo.forEach(arr => {
            var button = document.createElement("button");
            button.type = "button";
            button.id = boxType + arr[0];
            button.innerHTML = arr[1];
            button.onclick = arr[2];
            moddlingBox.appendChild(button);
        });
    }

    // These are all of the moddling functions
    moddle(type,isAdding) {
        switch (type) {
            case MINUS_ONE:
                if (isAdding) {this.deckHandler.getDeck().addMinusOne(true);} else {this.deckHandler.getDeck().removeMinusOne(true);}
                break;
            case BLESS:
                this.deckHandler.getDeck().moddleBlesses(isAdding);
                break;
            case CURSE:
                this.deckHandler.getDeck().moddleCurses(isAdding);
                break;
        }
        this.deckHandler.displayDeck();
    }
}

export {ModdlingBox};