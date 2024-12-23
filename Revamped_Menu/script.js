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
       { text: "Edit Level", icon: "bx bx-user", action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/setlevel.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Free Membership", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Free%20Membership.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Get Gold", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/set_gold.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Morph Forever", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Morph%20Forever.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Reset Account", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/reset.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Set Grade", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/set_grade.js')
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
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/max_account.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Unlimited Spins", icon: "bx bx-user",
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/unlimited_spins.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Compleate Quest", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/compleate_quest.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "Unlock Items", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/Unlock%20Items.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "WalkAnywhere", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/WalkAnywhere.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
       { text: "WalkSpeed", icon: "bx bx-user", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/set_walk_speed.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
        ],
        
      battle: [
    { text: "Damage Hack", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Battle/Damage%20Hack.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Escape Battle", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/Escape_battle.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
    { text: "Fix Battle Crash", icon: "bx bx-shield-quarter", 
     action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/Fix_Battle_Crash')
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
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/get_all_pets.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Clear All Pets", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/clear_pets.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Add Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/add_pet.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Delete Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/delete_pet.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Edit Pet", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/edit_pets.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Save Pet Data", icon: "bx bxs-dog", 
         action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/save_pet_data.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
      
      ],
      
      Utility: [
   { text: "Click Teleport", icon: "bx bxs-wrench", 
    action: () => alert("coming soon...") },
   { text: "Edit Walkspeed", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/set_walk_speed.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        { text: "Kick Players", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/kick_player.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Bobbified", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/bobbified.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Reset Account", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/reset.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Find Id Of People", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/find_user_id.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Dupe Account", icon: "bx bxs-wrench",
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/dupe_acc.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
   { text: "Teleport To World", icon: "bx bxs-wrench", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/teleport_to_world.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
      ],
      
      Minigame: [
   { text: "Set Walkspeed Dino", icon: "bx bxs-invader", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/dino_walk_speed.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   },
   { text: "Extra Time Dino", icon: "bx bxs-invader", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/extra_time_dino.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  },
   { text: "End Dino Dig", icon: "bx bxs-invader", 
    action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/end_dino.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
        
      ],
       
      Invintory: [
  { text: "Invintory Stacker", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/item_stacker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Clear Invintory", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/clear_inventory.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Selector (Basic)", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/selector_basic.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Selector (Adv)", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/selector(advanced).js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Remove Item", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/remove_item.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Obtain All Furniture", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/obtain_furniture.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
  { text: "Save Invintory", icon: "bx bxs-backpack", 
   action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Prodigy-menu@refs/heads/main/Menu%20Advanced/save_inventory.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText)) },
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
