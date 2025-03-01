const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Nunito:400,700|Titan+One|Creepster|Satisfy|Eczar:700');
document.head.appendChild(link);

const style = document.createElement('style');
style.textContent = `
/* Google Font Import - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
*{
}

:root{
    /* ===== Colors ===== */
    --sidebar-color: #FFF;
    --primary-color: #695CFE;
    --primary-color-light: #F6F5FF;
    --toggle-color: #DDD;
    --text-color: #707070;

    /* ====== Transition ====== */
    --tran-03: all 0.2s ease;
    --tran-03: all 0.3s ease;
    --tran-04: all 0.3s ease;
    --tran-05: all 0.3s ease;
}

body{
    min-height: 100vh;
    transition: var(--tran-05);
}

::selection{
    background-color: var(--primary-color);
    color: #fff;
}

body.dark{
    --sidebar-color: #242526;
    --primary-color: #3a3b3c;
    --primary-color-light: #3a3b3c;
    --toggle-color: #fff;
    --text-color: #ccc;
}

/* ===== Sidebar ===== */
 .sidebar{
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    height: 100%;
    width: 250px;
    padding: 10px 14px;
    background: var(--sidebar-color);
    transition: var(--tran-05);
    z-index: 99999;  
}
.sidebar.close{
    width: 1px;
   transform: translateX(-100%);

}

.Minimize.Arrow {
    position: absolute; 
    top: 0px;           
    right: -9px;       
    font-size: 100px;   
    height: 35px;      
    width: 35px;        
    line-height: 100px;  
}


/* ===== Reusable code - Here ===== */
.sidebar li{
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.sidebar header .image,
.sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
}

.sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.sidebar .text,
.sidebar .icon{
    color: var(--text-color);
    transition: var(--tran-03);
}

.sidebar .text{
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 1;
}
.sidebar.close .text{
    opacity: 0;
}
.sidebar.close .image img {
    opacity: 0; /* Makes the icon fully transparent */
    transition: opacity 0.3s ease; /* Optional: adds smooth transition */
}

/* =========================== */

.sidebar header{
    position: relative;
}

.sidebar header .image-text{
    display: flex;
    align-items: center;
}
.sidebar header .logo-text{
    display: flex;
    flex-direction: column;
}
header .image-text .name {
    margin-top: 2px;
    font-size: 18px;
    font-weight: 600;
}

header .image-text .profession{
    font-size: 16px;
    margin-top: -2px;
    display: block;
}

.sidebar header .image{
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar header .image img{
    width: 40px;
    border-radius: 6px;
}

.sidebar header .toggle{
    position: absolute;
    top: 50%;
    right: -25px;
    transform: translateY(-50%) rotate(180deg);
    height: 25px;
    width: 25px;
    background-color: var(--primary-color);
    color: var(--sidebar-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    transition: var(--tran-05);
}

body.dark .sidebar header .toggle{
    color: var(--text-color);
}

.sidebar.close .toggle{
    transform: translateY(-50%) rotate(0deg);
}

.sidebar .menu{
    margin-top: 40px;
}

.sidebar li.search-box{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    cursor: pointer;
    transition: var(--tran-05);
}

.sidebar li.search-box input{
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    background-color: var(--primary-color-light);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    transition: var(--tran-05);
}
.sidebar li a{
    list-style: none;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    text-decoration: none;
    transition: var(--tran-03);
}

.sidebar li a:hover{
    background-color: var(--primary-color);
}
.sidebar li a:hover .icon,
.sidebar li a:hover .text{
    color: var(--sidebar-color);
}
body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text{
    color: var(--text-color);
}

.sidebar .menu-bar{
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
}
.menu-bar::-webkit-scrollbar{
    display: none;
}
.sidebar .menu-bar .mode{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    position: relative;
    transition: var(--tran-05);
}

.menu-bar .mode .sun-moon{
    height: 50px;
    width: 60px;
}

.mode .sun-moon i{
    position: absolute;
}
.mode .sun-moon i.sun{
    opacity: 0;
}
body.dark .mode .sun-moon i.sun{
    opacity: 1;
}
body.dark .mode .sun-moon i.moon{
    opacity: 0;
}

.menu-bar .bottom-content .toggle-switch{
    position: absolute;
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
}
.toggle-switch .switch{
    position: relative;
    height: 22px;
    width: 40px;
    border-radius: 25px;
    background-color: var(--toggle-color);
    transition: var(--tran-05);
}

.switch::before{
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background-color: var(--sidebar-color);
    transition: var(--tran-04);
}

body.dark .switch::before{
    left: 20px;
}

.home{
    position: absolute;
    top: 0;
    top: 0;
    left: 250px;
    height: 100vh;
    width: calc(100% - 250px);
    background-color: var(--body-color);
    transition: var(--tran-05);
}
.home .text{
    font-size: 30px;
    font-weight: 500;
    color: var(--text-color);
    padding: 12px 60px;
}

.sidebar.close ~ .home{
    left: 78px;
    height: 100vh;
    width: calc(100% - 78px);
}
body.dark .home .text{
    color: var(--text-color);
}
`;
document.head.appendChild(style);

