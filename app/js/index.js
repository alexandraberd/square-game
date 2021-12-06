let startBtn = document.querySelector('#startBtn');
let field = document.querySelector('.game__field');
let timer = document.querySelector('#timeCounter');
let timerInput = document.querySelector('.game__timer-input');
let timeTitle = document.querySelector('.game__title-time');
let scoreTitle = document.querySelector('.game__title-score');

let score;
let isGameStarted = false;

startBtn.addEventListener('click', startGame);
field.addEventListener('click', handleBoxClick);
function startGame() {
    setTime();
    score = 0;

    isGameStarted = true;
    field.style.backgroundColor = 'transparent';
    addHidden(startBtn);
    timerInput.disabled = true;

    removeHidden(timeTitle);
    addHidden(scoreTitle);

    startTimer();
    renederBox();
}
function renederBox() {
    field.innerHTML = '';
    let square = document.createElement('div');
    square.setAttribute('data-box', 'true');
    square.style.position = 'absolute';
    square.style.cursor = 'pointer';

    let boxSize = getRandomInt(30, 100);
    square.style.width = square.style.height = boxSize + 'px';

    square.style.backgroundColor =
        'rgb(' +
        getRandomInt(0, 255) +
        ', ' +
        getRandomInt(0, 255) +
        ', ' +
        getRandomInt(0, 255) +
        ')';

    let fieldCoords = field.getBoundingClientRect();
    let maxTop = fieldCoords.height - boxSize;
    let maxLeft = fieldCoords.width - boxSize;
    square.style.top = getRandomInt(0, maxTop) + 'px';
    square.style.left = getRandomInt(0, maxLeft) + 'px';

    field.append(square);
}
function handleBoxClick(e) {
    if (!isGameStarted) return;
    let target = e.target.dataset.box;
    if (target) {
        renederBox();
        score++;
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function startTimer() {
    let interval = setInterval(() => {
        let time = timer.innerHTML;

        if (time <= 0) {
            endGame();
            clearInterval(interval);
        } else {
            timer.innerHTML = (time - 0.1).toFixed(1);
        }
    }, 100);
}
function endGame() {
    isGameStarted = false;
    field.style.backgroundColor = '#b9cec7';
    timerInput.disabled = false;
    removeHidden(startBtn);
    field.innerHTML = '';

    scoreTitle.innerHTML = `Score: ${score}`;
    addHidden(timeTitle);
    removeHidden(scoreTitle);
}
function setTime() {
    if (timerInput.value < 1) {
        timerInput.value = 1;
    }
    timer.innerHTML = parseInt(timerInput.value).toFixed(1);
}
timerInput.addEventListener('change', () => {
    setTime();
});
function addHidden(el) {
    el.hidden = true;
}
function removeHidden(el) {
    el.hidden = false;
}
