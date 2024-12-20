let isMouseDown = false;
let isDragging = false;
let wasClicked = false; // Track if it's just a click or drag

// Select the menu elements
const menuToggle = document.querySelector('#input');
const menu = document.querySelector('.switch');
const menuContent = document.querySelector('.slider .sun-moon'); // Content or body of the menu
const menuTitle = document.querySelector('.slider .stars'); // Or title element (adjust as needed)

let startX, startY, offsetX, offsetY;

// Toggle Moon/Sun Logic
menuToggle.addEventListener('click', (e) => {
    // If dragging occurred, don't trigger the click
    if (isDragging) {
        e.preventDefault(); // Prevent toggle if dragging
        return;
    }

    // Handle the toggle logic if it's a click (not dragging)
    if (menuToggle.checked) {
        invertColors(); // Apply color inversion when moon is on
    } else {
        resetColors(); // Reset to normal colors when sun is on
    }

    wasClicked = false; // Reset the click flag
});

// Draggable Logic
menu.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    wasClicked = true;  // Mark as clicked (for future checks)
    e.preventDefault();  // Prevent accidental clicks while dragging

    startX = e.clientX;
    startY = e.clientY;

    const rect = menu.getBoundingClientRect();
    offsetX = rect.left;
    offsetY = rect.top;

    menu.style.cursor = 'grabbing';

    const onMouseMove = (e) => {
        isDragging = true; // Mark that dragging has occurred
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        menu.style.position = 'absolute'; // Ensure menu moves smoothly
        menu.style.left = `${offsetX + dx}px`;
        menu.style.top = `${offsetY + dy}px`;

        wasClicked = false; // Reset click flag during drag
    };

    const onMouseUp = () => {
        isMouseDown = false;
        isDragging = false; // Dragging has ended
        menu.style.cursor = 'grab';

        // Remove mousemove and mouseup event listeners after dragging
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Listen for mousemove and mouseup events during dragging
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
