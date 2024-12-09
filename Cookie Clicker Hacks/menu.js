(function() {
    // Create a floating menu container
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '150px';
    menu.style.left = '350px'; // Initial positioning for drag
    menu.style.zIndex = '9999';
    menu.style.background = '#d2691e';  // Brown color for cookie theme
    menu.style.border = '2px solid #f4a261';  // Lighter brown for borders
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.color = '#fff';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    menu.style.cursor = 'grab';
    menu.id = 'cookieClickerMenu';

    // Inner HTML for the Cookie Clicker menu
    menu.innerHTML = `
        <div id="menuHeader" style="cursor: grab; display: flex; align-items: center;">
            <img id="menuToggle"
            menuToggle.style.position = 'relative'; // Ensure icon stays relative to its parent
menuToggle.style.display = 'block'; // Prevent inline or accidental shifts
menuToggle.style.margin = '0 auto'; // Center the icon within the menu
menuToggle.style.width = '40px'; // Fixed size to prevent distortions
menuToggle.style.height = '40px'; // Match width for a square aspect
            <h3 id="menuTitle" style="margin: 0; font-size: 16px; color: white;">Cookie Clicker Hacks</h3>
        </div>
        <div id="menuContent" style="margin-top: 10px;">
            <button id="editingCategory" style="margin: 5px; padding: 5px 10px; background: #8B4513; border: none; color: white; border-radius: 5px;">Editing</button>
            <button id="funUtilityCategory" style="margin: 5px; padding: 5px 10px; background: #8B4513; border: none; color: white; border-radius: 5px;">Fun/Utility</button>
            <div id="editingButtons" style="display: none; margin-top: 10px;">
                <button id="fetch1" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Edit Cookies</button>
                <button id="fetch2" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Ruin The Fun</button>
                <button id="fetch3" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Max Out All Buildings</button>
                <button id="fetch4" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Set Sugar Lumps</button>
                <button id="fetch5" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Unlock All Achivements</button>
                <button id="fetch6" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Unlock All Upgrades</button>
                <button id="fetch7" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Upgrade Multiplier</button>
            </div>
            <div id="funUtilityButtons" style="display: none; margin-top: 10px;">
                <button id="funButton1" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Toggle Party Mode</button>
                <button id="funButton2" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Kill All Bugs</button>
                <button id="funButton3" style="margin: 5px; padding: 5px 10px; background: #6B3E1E; border: none; color: white; border-radius: 5px;">Auto Clicker</button>
                <!-- Add more buttons as needed -->
            </div>
            <button id="closeMenu" style="margin: 5px; padding: 5px 10px; background: #e74c3c; border: none; color: white; border-radius: 5px;">Close</button>
        </div>
    `;
    document.body.appendChild(menu);

    // Toggle Visibility
    const menuContent = document.getElementById('menuContent');
    const menuTitle = document.getElementById('menuTitle');
    const menuToggle = document.getElementById('menuToggle');
    const editingCategory = document.getElementById('editingCategory');
    const funUtilityCategory = document.getElementById('funUtilityCategory');
    const editingButtons = document.getElementById('editingButtons');
    const funUtilityButtons = document.getElementById('funUtilityButtons');
    const closeMenu = document.getElementById('closeMenu');

     // Toggle category visibility
    editingCategory.addEventListener('click', () => {
        editingButtons.style.display = editingButtons.style.display === 'none' ? 'block' : 'none';
        funUtilityButtons.style.display = 'none'; // Hide Fun/Utility category
    });

    funUtilityCategory.addEventListener('click', () => {
        funUtilityButtons.style.display = funUtilityButtons.style.display === 'none' ? 'block' : 'none';
        editingButtons.style.display = 'none'; // Hide Editing category
    });

    // Handle closing menu
    closeMenu.addEventListener('click', () => {
        menu.remove();
    });

  const fetchButtons = document.querySelectorAll('#editingButtons button, #funUtilityButtons button');
    fetchButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Fetch the JSON file containing button-to-script mappings
            fetch('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Cookie%20Clicker%20Hacks/TheList.json') 
                .then(response => response.json())
                .then(data => {
                    const scriptUrl = data[index].scriptUrl; // Assume the JSON file has an array of scripts with a 'scriptUrl' field
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
  // Draggable Menu Logic
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
