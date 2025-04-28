const body = document.body;

const radioStyles = document.createElement('style');
radioStyles.textContent = `
  .auto-clicker-radio {
    background-color: white !important;
    color-scheme: light !important;
  }

  .auto-clicker-input {
    background-color: white !important;
    color: black !important;
    color-scheme: light !important;
  }

  .auto-clicker-input:focus {
    background-color: white !important;
    color: black !important;
    outline-color: #007bff !important;
  }

  .auto-clicker-input::-webkit-inner-spin-button,
  .auto-clicker-input::-webkit-outer-spin-button {
    background-color: white !important;
    color-scheme: light !important;
    opacity: 1;
  }

  .auto-clicker-input {
    -moz-appearance: textfield !important;
  }

  .auto-clicker-input:hover::-webkit-inner-spin-button {
    background-color: white !important;
  }
`;
document.head.appendChild(radioStyles);

const container = document.createElement("div");
container.style.width = "750px";
container.style.height = "612px";
container.style.backgroundColor = "#ffffff";
container.style.borderRadius = "0 0 12px 12px";
container.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
container.style.position = "absolute";
container.style.top = "150px";
container.style.left = "150px";
container.style.overflow = "shown";
container.style.zIndex = 99999;
container.style.fontFamily = "Arial, sans-serif";
container.style.transition = "box-shadow 0.3s ease, height 0.3s ease, border-radius 0.3s ease";

const content = document.createElement("div");
content.style.overflow = "hidden";
content.style.padding = "20px";
content.style.height = 'calc(100% - 60px)';
content.style.overflowY = 'auto';
content.style.transition = "box-shadow 0.3s ease, height 0.3s ease, border-radius 0.3s ease";
content.style.scrollbarWidth = 'none';
content.style.cssText += `
    &::-webkit-scrollbar {
        display: none;
    }
`;
container.appendChild(content);

requestAnimationFrame(() => {
    container.style.transition = 'box-shadow 0.3s ease, height 0.3s ease-in-out, border-radius 0.3s ease';
});

const header = document.createElement('div');
header.style.width = "100%";
header.style.display = 'flex';
header.style.marginTop = "-20px";
header.style.position = "relative";
header.style.alignItems = 'center';
header.style.padding = '18px 10px';
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
    btn.style.width = '14px';
    btn.style.height = '14px';
    btn.style.borderRadius = '50%';
    btn.style.background = color;
    btn.style.border = '1px solid rgba(0,0,0,0.1)';
    btn.style.cursor = 'pointer';

    btn.addEventListener('mouseover', () => {
        btn.style.filter = 'brightness(85%)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.filter = 'brightness(100%)';
    });

    return btn;
};

const closeButton = createButton('#ff5f57');
const minimizeButton = createButton('#ffbd2e');
const maximizeButton = createButton('#28c840');

closeButton.addEventListener('click', () => {
    container.style.transition = 'all 0.2s ease-in';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.9)';

    setTimeout(() => {
        if (container.parentNode) {
            document.body.removeChild(container);
        }
    }, 200);
});

let isMinimized = false;
minimizeButton.addEventListener('click', () => {
    if (isMinimized) {
        const savedHeight = container.dataset.savedHeight || '612px';

        container.style.transition = 'height 0.3s ease-in-out';
        container.style.height = savedHeight;

        setTimeout(() => {
            content.style.display = 'block';
        }, 50);

        header.style.borderRadius = '12px 12px 0 0';
    } else {
        container.dataset.savedHeight = container.style.height || '612px';

        container.style.transition = 'height 0.3s ease-in-out';

        content.style.display = 'none';

        container.style.height = '30px';
        header.style.borderRadius = '12px';
    }
    isMinimized = !isMinimized;
});

let isMaximized = false;
maximizeButton.addEventListener('click', () => {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Fullscreen',
            text: 'Not finished',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    } else {
        alert('Fullscreen: Not finished');
    }
});

buttonContainer.appendChild(closeButton);
buttonContainer.appendChild(minimizeButton);
buttonContainer.appendChild(maximizeButton);

const title = document.createElement('div');
title.innerText = "Auto Clicker V2";
title.style.position = 'absolute';
title.style.left = '50%';
title.style.transform = 'translateX(-50%)';
title.style.fontSize = '18px';
title.style.color = '#000';
header.appendChild(title);

container.prepend(header);

document.body.appendChild(container);

