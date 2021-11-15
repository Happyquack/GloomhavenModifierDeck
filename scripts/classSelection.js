

// These are the classes that the author's party have unlocked - the classes left are 08, 09, 10, and 13.
const WHITELISTED_CLASSES = ["01","02","03","04","05","06","07","11","12","14","15","16","17"];

class ClassSelectionUI {

    constructor (deckHandler, perkHandler) {
        this.classSelectionBox = document.getElementById('classSelectionBoxId');
        this.classSelectionBox.innerHTML = "";
        this.classIconImgs = [];
        this.fillIconImgs();
        this.deckHandler = deckHandler;
        this.perkHandler = perkHandler;
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

    // This function handles what happenes when a class icon is selected
    classSelectorClicked(event) {
        var image = event.target;
        var wrapper = document.getElementById(image.src.slice().split("/").pop().substring(0,2));
        this.classIconImgs.forEach(el => {
         if (WHITELISTED_CLASSES.includes(el.id)) {
          el.classList.remove("classSelectionSelected");
         }
        });
        
        wrapper.classList.add("classSelectionSelected");
        this.deckHandler.updateCharacter(wrapper.id);
        this.perkHandler.updatePerks();
    }

}

export {ClassSelectionUI};