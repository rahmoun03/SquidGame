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
                <div class="participant-number">Player ${index + 1}</div>
                <div class="input-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value="${participant.name}"
                        id="nameInput${index}"
                    >
                    <input 
                        type="text" 
                        placeholder="Number" 
                        value="${participant.number}"
                        id="numberInput${index}"
                        maxlength="3"
                    >
                </div>
            `;
            grid.appendChild(card);
                    // Add event listeners instead of using inline oninput
            document.getElementById(`nameInput${index}`).addEventListener('input', (event) => {
                updateParticipant(index, 'name', event.target.value);
            });
            document.getElementById(`numberInput${index}`).addEventListener('input', (event) => {
                updateParticipant(index, 'number', event.target.value);
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
        const isComplete = participants.every(p => p.name.trim() && p.number.trim());
        
        // Check for duplicate numbers
        const numbers = participants.map(p => p.number.trim()).filter(n => n);
        const hasDuplicates = new Set(numbers).size !== numbers.length;

        // Check if numbers are between 1 and 456
        const validNumbers = participants.every(p => {
            const num = parseInt(p.number);
            return !p.number || (num >= 1 && num <= 456);
        });

        startButton.disabled = !isComplete || hasDuplicates || !validNumbers;

        if (!isComplete) {
            validationMessage.textContent = 'Please fill in all participant details';
        } else if (hasDuplicates) {
            validationMessage.textContent = 'Each participant must have a unique number';
        } else if (!validNumbers) {
            validationMessage.textContent = 'Numbers must be between 1 and 456';
        } else {
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
