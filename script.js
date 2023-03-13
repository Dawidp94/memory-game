const cards = [
    "card_1.png", "card_1.png", "card_2.png", "card_2.png",
    "card_3.png", "card_3.png", "card_4.png", "card_4.png",
    "card_5.png", "card_5.png", "card_6.png", "card_6.png"
];
const cardElements = Array.from(document.querySelectorAll(".card"));
const pairCount = cards.length / 2;

let firstCard = null;
let turnCounter = 0;
let pairsFound = 0;
let locked = false;

function randomizeArray(array) {
    array.sort(() => Math.random() - 0.5);
}

function revealCard(index) {
    const cardElement = cardElements[index];

    if (cardElement.style.opacity === "0" || locked) {
        return;
    }

    cardElement.style.backgroundImage = `url(img/${cards[index]})`;
    cardElement.classList.remove("card");
    cardElement.classList.add("card2");

    if (firstCard === null) {
        firstCard = index;
    } else {
        const secondCard = index;

        if (cards[firstCard] === cards[secondCard]) {
            hideCards(firstCard, secondCard);
        } else {
            restoreCards(firstCard, secondCard);
        }

        turnCounter++;
        document.querySelector(".score").textContent = `Turn counter: ${turnCounter}`;
        firstCard = null;
    }
}

function hideCards(index1, index2) {
    const cardElement1 = cardElements[index1];
    const cardElement2 = cardElements[index2];

    cardElement1.style.opacity = "0";
    cardElement2.style.opacity = "0";

    pairsFound++;

    if (pairsFound === pairCount) {
        const boardElement = document.querySelector(".board");

        boardElement.innerHTML = `
            <h2>You win!<br><span>Done in: ${turnCounter} turns</span></h2>
        `;
    }
}

function restoreCards(index1, index2) {
    const cardElement1 = cardElements[index1];
    const cardElement2 = cardElements[index2];

    locked = true;

    setTimeout(() => {
        cardElement1.style.backgroundImage = "url(/img/card_0.png)";
        cardElement1.classList.remove("card2");
        cardElement1.classList.add("card");

        cardElement2.style.backgroundImage = "url(/img/card_0.png)";
        cardElement2.classList.remove("card2");
        cardElement2.classList.add("card");

        locked = false;
    }, 1200);
}

randomizeArray(cards);

cardElements.forEach((cardElement, index) => {
    cardElement.addEventListener("click", () => {
        revealCard(index);
    });
});
