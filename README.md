# GloomhavenModifierDeck

<h3> Link to the tool </h3>

[Gloomhaven Attack Modifier Deck Simulator](https://happyquack.github.io/GloomhavenModifierDeck){:target="_blank"}

<h1> Overview </h1>

This is a WIP tool for the board game Gloomhaven, designed by Isaac Childres and published by Cephalofair Games ([link to BoardGameGeek page](https://boardgamegeek.com/boardgame/174430/gloomhaven)), that you can use during your Gloomhaven game to check the current (if you're playing a scenario) or overall stats of your attack modifier deck.

This tool will only contain content that my party has unlocked to prevent any spoilers for me, and I will attempt to organize this in such a way to prevent accidental spoilers to anyone else using this tool.

If you have any suggestions or requests, please feel free to log an issue and I'll get back to you the next time I see it.

<h2> Disclaimer on Coding Expertise </h2>

I am an occasional coding hobbyist, nowhere near the level of those who code more than one thing a year, yet I am quite comfortable in Python and Java, and I have dabbled in HTML, CSS, and C/C++ in the past. However, I've judged that making this tool in JavaScript would be easiest, so I am learning JavaScript only as I start this project. Please understand this if you ever decide to read my source code and leave any comments - advice would be much appreciated though I will have to read up on this language a bit in order to understand what you are saying =).

<h2> Implementation Plans </h2>

This (dynamic) list is mostly for me, but these are the features I plan to implement:

<ul>
  <li> A graphical distribution of the cards in the modifier deck. I will find images of each card and display them in horizontal columns of: </li>
    <ul>
      <li> Null (includes curses) </li>
      <li> -2 </li>
      <li> -1 </li>
      <li> +0 </li>
      <li> +1 </li>
      <li> +2 </li>
      <li> any other +X cards (if applicable) </li>
      <li> x2 (includes blessings) </li>
      <li> Any rolling +X cards (if applicable) </li>
      <li> Rolling effect cards (if applicable) </li>
    </ul>
  <li> A menu to choose the desired class you would like to alter the deck with. This will only be labeled by symbol in order to prevent spoilers. </li>
  <li> A menu to select which class perks are to be applied to the deck, graphically similar to the character sheet. </li>
  <li> A way to select which modifier cards have already been drawn, so that the output stats can reflect the current state of your deck. </li>
  <li> An output for average attack modifier (for both normal drawing, as well as with advantage or disadvantage), as well as an estimate of how many rounds before the deck will be reshuffled. </li>
</ul>
