const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector('.toggle');
const searchBtn = body.querySelector('.search-box');
const modeSwitch = body.querySelector('.toggle-switch');
const modeText = body.querySelector('.mode-text');
const menuLinks = document.getElementById('menu-links');
const closeMenuBtn = body.querySelector('.close-menu');

// Toggle sidebar visibility
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

// Close sidebar when search is clicked
searchBtn.addEventListener('click', () => {
    sidebar.classList.remove('close');
});

// Switch between dark and light modes
modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    modeText.innerText = body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
});

// Completely remove the menu from the DOM when "Close Menu" is clicked
closeMenuBtn.addEventListener('click', () => {
    sidebar.remove(); // Removes the entire sidebar from the DOM
});

// Load sub-buttons and replace current sidebar buttons
function loadSubButtons(category) {
    const subButtons = {
        player: [
            { text: "Back", icon: "bx bx-arrow-back", action: goBack },
            { text: "Damage Hack", action: () => alert('Player Option 1') },
            { text: "Player Option 2", action: () => alert('Player Option 2') },
            { text: "Player Option 2", action: () => alert('Player Option 2') }
        ],
        battle: [
            { text: "Back", icon: "bx bx-arrow-back", action: goBack },
            { text: "Battle Option 1", action: () => alert('Battle Option 1') },
            { text: "Battle Option 2", action: () => alert('Battle Option 2') }
        ]
    };

    // Clear current buttons
    menuLinks.innerHTML = '';

    // Add the selected category's sub-buttons
    subButtons[category].forEach(button => {
        const li = document.createElement('li');
        li.classList.add('nav-link');
        li.innerHTML = `
            <a href="#">
                <i class='bx ${button.icon || ''} icon'></i>
                <span class="text nav-text">${button.text}</span>
            </a>`;
        li.addEventListener('click', button.action);
        menuLinks.appendChild(li);
    });

    sidebar.classList.remove('close');
}

// Function for back button behavior
function goBack() {
    loadMainMenu();
}

// Load the main menu (called initially when the page loads)
function loadMainMenu() {
    menuLinks.innerHTML = '';
    const mainButtons = [
        { text: "Player", icon: "bx bx-user", action: () => loadSubButtons('player') },
        { text: "Battle", icon: "bx bx-shield-quarter", action: () => loadSubButtons('battle') }
    ];

    mainButtons.forEach(button => {
        const li = document.createElement('li');
        li.classList.add('nav-link');
        li.innerHTML = `
            <a href="#">
                <i class='bx ${button.icon} icon'></i>
                <span class="text nav-text">${button.text}</span>
            </a>`;
        li.addEventListener('click', button.action);
        menuLinks.appendChild(li);
    });
}

// Initialize the page with the main menu
loadMainMenu();
