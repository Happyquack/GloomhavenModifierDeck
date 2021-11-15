
// Some additional buttons used for viewing expected damage
class GameStateButtons {

    constructor(statsHandler) {
        this.statsHandler = statsHandler;
        this.createReshuffleButton();
        this.createAttackValueConfig();
        this.createChartScopeConfig();
    }

    // This creates the UI for flipping all of the cards face-up
    createReshuffleButton() {
        var self = this;
        var reshuffleBox = document.getElementById("reshuffleButtonBox");
        var reshuffleButton = document.createElement("button");
        reshuffleButton.type = "button";
        reshuffleButton.innerHTML = "Flip all cards face-up"
        reshuffleButton.onclick = function() {self.statsHandler.reshuffleDeck()};
        reshuffleButton.id = "reshuffleButton";
        reshuffleBox.appendChild(reshuffleButton);
    }

    // This creates the UI for seeing and changing the base attack value
    createAttackValueConfig() {
        var self = this;
        var attackValueBox = document.getElementById("attackValueBox");
        var decreaseBox = document.createElement("button");
        decreaseBox.type = "button";
        decreaseBox.innerHTML = "-";
        decreaseBox.onclick = function() {self.decreaseAttack(self.statsHandler)};
        decreaseBox.id = "DecreaseBox"
        var increaseBox = document.createElement("button");
        increaseBox.type = "button";
        increaseBox.innerHTML = "+";
        increaseBox.onclick = function() {self.increaseAttack(self.statsHandler)};
        increaseBox.id = "IncreaseBox";
        attackValueBox.appendChild(decreaseBox);
        var attackValueSpan = document.createElement("span");
        attackValueSpan.id = "AttackValueSpan";
        attackValueSpan.textContent = "  Attack value:  " + this.statsHandler.shiftAttackValue(0) + "  ";
        attackValueBox.appendChild(attackValueSpan);
        attackValueBox.appendChild(increaseBox);
    }

    // Function triggers when decrease attack button selected
    decreaseAttack(statsHandler) {
        // Decrease attack value and update display
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + statsHandler.shiftAttackValue(-1) + "  ";
        if (statsHandler.shiftAttackValue(0) == 0) document.getElementById("DecreaseBox").disabled = true; // Prevent negative attack values
        statsHandler.update(false);
    }

    // Function triggers when decrease attack button selected
    increaseAttack(statsHandler) {
        // Increase attack value and update display
        document.getElementById("DecreaseBox").disabled = false;
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + statsHandler.shiftAttackValue(1) + "  ";
        statsHandler.update();
    }

    // This creates the UI for switching between stats of overall and current deck
    createChartScopeConfig() {
        var self = this;
        var chartConfigBox = document.getElementById("chartScopeToggleBox");
        var overallButton = document.createElement("button");
        overallButton.type = "button";
        overallButton.innerHTML = "(Showing overall deck stats)"
        overallButton.onclick = function() {self.statsHandler.switchChartScope(false)};
        overallButton.disabled = true;
        overallButton.id = "showOverallButton"
        chartConfigBox.appendChild(overallButton);
        var currentButton = document.createElement("button");
        currentButton.type = "button";
        currentButton.innerHTML = "Show current deck stats"
        currentButton.onclick = function() {self.statsHandler.switchChartScope(true)};
        currentButton.disabled = false;
        currentButton.id = "showCurrentButton"
        chartConfigBox.appendChild(currentButton);
    }
}

export {GameStateButtons};