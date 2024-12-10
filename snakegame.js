alert("May Not Work On Some Websites\n\nLevel 2 Executor Required")
document.body.innerHTML = ''; // Clear the document for demo purposes

// Define the custom element for iframe bypass
customElements.define('x-frame-bypass', class extends HTMLIFrameElement {
    static get observedAttributes() {
        return ['src'];
    }
    constructor() {
        super();
    }
    attributeChangedCallback() {
        this.load(this.src);
    }
    connectedCallback() {
        this.sandbox = '' + this.sandbox || 'allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation';
    }
    load(url, options) {
        if (!url || !url.startsWith('http')) throw new Error(`X-Frame-Bypass src ${url} does not start with http(s)://`);
        this.srcdoc = `<html>
<head>
	<style>
	.loader {
		position: absolute;
		top: calc(50% - 25px);
		left: calc(50% - 25px);
		width: 50px;
		height: 50px;
		background-color: #333;
		border-radius: 50%;  
		animation: loader 1s infinite ease-in-out;
	}
	@keyframes loader {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	</style>
</head>
<body>
	<div class="loader"></div>
</body>
</html>`;
        this.fetchProxy(url, options, 0)
            .then(res => res.text())
            .then(data => {
                if (data)
                    this.srcdoc = data.replace(
                        /<head([^>]*)>/i,
                        `<head$1>
	<base href="${url}">
	<script>
	document.addEventListener('click', e => {
		if (frameElement && document.activeElement && document.activeElement.href) {
			e.preventDefault();
			frameElement.load(document.activeElement.href);
		}
	});
	document.addEventListener('submit', e => {
		if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
			e.preventDefault();
			if (document.activeElement.form.method === 'post')
				frameElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)});
			else
				frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)));
		}
	});
	</script>`
                    );
            })
            .catch(e => alert('Cannot load X-Frame-Bypass\n\nTell Dev To Add More Proxies\n\nTurn on A VPN' + e)); // Alert only on error
    }
    fetchProxy(url, options, i) {
        const proxies = (options || {}).proxies || [
            'https://cors-anywhere.herokuapp.com/',
            'https://yacdn.org/proxy/',
            'https://api.codetabs.com/v1/proxy/?quest='
        ];
        return fetch(proxies[i] + url, options)
            .then(res => {
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                return res;
            })
            .catch(error => {
                if (i === proxies.length - 1) throw error;
                return this.fetchProxy(url, options, i + 1);
            });
    }
}, { extends: 'iframe' });

// Create a wrapper div
const wrapper = document.createElement('div');
wrapper.style.position = 'absolute';
wrapper.style.top = '100px';
wrapper.style.left = '100px';
wrapper.style.width = '600px';
wrapper.style.border = '1px solid #ccc';
wrapper.style.borderRadius = '8px';
wrapper.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
wrapper.style.backgroundColor = '#f9f9f9';
wrapper.style.zIndex = '1000';
document.body.appendChild(wrapper);

// Add a title bar
const titleBar = document.createElement('div');
titleBar.style.display = 'flex';
titleBar.style.alignItems = 'center';
titleBar.style.padding = '5px 10px';
titleBar.style.backgroundColor = '#007bff';
titleBar.style.color = '#fff';
titleBar.style.cursor = 'grab';
titleBar.style.borderTopLeftRadius = '8px';
titleBar.style.borderTopRightRadius = '8px';
wrapper.appendChild(titleBar);

// Add macOS-style traffic light buttons
const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '5px';
buttonContainer.style.marginRight = '10px'; // Spacing between buttons and title
titleBar.appendChild(buttonContainer);

const createMacButton = (color, action) => {
    const button = document.createElement('div');
    button.style.width = '12px';
    button.style.height = '12px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = color;
    button.style.cursor = 'pointer';
    button.addEventListener('click', action);
    return button;
};

const closeButton = createMacButton('#ff605c', () => wrapper.remove()); // Red button
const minimizeButton = createMacButton('#ffbd44', () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none'; // Yellow button
});
const fullscreenButton = createMacButton('#00ca4e', () => {
    if (!document.fullscreenElement) wrapper.requestFullscreen();
    else document.exitFullscreen();
}); // Green button

buttonContainer.appendChild(closeButton);
buttonContainer.appendChild(minimizeButton);
buttonContainer.appendChild(fullscreenButton);

// Add title
const title = document.createElement('div');
title.textContent = 'Snake Game';
title.style.flexGrow = '1'; // Fills available space
title.style.fontSize = '16px';
title.style.fontWeight = 'bold';
title.style.color = '#fff';
title.style.textAlign = 'center';
title.style.pointerEvents = 'none'; // Prevent dragging from the title
titleBar.appendChild(title);

// Add iframe to the wrapper
const iframe = document.createElement('iframe', { is: 'x-frame-bypass' });
iframe.src = 'https://www.google.com/fbx?fbx=snake_arcade';
iframe.style.width = '100%';
iframe.style.height = '600px';
iframe.style.border = 'none';
wrapper.appendChild(iframe);

// Dragging functionality for the wrapper
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;
    titleBar.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        wrapper.style.left = `${e.clientX - offsetX}px`;
        wrapper.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    titleBar.style.cursor = 'grab';
});
