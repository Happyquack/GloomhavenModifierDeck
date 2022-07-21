import {Card} from './card.js';

class newDeck {
    // okay so this is a second attempt at deck.js
    // I'm coming back to this project after months and right before I took my hiatus I started to realize that deck.js was getting too bloated
    // Not only was I making it in a way that was simply not scalable, 
    // but it was starting to get all tangled up, took up too much space, and also was encroaching quite a bit on the duties of deckHandler.js
    // so this is a version two of deck.js

    // my goals with this update
    // one: create a much more readable and flowing code
    // two: avoid "bandage" solutions - -1's are a problem that can be fixed more elegantly than plugging in an ugly fix
    // three: structure deck storage and accessing to be much more memory-efficient and faster
    //        we do not need to be constantly swiching out variable names if we can just access part of a list
    // four: set a precedent that makes it much easier to add in more content or options - I want to eventually add crimson scales and others

    // the dimensions of this will be: [classFamily][classNumber][currentDeck, characterDeck, characterPerkCodes, characterPerkTexts, {other}]
    // where classFamily is which game we are using (Gloomhaven, Crimson Scales, Forgotten Circles, Jaws of the Lion, Frosthaven) (review order)

    // I should reconsider if I want to be doing the perkCodes the same way? I don't see why not

    // Ugh we will actually have to take into account curses and blesses

    // I suppose we DO need to tackle the issue of -1's right now then

    // Issue: I need to figure out what is most space efficient for blesses and curses, because on one hand it would be more convenient
    //        for each class to have its own set fo cards to work with, on the other hand it would be more space efficient to have it be stored
    //        somewhere once then manually taken in and out when switching to a different class
    //        then again we would save on methods with the first idea so let's stick with that

    // Wait a fucking minute: this is in fact a problem when we think about currentDeck, specifically whether the cards are flipped over or not
    //        because being flipped over is an attribute of the card object itself, and while there will be seperate currentDeck objects, the cards
    //        themselves are all the same objects because it would be ludicrous to have 400 unnecessary objects when we already have so many
}
