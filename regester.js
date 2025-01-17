document.addEventListener("DOMContentLoaded", () => {
    // All your script code here
    const register = document.getElementById("registration");
    register.innerHTML = `
        <img class="leets-logo" src="./images/LE_Logo.png" alt="Leets Logo" />
        <h1 class="title">PARTICIPANT REGISTRATION</h1>
        
        <div class="registration-container">
            <div class="participants-grid" id="participantsGrid">
                <!-- Participant cards will be generated here -->
            </div>

            <div class="validation-message" id="validationMessage"></div>

            <div class="buttons-container">
                <button class="button" id="startButton" disabled>Start Game</button>
            </div>
        </div>`;


    const REQUIRED_PARTICIPANTS = 10;
    let participants = Array(REQUIRED_PARTICIPANTS).fill(null).map(() => ({
        name: '',
        number: ''
    }));

    function createParticipantCards() {
        const grid = document.getElementById('participantsGrid');
        grid.innerHTML = '';

        participants.forEach((participant, index) => {
            const card = document.createElement('div');
            card.className = 'participant-card';
            card.innerHTML = `
                <div class="participant-number">Player 00${index}</div>
                <div class="input-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value="${participant.name}"
                        id="nameInput${index}"
                    >
                </div>
            `;
            grid.appendChild(card);
                    // Add event listeners instead of using inline oninput
            document.getElementById(`nameInput${index}`).addEventListener('input', (event) => {
                updateParticipant(index, 'name', event.target.value);
                updateParticipant(index, 'number', `00${index}`);
            });
        });
    }

    function updateParticipant(index, field, value) {
        participants[index][field] = value;
        validateAndUpdateUI();
    }

    function validateAndUpdateUI() {
        const startButton = document.getElementById('startButton');
        const validationMessage = document.getElementById('validationMessage');
        
        // Check if all participants have name and number
        const isComplete = participants.every(p => p.name.trim());

        startButton.disabled = !isComplete;

        if (!isComplete) {
            validationMessage.textContent = 'Please fill in all participant details';
        }
        else {
            validationMessage.textContent = '';
        }
    }

    function startGame() {
        // Save participants to localStorage or your preferred storage method
        localStorage.setItem('gameParticipants', JSON.stringify(participants));
        document.getElementById('registration').style.display = 'none';
        document.getElementById('landing').style.display = 'flex';
    }

    // Initialize the page
    createParticipantCards();
    validateAndUpdateUI();
    register.querySelector('#startButton').addEventListener('click', startGame);

});