function createSection(title) {
  const section = document.createElement("div");
  section.style.marginBottom = "20px";
  section.style.padding = "15px";
  section.style.border = "1px solid #ccc";
  section.style.borderRadius = "8px";
  section.style.color = '#000';
  section.style.backgroundColor = "#f9f9f9";

  const label = document.createElement("label");
  label.textContent = title;
  label.style.display = "block";
  label.style.marginBottom = "10px";
  label.style.fontWeight = "bold";
  label.style.color = "#333";
  section.appendChild(label);

  return section;
}

function createInput(type, placeholder, width = "80px", extraStyles = {}) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.style.width = width;
  input.style.marginRight = "10px";
  input.style.padding = "5px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "4px";
  input.style.backgroundColor = "white";
  input.style.color = "black";
  if (type === "number") {
    input.classList.add("auto-clicker-input");
  }
  Object.assign(input.style, extraStyles);
  return input;
}

function createRadio(name, value, text, checked = false) {
  const wrapper = document.createElement("label");
  wrapper.style.marginRight = "20px";
  wrapper.style.fontSize = "14px";
  wrapper.style.color = "#555";

  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  input.checked = checked;
  input.classList.add("auto-clicker-radio");
  input.style.marginRight = "5px";
  input.style.backgroundColor = "white";
  input.style.transform = "translateY(3px)";

  wrapper.appendChild(input);
  wrapper.appendChild(document.createTextNode(text));
  return wrapper;
}

const clickIntervalSection = createSection("Click interval");
["hours", "mins", "secs", "milliseconds"].forEach((placeholder, index) => {
  const input = createInput("number", placeholder, "80px");
  input.min = "0";
  clickIntervalSection.appendChild(input);
  clickIntervalSection.appendChild(document.createTextNode(index === 4 ? "" : placeholder + " "));
});

content.appendChild(clickIntervalSection);

let autoClickInterval = 1000;

function updateClickInterval() {
  const timeInputs = {
    hours: document.querySelector("input[placeholder='hours']").value || 0,
    mins: document.querySelector("input[placeholder='mins']").value || 0,
    secs: document.querySelector("input[placeholder='secs']").value || 0,
    milliseconds: document.querySelector("input[placeholder='milliseconds']").value || 0
  };

  const totalTime =
    parseInt(timeInputs.hours) * 3600000 +
    parseInt(timeInputs.mins) * 60000 +
    parseInt(timeInputs.secs) * 1000 +
    parseInt(timeInputs.milliseconds);

  autoClickInterval = totalTime > 0 ? totalTime : Infinity;
}

const clickOptionsAndRepeat = document.createElement("div");
clickOptionsAndRepeat.style.display = "flex";
clickOptionsAndRepeat.style.justifyContent = "space-between";
clickOptionsAndRepeat.style.gap = "20px";
content.appendChild(clickOptionsAndRepeat);

const clickOptionsWrapper = createSection("Click Options");

clickOptionsWrapper.style.padding = "20px";
clickOptionsWrapper.style.minWidth = "300px";
clickOptionsWrapper.style.minHeight = "70px";
clickOptionsWrapper.style.border = "1px solid #ccc";
clickOptionsWrapper.style.borderRadius = "8px";

const clickOptionsSection = document.createElement("div");
clickOptionsSection.style.display = "flex";
clickOptionsSection.style.flexDirection = "column";
clickOptionsSection.style.gap = "15px";

const mouseButtonContainer = document.createElement("div");
mouseButtonContainer.style.display = "flex";
mouseButtonContainer.style.alignItems = "center";
mouseButtonContainer.style.gap = "10px";

const mouseButtonLabel = document.createElement("label");
mouseButtonLabel.textContent = "Mouse Button";
mouseButtonLabel.style.color = "#333";
mouseButtonLabel.style.width = "120px";
mouseButtonContainer.appendChild(mouseButtonLabel);

const mouseButtonDropdown = document.createElement("select");
["Left", "Right", "Middle"].forEach((option) => {
  const dropdownOption = document.createElement("option");
  dropdownOption.value = option.toLowerCase();
  dropdownOption.textContent = option;
  mouseButtonDropdown.appendChild(dropdownOption);
});
mouseButtonDropdown.style.padding = "5px";
mouseButtonDropdown.style.border = "1px solid #ccc";
mouseButtonDropdown.style.borderRadius = "4px";
mouseButtonDropdown.style.backgroundColor = "white";
mouseButtonDropdown.style.color = "black";
mouseButtonContainer.appendChild(mouseButtonDropdown);
clickOptionsSection.appendChild(mouseButtonContainer);

