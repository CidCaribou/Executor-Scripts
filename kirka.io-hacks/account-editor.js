// @name Kirka.io Name, Level, and Verification Changer
// @version 8.0
// @description Username/Level/Clan/Verification Changer

let customUsername = localStorage.getItem('kirka_custom_username') || "Newbie";
let clanTag = localStorage.getItem('kirka_clan_tag') || "test";
let level = localStorage.getItem('kirka_level') || "1";
let isVerified = localStorage.getItem('kirka_verified') === 'true' || true;

// Style for input fields
const inputStyle = `
    position: absolute;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 5px;
    font-size: 14px;
    width: 120px;
`;

// Create modal for input
function createInputModal(title, currentValue, saveCallback, isCheckbox = false) {
    // Remove any existing modal
    const existingModal = document.getElementById('kirka-input-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'kirka-input-modal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #555;
        border-radius: 8px;
        padding: 15px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 250px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    `;

    // Create title
    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-align: center;
        margin-bottom: 10px;
    `;

    // Create input
    let input;
    if (isCheckbox) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px;
        `;

        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = currentValue;
        input.style.cssText = `
            width: 20px;
            height: 20px;
            cursor: pointer;
        `;

        const label = document.createElement('label');
        label.textContent = 'Enable Verification Badge';
        label.style.cssText = `
            color: white;
            font-size: 14px;
            cursor: pointer;
        `;
        label.onclick = () => input.checked = !input.checked;

        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        modal.appendChild(titleElement);
        modal.appendChild(checkboxContainer);
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.style.cssText = `
            padding: 8px;
            background: rgba(30, 30, 30, 0.9);
            color: white;
            border: 1px solid #666;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;
        `;
        modal.appendChild(titleElement);
        modal.appendChild(input);
    }

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    `;

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.cssText = `
        padding: 6px 12px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    saveButton.onclick = () => {
        const value = isCheckbox ? input.checked : input.value;
        saveCallback(value);
        modal.remove();
    };

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
        padding: 6px 12px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    cancelButton.onclick = () => {
        modal.remove();
    };

    // Add everything to the modal
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(cancelButton);
    modal.appendChild(buttonsContainer);
    document.body.appendChild(modal);

    // Focus the input if it's not a checkbox
    if (!isCheckbox) {
        input.focus();
        input.select();
    }
}

function addVerificationBadge(nicknameElement) {
    // Remove existing badge if present
    const existingBadge = nicknameElement.querySelector('.badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    if (isVerified) {
        const badge = document.createElement('img');
        badge.className = 'badge';
        badge.src = '/assets/img/__verified__.693d211e.svg';
        badge.setAttribute('data-v-2b0729dc', '');
        badge.style.cssText = `
            margin-left: 4px;
            vertical-align: middle;
            width: 26px;
            height: 26px;
        `;
        nicknameElement.appendChild(badge);
    }
}

function replaceText(node, username) {
    const replacedText = node.textContent.replace(new RegExp(username, 'gi'), customUsername);
    node.textContent = replacedText;
}

function handleMutation(mutationsList, username) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const walker = document.createTreeWalker(mutation.target, NodeFilter.SHOW_TEXT, null, false);
            while (walker.nextNode()) {
                const node = walker.currentNode;
                if (node.textContent.includes(username)) {
                    replaceText(node, username);
                }
            }
        }
    }
}

function observer(username) {
    const observer = new MutationObserver(mutationsList => handleMutation(mutationsList, username));
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function attachClickListeners() {
    // Function to periodically check and add click events to elements
    function checkAndAddEvents() {
        // Check for level element
        const levelsElement = document.querySelector('.levels');
        if (levelsElement && !levelsElement.hasAttribute('data-kirka-editable')) {
            levelsElement.setAttribute('data-kirka-editable', 'true');
            levelsElement.style.cursor = 'pointer';
            levelsElement.title = 'Click to change level';

            levelsElement.addEventListener('click', (e) => {
                e.stopPropagation();
                createInputModal('Change Level', level, (newValue) => {
                    level = newValue;
                    localStorage.setItem('kirka_level', level);
                    // Preserve the klo element with proper styling
                    const kloElement = levelsElement.querySelector('.klo');

                    // Clear the level element but keep the klo element
                    if (kloElement) {
                        // Save the klo element and then update level
                        levelsElement.innerHTML = '';
                        levelsElement.appendChild(document.createTextNode(level));
                        levelsElement.appendChild(kloElement);
                    } else {
                        // Create a new klo element with proper attributes
                        levelsElement.innerHTML = '';
                        levelsElement.appendChild(document.createTextNode(level));
                        const kloDiv = document.createElement('div');
                        kloDiv.className = 'klo';
                        kloDiv.setAttribute('data-v-2b0729dc', ''); // Preserve the original attribute
                        kloDiv.textContent = 'lvl';
                        levelsElement.appendChild(kloDiv);
                    }
                });
            });
        }

        // Check for clan tag element
        const clanTagElement = document.querySelector('.clan-tag');
        if (clanTagElement && !clanTagElement.hasAttribute('data-kirka-editable')) {
            clanTagElement.setAttribute('data-kirka-editable', 'true');
            clanTagElement.style.cursor = 'pointer';
            clanTagElement.title = 'Click to change clan tag';

            clanTagElement.addEventListener('click', (e) => {
                e.stopPropagation();
                createInputModal('Change Clan Tag', clanTag, (newValue) => {
                    clanTag = newValue;
                    localStorage.setItem('kirka_clan_tag', clanTag);
                    clanTagElement.textContent = clanTag;
                });
            });
        }

        // Check for nickname element
        const nicknameElement = document.querySelector('.nickname');
        if (nicknameElement && !nicknameElement.hasAttribute('data-kirka-editable')) {
            nicknameElement.setAttribute('data-kirka-editable', 'true');
            nicknameElement.style.cursor = 'pointer';
            nicknameElement.title = 'Click to change username';

            nicknameElement.addEventListener('click', (e) => {
                e.stopPropagation();
                createInputModal('Change Username', customUsername, (newValue) => {
                    customUsername = newValue;
                    localStorage.setItem('kirka_custom_username', customUsername);
                    // Update text content while preserving badge
                    const textNodes = Array.from(nicknameElement.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = customUsername;
                    } else {
                        nicknameElement.insertBefore(document.createTextNode(customUsername), nicknameElement.firstChild);
                    }
                    // Ensure verification badge is maintained
                    addVerificationBadge(nicknameElement);
                });
            });

            // Add right-click for verification toggle
            nicknameElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                createInputModal('Toggle Verification', isVerified, (newValue) => {
                    isVerified = newValue;
                    localStorage.setItem('kirka_verified', isVerified.toString());
                    addVerificationBadge(nicknameElement);
                }, true);
            });
        }

        // Check for level value element (in other parts of UI)
        const levelValueElement = document.querySelector('.level-value');
        if (levelValueElement && !levelValueElement.hasAttribute('data-kirka-editable')) {
            levelValueElement.setAttribute('data-kirka-editable', 'true');
            levelValueElement.style.cursor = 'pointer';
            levelValueElement.title = 'Click to change level';

            levelValueElement.addEventListener('click', (e) => {
                e.stopPropagation();
                createInputModal('Change Level', level, (newValue) => {
                    level = newValue;
                    localStorage.setItem('kirka_level', level);
                    levelValueElement.textContent = level;
                });
            });
        }
    }

    // Check for elements every 500ms
    setInterval(checkAndAddEvents, 500);
}

function Check() {
    const user = document.querySelector('div[data-v-c5d917c8].nickname') || document.querySelector('.nickname');
    if (user) {
        const username = user.textContent;
        observer(username);

        // Update username while preserving any existing elements
        const textNodes = Array.from(user.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        if (textNodes.length > 0) {
            textNodes[0].textContent = customUsername;
        } else {
            user.insertBefore(document.createTextNode(customUsername), user.firstChild);
        }

        // Add verification badge if enabled
        addVerificationBadge(user);

        attachClickListeners();
    } else {
        setTimeout(Check, 100); // Loop if Not Found Since Loading times
    }
}

window.addEventListener("load", Check);

function LVLANDCLAN() {
    const levelsElement = document.querySelector('.levels');
    const clanTagElement = document.querySelector('.clan-tag');
    const levelValueElement = document.querySelector('.level-value');
    const nicknameElement = document.querySelector('.nickname');

    if (levelsElement) {
        // Preserve the klo element with proper styling
        const kloElement = levelsElement.querySelector('.klo');

        // If no klo element exists, create one and update level
        if (!kloElement) {
            // Clear existing text without removing attributes
            levelsElement.innerHTML = '';

            // Add the level as a text node first
            const levelTextNode = document.createTextNode(level);
            levelsElement.appendChild(levelTextNode);

            // Create and append the klo element with 'lvl' text
            const kloDiv = document.createElement('div');
            kloDiv.className = 'klo';
            kloDiv.setAttribute('data-v-2b0729dc', ''); // Preserve the original attribute
            kloDiv.textContent = 'lvl';
            levelsElement.appendChild(kloDiv);
        }
        // If klo element exists but level needs updating
        else {
            // Get all child nodes
            const childNodes = Array.from(levelsElement.childNodes);

            // Update only the text node (level) and keep the klo element intact
            let updated = false;
            for (let i = 0; i < childNodes.length; i++) {
                if (childNodes[i].nodeType === Node.TEXT_NODE) {
                    childNodes[i].textContent = level;
                    updated = true;
                    break;
                }
            }

            // If no text node was found, insert one
            if (!updated) {
                levelsElement.insertBefore(document.createTextNode(level), kloElement);
            }
        }
    }

    if (clanTagElement && clanTagElement.textContent !== clanTag) {
        clanTagElement.textContent = clanTag;
    }

    if (levelValueElement && levelValueElement.textContent !== level) {
        levelValueElement.textContent = level;
    }

    // Ensure verification badge is maintained on nickname
    if (nicknameElement) {
        const currentBadge = nicknameElement.querySelector('.badge');
        if (isVerified && !currentBadge) {
            addVerificationBadge(nicknameElement);
        } else if (!isVerified && currentBadge) {
            currentBadge.remove();
        }
    }
}

// Run the LVLANDCLAN function every 300ms instead of every 1ms to reduce performance impact
setInterval(LVLANDCLAN, 300);

// Add a small info button to access settings
function addSettingsButton() {
    const settingsBtn = document.createElement('div');
    settingsBtn.id = 'kirka-changer-settings';
    settingsBtn.innerHTML = '⚙️';
    settingsBtn.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        font-size: 18px;
    `;

    settingsBtn.addEventListener('click', () => {
        const settingsMenu = document.createElement('div');
        settingsMenu.style.cssText = `
            position: fixed;
            bottom: 50px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 9999;
            min-width: 200px;
        `;

        settingsMenu.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px; text-align: center;">Kirka.io Changer</div>
            <div style="font-size: 12px; margin-bottom: 10px; text-align: center;">Click on username, clan, or level in-game to edit</div>
            <div style="font-size: 12px; margin-bottom: 15px; text-align: center; color: #90EE90;">Right-click on username to toggle verification</div>
            <div style="display: flex; justify-content: center;">
                <button id="reset-kirka-settings" style="padding: 5px 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Reset All</button>
            </div>
        `;

        document.body.appendChild(settingsMenu);

        document.getElementById('reset-kirka-settings').addEventListener('click', () => {
            localStorage.removeItem('kirka_custom_username');
            localStorage.removeItem('kirka_clan_tag');
            localStorage.removeItem('kirka_level');
            localStorage.removeItem('kirka_verified');
            settingsMenu.remove();
            alert('Settings reset to default!');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(e) {
            if (e.target !== settingsBtn && e.target !== settingsMenu && !settingsMenu.contains(e.target)) {
                settingsMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    });

    document.body.appendChild(settingsBtn);
}

setTimeout(addSettingsButton, 3000); // Add settings button after 3 seconds
