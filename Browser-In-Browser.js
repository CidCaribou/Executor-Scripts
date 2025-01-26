javascript:(function() {
    const popupId = "customPopupBrowser";
    let popup = document.getElementById(popupId);

    if (popup) {
        popup.remove();
        return;
    }
  
  const swalScript = document.createElement('script');
  swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(swalScript);
  
    popup = document.createElement("div");
    popup.id = popupId;
    popup.style.position = "fixed";
    popup.style.top = "10%";
    popup.style.left = "10%";
    popup.style.width = "80%";
    popup.style.height = "80%";
    popup.style.zIndex = "10000";
    popup.style.backgroundColor = "#fff";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    popup.style.borderRadius = "8px";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.transition = "all 0.3s"; 

    let isDragging = false;
    let offsetX, offsetY;
 
    const headerBar = document.createElement("div");
    headerBar.style.height = "35px";
    headerBar.style.backgroundColor = "#D3D3D3"; 
    headerBar.style.display = "flex";
    headerBar.style.alignItems = "center";
    headerBar.style.padding = "0 10px";
    headerBar.style.cursor = "move";
    headerBar.style.borderBottom = "1px solid #ccc";
    headerBar.style.userSelect = "none"; 

    headerBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
        popup.style.transition = "none"; 
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            popup.style.left = `${e.clientX - offsetX}px`;
            popup.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        popup.style.transition = "all 0.3s"; 
    });

    const tabsContainer = document.createElement("div");
    tabsContainer.style.display = "flex";
    tabsContainer.style.backgroundColor = "#D3D3D3";
    tabsContainer.style.padding = "5px";
    tabsContainer.style.overflow = "hidden";
    tabsContainer.style.maxWidth = "90%"; 

    const controlBar = document.createElement("div");
    controlBar.style.display = "flex";
    controlBar.style.padding = "5px";
    controlBar.style.alignItems = "center";

    const backButton = document.createElement("button");
    backButton.innerText = "<";
    backButton.style.margin = "0 5px";
    backButton.style.color = "black";
    backButton.style.fontSize = "20px";
    backButton.style.transition = "transform 0.2s ease";
  
    backButton.addEventListener("mouseover", () => {
    backButton.style.transform = `scale(1.2)`; 
   });

    backButton.addEventListener("mouseleave", () => {
    backButton.style.transform = `scale(1)`;
        });

    const forwardButton = document.createElement("button");
    forwardButton.innerText = ">";
    forwardButton.style.margin = "0 5px";
    forwardButton.style.color = "black";
    forwardButton.style.fontSize = "20px";
    forwardButton.style.transition = "transform 0.2s ease";
  
  forwardButton.addEventListener("mouseover", () => {
   forwardButton.style.transform = `scale(1.2)`; 
});

 forwardButton.addEventListener("mouseleave", () => {
   forwardButton.style.transform = `scale(1)`;
});

   const reloadButton = document.createElement("button");
reloadButton.innerText = "⟳"; 
reloadButton.style.margin = "0 5px";
reloadButton.style.color = "black";
reloadButton.style.fontSize = "20px";
reloadButton.style.transition = "transform 0.2s ease"; 

let rotation = 0;

reloadButton.addEventListener("click", () => {
  rotation += 360; 
  reloadButton.style.transform = `rotate(${rotation}deg) scale(1)`; 
  reloadButton.style.transition = "transform 0.5s ease"; 
});

reloadButton.addEventListener("mouseover", () => {
  reloadButton.style.transform = `rotate(${rotation}deg) scale(1.2)`; 
});