const clickTypeContainer = document.createElement("div");
clickTypeContainer.style.display = "flex";
clickTypeContainer.style.alignItems = "center";
clickTypeContainer.style.gap = "10px";

const clickTypeLabel = document.createElement("label");
clickTypeLabel.textContent = "Click Type";
clickTypeLabel.style.color = "#333";
clickTypeLabel.style.width = "120px";
clickTypeContainer.appendChild(clickTypeLabel);

const clickTypeDropdown = document.createElement("select");
["Single", "Double"].forEach((option) => {
  const dropdownOption = document.createElement("option");
  dropdownOption.value = option.toLowerCase();
  dropdownOption.textContent = option;
  clickTypeDropdown.appendChild(dropdownOption);
});

clickTypeDropdown.style.padding = "5px";
clickTypeDropdown.style.border = "1px solid #ccc";
clickTypeDropdown.style.borderRadius = "4px";
clickTypeDropdown.style.backgroundColor = "white";
clickTypeDropdown.style.color = "black";
clickTypeContainer.appendChild(clickTypeDropdown);
clickOptionsSection.appendChild(clickTypeContainer);

clickOptionsWrapper.appendChild(clickOptionsSection);
clickOptionsAndRepeat.appendChild(clickOptionsWrapper);

const clickRepeatWrapper = createSection("Click Repeat");

clickRepeatWrapper.style.padding = "20px";
clickRepeatWrapper.style.minWidth = "300px";
clickRepeatWrapper.style.minHeight = "90px";
clickRepeatWrapper.style.border = "1px solid #ccc";
clickRepeatWrapper.style.borderRadius = "8px";

const clickRepeatSection = document.createElement("div");
clickRepeatSection.style.display = "flex";
clickRepeatSection.style.flexDirection = "column";
clickRepeatSection.style.gap = "10px";

const repeatGroup = document.createElement("div");
repeatGroup.style.display = "flex";
repeatGroup.style.alignItems = "center";
repeatGroup.style.gap = "10px";

const repeatRadio = createRadio("repeat-option", "repeat", "Repeat", true);
const repeatInput = createInput("number", "1", "60px");
repeatInput.min = "1";

repeatGroup.appendChild(repeatRadio);
repeatGroup.appendChild(repeatInput);
repeatGroup.appendChild(document.createTextNode("times"));

const untilStoppedGroup = document.createElement("div");
untilStoppedGroup.style.display = "flex";
untilStoppedGroup.style.alignItems = "center";

const untilStoppedRadio = createRadio("repeat-option", "until-stopped", "Repeat until stopped");
untilStoppedGroup.appendChild(untilStoppedRadio);

clickRepeatSection.appendChild(repeatGroup);
clickRepeatSection.appendChild(untilStoppedGroup);

clickRepeatWrapper.appendChild(clickRepeatSection);
clickOptionsAndRepeat.appendChild(clickRepeatWrapper);

const cursorPositionSection = createSection("Cursor position");

const currentRadio = createRadio("cursor-option", "current", "Current location", true);
const pickRadio = createRadio("cursor-option", "pick", "Pick location");

cursorPositionSection.appendChild(currentRadio);
cursorPositionSection.appendChild(pickRadio);

const xInput = createInput("number", "X", "60px", { disabled: true });
document.body.appendChild(xInput);
const yInput = createInput("number", "Y", "60px", { disabled: true });
document.body.appendChild(yInput);

cursorPositionSection.appendChild(document.createTextNode(`X: `));
cursorPositionSection.appendChild(xInput);
cursorPositionSection.appendChild(document.createTextNode(`Y: `));
cursorPositionSection.appendChild(yInput);

content.appendChild(cursorPositionSection);

let selectedX = null;
let selectedY = null;
let pickingMode = false;
let selector = null;

function updatePositionInputs(x, y) {
  xInput.value = x;
  yInput.value = y;
}

currentRadio.querySelector("input").addEventListener("change", () => {
  selectedX = null;
  selectedY = null;
  xInput.disabled = true;
  yInput.disabled = true;
  pickingMode = false;
  if (selector) selector.remove();
});

