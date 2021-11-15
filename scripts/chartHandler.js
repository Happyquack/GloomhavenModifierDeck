// This uses the chart.js library
import './chartLibrary/dist/chart.js';

// These two arrays are used to convert card effects to the display label for those effects
const EFFECT_CATEGORIES = ["none","air","bless","cold","curse","disarm","earth", "fire","healSelf","immobilize","invisible","itemRefresh","muddle","night","pierce","poison","push", "pull","shield","strengthen","stun","sun","target","wound"];
const EFFECT_CATEGORY_LABELS = ["No effect", "Air", "Bless", "Cold", "Curse", "Disarm", "Earth", "Fire", "Heal", "Immobilize", "Invisible", "Refresh one item card", "Muddle", "Night", "Pierce", "Poison", "Push", "Pull", "Shield", "Strengthen", "Stun", "Sun", "Target", "Wound"];

// The HTML IDs of the chart divs
const CHART_IDs = ["generalStatsNormalChart","generalStatsAdvChart","generalStatsDisChart","currentStatsNormalChart","currentStatsAdvChart","currentStatsDisChart"];

// Array of the hex colors representing each effect
// Colors I couldn't immediately decide on ended up being RGB 60,60,60
const COLOR_ARRAY = [
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
    'rgb(60, 60, 60)', //itemRefresh
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

class ChartHandler {

    // Instantiates each chart, giving each the default settings
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
                    },
                }
            }));
        });
    }

    // Given a probability distribution map (card_ID, chanceOfDrawing) and the index of the chart, display the probabilities
    printChart(endCardStats, targetChart) {
        // First we're gonna sort all of the results into datasets by effect - this is so we can color-code the effects
        // endCardStatSorter is a map of (effectName, [[cardModifier, chanceOfDrawing]])
        var endCardStatSorter = new Map();
        endCardStats.forEach((probability, label) => {
            var [value, effect] = label.split(":");
            if (endCardStatSorter.has(effect)) {
                endCardStatSorter.get(effect).push([value,probability]);
            } else {
                endCardStatSorter.set(effect, [[value,probability]]);
            }
        });
        // next we're gonna rearrange the order of the map to have no effect show up on the bottom of the stacked bar chart, 
        // and the rest stacked alphabetically
        endCardStatSorter = new Map([...endCardStatSorter.entries()].sort());
        // Now that we've got datasets figured out, we're going to scan through all of them to see how many different columns there will be
        var columnNames = [];
        endCardStatSorter.forEach((arr, label) => {
            // For referernce, arr is [[cardModifier, chanceOfDrawing]]
            // This loops through each possible modifier in each any given effect and logs it if it hasn't been logged yet
            arr.forEach(subArr => {
                var modifier = subArr[0];
                if (columnNames.indexOf(modifier) == -1) {
                    columnNames.push(modifier);
                }
            });
        });
        // Take these modifiers, or column names, and sort them into ascending order
        columnNames = this.sortColumnNames(columnNames);
        // We also keep track of overall probability of each modifier - this will come in handy later
        var probabilitiesByColumns = new Array(columnNames.length).fill(0);

        // Now let's put it all together
        var chartDatasets = []; // This is gonna be an array [{label: effectLabel, data: [[chanceOfModifier]], backgroundColor: effectColor}]
        // We'll loop through each effect to make these entries
        endCardStatSorter.forEach((arr, label) => {
            // label is the name of the effect - so far we've been using shorthand strings but we're gonna have to convert these to display labels
            var searchLabel = label;
            if (searchLabel == 0) searchLabel = "none"; // for no effect, we've been using "0", so now we're changing it for readability
            //  some effects have a number at the end, so let's check for that number and save it for later
            var lastDigit = searchLabel.slice(-1);
            if (lastDigit == parseInt(lastDigit)) {
                searchLabel = searchLabel.slice(0,-1);
            } else {
                lastDigit = "";
            }

            // Next we compile the data itself - dataArr is an array the same length as the x-axis (number of total modifiers)
            // We look though the [[cardModifier, chanceOfDrawing]], finding the index of cardModifier in columnNames
            // and putting the respective probability in that index
            var dataArr = new Array(columnNames.length).fill(0);
            arr.forEach(subArr => {
                dataArr[columnNames.indexOf(subArr[0])] = subArr[1];
                probabilitiesByColumns[columnNames.indexOf(subArr[0])] += subArr[1]; // Sum up the probabilties of each column
            });

            // Now we put it all together, converting shorthand label to display names and adding a complete dataset to the dataset array
            chartDatasets.push({
                label: EFFECT_CATEGORY_LABELS[EFFECT_CATEGORIES.indexOf(searchLabel)] + " " + lastDigit,
                data: dataArr,
                backgroundColor: COLOR_ARRAY[EFFECT_CATEGORIES.indexOf(searchLabel)]
            });
        });
        
        // Now we doctor up the column names - null should be capitalized, and we also put overall percentages at the labels
        if (columnNames[0] == "null") columnNames[0] = "Null";
        probabilitiesByColumns.forEach((probability, index) => {
            columnNames[index] = columnNames[index] + " (" + Math.round(1000*probability)/10 + "%)";
        });

        // Once everything is together, we finally enter the new data settings and update the respective chart
        this.chartList[targetChart].data = {
            labels: columnNames,
            datasets: chartDatasets
        }
        this.chartList[targetChart].update();
    }

    // Given a list of numerical modifiers, sort them into ascending order with null on the left and x2 on the right
    sortColumnNames(labels) {
        var hasNull = this.remove(labels, "null");
        var hasX2 = this.remove(labels, "x2");
        // These are all strings which makes things tricky
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

    // A helper method for sortColumnNames, when checking for the presence of null or x2
    remove(array, element) {
        var index = array.indexOf(element)
        if (index > -1) return array.splice(index,1);
        return false;
    }
}

export {ChartHandler};