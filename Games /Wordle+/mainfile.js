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

const newTabBtn = document.createElement('div');
newTabBtn.id = 'newtab-btn';
newTabBtn.style.width = '20px';
newTabBtn.style.height = '20px';
newTabBtn.style.order = '0';
newTabBtn.style.marginLeft = 'auto';
newTabBtn.style.marginRight = '10px';
newTabBtn.style.borderRadius = '50%';
newTabBtn.style.backgroundColor = 'transparent';
newTabBtn.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHRpdGxlPm9wZW4tZXh0ZXJuYWw8L3RpdGxlPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iaWNvbiIgZmlsbD0iIzAwMDAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODUuMzMzMzMzLCA2NC4wMDAwMDApIj4NCiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjgsNjMuOTk5NDQ0IEwxMjgsMTA2LjY2NjQ0NCBMNDIuNjY2NjY2NywxMDYuNjY2NjY3IEw0Mi42NjY2NjY3LDMyMCBMMjU2LDMyMCBMMjU2LDIzNC42NjY0NDQgTDI5OC42NjYsMjM0LjY2NjQ0NCBMMjk4LjY2NjY2NywzNjIuNjY2NjY3IEw0LjI2MzI1NjQxZS0xNCwzNjIuNjY2NjY3IEw0LjI2MzI1NjQxZS0xNCw2NCBMMTI4LDYzLjk5OTQ0NCBaIE0zNjIuNjY2NjY3LDEuNDIxMDg1NDdlLTE0IEwzNjIuNjY2NjY3LDE3MC42NjY2NjcgTDMyMCwxNzAuNjY2NjY3IEwzMjAsNzIuODM1IEwxNDMuMDg0OTQ1LDI0OS43NTE2MTEgTDExMi45MTUwNTUsMjE5LjU4MTcyMiBMMjg5LjgzLDQyLjY2NiBMMTkyLDQyLjY2NjY2NjcgTDE5MiwxLjQyMTA4NTQ3ZS0xNCBMMzYyLjY2NjY2NywxLjQyMTA4NTQ3ZS0xNCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPg0KDQo8L3BhdGg+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=')";
newTabBtn.style.backgroundSize = 'cover';
newTabBtn.style.cursor = 'pointer';
newTabBtn.title = 'Open in new tab';

const title = document.createElement('span');
title.textContent = 'Loading Game...';
title.style.marginLeft = '10px';
title.style.fontSize = '14px';
title.style.fontWeight = 'bold';
title.style.color = 'black';
title.style.flexGrow = '1';
title.style.textAlign = 'center';

header.appendChild(closeBtn);
header.appendChild(minimizeBtn);
header.appendChild(fullscreenBtn);
header.appendChild(title);
header.appendChild(newTabBtn);

const iframe = document.createElement('iframe');
iframe.style.width = '100%';
iframe.style.height = 'calc(100% - 30px)';
iframe.style.border = 'none';

container.appendChild(header);
container.appendChild(iframe);
document.body.appendChild(container);

const htmlFileURL = 'https://htmlpreview.github.io/?https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Games%20/2048/index.html';
iframe.src = htmlFileURL;
iframe.onload = () => {
  title.textContent = 'Wordle+';
};

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

newTabBtn.addEventListener('click', () => {
  const newTab = window.open('about:blank', '_blank');
  if (!newTab) return;
  const src = iframe.src || htmlFileURL;
  const html = `<!DOCTYPE html><html><head><style>html,body{margin:0;height:100%;background:#000;}iframe{width:100%;height:100%;border:none;}</style></head><body><iframe src="${src}" allowfullscreen></iframe></body></html>`;
  newTab.document.write(html);
  newTab.document.close();
});
