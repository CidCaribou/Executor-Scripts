let isMouseDown = false;
let isDragging = false;
let preventClick = false; 

const menuToggle = document.querySelector('#input');
const menu = document.querySelector('.switch');
let startX, startY;

menuToggle.addEventListener('click', (e) => {

    if (preventClick) {
        preventClick = false; 
        return;
    }

    if (menu.classList.contains('toggled')) {
        menu.classList.remove('toggled');
        resetColors(); 
    } else {
        menu.classList.add('toggled');
        invertColors(); 
    }
});

menu.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    isDragging = false; 
    preventClick = false; 
    startX = e.clientX;
    startY = e.clientY;

    menu.style.cursor = 'grabbing';

    const onMouseMove = (e) => {
        if (!isMouseDown) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isDragging = true;
            preventClick = true; 
        }

        if (isDragging) {

            const rect = menu.getBoundingClientRect();
            menu.style.position = 'absolute';
            menu.style.left = `${rect.left + dx}px`;
            menu.style.top = `${rect.top + dy}px`;
            startX = e.clientX; 
            startY = e.clientY;
        }
    };

    const onMouseUp = () => {
        if (isDragging) {

            preventClick = true;
        }

        isMouseDown = false;
        isDragging = false;
        menu.style.cursor = 'grab';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

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
