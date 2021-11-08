
import './chartLibrary/dist/chart.js';
var EFFECT_CATEGORIES = ["none","air","bless","cold","curse","disarm","earth", "fire","heal","immobilize","invisible","itemRefresh","muddle","night","pierce","poison","push", "pull","shield","strengthen","stun","sun","target","wound"];
var EFFECT_CATEGORY_LABELS = ["No effect", "Air", "Bless", "Cold", "Curse", "Disarm", "Earth", "Fire", "Heal", "Immobilize", "Invisible", "Refresh one item card", "Muddle", "Night", "Pierce", "Poison", "Push", "Pull", "Shield", "Strengthen", "Stun", "Sun", "Target", "Wound"];
var CHART_IDs = ["generalStatsNormalChart","generalStatsAdvChart","generalStatsDisChart","currentStatsNormalChart","currentStatsAdvChart","currentStatsDisChart"];
var COLOR_ARRAY = [
    'rgb(60, 60, 60)', //none
    'rgb(155, 177, 183)', //air
    'rgb(201, 164, 57)', //bless
    'rgb(20, 195, 237)', //cold
    'rgb(115, 88, 161)', //curse
    'rgb(110, 120, 125)', //disarm
    'rgb(139, 165, 60)', //earth
    'rgb(225, 82, 36)', //fire
    'rgb(60, 60, 60)', //heal
    'rgb(134, 55, 51)', //immobilize
    'rgb(26, 26, 26)', //invisible
    'rgb(106, 89, 70)', //muddle
    'rgb(30, 44, 52)', //night
    'rgb(187, 140, 83)', //pierce
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

class chartHandler {

    constructor() {
        this.chartList = [];
        CHART_IDs.forEach(canvasID => {
            this.chartList.push(new Chart(document.getElementById(canvasID),{
                type: 'bar',
                data: {
                    labels: ['Null','-2','-1','+0','+1','+2','x2'],
                    datasets: [{
                        label: 'No effect',
                        data: [0,0,0,0,0,0,0],
                        backgroundColor: COLOR_ARRAY[0],
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
                        },
                    },
                    plugins: {
                        tooltip: {
                            mode: "point"
                        }
                    }
                }
            }));
        })
    }

    printChart(endCardStats, targetChart) {
        console.log("Starting on chart " + targetChart);
        // First I want to sort the stats into the various effects/datasets
        //console.log("Sorting cards into effects");
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
        //console.log("Determining X axis");
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
        //console.log("Compiling datasets");
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
        console.log(this.chartList[targetChart].data);
        //console.log("Updating chart " + targetChart);
        console.log(this.chartList);
        console.log(this.chartList[targetChart].options.plugins);
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