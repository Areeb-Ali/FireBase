// logical System

const airdropList = document.getElementById('airdrop-list');
const addAirdropButton = document.getElementById('add-airdrop');

let airdrops = [];

function addAirdrop() {
    const airdropName = prompt('Enter airdrop name:');
    const taskInterval = prompt('Enter task interval (hours):');

    if (airdropName && taskInterval) {
        const airdrop = {
            name: airdropName,
            interval: taskInterval * 3600000, // Convert hours to milliseconds
            lastCompleted: Date.now(),
            timer: null
        };

        airdrops.push(airdrop);
        updateAirdropList();
        startTimer(airdrop);
    }
}

function updateAirdropList() {
    airdropList.innerHTML = '';

    function updateAirdropList() {
        airdropList.innerHTML = '';

        // Sort airdrops by remaining time in ascending order
        airdrops.sort((a, b) => {
            const timeRemainingA = a.interval - (Date.now() - a.lastCompleted);
            const timeRemainingB = b.interval - (Date.now() - b.lastCompleted);
            return timeRemainingA - timeRemainingB;
        });

        // Sort airdrops by name in ascending order (as a tiebreaker)
        airdrops.sort((a, b) => a.name.localeCompare(b.name));

        // Create and append airdrop items to the list
        airdrops.forEach(airdrop => {
            // ... (rest of the code)
        });
    }

    // Sort airdrops by name in ascending order (as a tiebreaker)
    airdrops.sort((a, b) => a.name.localeCompare(b.name));

    airdrops.forEach(airdrop => {
        const airdropItem = document.createElement('div');
        airdropItem.className = 'airdrop-item';

        const airdropNameElement = document.createElement('p');
        airdropNameElement.className = 'airdrop-name';
        airdropNameElement.textContent = airdrop.name;

        const airdropTimerElement = document.createElement('p');
        airdropTimerElement.className = 'airdrop-timer';
        airdropTimerElement.textContent = 'Time remaining: ' + formatTime(airdrop.interval - (Date.now() - airdrop.lastCompleted));

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            airdrop.lastCompleted = Date.now();
            startTimer(airdrop);
        });

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editAirdrop(airdrop);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteAirdrop(airdrop);
        });

        airdropItem.appendChild(airdropNameElement);
        airdropItem.appendChild(airdropTimerElement);
        airdropItem.appendChild(completeButton);
        airdropItem.appendChild(editButton);
        airdropItem.appendChild(deleteButton);

        airdropList.appendChild(airdropItem);
    });
}

function startTimer(airdrop) {
    clearInterval(airdrop.timer);

    airdrop.timer = setInterval(() => {
        const timeRemaining = airdrop.interval - (Date.now() - airdrop.lastCompleted);

        if (timeRemaining <= 0) {
            // Notify user (e.g., using a sound or notification)
            alert('Task time is over for ' + airdrop.name);
            startTimer(airdrop); // Restart the timer
        } else {
            updateAirdropList();
        }
    }, 1000);
}

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = (minutes % 60).toString().padStart(2, '0');
    const secondsStr = (seconds % 60).toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function editAirdrop(airdrop) {
    const newAirdropName = prompt('Enter new airdrop name:');
    const newTaskInterval = prompt('Enter new task interval (hours):');

    if (newAirdropName && newTaskInterval) {
        airdrop.name = newAirdropName;
        airdrop.interval = newTaskInterval * 3600000;
        updateAirdropList();
        startTimer(airdrop);
    }
}

function deleteAirdrop(airdrop) {
    const confirmed = confirm('Are you sure you want to delete this airdrop?');

    if (confirmed) {
        const index = airdrops.indexOf(airdrop);
        airdrops.splice(index, 1);
        updateAirdropList();
    }
}

addAirdropButton.addEventListener('click', addAirdrop);