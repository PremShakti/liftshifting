
let state = {
    lifts: [],
    floors: 0,
};

document.getElementById('generate').addEventListener('click', function () {
    const floors = parseInt(document.getElementById('floors').value);
    const lifts = parseInt(document.getElementById('lifts').value);
    generateUI(floors, lifts);
});

function generateUI(floors, lifts) {
    const building = document.getElementById('building');
    building.innerHTML = ''; // Clear existing UI

    state.floors = floors;
    state.lifts = Array.from({ length: lifts }, () => ({ currentFloor: 0, isMoving: false }));

    // Generate Floors
    for (let i = 0; i < floors; i++) {
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');
        floorDiv.innerHTML = `<span>Floor ${i}</span><button class="call-btn" data-floor="${i}">Call Lift</button>`;
        building.appendChild(floorDiv);
    }

    // Generate Lifts
    for (let i = 0; i < lifts; i++) {
        const liftDiv = document.createElement('div');
        liftDiv.classList.add('lift');
        liftDiv.id = `lift-${i}`;
        liftDiv.innerHTML = `
            <div class="door left-door"></div>
            <div class="door right-door"></div>
        `;
        building.appendChild(liftDiv);
    }

    // Add event listeners to call buttons
    document.querySelectorAll('.call-btn').forEach(button => {
        button.addEventListener('click', handleLiftCall);
    });
}

function handleLiftCall(e) {
    const floorCalled = parseInt(e.target.dataset.floor);
    moveLiftToFloor(floorCalled);
}

function moveLiftToFloor(floor) {
    // Select the nearest available lift
    let selectedLiftIndex = -1;
    let minDistance = Infinity;

    state.lifts.forEach((lift, index) => {
        if (!lift.isMoving) {
            const distance = Math.abs(lift.currentFloor - floor);
            if (distance < minDistance) {
                selectedLiftIndex = index;
                minDistance = distance;
            }
        }
    });

    if (selectedLiftIndex >= 0) {
        const lift = state.lifts[selectedLiftIndex];
        lift.isMoving = true;
        const liftDiv = document.getElementById(`lift-${selectedLiftIndex}`);

        liftDiv.style.bottom = `${floor * 100}px`;

        const travelTime = Math.abs(lift.currentFloor - floor) * 2000; // 2s per floor
        setTimeout(() => {
            openDoors(liftDiv);
            setTimeout(() => closeDoors(liftDiv), 2500); // Close doors after 2.5s
            setTimeout(() => {
                lift.isMoving = false;
                lift.currentFloor = floor;
            }, 5000); // Movement + doors (2.5s open, 2.5s close)
        }, travelTime);
    }
}

function openDoors(liftDiv) {
    const leftDoor = liftDiv.querySelector('.left-door');
    const rightDoor = liftDiv.querySelector('.right-door');

    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';
}

function closeDoors(liftDiv) {
    const leftDoor = liftDiv.querySelector('.left-door');
    const rightDoor = liftDiv.querySelector('.right-door');

    leftDoor.style.transform = 'translateX(0)';
    rightDoor.style.transform = 'translateX(0)';
}