pickRadio.querySelector("input").addEventListener("change", () => {
  pickingMode = true;
  xInput.disabled = false;
  yInput.disabled = false;

  if (!selector) {
    selector = document.createElement("div");
    selector.style.position = "absolute";
    selector.style.width = "10px";
    selector.style.height = "10px";
    selector.style.backgroundColor = "red";
    selector.style.borderRadius = "50%";
    selector.style.pointerEvents = "none";
    document.body.appendChild(selector);
  }

  document.addEventListener("mousemove", (e) => {
    if (pickingMode) {
      selector.style.left = `${e.clientX}px`;
      selector.style.top = `${e.clientY}px`;
      updatePositionInputs(e.clientX, e.clientY);
    }
  });

  document.addEventListener("click", (e) => {
    if (pickingMode) {
      selectedX = e.clientX;
      selectedY = e.clientY;
      updatePositionInputs(selectedX, selectedY);
      pickingMode = false;
      if (selector) selector.remove();
    }
  }, { once: true });
});

function simulateClick() {
  let clickX, clickY;

  const isCurrentPosition = document.querySelector("input[value='current']").checked;

  if (isCurrentPosition) {
    clickX = lastMouseX;
    clickY = lastMouseY;
  } else {
    clickX = selectedX ?? 0;
    clickY = selectedY ?? 0;
  }

  const mouseButton = mouseButtonDropdown.value;
  const clickType = clickTypeDropdown.value;

  let buttonCode;
  switch (mouseButton) {
    case "left":
      buttonCode = 0;
      break;
    case "middle":
      buttonCode = 1;
      break;
    case "right":
      buttonCode = 2;
      break;
  }

  function dispatchMouseEvent(type) {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: clickX,
      clientY: clickY,
      button: buttonCode
    });

    const targetElement = document.elementFromPoint(clickX, clickY);
    if (targetElement) {
      targetElement.dispatchEvent(event);
    }
    console.log(`Dispatched ${type} event with button=${mouseButton} at`, clickX, clickY);
  }

  if (mouseButton === "right") {
    dispatchMouseEvent("contextmenu");
  } else if (mouseButton === "middle") {
    dispatchMouseEvent("auxclick");
  } else {
    if (clickType === "double") {
      dispatchMouseEvent("mousedown");
      dispatchMouseEvent("mouseup");
      dispatchMouseEvent("click");

      setTimeout(() => {
        dispatchMouseEvent("mousedown");
        dispatchMouseEvent("mouseup");
        dispatchMouseEvent("click");
        dispatchMouseEvent("dblclick");
      }, 50);
    } else {
      dispatchMouseEvent("mousedown");
      dispatchMouseEvent("mouseup");
      dispatchMouseEvent("click");
    }
  }
}

const buttons = document.createElement("div");
buttons.style.display = "flex";
buttons.style.justifyContent = "space-between";
buttons.style.marginTop = "20px";

const startButton = document.createElement("button");
startButton.textContent = "Start (F6)";
startButton.style.padding = "12px 24px";
startButton.style.border = "none";
startButton.style.borderRadius = "6px";
startButton.style.backgroundColor = "#28a745";
startButton.style.color = "#fff";
startButton.style.cursor = "pointer";
startButton.style.fontWeight = "bold";
startButton.style.fontSize = "16px";
buttons.appendChild(startButton);

startButton.addEventListener("click", startAutoClick);

let clickIntervalId = null;

function startAutoClick() {
  if (clickIntervalId) return;

  updateClickInterval();

  const isRepeatMode = document.querySelector("input[value='repeat']").checked;
  const repeatCount = isRepeatMode ? parseInt(repeatInput.value, 10) || 1 : Infinity;

  console.log(`Clicking ${isRepeatMode ? repeatCount : "until stopped"} times every ${autoClickInterval} ms`);

  let clickCounter = 0;

  function performClick() {
    if (clickCounter >= repeatCount) {
      stopAutoClick();
      return;
    }
    simulateClick();
    clickCounter++;
  }

  clickIntervalId = setInterval(performClick, autoClickInterval);

  startButton.disabled = true;
  startButton.style.backgroundColor = "#cccccc";
  startButton.style.cursor = "not-allowed";
  stopButton.disabled = false;
  stopButton.style.backgroundColor = "#dc3545";
  stopButton.style.cursor = "pointer";
}