const customHTML = `
 <!DOCTYPE html>
<!-- Coding by CodingLab | www.codinglabweb.com -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="style.css">
    
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    
    <!--<title>Dashboard Sidebar Menu</title>--> 
</head>
<body>
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Prodigy_icon_2020.svg/1200px-Prodigy_icon_2020.svg.png" alt="">
              </span>

                <div class="text logo-text">
                    <span class="name">Prodigy Cheats</span>
                    <span class="profession">Made By Wasd</span>
                </div>
            </div>

          <div class="Minimize Arrow">
           <i class='bx bx-chevron-right toggle'></i>
        </header>

        <div class="menu-bar">
            <div class="menu">

                <li class="search-box">
                    <i class='bx bx-search icon'></i>
                    <input type="text" placeholder="Search...">
                </li>

                <ul class="menu-links" id="menu-links">
                    <!-- Default menu items will be inserted here -->
                </ul>
            </div>

            <div class="bottom-content">
                <li class="close-menu">
                    <a href="#">
                        <i class='bx bx-log-out icon'></i>
                        <span class="text nav-text">Close Menu</span>
                    </a>
                </li>

                <li class="mode">
                    <div class="sun-moon">
                        <i class='bx bx-moon icon moon'></i>
                        <i class='bx bx-sun icon sun'></i>
                    </div>
                    <span class="mode-text text">Dark mode</span>

                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>

    <section class="home">
    </section>
</body>
</html>
`;
document.body.insertAdjacentHTML('beforeend', customHTML);

const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector('.toggle');
const searchBtn = body.querySelector('.search-box');
const searchInput = searchBtn.querySelector('input');
const modeSwitch = body.querySelector('.toggle-switch');
const modeText = body.querySelector('.mode-text');
const menuLinks = document.getElementById('menu-links');
const closeMenuBtn = body.querySelector('.close-menu');

let allButtons = []; 

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

searchBtn.addEventListener('click', () => {
    sidebar.classList.remove('close');
});

modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    modeText.innerText = body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
});

closeMenuBtn.addEventListener('click', () => {
    sidebar.remove();
});

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
        { text: "Walk Anywhere", icon: "bx bxs-wrench", 
        action: () => fetch('https://cdn.jsdelivr.net/gh/rxzyx/prodigy-hack@refs/heads/main/Player/WalkAnywhere.js')
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

    menuLinks.innerHTML = '';

    const backButton = { text: "Back", icon: "bx bx-arrow-back", action: goBack };
    menuLinks.appendChild(createButtonElement(backButton));

    subButtons[category].forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    updateAllButtons();

    sidebar.classList.remove('close');
}

function goBack() {
    loadMainMenu();
}

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

    mainButtons.forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    updateAllButtons();
}

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

function updateAllButtons() {
    allButtons = Array.from(menuLinks.querySelectorAll('li'));
}

searchInput.addEventListener('input', () => {
    const filterText = searchInput.value.toLowerCase();

    allButtons.forEach(link => {
        const text = link.querySelector('.nav-text').textContent.toLowerCase();
        if (text.includes(filterText)) {
            link.style.display = ''; 
        } else {
            link.style.display = 'none'; 
        }
    });
   
    const backButton = allButtons.find(link => 
        link.querySelector('.nav-text')?.textContent === "Back"
    );
    if (backButton) {
        backButton.style.display = ''; 
        menuLinks.insertBefore(backButton, menuLinks.firstChild); 
    }
});

loadMainMenu();
