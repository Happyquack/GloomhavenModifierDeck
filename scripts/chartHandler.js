
import './chartLibrary/dist/chart.js';
var EFFECT_CATEGORIES = ["none","air","bless","cold","curse","disarm","fire","heal","immobilize","invisible","muddle","night","pierce","plant","poison","push", "pull","shield","strengthen","stun","sun","target","wound"];
var EFFECT_CATEGORY_LABELS = ["No effect", "Air", "Bless", "Cold", "Curse", "Disarm", "Fire", "Heal", "Immobilize", "Invisible", "Muddle", "Night", "Pierce", "Plant", "Poison", "Push", "Pull", "Shield", "Strengthen", "Stun", "Sun", "Target", "Wound"];
var CHART_IDs = ["generalStatsNormalChart","generalStatsAdvChart","generalStatsDisChart","currentStatsNormalChart","currentStatsAdvChart","currentStatsDisChart"];
var COLOR_ARRAY = [
    'rgb(60, 60, 60)', //none
    'rgb(155, 177, 183)', //air
    'rgb(201, 164, 57)', //bless
    'rgb(20, 195, 237)', //cold
    'rgb(115, 88, 161)', //curse
    'rgb(110, 120, 125)', //disarm
    'rgb(225, 82, 36)', //fire
    'rgb(60, 60, 60)', //heal
    'rgb(134, 55, 51)', //immobilize
    'rgb(26, 26, 26)', //invisible
    'rgb(106, 89, 70)', //muddle
    'rgb(30, 44, 52)', //night
    'rgb(187, 140, 83)', //pierce
    'rgb(139, 165, 60)', //plant
    'rgb(124, 127, 105)', //poison
    'rgb(60, 60, 60)', //push
    'rgb(60, 60, 60)', //pull
    'rgb(60, 60, 60)', //shield
    'rgb(103, 150, 207)', //strengthen
    'rgb(57, 71, 103)', //stun
    'rgb(239, 173, 30)', //sun
    'rgb(146, 36, 39)', //target
    'rgb(202, 98, 45)' //wound
]; //UNFINISHED
var COLOR_MAP = {
    none: 'rgb(60, 60, 60)', //TODO
    air: 'rgb(155, 177, 183)',
    bless: 'rgb(201, 164, 57)',
    cold: 'rgb(20, 195, 237)',
    curse: 'rgb(115, 88, 161)',
    disarm: 'rgb(110, 120, 125)',
    fire: 'rgb(225, 82, 36)',
    heal: 'rgb(60, 60, 60)', //TODO
    immobilize: 'rgb(134, 55, 51)',
    invisible: 'rgb(26, 26, 26)',
    muddle: 'rgb(106, 89, 70)',
    night: 'rgb(30, 44, 52)',
    pierce: 'rgb(187, 140, 83)',
    plant: 'rgb(139, 165, 60)',
    poison: 'rgb(124, 127, 105)',
    push: 'rgb(60, 60, 60)', //TODO
    pull: 'rgb(60, 60, 60)', //TODO
    shield: 'rgb(60, 60, 60)', //TODO
    strengthen: 'rgb(103, 150, 207)',
    stun: 'rgb(57, 71, 103)',
    sun: 'rgb(239, 173, 30)',
    target: 'rgb(146, 36, 39)',
    wound: 'rgb(202, 98, 45)'
}; //UNFINISHED
var INTIALIZE_CONFIG = {
    type: 'bar',
    data: {
        labels: ['Null','-2','-1','+0','+1','+2','x2'],
        datasets: [{
            label: 'No effect',
            data: [0,0,0,0,0,0,0],
            backgroundColor: COLOR_MAP.none,
        }]
    },
    options: {
        responsive: true,
        scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            beginAtZero: true
        }
        }
    }
}

class chartHandler {

    constructor() {
        this.chartList = [];
        CHART_IDs.forEach(canvasID => {
            this.chartList.push(new Chart(document.getElementById(canvasID),INTIALIZE_CONFIG));
        })
    }

    printChart(endCardStats, targetChart) {
        // First I want to sort the stats into the various effects/datasets
        var endCardStatSorter = new Map();
        endCardStats.forEach((probability, label) => {
            var [value, effect] = label.split(":");
            if (endCardStatSorter.has(effect)) {
                endCardStatSorter.get(effect).push([value,probability]);
            } else {
                endCardStatSorter.set(effect, [[value,probability]]);
            }
        });
        //arrange these into the order they'll show up on the chart
        endCardStatSorter = new Map([...endCardStatSorter.entries()].sort());
        //now we need to look at how many different columns we're gonna have
        var columnNames = [];
        [...endCardStatSorter.entries()].forEach((arr, label) => {
            arr[1].forEach(subArr => {
                var modifier = subArr[0];
                if (columnNames.indexOf(modifier) == -1) {
                    columnNames.push(modifier);
                }
            });
        });
        //sort these column names into the order they'll look nice on in the graph
        columnNames = this.sortColumnNames(columnNames);
        //now we actually organize the data together
        var chartDatasets = [];
        endCardStatSorter.forEach((arr, label) => {
            var searchLabel = label;
            if (searchLabel == 0) searchLabel = "none";
            var lastDigit = searchLabel.slice(-1);
            if (lastDigit == parseInt(lastDigit)) {
                searchLabel = searchLabel.slice(0,-1);
            } else {
                lastDigit = "";
            }
            var dataArr = new Array(columnNames.length).fill(0);
            arr.forEach(subArr => {
                dataArr[columnNames.indexOf(subArr[0])] = subArr[1];
            });
            chartDatasets.push({
                label: EFFECT_CATEGORY_LABELS[EFFECT_CATEGORIES.indexOf(searchLabel)] + " " + lastDigit,
                data: dataArr,
                backgroundColor: COLOR_ARRAY[EFFECT_CATEGORIES.indexOf(searchLabel)]
            });
        });
        if (columnNames[0] == "null") columnNames[0] = "Null";
        this.chartList[targetChart].data = {
            labels: columnNames,
            datasets: chartDatasets
        }
        this.chartList[targetChart].update();
    }

    sortColumnNames(labels) {
        var hasNull = this.remove(labels, "null");
        var hasX2 = this.remove(labels, "x2");
        var positives = [];
        var negatives = [];
        labels.forEach(label => {
            if (label.indexOf("-") > -1) {
                negatives.push(label);
            } else {
                positives.push(label);
            }
        });
        positives.sort();
        negatives.sort().reverse();
        var output = [];
        if (hasNull) output.push(hasNull[0]);
        negatives.forEach(el => output.push(el));
        positives.forEach(el => output.push(el));
        if (hasX2) output.push(hasX2[0]);
        return output;
    }

    remove(array, element) {
        var index = array.indexOf(element)
        if (index > -1) return array.splice(index,1);
        return false;
    }
}

export {chartHandler};