document.addEventListener("auxclick", (event) => {
  if (mouseButtonDropdown.value === "middle") {
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", (event) => {
  if (mouseButtonDropdown.value === "right") {
    event.preventDefault();
  }
});

let lastMouseX = 0, lastMouseY = 0;

document.addEventListener("mousemove", (e) => {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

pickRadio.querySelector("input").addEventListener("change", () => {
  pickingMode = true;
  xInput.disabled = false;
  yInput.disabled = false;

  if (!selector) {
    selector = document.createElement("div");
    selector.style.position = "absolute";
    selector.style.width = "10px";
    selector.style.height = "10px";
    selector.style.backgroundColor = "red";
    selector.style.borderRadius = "50%";
    selector.style.pointerEvents = "none";
    document.body.appendChild(selector);
  }

  document.addEventListener("mousemove", (e) => {
    if (pickingMode) {
      selector.style.left = `${e.clientX}px`;
      selector.style.top = `${e.clientY}px`;
      updatePositionInputs(e.clientX, e.clientY);
    }
  });

  document.addEventListener("click", (e) => {
    if (pickingMode) {
      selectedX = e.clientX;
      selectedY = e.clientY;
      updatePositionInputs(selectedX, selectedY);
      pickingMode = false;
      if (selector) selector.remove();
    }
  }, { once: true });
});

const stopButton = document.createElement("button");
stopButton.textContent = "Stop (F7)";
stopButton.disabled = true;
stopButton.style.padding = "12px 24px";
stopButton.style.border = "none";
stopButton.style.borderRadius = "6px";
stopButton.style.backgroundColor = "#cccccc";
stopButton.style.color = "#fff";
stopButton.style.cursor = "not-allowed";
stopButton.style.fontWeight = "bold";
stopButton.style.fontSize = "16px";
buttons.appendChild(stopButton);

stopButton.addEventListener("click", stopAutoClick);

function stopAutoClick() {
  clearInterval(clickIntervalId);
  clickIntervalId = null;
  toggleStopButton();
  console.log("Auto-clicking stopped.");
}

function toggleStopButton() {
  stopButton.disabled = true;
  stopButton.style.backgroundColor = "#cccccc";
  stopButton.style.cursor = "not-allowed";
  startButton.disabled = false;
  startButton.style.backgroundColor = "#28a745";
  startButton.style.cursor = "pointer";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "F7") stopAutoClick();
});

content.appendChild(buttons);

const helpButtons = document.createElement("div");
helpButtons.style.display = "flex";
helpButtons.style.justifyContent = "space-between";
helpButtons.style.marginTop = "20px";

["Hotkey setting", "Record & Playback"].forEach(text => {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.padding = "12px 24px";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.backgroundColor = "#f8f9fa";
  button.style.color = "#333";
  button.style.minWidth = "300px";
  button.style.minHeight = "70px";
  button.style.cursor = "pointer";
  button.style.fontWeight = "bold";
  button.style.fontSize = "14px";
  button.onmouseover = () => button.style.backgroundColor = "#e2e6ea";
  button.onmouseout = () => button.style.backgroundColor = "#f8f9fa";
  helpButtons.appendChild(button);
});
content.appendChild(helpButtons);

pickRadio.querySelector("input").addEventListener("change", () => {
  const inputs = cursorPositionSection.querySelectorAll("input[type='number']");
  inputs.forEach(input => input.disabled = false);
});
currentRadio.querySelector("input").addEventListener("change", () => {
  const inputs = cursorPositionSection.querySelectorAll("input[type='number']");
  inputs.forEach(input => input.disabled = true);
});

stopButton.style.minWidth = "300px";
stopButton.style.minHeight = "70px";

startButton.style.minWidth = "300px";
startButton.style.minHeight = "70px";

let isDragging = false;
let offsetX = 0, offsetY = 0;

header.addEventListener('mousedown', (e) => {
    if (
        e.target === maximizeButton ||
        e.target === minimizeButton ||
        e.target === closeButton
    ) {
        return;
    }
    isDragging = true;
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;
    header.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const containerWidth = parseInt(container.offsetWidth);
        const containerHeight = parseInt(container.offsetHeight);

        const minVisiblePortion = 40;

        newLeft = Math.max(-containerWidth + minVisiblePortion, Math.min(newLeft, windowWidth - minVisiblePortion));
        newTop = Math.max(0, Math.min(newTop, windowHeight - minVisiblePortion));

        container.style.left = `${newLeft}px`;
        container.style.top = `${newTop}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = 'grab';
});
