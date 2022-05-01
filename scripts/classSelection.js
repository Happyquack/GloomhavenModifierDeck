

// These are the classes that the author's party have unlocked - the classes left are 08, 09, 10, and 13.
const WHITELISTED_CLASSES = ["01","02","03","04","05","06","07","11","12","13","14","15","16","17"];

class ClassSelectionUI {

    constructor (deckHandler, perkHandler) {
        this.classSelectionBox = document.getElementById('classSelectionBoxId');
        this.classSelectionBox.innerHTML = "";
        this.classIconImgs = [];
        this.fillIconImgs();
        this.deckHandler = deckHandler;
        this.perkHandler = perkHandler;
        this.currentID = "01";
        this.proposedID = "00";
        this.buttonList = [];
        this.makeSpoilerButtons();
        this.loadFirstCharacter();
    }

    // This retrieves all of the class icons and configures their HTML elements
    fillIconImgs() {
        for (var i = 0; i < 18; i++) {

            // Retrieve the icon image
            var num = i + 1 + "";
            if (num < 10) {num = "0" + num;}
            var image = document.createElement('img');
            image.src = "images/classIcons/" + num + "icon.png";
            image.classList.add("classSelectionIcon");
            
            // I can't remember why this had to be wrapped twice but it did
            var wrapper = document.createElement('div');
            wrapper.classList.add("classSelectionIconWrapper");
            
            var secondWrapper = document.createElement('div');
            secondWrapper.classList.add("classSelectionIconWrapperWrapper");
            secondWrapper.id = num;
            
            // This handles whether or not the class has been unlocked by the author's party
            if (WHITELISTED_CLASSES.includes(num)) {
             secondWrapper.addEventListener("click", this.classSelectorClicked.bind(this));
             secondWrapper.classList.add("classSelectionLegal");
             if (num > 6 && num != 18) secondWrapper.classList.add("classSelectionLocked");
            } else {
             secondWrapper.classList.add("classSelectionIllegal");
            }
            
            // Glue everything together
            wrapper.appendChild(image);
            secondWrapper.appendChild(wrapper);
            this.classIconImgs.push(secondWrapper);
            this.classSelectionBox.appendChild(secondWrapper);
        }
    }

    makeSpoilerButtons() {
        var buttonData = [["confirmUnlockClass","Yes, I would like to unlock this class",true],["denyUnlockClass","No, take me back to the previous class"]];
        buttonData.forEach(arr => {
            var button = document.createElement("button");
            button.type = "button";
            button.id = arr[0];
            button.innerHTML = arr[1];
            button.onclick = this.completeSpoilerCheck.bind(this,arr[2]);
            this.buttonList.push(button);
        });
    }

    // This function handles what happenes when a class icon is selected
    classSelectorClicked(event) {
        // Clear previous color scheme
        if (this.proposedID != "00") document.getElementById(this.proposedID).classList.remove("classSelectionProposed");
        this.proposedID = event.target.src.slice().split("/").pop().substring(0,2);
        this.deckHandler.updateCharacter(this.proposedID);
        // do the spoiler check
        if (this.deckHandler.doSpoilerCheck()) {
            document.getElementById(this.proposedID).classList.add("classSelectionProposed");
            this.showClassSpoilerWarning();
        } else {
            if (this.currentID != "00") document.getElementById(this.currentID).classList.remove("classSelectionSelected");
            this.currentID = this.proposedID;
            this.proposedID = "00";
            document.getElementById(this.currentID).classList.add("classSelectionSelected");
            this.perkHandler.updatePerks();
        }
    }

    showClassSpoilerWarning() {
        var perkBox = document.getElementById("perkBox");
        perkBox.innerHTML = "";
        var warning = document.createElement("span");
        warning.innerHTML = "WARNING: You are about to view a class that is sealed content. Are you sure that you want to view potential spoilers?";
        perkBox.classList.add("perkBoxSpoilerWarning");
        perkBox.appendChild(warning);
        perkBox.appendChild(this.buttonList[0]);
        perkBox.appendChild(this.buttonList[1]);
    }

    completeSpoilerCheck(unlockClass) {
        if (unlockClass) {
            if (this.currentID != "00") document.getElementById(this.currentID).classList.remove("classSelectionSelected");
            document.getElementById(this.proposedID).classList.remove("classSelectionProposed");
            this.currentID = this.proposedID;
            this.proposedID = "00";
            document.getElementById(this.currentID).classList.add("classSelectionSelected");
            document.getElementById(this.currentID).classList.remove("classSelectionLocked");
            this.perkHandler.updatePerks();
            this.deckHandler.getDeck().logSpoilerAccepted();
        } else {
            document.getElementById(this.proposedID).classList.remove("classSelectionProposed");
            this.proposedID = "00";
            this.deckHandler.updateCharacter(this.currentID);
            this.perkHandler.updatePerks();
        }
    }

    loadFirstCharacter() {
        document.getElementById(this.currentID).classList.add("classSelectionSelected");
        this.deckHandler.updateCharacter(this.currentID);
        this.perkHandler.updatePerks();
    }

}

export {ClassSelectionUI};