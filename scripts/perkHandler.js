class PerkHandler {

    // Creates the up to 15 checkboxes with numbered ids used in the perk display
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

    // When a checkbox is interacted with, alert the deck with which checkbox was clicked (from its id) so the appropiate perk can be applied
    checkboxTriggered(event) {
        var checkbox = event.target;
        var checkboxNum = parseInt(checkbox.id.substring(8,checkbox.id.length));
        if (!this.deckHandler.getDeck().modPerk(checkboxNum, checkbox.checked)) {
            checkbox.checked = !checkbox.checked;
        }
        this.deckHandler.displayDeck();
    }

    // Function triggers when the class is changed
    // Retrieves the perk instructions from the deck and displays text similar to the in-game perk sheet
    updatePerks() {
        // Reset display
        var checkedCheckboxes = this.deckHandler.getDeck().getCheckboxList().slice();
        this.checkboxes.forEach(el => el.checked = false);
        this.perkBox.innerHTML = "";
        this.perkBox.classList.remove("perkBoxSpoilerWarning");
        // Get new instructions
        var perkInstructions = this.deckHandler.getDeck().getPerkInstructions();
        // The checkboxes are listed in a specfic order, "queued" up for display
        var checkboxQueue = this.checkboxes.slice();
        // Loop through each instruction, or line, on the sheet
        // Parses the instructions then displays it
        perkInstructions.forEach(el => {
         var instruction = el.slice()
         // perkLine is the list of HTML elements to be displayed on each line of the perk sheet
         var perkLine = document.createElement("div");

         // Perk syntax:
         //    The first digit of each string is the number of checkboxes in front of the text. This is done in order to reflect the order of this.perkList
         //    The rest of the string is divided into sections separated by "="
         //        If an effect is between the "=", then the program will know to display that effect in a special way
         //        If a number is between the "=", then the program will know to display that with seperate style settings
         //        Otherwise, the text is displayed as normal

         // Display the appropriate number of checkboxes
         var numOfCheckboxes = instruction[0];
         instruction = instruction.slice(1,instruction.length);
         for (var i = 0; i < numOfCheckboxes; i++) {
            var checkboxToAdd = checkboxQueue.pop();
            checkboxToAdd.checked = checkedCheckboxes.shift();
            perkLine.appendChild(checkboxToAdd);
            var spacer = document.createElement("span");
            spacer.innerHTML = " ";
            perkLine.appendChild(spacer);
         }
         // Parse the instructions
         instruction = instruction.split("=");
         var commandWords = ["air","bless","cold","curse","disarm","earth","fire","heal","immobilize","invisible","muddle","night","pierce","poison","push", "pull","rolling","shield","strengthen","stun","sun","target","wound"];
         instruction.forEach(el => {
            // If a command word is found, display the effect icon
            if (commandWords.includes(el)) {
                var newImage = document.createElement("img");
                newImage.src = "images/statusIcons/" + el + ".png";
                var fontSize = parseInt(window.getComputedStyle(this.perkBox,null).getPropertyValue('font-size'));
                newImage.width = 1.5*fontSize;
                newImage.height = 1.5*fontSize;
                // Some command words have the effect name before its respective symbol
                if (!["air","cold","earth","fire","night","rolling","sun"].includes(el)) {
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
                // Otherwise, just display the text as normal
                var textToAdd = document.createElement("span");
                textToAdd.innerHTML = el;
                // If it's a modifier (+x or -x) then give it a special font (I don't think this actually works)
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