reloadButton.addEventListener("mouseleave", () => {
  reloadButton.style.transform = `rotate(${rotation}deg) scale(1)`;
});

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.placeholder = "Enter URL or search";
    urlInput.style.flex = "1";
    urlInput.style.margin = "0 5px";

    const addTabButton = document.createElement("button");
    addTabButton.innerText = "+";
    addTabButton.style.margin = "0 5px";
    addTabButton.style.color = "black";
    addTabButton.style.fontSize = "20px";
    addTabButton.style.transition = "transform 0.2s ease";
  
    addTabButton.addEventListener("mouseover", () => {
    addTabButton.style.transform = `scale(1.2)`; 
   });

    addTabButton.addEventListener("mouseleave", () => {
    addTabButton.style.transform = `scale(1)`;
   });

    const fullscreenButton = document.createElement("button");
    fullscreenButton.style.margin = "0 5px";
    fullscreenButton.style.backgroundImage = "url('data:image/png;base64,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')"; 
    fullscreenButton.style.backgroundSize = "contain";
    fullscreenButton.style.backgroundRepeat = "no-repeat";
    fullscreenButton.style.width = "24px";
    fullscreenButton.style.height = "24px";
    fullscreenButton.style.transition = "transform 0.2s ease";
  
    fullscreenButton.addEventListener("mouseover", () => {
    fullscreenButton.style.transform = `scale(1.2)`; 
   });

    fullscreenButton.addEventListener("mouseleave", () => {
    fullscreenButton.style.transform = `scale(1)`;
        });

    const minimizeButton = document.createElement("button");
    minimizeButton.style.margin = "0 5px";
    minimizeButton.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQ5JREFUeJzt2zERQkEQRMGBwg0JShCEAASh5CcYQAkJ8YS3XFW3gdnkhZsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwF84De1ek9yGttnTkeS9evSyevDnnuQ5tM2eHhkI5Lx6EHYiECgEAoVAoBAIFAKBQiBQCAQKgUAhECgEAoVAoBAIFAKBQiBQTP2DvJJ8hrbZ0zF9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM+gKcngavXWZlzgAAAABJRU5ErkJggg==')";
    minimizeButton.style.backgroundSize = "contain";
    minimizeButton.style.backgroundRepeat = "no-repeat";
    minimizeButton.style.width = "24px";
    minimizeButton.style.height = "24px";
    minimizeButton.style.justifyContent = "center"; 
    minimizeButton.style.backgroundSize = "contain";
    minimizeButton.style.backgroundRepeat = "no-repeat";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.color = "black";
    minimizeButton.style.transition = "transform 0.2s ease";
  
    minimizeButton.addEventListener("mouseover", () => {
    minimizeButton.style.transform = `scale(1.2)`; 
   });

    minimizeButton.addEventListener("mouseleave", () => {
    minimizeButton.style.transform = `scale(1)`;
        });
  
    minimizeButton.addEventListener("click", () => {
      Swal.fire({
  title: "Minimize Button Not Finished",
  text: "Minimize Will Come In A Later Update Just Close The Menu And Relaunch The Script To Toggle It On And Off",
  icon: "error",
  position: 'top'
});
        });

  

    const closeButton = document.createElement("button");
    closeButton.style.margin = "0 5px";
    closeButton.innerText = "✖"; 
    closeButton.style.fontSize = "16px"; 
    closeButton.style.color = "black"; 
    closeButton.style.display = "flex"; 
    closeButton.style.alignItems = "center"; 
    closeButton.style.justifyContent = "center"; 
    closeButton.style.backgroundSize = "contain";
    closeButton.style.backgroundRepeat = "no-repeat";
    closeButton.style.width = "24px";
    closeButton.style.height = "24px";
    closeButton.style.cursor = "pointer"; 
    closeButton.addEventListener("click", () => popup.remove());
    closeButton.style.transition = "transform 0.2s ease";
  
    closeButton.addEventListener("mouseover", () => {
    closeButton.style.transform = `scale(1.2)`; 
   });

    closeButton.addEventListener("mouseleave", () => {
    closeButton.style.transform = `scale(1)`;
        });

    let isFullscreen = false;
    fullscreenButton.addEventListener("click", () => {
        if (isFullscreen) {
            popup.style.position = "fixed";
            popup.style.top = "10%";
            popup.style.left = "10%";
            popup.style.width = "80%";
            popup.style.height = "80%";
        } else {
            popup.style.position = "fixed";
            popup.style.top = "0";
            popup.style.left = "0";
            popup.style.width = "100%";
            popup.style.height = "100%";
        }
        isFullscreen = !isFullscreen;
    });

    let tabCount = 0;
    let tabButtons = [];
    let iframes = [];
    let lastActiveTabIndex = null;

    const contentContainer = document.createElement("div");
    contentContainer.style.flex = "1";
    contentContainer.style.position = "relative";
    contentContainer.style.overflow = "hidden";

    function updateTabWidths() {
        tabButtons.forEach(button => {
            button.style.width = "230px";
            button.style.flex = "0 1 auto";
        });
    }

    function createTab(url = "https://www.google.com?igu=1") {
        tabCount++;
        const tabId = `tab-${tabCount}`;

        
        const tabButton = document.createElement("button");
        tabButton.style.padding = "6px"; 
        tabButton.style.backgroundColor = "#fff";
        tabButton.style.margin = "0 2px";
        tabButton.style.borderRadius = "15px";
        tabButton.style.position = "relative";
        tabButton.style.fontSize = "10px";
        tabButton.style.transition = "all 0.3s";
        tabButton.style.border = "none"; 
        tabButton.style.color = "black"; 
        tabButton.style.fontSize = "13px";
        tabButton.style.width = "100px"; 
        tabButton.dataset.tabId = tabId;
      
        const tabTitle = document.createElement("span");
        tabTitle.classList.add("tab-title");
        tabTitle.innerText = "Loading...";
        tabButton.appendChild(tabTitle);
      
        const closeTabButton = document.createElement("span");
        closeTabButton.innerText = "✖";
        closeTabButton.style.position = "absolute";
        closeTabButton.style.right = "14px";
        closeTabButton.style.top = "4px";
        closeTabButton.style.display = "none";
        closeTabButton.style.cursor = "pointer";
        closeTabButton.style.color = "black"; 
        closeTabButton.style.fontSize = "15px";
        closeTabButton.style.transition = "transform 0.3s ease";
      
      closeTabButton.addEventListener("mouseover", () => {
  closeTabButton.style.transform = "scale(1.2)"; 
});

closeTabButton.addEventListener("mouseout", () => {
  closeTabButton.style.transform = "scale(1)"; 
});      

      closeTabButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const tabId = tabButton.dataset.tabId;
            const tabIndex = tabButtons.indexOf(tabButton);
            document.getElementById(tabId).remove();
            tabButton.remove();
            tabButtons = tabButtons.filter(button => button !== tabButton);
            iframes = iframes.filter(iframe => iframe.id !== tabId);
            updateTabWidths();
            if (tabButtons.length > 0) {
                const newActiveIndex = (lastActiveTabIndex !== null && lastActiveTabIndex < tabButtons.length) ? lastActiveTabIndex : tabButtons.length - 1;
                tabButtons[newActiveIndex].click();
            }
        });

        tabButton.appendChild(closeTabButton);

