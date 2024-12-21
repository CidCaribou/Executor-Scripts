let isMouseDown = false;
let isDragging = false;
let preventClick = false; // New flag to block toggle logic after dragging

// Select the menu elements
const menuToggle = document.querySelector('#input');
const menu = document.querySelector('.switch');
let startX, startY;

// Toggle Moon/Sun Logic
menuToggle.addEventListener('click', (e) => {
    // Prevent toggle if a drag occurred
    if (preventClick) {
        preventClick = false; // Reset the flag for next interaction
        return;
    }

    // Toggle the menu
    if (menu.classList.contains('toggled')) {
        menu.classList.remove('toggled');
        resetColors(); // Reset to normal colors when sun is on
    } else {
        menu.classList.add('toggled');
        invertColors(); // Apply color inversion when moon is on
    }
});

// Draggable Logic
menu.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    isDragging = false; // Reset dragging flag
    preventClick = false; // Reset preventClick flag
    startX = e.clientX;
    startY = e.clientY;

    menu.style.cursor = 'grabbing';

    const onMouseMove = (e) => {
        if (!isMouseDown) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // Detect significant movement as dragging
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isDragging = true;
            preventClick = true; // Mark this interaction as a drag
        }

        if (isDragging) {
            // Move the menu
            const rect = menu.getBoundingClientRect();
            menu.style.position = 'absolute';
            menu.style.left = `${rect.left + dx}px`;
            menu.style.top = `${rect.top + dy}px`;
            startX = e.clientX; // Update start coordinates
            startY = e.clientY;
        }
    };

    const onMouseUp = () => {
        if (isDragging) {
            // Dragging ended; block toggle logic
            preventClick = true;
        }

        // Reset states
        isMouseDown = false;
        isDragging = false;
        menu.style.cursor = 'grab';

        // Remove event listeners
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Listen for mousemove and mouseup events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Functions for color inversion
function invertColors() {
    function invert(color, type) {
        const parts = color.split('(')[1].split(')')[0].split(',');
        const inverted = parts.map((part, index) => {
            if (index < 3) {
                const value = 255 - parseInt(part);
                return type === 'color' && value < 50 ? 120 : value;
            }
            return part;
        });
        return `rgb(${inverted.join(',')})`;
    }

    document.querySelectorAll('*:not([invTouch]):not(.switch):not(.switch *)').forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        element.style.backgroundColor = invert(computedStyle.backgroundColor, 'back');
        element.style.color = invert(computedStyle.color, 'color');
        element.setAttribute('invTouch', 'true');
    });
}

function resetColors() {
    document.querySelectorAll('[invTouch]').forEach((element) => {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.removeAttribute('invTouch');
    });
}
