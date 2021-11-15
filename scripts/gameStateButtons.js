
// This exists specifically to display a controller to manually change the amount of -1's, blesses, and curses in the deck
class GameStateButtons {

    constructor(statsHandler) {
        this.statsHandler = statsHandler;
        this.createAttackValueConfig();
    }

    //                                                                                                                      COMMENT
    createAttackValueConfig() {
        var self = this;
        var attackValueBox = document.getElementById("attackValueBox");
        this.decreaseBox = document.createElement("button");
        this.decreaseBox.type = "button";
        this.decreaseBox.innerHTML = "-";
        this.decreaseBox.onclick = function() {self.decreaseAttack(self.statsHandler)};
        this.decreaseBox.id = "DecreaseBox"
        this.increaseBox = document.createElement("button");
        this.increaseBox.type = "button";
        this.increaseBox.innerHTML = "+";
        this.increaseBox.onclick = function() {self.increaseAttack(self.statsHandler)};
        this.increaseBox.id = "IncreaseBox";
        attackValueBox.appendChild(this.decreaseBox);
        this.attackValueSpan = document.createElement("span");
        this.attackValueSpan.id = "AttackValueSpan";
        this.attackValueSpan.textContent = "  Attack value:  " + this.statsHandler.shiftAttackValue(0) + "  ";
        attackValueBox.appendChild(this.attackValueSpan);
        attackValueBox.appendChild(this.increaseBox);
    }

    decreaseAttack(statsHandler) {
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + statsHandler.shiftAttackValue(-1) + "  ";
        if (statsHandler.shiftAttackValue(0) == 0) document.getElementById("DecreaseBox").disabled = true;
        statsHandler.update();
    }

    increaseAttack(statsHandler) {
        document.getElementById("DecreaseBox").disabled = false;
        document.getElementById("AttackValueSpan").textContent = "  Attack value:  " + statsHandler.shiftAttackValue(1) + "  ";
        statsHandler.update();
    }
}

export {GameStateButtons};