tabButton.addEventListener("mouseover", () => {
    closeTabButton.style.display = "block";
});

tabButton.addEventListener("mouseout", () => {
    closeTabButton.style.display = "none";
});

        tabButton.addEventListener("click", () => {
            tabButtons.forEach((button, index) => {
                if (button === tabButton) {
                    lastActiveTabIndex = index;
                }
                button.classList.remove('active');
            });
            tabButton.classList.add('active');
            Array.from(contentContainer.children).forEach(iframe => iframe.style.display = "none");
            document.getElementById(tabId).style.display = "block";
            urlInput.value = document.getElementById(tabId).src; 
        });

        tabsContainer.appendChild(tabButton);
        tabButtons.push(tabButton);
        updateTabWidths();

        const iframe = document.createElement("iframe");
        iframe.src = generateUrl(url);
        iframe.id = tabId;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none"; 
        iframe.style.transition = "all 0.3s"; 

        iframes.push(iframe);

    iframe.onload = () => {
    const title = iframe.contentDocument.title || url;
    const titleElement = tabButton.querySelector(".tab-title") || document.createElement("span");
    titleElement.className = "tab-title";
    titleElement.innerText = title;
    if (!tabButton.contains(titleElement)) tabButton.appendChild(titleElement);
    urlInput.value = iframe.src;
};
      

        Array.from(contentContainer.children).forEach(iframe => iframe.style.display = "none");
        contentContainer.appendChild(iframe);
        tabButton.click(); 
    }

    function generateUrl(url) {
        if (url.includes("google.com") && !url.includes("igu=1")) {
            if (url.includes("?")) {
                return url + "&igu=1";
            } else {
                return url + "?igu=1";
            }
        }
        return url;
    }

    addTabButton.addEventListener("click", () => createTab());

    headerBar.appendChild(tabsContainer);
    popup.appendChild(headerBar);
    popup.appendChild(controlBar);
    popup.appendChild(contentContainer);

    controlBar.appendChild(backButton);
    controlBar.appendChild(forwardButton);
    controlBar.appendChild(reloadButton);
    controlBar.appendChild(urlInput);
    controlBar.appendChild(addTabButton);
    controlBar.appendChild(fullscreenButton);
    controlBar.appendChild(minimizeButton);
    controlBar.appendChild(closeButton);

    document.body.appendChild(popup);

    createTab();

    backButton.addEventListener("click", () => {
        const activeTab = tabButtons.find(button => button.classList.contains('active'));
        if (activeTab) {
            const activeIframe = document.getElementById(activeTab.dataset.tabId);
            activeIframe.contentWindow.history.back();
        }
    });

    forwardButton.addEventListener("click", () => {
        const activeTab = tabButtons.find(button => button.classList.contains('active'));
        if (activeTab) {
            const activeIframe = document.getElementById(activeTab.dataset.tabId);
            activeIframe.contentWindow.history.forward();
        }
    });

    reloadButton.addEventListener("click", () => {
        const activeTab = tabButtons.find(button => button.classList.contains('active'));
        if (activeTab) {
            const activeIframe = document.getElementById(activeTab.dataset.tabId);
            activeIframe.contentWindow.location.reload();
        }
    });

    urlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const activeTab = tabButtons.find(button => button.classList.contains('active'));
            if (activeTab) {
                const activeIframe = document.getElementById(activeTab.dataset.tabId);
                let inputValue = urlInput.value.trim();
                if (!inputValue.startsWith("http://") && !inputValue.startsWith("https://")) {
                    if (inputValue.includes(" ") || !inputValue.includes(".")) {
                        inputValue = `https://www.google.com/search?q=${encodeURIComponent(inputValue)}&igu=1`;
                    } else {
                        inputValue = `https://${inputValue}`;
                    }
                }
                activeIframe.src = generateUrl(inputValue);
            }
        }
    });
})();
