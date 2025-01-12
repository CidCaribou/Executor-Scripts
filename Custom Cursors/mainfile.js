const swalScript = document.createElement('script');
  swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(swalScript);

const cursors = [
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/3275/starter-3d-effect-cursor-pack.png",
    title: "3D Glitch Cursor",
    subtitle: "3D Cursor",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/3d-Effect_Cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/cursors/mcdonalds_happy_meal_1167.png",
    title: "McDonalds",
    subtitle: "Happy Cursor",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/McDonals_cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/1789/pack2416.png",
    title: "Microsoft Edge Cursor",
    subtitle: "Microsoft Edge",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Microsoft_Edge_Cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/3927/starter-lights-pack.png",
    title: "Night Lights Cursor",
    subtitle: "Beutiful",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Night_Lights_Cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/7851/starter-ocean-papar-cut-pack.png",
    title: "Ocean",
    subtitle: "Its a Dolphin",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Ocean_cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/6345/starter-spikes-pack.png",
    title: "Red Spikes",
    subtitle: "Its 3D",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Red_Spike_cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/7699/starter-reindeer-in-forest-paper-cut-pack.png",
    title: "Reindeer In Forest",
    subtitle: "Its Probably Just A Deer",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Reindeer_Forest_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/3451/stain-of-paint-pack.png",
    title: "Stain Of Paint",
    subtitle: "Its Art",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/Stain_Of_Paint.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/cursors/chrome_dino_t-rex_455.png",
    title: "Chrome Dino Cursor",
    subtitle: "Your Network Disconnected",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/chrome_dino_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/cursors/disney_hand.png",
    title: "Disney Hand",
    subtitle: "Mickey Cursor",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/disney-hand_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/2144/pack2769.png",
    title: "Galixy Flask",
    subtitle: "The Fate Of The Universe Lies In Your Cursor",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/galixy_flask_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/1907/pack2535.png",
    title: "Minecraft Ore Cursor",
    subtitle: "I found diamonds!",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/minecraft_ore_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/5956/starter-fluffy-pack.png",
    title: "Fluffy Cursor",
    subtitle: "What? Its Fluffy.",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/purple_fluffy_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/3686/starter-space-pack.png",
    title: "Galixy Cursor",
    subtitle: "Its The Cursor From Fortnite",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/purple_space_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/729/pack690.png",
    title: "Infinity Gauntlet",
    subtitle: "I am inevitable",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/thanos_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/cursors/tiktok_965.png",
    title: "TikTok Cursor",
    subtitle: "Time Is Ticking For TikTok",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/tiktok_cursor.js"
    },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/534/pack494.png",
    title: "Yin And Yang",
    subtitle: "Balance",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/yin-yang_cursor.js"
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/cursors/minecraft_diamond_armor_steve_552.png",
    title: "Minecraft",
    subtitle: "Diamonds",
    fetchUrl: "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Custom%20Cursors/Cursors/MineCraft_Sword_Person_Cursor.js"
  },
];

const cursorTrails = [
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/707/pack664.png",
    title: "Trail 1",
    subtitle: "Not Released Yet",
    fetchUrl: ""
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/707/pack664.png",
    title: "Trail 2",
    subtitle: "Not Released Yet",
    fetchUrl: ""
  },
];

const clickEffects = [
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/707/pack664.png",
    title: "Effect 1",
    subtitle: "Not Released Yet",
    fetchUrl: ""
  },
  {
    imageSrc: "https://cdn.custom-cursor.com/packs/707/pack664.png",
    title: "Effect 2",
    subtitle: "Not Released Yet",
    fetchUrl: ""
  },
];

document.body.style.cssText = `
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* Prevent outer scrollbar */
`;

const menuContainer = document.createElement('div');
menuContainer.style.cssText = `
  width: 600px;
  height: 570px; 
  background: #222;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: height 0.3s ease; 
  display: flex;
  flex-direction: column;
  color: white; /* Make text white */
`;

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

