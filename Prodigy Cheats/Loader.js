// Prodigy Loader JavaScript Module

// Create the loader container
function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'prodigy-loader';
    loader.style.cssText = `
        width: 350px;
        background: linear-gradient(135deg, rgba(0, 123, 255, 0.9), rgba(0, 75, 200, 0.9));
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: absolute;
        top: 50px;
        left: 50px;
        z-index: 1000;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
        border-radius: 12px;
        backdrop-filter: blur(15px);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: white;
    `;

    // Header
    const header = document.createElement('div');
    header.id = 'prodigy-header';
    header.style.cssText = `
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px;
        cursor: move;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    `;

    const title = document.createElement('span');
    title.textContent = 'Prodigy Loader';
    header.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.textContent = '\u00D7';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        transition: transform 0.2s ease;
    `;
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.transform = 'scale(1.2)';
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.transform = 'scale(1)';
    });
    closeButton.addEventListener('click', () => {
        loader.style.display = 'none';
    });

    header.appendChild(closeButton);
    loader.appendChild(header);

    // Content
    const content = document.createElement('div');
    content.id = 'prodigy-content';
    content.style.cssText = `
        padding: 20px;
        display: block;
        text-align: center;
    `;

    const button1 = createButton('Prodigy Cheats Menu #1', () => {
        alert('Running Code 1');
        fetch('https://cdn.jsdelivr.net/gh/Blooket-Council/Blooket-Cheats@main/cheats/gui.js')
            .then(response => response.text())
            .then(scriptText => eval(scriptText))
            .catch(error => console.error("Error fetching or executing script:", error));
    });

    const button2 = createButton('Prodigy Cheats Menu #2', () => {
        alert('Running Code 2');
        fetch('https://cdn.jsdelivr.net/gh/Blooket-Council/Blooket-Cheats@main/cheats/gui.js')
            .then(response => response.text())
            .then(scriptText => eval(scriptText))
            .catch(error => console.error("Error fetching or executing script:", error));
    });

    content.appendChild(button1);
    content.appendChild(button2);
    loader.appendChild(content);

    // Add dragging functionality
    makeDraggable(loader, header);

    document.body.appendChild(loader);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = `
        display: block;
        width: 100%;
        padding: 12px;
        margin-bottom: 15px;
        background: rgba(0, 123, 255, 1);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        transition: background 0.3s, transform 0.2s;
    `;
    button.addEventListener('mouseover', () => {
        button.style.background = 'rgba(0, 100, 220, 1)';
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.background = 'rgba(0, 123, 255, 1)';
        button.style.transform = 'scale(1)';
    });
    button.addEventListener('click', onClick);
    return button;
}

function makeDraggable(element, handle) {
    let offsetX = 0, offsetY = 0, isDragging = false;

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Initialize the loader when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createLoader);
