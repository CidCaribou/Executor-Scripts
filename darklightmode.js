(function() {
    if (document.getElementById('theme-toggle-switch')) return;

    // Create the menu container for the switch
    const switchContainer = document.createElement('div');
    switchContainer.id = 'theme-toggle-switch';
    switchContainer.style.position = 'fixed';
    switchContainer.style.top = '100px';
    switchContainer.style.left = '100px';
    switchContainer.style.width = '100px';
    switchContainer.style.height = '50px';
    switchContainer.style.backgroundColor = '#e5e5e7';
    switchContainer.style.borderRadius = '50px';
    switchContainer.style.zIndex = '10000';
    switchContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    switchContainer.style.cursor = 'pointer';
    switchContainer.style.transition = 'background-color 0.3s ease';
    switchContainer.style.display = 'flex';
    switchContainer.style.alignItems = 'center';
    switchContainer.style.justifyContent = 'center';
    
    // Create the sliding circle for the switch
    const toggleCircle = document.createElement('div');
    toggleCircle.style.position = 'absolute';
    toggleCircle.style.top = '50%';
    toggleCircle.style.left = '5px'; // Adjust starting position
    toggleCircle.style.transform = 'translateY(-50%)'; // Vertically center the circle
    toggleCircle.style.width = '40px'; // Circle size
    toggleCircle.style.height = '40px'; // Circle size
    toggleCircle.style.borderRadius = '50%';
    toggleCircle.style.backgroundColor = '#ffffff';
    toggleCircle.style.transition = 'left 0.3s ease';

    switchContainer.appendChild(toggleCircle);

    // Create the sun and moon icons as images
    const sunIcon = document.createElement('img');
    sunIcon.src = 'https://cdn-icons-png.flaticon.com/512/10480/10480648.png';  // Replace with the actual path to your sun image
    sunIcon.id = 'sunIcon';
    sunIcon.style.position = 'absolute';
    sunIcon.style.left = '14px'; // Position the sun icon
    sunIcon.style.top = '50%';
    sunIcon.style.transform = 'translateY(-50%)'; // Vertically center the icon
    sunIcon.style.width = '24px';  // Adjust the size of the icon
    sunIcon.style.height = '24px'; // Adjust the size of the icon
    sunIcon.style.transition = 'opacity 0.3s ease';
    sunIcon.style.opacity = '1'; // Make the sun icon always visible

    const moonIcon = document.createElement('img');
    moonIcon.src = 'https://cdn-icons-png.flaticon.com/256/4445/4445942.png'; // Replace with the actual path to your moon image
    moonIcon.id = 'moonIcon';
    moonIcon.style.position = 'absolute';
    moonIcon.style.right = '12px'; // Position the moon icon
    moonIcon.style.top = '50%';
    moonIcon.style.transform = 'translateY(-50%)'; // Vertically center the icon
    moonIcon.style.width = '24px';  // Adjust the size of the icon
    moonIcon.style.height = '24px'; // Adjust the size of the icon
    moonIcon.style.transition = 'opacity 0.3s ease';
    moonIcon.style.opacity = '1'; // Make the moon icon always visible

    switchContainer.appendChild(sunIcon);
    switchContainer.appendChild(moonIcon);

    // Add the switch to the document body
    document.body.appendChild(switchContainer);

    let isDarkMode = false;
    let isDragging = false;
    let startX, startY, offsetX, offsetY;
    let isMouseDown = false;

    // Function to toggle themes and apply styles
    function toggleTheme() {
        if (isDarkMode) {
            // Light Mode
            document.getElementsByTagName("html")[0].style.filter = "none";
            document.body.style.backgroundColor = ''; // Reset to default background
            let elems = document.querySelectorAll("a, img, video");
            for (let j = 0; j < elems.length; j++) {
                if ((elems[j].nodeName == "A" && (elems[j].style.background != "" || elems[j].style.backgroundImage != "")) || elems[j].nodeName != "A") {
                    elems[j].style.filter = "none";
                }
            }
            // Change font and reset style
            let all = document.getElementsByTagName('*');
            for (let i = 0; i < all.length; i++) {
                if (typeof all[i].style !== 'undefined') {
                    all[i].style.fontFamily = "Arial, sans-serif";  // Default font family
                }
            }
            // Move the toggle circle to the left
            toggleCircle.style.left = '5px';
        } else {
            // Dark Mode
            let all = document.getElementsByTagName('*');
            for (let i = 0; i < all.length; i++) {
                if (typeof all[i].style !== 'undefined') {
                    all[i].style.fontFamily = "Comic Sans MS"; // Set font to Comic Sans
                }
            }
            document.getElementsByTagName("html")[0].style.filter = "invert(1)";
            let elems = document.querySelectorAll("a, img, video");
            for (let j = 0; j < elems.length; j++) {
                if ((elems[j].nodeName == "A" && (elems[j].style.background != "" || elems[j].style.backgroundImage != "")) || elems[j].nodeName != "A") {
                    elems[j].style.filter = "invert(1)";
                }
            }
            document.body.style.backgroundColor = 'black'; // Set the background to black for dark mode
            // Move the toggle circle to the right
            toggleCircle.style.left = '55px';
        }
        isDarkMode = !isDarkMode;
    }

    // Draggable Menu Logic
    switchContainer.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        isDragging = true;
        e.preventDefault();  // Prevent triggering the click event during dragging
        startX = e.clientX;
        startY = e.clientY;
        const rect = switchContainer.getBoundingClientRect();
        offsetX = rect.left;
        offsetY = rect.top;
        switchContainer.style.cursor = 'grabbing';

        const onMouseMove = (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                switchContainer.style.left = `${offsetX + dx}px`;
                switchContainer.style.top = `${offsetY + dy}px`;
            }
        };

        const onMouseUp = (e) => {
            isDragging = false;
            switchContainer.style.cursor = 'pointer';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Prevent the theme toggle if the user is dragging the switch
    switchContainer.addEventListener('click', function(e) {
        if (isDragging) {
            e.stopImmediatePropagation(); // Prevent click from being triggered while dragging
            isDragging = false; // Reset dragging status after the click
        } else {
            toggleTheme(); // Otherwise, toggle theme
        }
    });
})();
