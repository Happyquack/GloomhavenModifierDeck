

class PerkHandler {

    constructor(deckHandler) {
        this.checkboxes = [];
        for (var i = 15; i > 0; i--) {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "checkbox" + i;
            checkbox.addEventListener("click", this.checkboxTriggered.bind(this));
            this.checkboxes.push(checkbox);
        }
        this.deckHandler = deckHandler;
        this.perkBox = document.getElementById("perkBox");
    }

    checkboxTriggered(event) {
        var checkbox = event.target;
        var checkboxNum = parseInt(checkbox.id.substring(8,checkbox.id.length));
        this.deckHandler.deck.modPerk(checkboxNum, checkbox.checked);
        this.deckHandler.displayDeck();
    }

    updatePerks() {
        this.checkboxes.forEach(el => el.checked = false);
        this.perkBox.innerHTML = "";
        var perkInstructions = this.deckHandler.deck.getPerkInstructions();
        var checkboxQueue = this.checkboxes.slice();
        perkInstructions.forEach(el => {
         var instruction = el.slice()
         var perkLine = document.createElement("div");
         var numOfCheckboxes = instruction[0];
         instruction = instruction.slice(1,instruction.length);
         for (var i = 0; i < numOfCheckboxes; i++) {
          perkLine.appendChild(checkboxQueue.pop());
          var spacer = document.createElement("span");
          spacer.innerHTML = " ";
          perkLine.appendChild(spacer);
         }
         instruction = instruction.split("=");
         var commandWords = ["air","bless","cold","curse","disarm","fire","heal","immobilize","invisible","muddle","night","pierce","plant","poison","push", "pull","rolling","shield","strengthen","stun","sun","target","wound"];
         instruction.forEach(el => {
          if (commandWords.includes(el)) {
           var newImage = document.createElement("img");
           newImage.src = "images/statusIcons/" + el + ".png";
           var fontSize = parseInt(window.getComputedStyle(this.perkBox,null).getPropertyValue('font-size'));
           newImage.width = 1.5*fontSize;
           newImage.height = 1.5*fontSize;
           if (!["air","cold","fire","night","plant","rolling","sun"].includes(el)) {
            var textToAdd = document.createElement("span");
            switch (el) {
             case "heal":
              textToAdd.innerHTML = "Heal"; break;
             case "shield":
              textToAdd.innerHTML = "Shield"; break;
             case "target":
              textToAdd.innerHTML = "ADD TARGET"; break;
             default:
              textToAdd.innerHTML = el.toUpperCase(); break;
            }
            perkLine.appendChild(textToAdd);
           }
           perkLine.appendChild(newImage);
          } else {
           var textToAdd = document.createElement("span");
           textToAdd.innerHTML = el;
           if (el.charAt(0) == "+" || el.charAt(0) == "-") {
             textToAdd.appendChild(document.createTextNode(" "));
             textToAdd.classList.add("numberModifier");
            }
           perkLine.appendChild(textToAdd);
          }
         });
         perkBox.appendChild(perkLine);
        });
    }

}

export {PerkHandler};