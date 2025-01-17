const content = document.getElementById('gameOver');

const style = document.createElement('style');
style.textContent = `
.game-over-page {
    background-image:url('./images/TV.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
`;

const over = document.createElement('div');
over.className = "game-over-page";


content.appendChild(style);
content.appendChild(over);
content.style.display = "none";
