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
container.style.backgroundColor = '#2b2b2b'; 

const header = document.createElement('div');
header.id = 'frame-header';
header.style.height = '30px';
header.style.backgroundColor = '#f0f0f0';
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.padding = '0 10px';
header.style.cursor = 'grab';
header.style.color = 'black'; 
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
title.textContent = 'Loading Game...';
title.style.marginLeft = '10px';
title.style.fontSize = '14px';
title.style.color = 'black'; 
title.style.fontWeight = 'bold';

header.appendChild(closeBtn);
header.appendChild(minimizeBtn);
header.appendChild(fullscreenBtn);
header.appendChild(title);

const iframe = document.createElement('iframe');
iframe.style.width = '100%';
iframe.style.height = 'calc(100% - 30px)';
iframe.style.border = 'none';

container.appendChild(header);
container.appendChild(iframe);
document.body.appendChild(container);

const loadHTMLContent = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    iframe.srcdoc = htmlContent;
    title.textContent = 'Wordle+';
  } catch (error) {
    alert('Error loading Game:', error);
    title.textContent = 'Error Loading Game';
  }
};

const htmlFileURL = 'https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Games%20/Wordle%2B/index.html';
loadHTMLContent(htmlFileURL);

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

closeBtn.addEventListener('click', () => {
  container.style.display = 'none';
});

minimizeBtn.addEventListener('click', () => {
  if (iframe.style.display === 'none') {
    iframe.style.display = 'block';
    container.style.height = '600px';
  } else {
    iframe.style.display = 'none';
    container.style.height = '30px';
  }
});

let isFullscreen = false;
fullscreenBtn.addEventListener('click', () => {
  if (!isFullscreen) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) { 
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { 
      container.msRequestFullscreen();
    }
    isFullscreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
      document.msExitFullscreen();
    }
    isFullscreen = false;
  }
});
