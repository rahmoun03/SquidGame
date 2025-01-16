const content = document.getElementById('gameOver');

const style = document.createElement('style');
style.textContent = `
.game-over-page {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('./images/bg7.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.subtitle {
    font-family: 'Game Of Squids';
    font-size: 4rem;
    color: var(--white);
    text-align: center;
    margin-top: 2rem;
    text-shadow: 2px 2px var(--dark-blue);
}

.stats-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    padding: 2rem;
    margin-top: 3rem;
    min-width: 400px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    font-size: 1.2rem;
}

.stat-label {
    color: var(--teal);
}

.stat-value {
    color: var(--white);
    font-weight: bold;
}

}
`;

const over = document.createElement('div');
over.className = "game-over-page";
over.innerHTML =  `
    <div class="">
        <img class="leets-logo" src="./images/LE_Logo.png" alt="Leets Logo" />
        <h1 class="title">GAME OVER</h1>
        <h2 class="subtitle">Congratulations Player!</h2>
        
        <div class="stats-container">
            <div class="stat-item">
                <span class="stat-label">Games Completed:</span>
                <span class="stat-value">5/5</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Total Time:</span>
                <span class="stat-value">25:00</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Final Score:</span>
                <span class="stat-value">456,000</span>
            </div>
        </div>
    </div>
`;


content.appendChild(style);
content.appendChild(over);
content.style.display = "none";
