// Create and style the draggable iframe container and its header
const container = document.createElement('div');
container.id = 'frame-container';
container.style.position = 'absolute';
container.style.top = '50px';
container.style.left = '50px';
container.style.width = '800px';
container.style.height = '600px';
container.style.border = '2px solid #ccc';
container.style.borderRadius = '10px';
container.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
container.style.overflow = 'hidden';
container.style.backgroundColor = '#2b2b2b'; // Darker gray background

const header = document.createElement('div');
header.id = 'frame-header';
header.style.height = '30px';
header.style.backgroundColor = '#f0f0f0';
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.padding = '0 10px';
header.style.cursor = 'grab';
header.style.borderBottom = '1px solid #ddd';

const closeBtn = document.createElement('div');
closeBtn.id = 'close-btn';
closeBtn.style.width = '12px';
closeBtn.style.height = '12px';
closeBtn.style.marginRight = '8px';
closeBtn.style.borderRadius = '50%';
closeBtn.style.backgroundColor = '#ff5c5c';
closeBtn.style.cursor = 'pointer';

const minimizeBtn = document.createElement('div');
minimizeBtn.id = 'minimize-btn';
minimizeBtn.style.width = '12px';
minimizeBtn.style.height = '12px';
minimizeBtn.style.marginRight = '8px';
minimizeBtn.style.borderRadius = '50%';
minimizeBtn.style.backgroundColor = '#ffbd44';
minimizeBtn.style.cursor = 'pointer';

const fullscreenBtn = document.createElement('div');
fullscreenBtn.id = 'fullscreen-btn';
fullscreenBtn.style.width = '12px';
fullscreenBtn.style.height = '12px';
fullscreenBtn.style.marginRight = '8px';
fullscreenBtn.style.borderRadius = '50%';
fullscreenBtn.style.backgroundColor = '#00ca4e';
fullscreenBtn.style.cursor = 'pointer';

const title = document.createElement('span');
title.textContent = 'Google Snake Mod';
title.style.marginLeft = '10px';
title.style.fontSize = '14px';
title.style.fontWeight = 'bold';

header.appendChild(closeBtn);
header.appendChild(minimizeBtn);
header.appendChild(fullscreenBtn);
header.appendChild(title);

const iframe = document.createElement('iframe');
iframe.src = 'https://googlesnakemods.com/v/current/index.html';
iframe.style.width = '100%';
iframe.style.height = 'calc(100% - 30px)';
iframe.style.border = 'none';

container.appendChild(header);
container.appendChild(iframe);
document.body.appendChild(container);

// Dragging functionality
let isDragging = false;
let offsetX, offsetY;

header.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - container.offsetLeft;
  offsetY = e.clientY - container.offsetTop;
  header.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    container.style.left = `${e.clientX - offsetX}px`;
    container.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  header.style.cursor = 'grab';
});

// Close button functionality
closeBtn.addEventListener('click', () => {
  container.style.display = 'none';
});

// Minimize button functionality
minimizeBtn.addEventListener('click', () => {
  if (iframe.style.display === 'none') {
    iframe.style.display = 'block';
    container.style.height = '600px';
  } else {
    iframe.style.display = 'none';
    container.style.height = '30px';
  }
});

// Fullscreen button functionality
let isFullscreen = false;
fullscreenBtn.addEventListener('click', () => {
  if (!isFullscreen) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) { // Safari compatibility
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { // IE compatibility
      container.msRequestFullscreen();
    }
    isFullscreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari compatibility
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE compatibility
      document.msExitFullscreen();
    }
    isFullscreen = false;
  }
});