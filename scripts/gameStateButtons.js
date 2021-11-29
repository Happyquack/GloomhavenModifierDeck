
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
        var reshuffleBox = document.getElementById("reshuffleButtonBox");
        var reshuffleButton = document.createElement("button");
        reshuffleButton.type = "button";
        reshuffleButton.innerHTML = "Flip all cards face-up"
        reshuffleButton.onclick = this.statsHandler.reshuffleDeck.bind(this.statsHandler);
        reshuffleButton.id = "reshuffleButton";
        reshuffleBox.appendChild(reshuffleButton);
    }

    // This creates the UI for seeing and changing the base attack value
    createAttackValueConfig() {
        var attackValueBox = document.getElementById("attackValueBox");
        var decreaseBox = document.createElement("button");
        decreaseBox.type = "button";
        decreaseBox.innerHTML = "-";
        decreaseBox.onclick = this.decreaseAttack.bind(this);
        decreaseBox.id = "DecreaseBox"
        var increaseBox = document.createElement("button");
        increaseBox.type = "button";
        increaseBox.innerHTML = "+";
        increaseBox.onclick = this.increaseAttack.bind(this);
        increaseBox.id = "IncreaseBox";
        attackValueBox.appendChild(decreaseBox);
        var attackValueSpan = document.createElement("span");
        attackValueSpan.id = "AttackValueSpan";
        attackValueSpan.textContent = "  Attack value:  " + this.statsHandler.shiftAttackValue(0) + "  ";
        attackValueBox.appendChild(attackValueSpan);
        attackValueBox.appendChild(increaseBox);
    }

    // Function triggers when decrease attack button selected
    decreaseAttack() {
        // Decrease attack value and update display
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + this.statsHandler.shiftAttackValue(-1) + "  ";
        if (this.statsHandler.shiftAttackValue(0) == 0) document.getElementById("DecreaseBox").disabled = true; // Prevent negative attack values
        this.statsHandler.update(false);
    }

    // Function triggers when decrease attack button selected
    increaseAttack() {
        // Increase attack value and update display
        document.getElementById("DecreaseBox").disabled = false;
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + this.statsHandler.shiftAttackValue(1) + "  ";
        this.statsHandler.update();
    }

    // This creates the UI for switching between stats of overall and current deck
    createChartScopeConfig() {
        var chartConfigBox = document.getElementById("chartScopeToggleBox");
        var overallButton = document.createElement("button");
        overallButton.type = "button";
        overallButton.innerHTML = "(Showing overall deck stats)";
        overallButton.onclick = this.statsHandler.switchChartScope.bind(this.statsHandler,false);
        overallButton.disabled = true;
        overallButton.id = "showOverallButton"
        chartConfigBox.appendChild(overallButton);
        var currentButton = document.createElement("button");
        currentButton.type = "button";
        currentButton.innerHTML = "Show current deck stats"
        currentButton.onclick = this.statsHandler.switchChartScope.bind(this.statsHandler, true);
        currentButton.disabled = false;
        currentButton.id = "showCurrentButton"
        chartConfigBox.appendChild(currentButton);
    }
}

export {GameStateButtons};