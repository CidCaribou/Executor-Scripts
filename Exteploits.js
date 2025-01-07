(function() {
    if (document.getElementById('executor-menu')) return;

  console.log("        .            )        )\r\n                  (  (|              .\r\n              )   )\\\/ ( ( (\r\n      *  (   ((  \/     ))\\))  (  )    )\r\n    (     \\   )\\(          |  ))( )  (|\r\n    >)     ))\/   |          )\/  \\((  ) \\\r\n    (     (      .        -.     V )\/   )(    (\r\n     \\   \/     .   \\            .       \\))   ))\r\n       )(      (  | |   )            .    (  \/\r\n      )(    ,\'))     \\ \/          \\( `.    )\r\n      (\\>  ,\'\/__      ))            __`.  \/\t   .\r\n     ( \\   | \/  ___   ( \\\/     ___   \\ | ( (\r\n      \\.)  |\/  \/   \\__      __\/   \\   \\|  ))\t.\r\n     .  \\. |>  \\      | __ |      \/   <|  \/\r\n          )\/    \\____\/ :..: \\____\/     \\ <\r\n   )   \\ (|__  .      \/ ;: \\          __| )  (\r\n  ((    )\\)  ~--_     --  --      _--~    \/  ))\r\n   \\    (    |  ||               ||  |   (  \/\r\n         \\.  |  ||_             _||  |  \/\r\n )         > :  |  ~V+-I_I_I-+V~  |  : (.     (\r\n          (  \\:  T\\   _     _   \/T  : .\/   )\t\t\r\n           \\  :    T^T T-+-T T^T    ;<\t\t.\r\n  .         \\..`_       -+-       _\'  )\r\n               . `--=.._____..=--\'. .\/         (\r\n        ) (          )             ( \n%c Executor V2 %c\n            Credits: Wasd", "color: #ff2b1c; font-size: 3rem", "color: #ff740a; font-size: 1rem");

  const swalScript = document.createElement('script');
  swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(swalScript);

const shadowHost = document.createElement('div');
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
const menu = document.createElement('div');
menu.id = 'executor-menu';
menu.style.cssText = `
  position: fixed;
  top: 100px;
  left: 100px;
  width: 400px;
  height: 350px;
  background: #f5f5f7;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 12px;
  z-index: 10000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  user-select: none;
  overflow: hidden;
  transition: height 0.3s ease, border-radius 0.3s ease;
`;
shadowRoot.appendChild(menu);

    const header = document.createElement('div');
    header.style.width = '100%';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.padding = '8px 10px';
    header.style.background = '#e5e5e7';
    header.style.borderBottom = '1px solid #ccc';
    header.style.borderRadius = '12px 12px 0 0';
    header.style.cursor = 'grab';
    header.style.boxSizing = 'border-box';

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '8px';
    header.appendChild(buttonContainer);

    const createButton = (color) => {
        const btn = document.createElement('div');
        btn.style.width = '12px';
        btn.style.height = '12px';
        btn.style.borderRadius = '50%';
        btn.style.background = color;
        btn.style.border = '1px solid rgba(0,0,0,0.1)';
        btn.style.cursor = 'pointer';
        return btn;
    };

  const createSettingsButton = () => {
    const settingsBtn = document.createElement('button');
    settingsBtn.textContent = 'Settings';
    settingsBtn.style.padding = '10px 20px';
    settingsBtn.style.borderRadius = '5px';
    settingsBtn.style.border = '1px solid rgba(0,0,0,0.1)';
    settingsBtn.style.background = '#f0f0f0';
    settingsBtn.style.cursor = 'pointer';
    settingsBtn.style.fontSize = '14px';
    settingsBtn.style.marginTop = '10px';

    settingsBtn.addEventListener('click', () => {
        alert('Settings button clicked!');
    });

    return settingsBtn;
};

    const closeButton = createButton('#ff5f57');
    const minimizeButton = createButton('#ffbd2e');
    const maximizeButton = createButton('#28c840');

    buttonContainer.appendChild(closeButton);
    buttonContainer.appendChild(minimizeButton);
    buttonContainer.appendChild(maximizeButton);

    const title = document.createElement('div');
    title.innerText = 'Executor V2';
    title.style.marginLeft = 'auto';
    title.style.marginRight = '';
    title.style.fontSize = '14px';
    title.style.color = '#333';
    header.appendChild(title);

    const searchContainer = document.createElement('div');
    searchContainer.style.marginLeft = 'auto';
    searchContainer.style.display = 'flex';
    searchContainer.style.alignItems = 'center';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.style.width = '120px';
    searchInput.style.padding = '5px';
    searchInput.style.border = '1px solid #ccc';
    searchInput.style.borderRadius = '8px';
    searchInput.style.fontSize = '12px';
    searchInput.style.color = '#000';  
    searchInput.style.backgroundColor = '#fff';  

    searchContainer.appendChild(searchInput);
    header.appendChild(searchContainer);

    menu.appendChild(header);

    const sidebar = document.createElement('div');
    sidebar.style.width = '140px';
    sidebar.style.height = 'calc(100% - 30px)';
    sidebar.style.background = '#d3d3d3';
    sidebar.style.borderRight = '1px solid #ccc';
    sidebar.style.float = 'left';
    sidebar.style.boxSizing = 'border-box';
    menu.appendChild(sidebar);

    const sidebarButtons = ['All', 'Games', 'Tools', 'Game Cheats', 'Fun'];
    const buttonGroups = {
        'All': [
            { text: 'Dark&Light Mode', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/LightDarkMode/mainfile.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
            { text: 'Draw On website', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/drawonwebsite.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
            { text: 'Auto Clicker', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/autoclicker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            },
           { text: 'Snow', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/snow.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
            { text: 'Cloaker', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Tab_Cloaker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            },
          { text: 'History Flooder', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/HistoryFlooder.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Dev Console', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/DevConsole.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'MineCraft Overlay', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/MineCraftOverlay.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
          { text: 'Dictionary', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/dictionary.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Ad Blocker', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/adblocker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
             { text: 'Blooket Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Blooket%20Hacks%20/Blooket_Hacks_V2.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))
           },
            { text: 'Cookie Clicker Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Cookie%20Clicker%20Hacks/mainmenu.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
  },
          { text: 'Chrome Dino Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Chrome_Dino_Hacks.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: '3D Webpage', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/3Dpage.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
  },
            { text: 'Snake X More Menu Mod', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Google_SnakeXMore_Menu_Mod.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            },
          { text: 'Duolingo Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Duolingo%20Mod%20Menu/menu.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            }
        ],
        'Games': [
            { text: 'Snake X More Menu Mod', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Google_SnakeXMore_Menu_Mod.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            }     
        ],
        'Tools': [
            { text: 'Cloaker', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Tab_Cloaker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'History Flooder', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/HistoryFlooder.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Dictionary', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/dictionary.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Ad Blocker', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/adblocker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Dev Console', action: () =>fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/DevConsole.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
            { text: 'Dark&Light Mode', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/LightDarkMode/mainfile.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            },
          { text: 'Auto Clicker', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/autoclicker.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
            }
        ],
        'Game Cheats': [
            { text: 'Blooket Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Blooket%20Hacks%20/Blooket_Hacks_V2.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))
},
            { text: 'Prodigy Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Revamped_Menu/mainfile.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))
 },
          { text: 'Cookie Clicker Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Cookie%20Clicker%20Hacks/mainmenu.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Chrome Dino Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Chrome_Dino_Hacks.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Duolingo Cheats', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Duolingo%20Mod%20Menu/menu.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 },
          { text: 'Snake X More Menu Mod', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Google_SnakeXMore_Menu_Mod.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))  
 }
        ],
        'Fun': [
            { text: 'Draw On website', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/drawonwebsite.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
          { text: 'MineCraft Overlay', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/MineCraftOverlay.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
          { text: 'Snow', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/snow.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))   
            },
            { text: '3D Webpage', action: () => fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/3Dpage.js')
    .then(response => response.text())  
    .then(scriptText => eval(scriptText))
            }
        ],
    };

    const content = document.createElement('div');
    content.style.marginLeft = '140px';
    content.style.padding = '20px';
    content.style.height = 'calc(100% - 40px)';
    content.style.overflowY = 'auto';
    content.style.display = 'block';

    function displayButtons(groupName) {
        content.innerHTML = '';
        const buttonsToDisplay = buttonGroups[groupName];
        buttonsToDisplay.forEach(({ text, action }) => {
            const button = createButtonElement(text, action);
            content.appendChild(button);
        });
    }

const settingsButton = document.createElement('button');
settingsButton.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXtJREFUSEu1letRxDAMhPc6gUqASoBKgEqASoBKoBPgy3gzi+JzzMDpjyeJrX1IVg46cRxOnF+zAJeS7iSxEq+SHto65DgL8C7prGQC5GrPgRkAEgNAeP9nez6X9DEC6QHYDhgS920lEQmJVPQUAG/fSvN5U4MbSY8dRtXzWpM8cpsgVYGlw8Kej4oJEIQggELUslKbxboEMPu0wswAo4vYw3crqv7bulVFD8C+P7dkWeS04gfTpgQCBAqWGlaLzJKk7hAs4CAHYEbwDnvcqkkCm7B1iV4XWaa/+Xll1erD+7ST+m3sHQFYQQ8A9i9B0gp2AbDIfW8AEtkOpJPEFtFt2DZlUW7yQUj+psgQYf+wi3ozhkPXrdiAZsGzs4ZtmiMAmzw5Zy6a74YvmkdKt01dg2Rmxr5YKHId6mQZjgo20/MXccq+Zlt7pPhSsrJvo3ZmXNeWJNmfxnWVnLWpo2L1unfo2E3u7fXU9IT991/mMYK772dqsJtktOEL4YBvGcKicUQAAAAASUVORK5CYII=" alt="Settings Icon" style="width: 20px; margin-right: 8px; vertical-align: middle;"> Settings`;
settingsButton.style.display = 'block';
settingsButton.style.width = '120px';
settingsButton.style.margin = '10px auto';
settingsButton.style.padding = '10px';
settingsButton.style.border = '1px solid #ccc';
settingsButton.style.borderRadius = '12px';
settingsButton.style.background = '#ffffff'; 
settingsButton.style.color = '#000'; 
settingsButton.style.cursor = 'pointer';
settingsButton.style.transition = 'transform 0.2s ease-in-out';
settingsButton.style.position = 'absolute'; 
settingsButton.style.top = '280px'; 
settingsButton.style.left = '10px'; 
settingsButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

  const icon = settingsButton.querySelector('img');
icon.style.transition = 'transform 0.2s ease';

settingsButton.addEventListener('mouseenter', () => {
    settingsButton.style.transform = 'scale(1.1)'; 
    const icon = settingsButton.querySelector('img');
    icon.style.transform = 'rotate(90deg) scale(1.1)'; 
});

settingsButton.addEventListener('mouseleave', () => {
    settingsButton.style.transform = 'scale(1)'; 
    const icon = settingsButton.querySelector('img');
    icon.style.transform = 'rotate(0deg) scale(1)'; 
});

settingsButton.addEventListener('mousedown', () => {
    settingsButton.style.transform = 'scale(0.9)';
});

settingsButton.addEventListener('mouseup', () => {
    settingsButton.style.transform = 'scale(1)';
});

settingsButton.addEventListener('click', () => {
});

sidebar.appendChild(settingsButton);

settingsButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
    content.innerHTML = '';

    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';
    content.style.height = '100vh';
    content.style.backgroundColor = '#f5f5f5'; 

    const settingsContainer = document.createElement('div');
    settingsContainer.style.display = 'grid';
    settingsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    settingsContainer.style.gap = '20px';
    settingsContainer.style.backgroundColor = 'white';
    settingsContainer.style.padding = '30px';
    settingsContainer.style.borderRadius = '10px';
    settingsContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    settingsContainer.style.maxWidth = '318px';
    settingsContainer.style.width = '100%';
    settingsContainer.style.textAlign = 'center';
    settingsContainer.style.position = 'relative';

    settingsContainer.style.position = 'absolute';
    settingsContainer.style.top = '65px';
    settingsContainer.style.left = '10px';

    const categories = [
        { name: 'Accounts', icon: '👤' },
        { name: 'Privacy', icon: '🔒' },
        { name: 'Update Checker', icon: '🔄️' },
        { name: 'Back', icon: '⬅️' }
    ];

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.style.display = 'flex';
        categoryContainer.style.flexDirection = 'column';
        categoryContainer.style.alignItems = 'center';
        categoryContainer.style.cursor = 'pointer';
        categoryContainer.style.transition = 'transform 0.3s, background-color 0.3s';
        categoryContainer.style.padding = '10px';
        categoryContainer.style.borderRadius = '10px';

        categoryContainer.addEventListener('mouseover', () => {
            categoryContainer.style.backgroundColor = '#f0f0f0';
            categoryContainer.style.transform = 'translateY(-5px)';
        });
        categoryContainer.addEventListener('mouseout', () => {
            categoryContainer.style.backgroundColor = 'transparent';
            categoryContainer.style.transform = 'none';
        });

        categoryContainer.addEventListener('click', () => {
            if (category.name === 'Back') {

                sidebar.style.display = 'block'; 
                content.innerHTML = ''; 
                return; 
            }
            openSettings(category.name);
        });

        const icon = document.createElement('div');
        icon.style.fontSize = '36px';
        icon.style.marginBottom = '10px';
        icon.innerText = category.icon;
        categoryContainer.appendChild(icon);

        const text = document.createElement('div');
        text.style.fontSize = '14px';
        text.style.fontWeight = 'bold';
        text.innerText = category.name;
        categoryContainer.appendChild(text);

        settingsContainer.appendChild(categoryContainer);
    });

    content.appendChild(settingsContainer);

    function openSettings(category) {
        alert(`Opening settings for ${category}`);

    }
});

    function createSidebarButton(groupName) {
        const button = document.createElement('button');
        button.innerText = groupName;
        button.style.display = 'block';
        button.style.width = '120px';
        button.style.margin = '10px auto';
        button.style.padding = '10px';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '12px';
        button.style.background = '#ffffff'; 
        button.style.color = '#000'; 
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.2s ease-in-out';

      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';  
    });

    button.addEventListener('mouseleave', () => {      
        button.style.transform = 'scale(1)';  
    });

      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.9)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });

        button.addEventListener('click', () => {
            displayButtons(groupName);
        });

        return button;
    }

        function createButtonElement(btnText, action) {
        const button = document.createElement('button');
        button.innerText = btnText;
        button.style.display = 'block';
        button.style.width = '120px';
        button.style.margin = '10px auto';
        button.style.padding = '10px';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '12px';
        button.style.background = '#ffffff'; 
        button.style.color = '#000'; 
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.2s ease-in-out';

           button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';  
    });

    button.addEventListener('mouseleave', () => {      
        button.style.transform = 'scale(1)';  
    });
          button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.9)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });

     button.addEventListener('click', () => {
    showToast('Loading...', 'warning');
    action()
      .then(() => {
        showToast('Script loaded successfully', 'success');
      })
      .catch(() => {
        showToast('Failed to load script', 'error'); 
      });
  });

const showToast = (message, icon) => {
  Swal.fire({
    toast: true,
    position: 'bottom',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

        return button;
    }

    sidebarButtons.forEach((btnText) => {
        const button = createSidebarButton(btnText);
        sidebar.appendChild(button);
    });

    menu.appendChild(content);
    document.body.appendChild(menu);

    displayButtons('All');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        content.innerHTML = '';
        const allButtons = buttonGroups['All'];
        const filteredButtons = allButtons.filter(({ text }) =>
            text.toLowerCase().includes(query)
        );
        filteredButtons.forEach(({ text, action }) => {
            const button = createButtonElement(text, action);
            content.appendChild(button);
        });
    });

    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
        header.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            menu.style.left = e.clientX - offsetX + 'px';
            menu.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        header.style.cursor = 'grab';
    });

    closeButton.addEventListener('click', () => {
        menu.remove();
    });

    let isMinimized = false;
    minimizeButton.addEventListener('click', () => {
        if (isMinimized) {
            menu.style.height = '350px';
            content.style.display = 'block';
        } else {
            menu.style.height = '42.3px';
            content.style.display = 'none';
        }
        isMinimized = !isMinimized;
    });
})();
