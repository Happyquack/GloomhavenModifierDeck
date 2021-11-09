import {ClassSelectionUI} from './classSelection.js';
import {DeckHandler} from './deckHandler.js';
import {ModdlingBox} from './moddling.js';
import {PerkHandler} from './perkHandler.js';

// The main thing that runs and sparks everything else

// create player deck

var deckHandler = new DeckHandler();

// make perk handling

var perkHandler = new PerkHandler(deckHandler);

// make class selection

var classSelectionUI = new ClassSelectionUI(deckHandler, perkHandler);

// make deck adjusting handler

var moddlingHandler = new ModdlingBox(deckHandler);

// display the first deck

deckHandler.displayDeck();