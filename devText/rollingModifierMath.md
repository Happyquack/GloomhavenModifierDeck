# Explanation of Math Functions - Rolling Modifier

# # The math

This page describes how I constructed the formula for calculating the rolling modifier probabilities. In order to do this, I created a function that takes in the variables:

<ul>
    <li> ``x`` = number of desired cards (that is, if you want to know the probability of drawing a specific card, or ``x`` specific cards)</li>
    <li> ``a`` = total number of rolling cards in the deck (``a-x`` is the number of rolling cards that are inconsequential to our result)</li>
    <li> ``n`` = total number of cards in the deck (``n-a`` is the number of cards that are not rolling)</li>
</ul>

To start with, here's the formula:

``P(x, a, n) = sum(i = 0 -> a-x : (x/(n-i)) * P(x-1, a-1-i, n-1-i) * (n+1)/(a+1-x) * product(j = 0 -> i : (a-x+1-j)/(n+1-j))) ``

Alright, let's break this down:
<ul>
    <li>``sum(i = 0 -> a-x : ...)`` loops through all possible cards it is to draw before drawing one of ``x`` desired rolling modifiers ``a-x``, from 0 (no cards) to ``a-x`` (all other rollings), adding up the probabilities of drawing ``x`` desired rolling modifiers after that point.</li>
    <li>``(x/n-i)`` is the probability that card ``i`` is one of the desired ``x`` cards</li>
    <li>``P(x-1, a-1-i, n-1-i)`` is the probability of drawing any further of the desired ``x`` cards, taking into account how many cards have already been drawn (``-1-i``). If ``x-1`` is 0, then no more cards are needed, and this returns a default of 1.</li>
    <li>``(n+1)/(a-x+1) * product(j = 0 -> i : (a-x+1-j)/(n+1-j))`` is the probability that all of the previous ``i``s considered were drawn from the pool of ``a-x`` rolling cards rather than one of the other ``n-a`` cards or one of the ``x`` cards. When ``i`` is 0, the product is simply ``(a-x+1)/(n+1)``, which cancels out with ``(n+1)/(a-x+1)`` to be 1. As ``i`` increases, and more rolling modifiers are drawn, the chances of having drawn that many modifiers decreases, and ``j`` loops through the probabilities of drawing each of those cards.</li>
</ul>

When the player has advantage, we also need to account for the possibility that the player draws the desired rolling card after having drawn one of ``n-a`` non-rolling cards. This probability is ``(n-a)/(n) * (1)/(n-1)``, and we can simply add this to the result of the above function. It's important to note that this is only the case when ``x`` is 1 - we can't draw more than one rolling card if we've already drawn a non-rolling card.

When the player has disadvantage, rolling cards are ignored, and so the probability of gaining any benefits from them is 0 by definition.

# # Status effects

For determining the chances of getting status effects from rolling cards, ``x`` is going to be 1, since you only need to draw one card to add the effect to the attack. For effects with cumulative values, such as heal, push, or pierce, a probability must be calculated for drawing 1 up to however many copies of the card that are in the deck, since those values can stack. 

# # Attack modifiers

Attack modifiers can be treated largely like cumulative effects, with a few special cases. First, since rolling cards with different attack modifier values can be added to the same deck, we need to take more care to anticipate all possible totals along with how many cards might need to be drawn to get them. For example, if a deck contains 2 rolling +1 cards and 1 rolling +3 card, the possible totals are 1, 2, 3, 4, and 5. Each of these take 1, 2, 1, 2, and 3 cards, respectively. Second, we need to account for the possibility of drawing a null.

When a null is drawn, it reduces the value of the player's attack to 0, but retains any status effects. This is why we could ignore nulls before, but must take them into account now, and narrow our calculation down to the probabillity of drawing a rolling attack modifier that actually matters. In order to get this, we simply need to multiply our previous result with ``(n-a-c)/(n-a)`` where ``c`` is the number of null cards in the deck, and ``(n-a)`` is the number of non-rolling cards that can eventually be drawn after however many rolling cards.