menuContainer.addEventListener('mousedown', (e) => {
  if (e.target.closest('.mac-buttons')) return;
  if (e.target.closest('buttons')) return; 
  isDragging = true;
  offsetX = e.clientX - menuContainer.offsetLeft;
  offsetY = e.clientY - menuContainer.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    menuContainer.style.left = `${e.clientX - offsetX}px`;
    menuContainer.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.body.appendChild(menuContainer);

const header = document.createElement('div');
header.style.cssText = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const navContainer = document.createElement('div');
navContainer.style.cssText = `
  display: flex;
  gap: 8px;
`;

const contentContainers = {
  cursors: document.createElement('div'),
  trails: document.createElement('div'),
  effects: document.createElement('div'),
};

Object.keys(contentContainers).forEach((key) => {
  contentContainers[key].style.display = 'none';
});
contentContainers.cursors.style.display = 'grid';

const navButtons = [
  {
    text: 'Cursors',
    icon: 'https://openclipart.org/download/222076/Mouse-Cursor-Arow-Fixed.svg',
    target: 'cursors',
  },
  {
    text: 'Cursor Trails',
    icon: 'https://mp-cdn.elgato.com/media/6b9fc667-ae43-4b33-8f66-7bff3322ee9b/Mouse_Trail-app-icon-optimized-e4878913-ef80-422b-88b5-7f49cb8eec82.png',
    target: 'trails',
  },
  {
    text: 'Click Effect',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/69bacafa7391bf1c71feabd8efac64397537defea89e4ae0bfe5d87420b9fcb0?placeholderIfAbsent=true&apiKey=7cbe7b7db18741769ad03f8c16d8e56c',
    target: 'effects',
  },
];

navButtons.forEach(({ text, icon, target }) => {
  const button = document.createElement('button');
  button.style.cssText = `
    background: none;
    color: #fff;
    border: none;
    font-size: 14px;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    transition: background 0.3s; 
  `;

  button.onmouseover = () => (button.style.background = '#444');
  button.onmouseout = () => (button.style.background = 'none');
  button.onclick = () => {
    Object.keys(contentContainers).forEach((key) => {
      contentContainers[key].style.display = 'none';
    });
    contentContainers[target].style.display = 'grid';
    populateContent(target);
  };

  const img = document.createElement('img');
  img.src = icon;
  img.alt = text;
  img.style.cssText = 'width: 30px; height: 30px ;';
  button.appendChild(img);

  const span = document.createElement('span');
  span.textContent = text;
  button.appendChild(span);

  navContainer.appendChild(button);
});
header.appendChild(navContainer);

const macButtonsContainer = document.createElement('div');
macButtonsContainer.style.cssText = `
  display: flex;
  gap: 8px;
`;
macButtonsContainer.className = 'mac-buttons';

const macButtons = [
  { color: '#FF5F57', label: 'Close', action: () => menuContainer.remove() },
  { color: '#FFBC2E', label: 'Minimize', action: () => {
      const isMinimized = menuContainer.classList.toggle('minimized');
      if (isMinimized) {
        menuContainer.style.height = '38px';
        menuContainer.style.overflow = 'hidden';
      } else {
        menuContainer.style.height = '570px'; 
        menuContainer.style.overflow = 'visible'; 
      }
    } },
  { color: '#28C940', label: 'Fullscreen', action: () => menuContainer.requestFullscreen() },
];

macButtons.forEach(({ color, label, action }) => {
  const button = document.createElement('div');
  button.style.cssText = `
    width: 20px;
    height: 20px;
    background: ${color};
    border-radius: 50%;
    cursor: pointer;
  `;
  button.title = label;
  button.onclick = action;
  macButtonsContainer.appendChild(button);
});
header.appendChild(macButtonsContainer);
menuContainer.appendChild(header);

// Adding a scrollable content area
const scrollableContent = document.createElement('div');
scrollableContent.style.cssText = `
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100% - 600px);
  scrollbar-width: none; 
  -ms-overflow-style: none;  
  `;

scrollableContent.style.overflowY = 'scroll';
scrollableContent.style.scrollbarWidth = 'none'; // For Firefox
scrollableContent.style.msOverflowStyle = 'none';  // For Internet Explorer and Edge

scrollableContent.addEventListener('scroll', (e) => {
  e.target.style.overflowY = 'scroll';
  e.target.style.scrollbarWidth = 'none'; // For Firefox
  e.target.style.msOverflowStyle = 'none';  // For Internet Explorer and Edge
});

scrollableContent.addEventListener('scroll', (e) => {
  e.target.style.overflowY = 'scroll';
  e.target.style.scrollbarWidth = 'none'; // For Firefox
  e.target.style.msOverflowStyle = 'none';  // For Internet Explorer and Edge
  e.target.style['::-webkit-scrollbar'] = {
    display: 'none'
  };
});

scrollableContent['::-webkit-scrollbar'] = {
  display: 'none'
};

scrollableContent.style['::-webkit-scrollbar'] = {
  display: 'none'
};

// Adding a search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search...';
searchBar.style.cssText = `
  width: calc(100% - 32px);
  padding: 8px;
  margin: 0px 7px;
  border-radius: 4px;
  border: 1px solid #444;
  background: #333;
  color: #fff;
  font-size: 14px;
`;
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  Object.keys(contentContainers).forEach((key) => {
    const items = contentContainers[key].querySelectorAll('div');
    items.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const subtitle = item.querySelector('p').textContent.toLowerCase();
      if (title.includes(query) || subtitle.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
scrollableContent.appendChild(searchBar);

Object.values(contentContainers).forEach((container) => {
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    transition: all 0.3s ease;
     overflow-y: hidden; 
    padding: 8px; 
    margin-top: 16px; /* Optional: Add spacing between the top bar and scrollable content */
  `;
  scrollableContent.appendChild(container);
});

menuContainer.appendChild(scrollableContent);

const equippedItems = {}; 

const populateContent = (category) => {
  const contentContainer = contentContainers[category];
  contentContainer.innerHTML = ''; 

  let items = [];
  switch (category) {
    case 'cursors':
      items = cursors;
      break;
    case 'trails':
      items = cursorTrails;
      break;
    case 'effects':
      items = clickEffects;
      break;
  }

  items.forEach(({ imageSrc, title, subtitle, fetchUrl }) => {
    const item = document.createElement('div');
    item.style.cssText = `
      background: #333;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease; 
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;
    img.style.cssText = 'width: 180px; height: 100px; margin-bottom: 12px;';
    item.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.style.cssText = 'font-size: 18px; margin: 8px 0 4px;';
    item.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = subtitle;
    p.style.cssText = 'font-size: 14px; margin: 0 0 12px;';
    item.appendChild(p);

    const button = document.createElement('button');
    button.textContent = 'Equip';
    button.style.cssText = `
      background: #000;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background 0.3s; 
    `;
    button.onmouseover = () => (button.style.background = '#444');
    button.onmouseout = () => (button.style.background = '#000');
    button.onclick = () => {
      if (equippedItems[category]) {
        equippedItems[category].button.textContent = 'Equip';
      }
      button.textContent = 'Equipped';
      equippedItems[category] = { button, fetchUrl };

      fetch(fetchUrl)
        .then(response => response.text())
        .then(code => {
          eval(code); 
          console.log('Code executed successfully');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    if (equippedItems[category] && equippedItems[category].fetchUrl === fetchUrl) {
      button.textContent = 'Equipped';
      equippedItems[category].button = button;
    }

    item.appendChild(button);
    contentContainer.appendChild(item);
  });

  contentContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
};

populateContent('cursors');
