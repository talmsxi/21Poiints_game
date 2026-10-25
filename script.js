const cardValues = [
    6, 6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    11, 11, 11, 11
];

const target = 21;
const computerLimit = 17;

let userHand = [];
let computerHand = [];
let hiddenCard = true;
let gameOver = true;

let userWins = 0;
let computerWins = 0;

window.onload = askName;

function askName() {
    let name = prompt('Як вас звати?');

    while (name != null && name.trim() == '') {
        name = prompt('Ім\'я не може бути порожнім. Як вас звати?');
    }

    if (name == null) {
        name = 'USER';
    }

    document.getElementById('userName').innerHTML = name.toUpperCase();

    showButtons(false);
}

function takeCard() {
    return Math.floor(Math.random() * cardValues.length);
}

function handScore(hand) {
    let sum = 0;

    for (let i = 0; i < hand.length; i = i + 1) {
        sum = sum + cardValues[hand[i]];
    }

    return sum;
}

function showHands() {
    showHand('userHand', userHand, false);
    showHand('computerHand', computerHand, hiddenCard);

    document.getElementById('userScore').innerHTML = handScore(userHand);

    if (hiddenCard) {
        document.getElementById('computerScore').innerHTML = '?';
    }
    else {
        document.getElementById('computerScore').innerHTML = handScore(computerHand);
    }
}

function showHand(placeId, hand, hideSecond) {
    let place = document.getElementById(placeId);
    place.innerHTML = '';

    for (let i = 0; i < hand.length; i = i + 1) {

        if (hideSecond == true && i == 1) {
            let back = document.createElement('div');
            back.classList.add('card-back');
            back.innerHTML = '21';
            place.appendChild(back);
        }
        else {
            let image = document.createElement('img');
            image.classList.add('card-image');
            image.src = 'cards/' + hand[i] + '.png';
            place.appendChild(image);
        }
    }
}

function showButtons(playing) {
    if (playing) {
        document.getElementById('hitButton').style.display = 'block';
        document.getElementById('standButton').style.display = 'block';
        document.getElementById('newButton').style.display = 'none';
    }
    else {
        document.getElementById('hitButton').style.display = 'none';
        document.getElementById('standButton').style.display = 'none';
        document.getElementById('newButton').style.display = 'block';
    }
}

function startGame() {
    userHand = [];
    computerHand = [];
    hiddenCard = true;
    gameOver = false;

    document.getElementById('final').innerHTML = '';
    document.getElementById('status').innerHTML = 'Ваш хід';

    userHand[0] = takeCard();
    computerHand[0] = takeCard();
    userHand[1] = takeCard();
    computerHand[1] = takeCard();

    showHands();
    showButtons(true);

    if (handScore(userHand) == target) {
        stand();
    }
}

function hit() {
    if (gameOver) {
        return;
    }

    userHand[userHand.length] = takeCard();
    showHands();

    if (handScore(userHand) > target) {
        finish('Перебір! Ви програли', 'lose');
    }
    else if (handScore(userHand) == target) {
        stand();
    }
}

function stand() {
    if (gameOver) {
        return;
    }

    hiddenCard = false;
    document.getElementById('status').innerHTML = 'Хід комп\'ютера';

    while (handScore(computerHand) < computerLimit) {
        computerHand[computerHand.length] = takeCard();
    }

    showHands();

    let user = handScore(userHand);
    let computer = handScore(computerHand);

    if (computer > target) {
        finish('Перебір у комп\'ютера. Ви перемогли!', 'win');
    }
    else if (user > computer) {
        finish('Ви перемогли!', 'win');
    }
    else if (computer > user) {
        finish('Переміг комп\'ютер', 'lose');
    }
    else {
        finish('Нічия', 'draw');
    }
}

function finish(text, type) {
    gameOver = true;
    hiddenCard = false;
    showHands();

    document.getElementById('status').innerHTML = 'Гру завершено';

    let box = document.createElement('div');
    box.classList.add('final-box');
    box.classList.add(type);
    box.innerHTML = text;

    document.getElementById('final').innerHTML = '';
    document.getElementById('final').appendChild(box);

    if (type == 'win') {
        userWins = userWins + 1;
    }
    if (type == 'lose') {
        computerWins = computerWins + 1;
    }

    document.getElementById('matchScore').innerHTML = userWins + ' : ' + computerWins;
    document.getElementById('newButton').innerHTML = 'Нова гра';

    showButtons(false);
}
