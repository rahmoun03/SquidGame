const games = [
    {
        title:"Red Light, Green Light",
        hint:"Move when green light shows, freeze on red light.",
        bg:"GAME_1.jpg",
        time: 60
    },
    {
        title:"Dalgona Challenge",
        hint:"Carefully cut out the shape without breaking it.",
        bg:"GAME_2.jpg",
        time: 120
    },
    {
        title:"Jokenpô",
        hint:"Pull together as a team to victory.",
        bg:"GAME_3.jpg",
        time: 60
    },
    {
        title:"Marbles",
        hint:"Strategic marble game with your partner.",
        bg:"GAME_4.jpg",
        time: 60
    },
];

let currentGame = 0;
let isPreGameCountdown = true;
let timer;
let start = true;
let finish = true;


function createGamePages() {
    const container = document.getElementById('gamePages');
    games.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-page';
        gameDiv.id = `game${index}`;
        gameDiv.innerHTML = `
            <div class="game-container">
                <div class="game-content" style="background-image: url('./images/${game.bg}');">
                </div>
                <div class="countdown" id="countdown${index}"><span>00:30</span></div>
            </div>
        `;
        container.appendChild(gameDiv);
    });
}

function startGames() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById(`game${currentGame}`).style.display = 'block';
    startCountdown(currentGame);
}

function startCountdown(gameIndex) {
    finish = false;
    timerSound.play();
    let timeLeft = isPreGameCountdown ? 20 : games[currentGame].time; // 1 minute or 5 minutes
    const parent =  document.getElementById(`countdown${gameIndex}`);
    const countdownElement = parent.querySelector('span');
    if (isPreGameCountdown)
        countdownElement.style.color = '#249f9c';
    else{
        countdownElement.style.color = '#fff';
        if (gameIndex == 0){
            startSound.pause();
            red_green.play();
        }
    }

    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft === 0) {
            clearInterval(timer);
            if (isPreGameCountdown) {
                isPreGameCountdown = false;
                startCountdown(gameIndex);
            } else {
                if (currentGame < games.length - 1) {
                    if (gameIndex == 0){
                        red_green.pause();
                        startSound.play();
                    }
                    finish = true;
                    timerSound.pause();
                }
                else
                {
                    document.getElementById(`game${currentGame}`).style.display = 'none';
                    document.getElementById('gameOver').style.display = "flex";
                    timerSound.pause();
                    startSound.pause();
                    overSound.play();
                }
            }
        }
        timeLeft--;
    }, 1000);
}

window.addEventListener('keypress', (e)=> {
    console.log(e.key);
    
    if(e.key === 'Enter' && currentGame == 0 && start){
        timerSound.play();
        timerSound.loop = true;

        start = false;
        isPreGameCountdown = true;
        currentGame = 0;
        clearInterval(timer);
        startGames();
    }
    if(e.key === ' ' && currentGame < games.length - 1 && !isPreGameCountdown && finish){
        timerSound.pause();
        document.getElementById(`game${currentGame}`).style.display = 'none';
        currentGame++;
        document.getElementById(`game${currentGame}`).style.display = 'block';
        isPreGameCountdown = true;
        startCountdown(currentGame);
    }

})

var timerSound = new Audio('./sounds/timer.mp3');
timerSound.loop = true;
timerSound.volume = 0.8;

var overSound = new Audio('./sounds/game-over.mp3');
overSound.loop = true;
overSound.volume = 0.5;

var startSound = new Audio('./sounds/JooWon.mp3');
startSound.loop = true;
startSound.volume = 0.5;

var red_green = new Audio('./sounds/red_green.mp3');
red_green.loop = true;
red_green.volume = 1;

window.addEventListener('click', (e) => {
    if(currentGame == 0)
        startSound.play();
});

createGamePages();