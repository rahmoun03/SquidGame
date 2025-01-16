const games = [
    {
        title:"Red Light, Green Light",
        hint:"Move when green light shows, freeze on red light."
    },
    {
        title:"Dalgona Challenge",
        hint:"Carefully cut out the shape without breaking it."
    },
    {
        title:"Tug of War",
        hint:"Pull together as a team to victory."
    },
    {
        title:"Marbles",
        hint:"Strategic marble game with your partner."
    },
    {
        title:"Glass Bridge",
        hint:"Choose the right path across the bridge."
    } 
];

let currentGame = 0;
let isPreGameCountdown;
let timer;


function createGamePages() {
    const container = document.getElementById('gamePages');
    games.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-page';
        gameDiv.id = `game${index}`;
        gameDiv.innerHTML = `
            <div class="game-container">
                <div class="game-content" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url('./images/bg5.jpg');">
                    <h2 class="game-title">${game.title}</h2>
                    <div class="countdown" id="countdown${index}">01:00</div>
                    <h2>${game.hint}</h2>
                </div>
                <div class="side-roadmap">
                    <h1 class="title" >GAMES</h1>
                    <div class="side-roadmap-items">
                        ${games.map((g, i) => `
                            <div class="roadmap-item ${i === index ? 'active' : ''}">${g.title}</div>
                        `).join('')}
                    </div>
                </div>
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
    let timeLeft = isPreGameCountdown ? 5 : 20; // 1 minute or 5 minutes
    const countdownElement = document.getElementById(`countdown${gameIndex}`);
    if (isPreGameCountdown)
        countdownElement.style.color = 'yellow';
    else
        countdownElement.style.color = '#12b886';
    
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
                    document.getElementById(`game${currentGame}`).style.display = 'none';
                    currentGame++;
                    document.getElementById(`game${currentGame}`).style.display = 'block';
                    isPreGameCountdown = true;
                    startCountdown(currentGame);
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
    
    if(e.key === 'Enter' && currentGame == 0){
        // startSound.pause();
        timerSound.play();
        timerSound.loop = true;


        isPreGameCountdown = true;
        currentGame = 0;
        clearInterval(timer);
        startGames();
    }
})

var timerSound = new Audio('./sounds/timer.mp3');
var overSound = new Audio('./sounds/game-over.mp3');



var startSound = new Audio('./sounds/jooWon.mp3');
startSound.loop = true;

window.addEventListener('click', (e) => {
    if(currentGame == 0)
        startSound.play();
});

createGamePages();