class MatchUp {
    constructor(totalTime, cards) {
        this.totalTime = totalTime;
        this.cardsArray = cards;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time');
        this.ticker = document.getElementById('flips');
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];

        this.hideAllCards();
        this.shuffleCards();
        this.countdown = this.startTimer();
        this.timer.innerText = this.timeRemaining;
        // this.ticker.innerText = this.totalClicks;
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('flipped');

            if (this.cardToCheck) {
                this.checkIfCardsMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkIfCardsMatch(card) {
        if (this.getCardImg(this.cardToCheck) === this.getCardImg(card)) {
            this.match(card);
        } else {
            this.dontMatch(card);
        }
        this.cardToCheck = null;
    }

    getCardImg(card) {
        return card.getElementsByTagName('img')[0].className;
    }

    match(card) {
        this.matchedCards.push(card, this.cardToCheck);
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    dontMatch(card) {
        this.hideCards(card, this.cardToCheck);
    }

    hideCards(card1, card2) {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    hideAllCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('flipped');
        });
    }

    canFlipCard(card) {
        return !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    startTimer() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) this.gameOver();
        }, 1000);
    }

    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    let game = new MatchUp(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else ready();