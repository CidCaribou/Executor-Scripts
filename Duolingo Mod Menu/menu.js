(function() {
alert("You can get banned use at your own risk.\n\nMenu By Cid\n\nCheats Made by rxzyx on github");    

    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '20px';
    menu.style.left = '20px'; 
    menu.style.zIndex = '9999';
    menu.style.background = '#58CC02';
    menu.style.border = '2px solid #006400';
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.color = '#FFFFFF';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    menu.style.cursor = 'grab';
    menu.id = 'duolingoMenu';

    menu.innerHTML = `
        <div id="menuHeader" style="cursor: grab; display: flex; align-items: center;">
            <img id="menuToggle" 
                 src="https://cdn.jim-nielsen.com/ios/512/duolingo-2019-01-02.png?rf=1024" 
                 alt="Duolingo Menu" 
                 draggable="false" 
                 style="width: 40px; height: 40px; cursor: pointer; margin-right: 10px;">
            <h3 id="menuTitle" style="margin: 0; font-size: 16px;">Duolingo Cheat Menu</h3>
        </div>
        <div id="menuContent" style="margin-top: 10px;">
            <button id="categoryButton" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Category</button>
            <div id="categoryButtons" style="display: none; margin-top: 10px;">
                <button id="playerButton1" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Answer Hack</button>
                <button id="playerButton2" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Max All Skills</button>
                <button id="playerButton3" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Plus Hack</button>
                <button id="playerButton4" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Restore All Skills</button>
                <button id="playerButton5" style="margin: 5px; padding: 5px 10px; background: #006400; border: none; color: white; border-radius: 5px;">Unlock All Skills</button>
            </div>
            <button id="closeMenu" style="margin: 5px; padding: 5px 10px; background: #FF4136; border: none; color: white; border-radius: 5px;">Close</button>
        </div>
    `;

    document.body.appendChild(menu);

    const menuContent = document.getElementById('menuContent');
    const menuTitle = document.getElementById('menuTitle');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const categoryButton = document.getElementById('categoryButton');
    const categoryButtons = document.getElementById('categoryButtons'); // Get the container for category buttons

    let isMinimized = false;

    // Add event listener to toggle category buttons visibility
    categoryButton.addEventListener('click', () => {
        categoryButtons.style.display = categoryButtons.style.display === 'none' ? 'block' : 'none';
    });

    // Add event listener to close the menu
    closeMenu.addEventListener('click', () => {
        menu.remove();
    });

    // Fetch and execute scripts for the buttons
    const buttons = categoryButtons.querySelectorAll('button'); // Get the buttons within the category
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Duolingo%20Mod%20Menu/File.json')
                .then(response => response.json())
                .then(data => {
                    const scriptUrl = data[index]?.scriptUrl;
                    if (scriptUrl) {
                        const scriptElement = document.createElement('script');
                        scriptElement.src = scriptUrl;
                        scriptElement.onload = () => {
                            console.log(`Script loaded from: ${scriptUrl}`);
                        };
                        scriptElement.onerror = () => {
                            console.error(`Error loading script from: ${scriptUrl}`);
                        };
                        document.body.appendChild(scriptElement);
                    } else {
                        console.error(`No script URL found for button index ${index}`);
                    }
                })
                .catch(error => {
                    console.error('Error fetching script:', error);
                });
        });
    });

    // Menu drag functionality
    let isMouseDown = false;
    let isDragging = false;
    let wasClicked = false;

    menuToggle.addEventListener('click', (e) => {
        if (wasClicked && !isDragging) {
            isMinimized = !isMinimized;
            menuContent.style.display = isMinimized ? 'none' : 'block';
            menuTitle.style.display = isMinimized ? 'none' : 'block';
            wasClicked = false;
        }
    });

    const header = document.getElementById('menuHeader');
    let startX, startY, offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        wasClicked = true;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        const rect = menu.getBoundingClientRect();
        offsetX = rect.left;
        offsetY = rect.top;

        menu.style.cursor = 'grabbing';

        const onMouseMove = (e) => {
            isDragging = true;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            menu.style.left = `${offsetX + dx}px`;
            menu.style.top = `${offsetY + dy}px`;
            wasClicked = false;
        };

        const onMouseUp = () => {
            isMouseDown = false;
            isDragging = false;
            menu.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();
