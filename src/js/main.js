document.addEventListener('DOMContentLoaded', () => {
    const lift = document.getElementById('lift');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const numBtns = document.querySelectorAll('.num-btn');
    let currentFloor = 0;
    let isMoving = false;

    const moveLift = (targetFloor) => {
        if (isMoving) return;
        isMoving = true;

        const targetPosition = targetFloor * 100;
        lift.classList.remove('open');

        setTimeout(() => {
            lift.style.bottom = `${targetPosition}px`;
            setTimeout(() => {
                lift.classList.add('open');
                currentFloor = targetFloor;
                upBtn.disabled = currentFloor === 5;
                downBtn.disabled = currentFloor === 0;
                isMoving = false;
            }, 1000);
        }, 500);
    };

    upBtn.addEventListener('click', () => {
        if (currentFloor < 5) {
            moveLift(currentFloor + 1);
        }
    });

    downBtn.addEventListener('click', () => {
        if (currentFloor > 0) {
            moveLift(currentFloor - 1);
        }
    });

    numBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetFloor = parseInt(btn.getAttribute('data-floor'));
            moveLift(targetFloor);
        });
    });

  
    upBtn.disabled = currentFloor === 5;
    downBtn.disabled = currentFloor === 0;
});
