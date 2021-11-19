# GloomhavenModifierDeck

<h3> Link to the tool </h3>

[Gloomhaven Attack Modifier Deck Simulator](https://happyquack.github.io/GloomhavenModifierDeck)

<h1> Overview </h1>

This is a WIP tool for the board game Gloomhaven, designed by Isaac Childres and published by Cephalofair Games ([link to BoardGameGeek page](https://boardgamegeek.com/boardgame/174430/gloomhaven)), that you can use during your Gloomhaven game to check the current (if you're playing a scenario) or overall stats of your attack modifier deck.

This tool will only contain content that my party has unlocked to prevent any spoilers for me, and I will attempt to organize this in such a way to prevent accidental spoilers to anyone else using this tool.

If you have any suggestions or requests, please feel free to log an issue and I'll get back to you the next time I see it.

<h2> Disclaimer on Coding Expertise </h2>

I am an occasional coding hobbyist, nowhere near the level of those who code more than one thing a year, yet I am quite comfortable in Python and Java, and I have dabbled in HTML, CSS, and C/C++ in the past. However, I've judged that making this tool in JavaScript would be easiest, so I've been learning JavaScript throughout the making of this project. This means that I know what I'm doing, but I don't know of every optimization (nor am I typically concerned with minor ones at the expense of readibility). Please understand this if you ever decide to read my source code and leave any comments - advice would be much appreciated =).

<h2> Features </h2>

Here's what the tool offers so far:

<ul>
  <li> A visual display of the character deck </li>
  <li> All 17 classes from the base Gloomhaven game (except for Three Spears, Circles, Eclipse, and Music Note), including their perk lists and modifiers </li>
  <li> The ability to add/remove -1's, blesses, and curses from your deck </li>
  <li> The ability to designate cards as already drawn by selecting them to flip them over, as well as a single button to easily flip them all face-up </li>
  <li> The tool remembers what perks you have selected for each character, as well as which cards have been flipped, as you switch between classes </li>
  <li> A graphical distribution of the expected modifier card drawn during an attack, including using advantage and disadvantage rules </li>
  <li> The expected chance of possible rolling modifier effects (WIP - numerical rolling modifiers are not entirely accurate with advantage) </li>
  <li> A spot to enter your attack value to calculate your expected damage (WIP - does not include rolling modifiers), as well as to handle nuances in advantage/disadvantage rules </li>
  <li> The option to show the statistics of your mid-scenario current deck, ignoring flipped-over cards </li>
</ul>

Here's what I'm working on adding:

<ul>
  <li> The probabilities of ending up with certain attack ranges (e.g. +0 or above, +1 or above) </li>
  <li> Taking rolling modifiers into account when displaying the expected damage </li>
  <li> Taking advantage into account when displaying numerical rolling modifier chances </li>
  <li> Adding a confirm dialog when selecting a typically locked class, to avoid accidental spoilers </li>
  <li> Replacing "SANDBOX" with "MONSTER DECK" and enabling it so players can keep track of monster deck statistics </li>
  <li> Making chart results more readable </li>
  <li> Making chart updating smoother </li>
  <li> Acknowlege long image loading times </li>
</ul>
