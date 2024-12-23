const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Nunito:400,700|Titan+One|Creepster|Satisfy|Eczar:700');
document.head.appendChild(link);

const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector('.toggle');
const searchBtn = body.querySelector('.search-box');
const searchInput = searchBtn.querySelector('input');
const modeSwitch = body.querySelector('.toggle-switch');
const modeText = body.querySelector('.mode-text');
const menuLinks = document.getElementById('menu-links');
const closeMenuBtn = body.querySelector('.close-menu');

let allButtons = []; // Store all buttons for global search

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
       { text: "Edit Level", icon: "bx bx-user", action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Edit%20Level.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Free Membership", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Free%20Membership.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Get Gold", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Get%20Gold.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Morph Forever", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Morph%20Forever.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Reset Account", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Reset%20Account.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Set Grade", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Set%20Grade.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Set Health", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Set%20Health.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Set Tower", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Set%20Tower.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Skip Tutorial", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Skip%20Tutorial.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Spam Effects", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Spam%20Effects%20On%20People.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Max Account", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Max%20account')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Unlimited Spins", icon: "bx bx-user",
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Unlimited%20Spins.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Compleate Quest", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Complete%20Quest')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Unlock Items", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Unlock%20Items.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Unlock Pets", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Unlock%20Pets.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "WalkAnywhere", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/WalkAnywhere.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "WalkSpeed", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/WalkSpeed.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
        ],
        
      battle: [
    { text: "Damage Hack", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Battle/Damage%20Hack.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Escape Battle", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Escape%20Battle')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Fix Battle Crash", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@refs/heads/main/Hacks/FixBattle')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Fill Energy", icon: "bx bx-shield-quarter",
    action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Battle/Fill%20Energy.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Invincibility Hack", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Battle/invincibilityHack.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        ],
      
      Pet: [
        { text: "Get All Pets", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Get-All-Pets')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Clear All Pets", icon: "bx bxs-dog", 
         action: () => fetch('https://raw.githubusercontent.com/PXIFusionX/Fusion-Loader/main/Hacks/Clear%20Pets')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Add Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Add-Pet')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Delete Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Delete-Pet')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Edit Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@234f8994ad5c287d98eb4142bf48ee4110fabe3a/Hacks/Edit%20pet')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Save Pet Data", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Save%20pet%20data')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
      
      ],
      
      Utility: [
   { text: "Click Teleport", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Dino%20Walk%20Speed')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Edit Walkspeed", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Walk-Speed')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Bobbified", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Bobbified')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Reset Account", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Reset')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Find Id Of People", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Find-UserID')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Dupe Account", icon: "bx bxs-wrench",
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Duplicate%20Acc')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Teleport To World", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Teleport-To-World')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
      ],
      
      Minigame: [
   { text: "Set Walkspeed Dino", icon: "bx bxs-invader", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Dino%20Walk%20Speed')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   },
   { text: "Extra Time Dino", icon: "bx bxs-invader", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Dino%20100%20Days')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  },
   { text: "End Dino Dig", icon: "bx bxs-invader", 
    action: () => fetch('https://raw.githubusercontent.com/PXIFusionX/Fusion-Loader/main/Hacks/End%20Dino')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
      ],
       
      Invintory: [
  { text: "Invintory Stacker", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 1') },
  { text: "Clear Invintory", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
  { text: "Selector (Basic)", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
  { text: "Selector (Adv)", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
  { text: "Remove Item", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
  { text: "Obtain All Furniture", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
  { text: "Save Invintory", icon: "bx bxs-backpack", 
   action: () => alert('Battle Option 2') },
         ]
    };

    // Clear current buttons
    menuLinks.innerHTML = '';

    // Add the Back button at the top
    const backButton = { text: "Back", icon: "bx bx-arrow-back", action: goBack };
    menuLinks.appendChild(createButtonElement(backButton));

    // Add the selected category's sub-buttons
    subButtons[category].forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    // Update the global button list
    updateAllButtons();

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
        { text: "Battle", icon: "bx bx-shield-quarter", action: () => loadSubButtons('battle') },
      { text: "Invintory", icon: "bx bxs-backpack", action: () => loadSubButtons('Invintory') },
      { text: "Pet", icon: "bx bxs-dog", action: () => loadSubButtons('Pet') },
      { text: "Utility", icon: "bx bxs-wrench", action: () => loadSubButtons('Utility') },
      { text: "Minigame", icon: "bx bxs-invader", action: () => loadSubButtons('Minigame') }
    ];

    // Add the buttons to the menu
    mainButtons.forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    // Update the global button list
    updateAllButtons();
}

// Helper function to create button elements
function createButtonElement(button) {
    const li = document.createElement('li');
    li.classList.add('nav-link');
    li.innerHTML = `
        <a href="#">
            <i class='bx ${button.icon || ''} icon'></i>
            <span class="text nav-text">${button.text}</span>
        </a>`;
    li.addEventListener('click', button.action);
    return li;
}

// Update the global list of all buttons
function updateAllButtons() {
    allButtons = Array.from(menuLinks.querySelectorAll('li'));
}

// Add search functionality
searchInput.addEventListener('input', () => {
    const filterText = searchInput.value.toLowerCase();

    allButtons.forEach(link => {
        const text = link.querySelector('.nav-text').textContent.toLowerCase();
        if (text.includes(filterText)) {
            link.style.display = ''; // Show the link
        } else {
            link.style.display = 'none'; // Hide the link
        }
    });

    // Ensure Back button stays visible at the top
    const backButton = allButtons.find(link => 
        link.querySelector('.nav-text')?.textContent === "Back"
    );
    if (backButton) {
        backButton.style.display = ''; // Always show Back button
        menuLinks.insertBefore(backButton, menuLinks.firstChild); // Keep Back at the top
    }
});

// Initialize the page with the main menu
loadMainMenu();
