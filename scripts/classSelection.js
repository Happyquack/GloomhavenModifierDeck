
var WHITELISTED_CLASSES = ["01","02","03","04","05","06","07","11","12","14","15","16","17"];

class ClassSelectionUI {

    constructor (deckHandler, perkHandler) {
        this.classSelectionBox = document.getElementById('classSelectionBoxId');
        this.classSelectionBox.innerHTML = "";
        this.classIconImgs = [];
        this.fillIconImgs();
        this.deckHandler = deckHandler;
        this.perkHandler = perkHandler;
    }

    fillIconImgs() {
        for (var i = 0; i < 18; i++) {
            var num = i + 1 + "";
            if (num < 10) {num = "0" + num;}
            var image = document.createElement('img');
            image.src = "images/classIcons/" + num + "icon.png";
            image.classList.add("classSelectionIcon");
            
            var wrapper = document.createElement('div');
            wrapper.classList.add("classSelectionIconWrapper");
            
            var secondWrapper = document.createElement('div');
            secondWrapper.classList.add("classSelectionIconWrapperWrapper");
            secondWrapper.id = num;
            
            if (WHITELISTED_CLASSES.includes(num)) {
             secondWrapper.addEventListener("click", this.classSelectorClicked.bind(this));
             secondWrapper.classList.add("classSelectionLegal");
            } else {
             secondWrapper.classList.add("classSelectionIllegal");
            }
            
            wrapper.appendChild(image);
            secondWrapper.appendChild(wrapper);
            this.classIconImgs.push(secondWrapper);
            this.classSelectionBox.appendChild(secondWrapper);
        }
    }

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