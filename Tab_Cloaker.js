(function() {
    if (document.getElementById("tab-cloaker-advanced-host")) return;

    const host = document.createElement("div");
    host.id = "tab-cloaker-advanced-host";
    document.body.appendChild(host);
    const shadow = host.attachShadow({
        mode: "open"
    });

    const style = document.createElement("style");
    style.textContent = `
    :host { all: initial; }
    .window {
      position: fixed;
      top: 120px;
      left: 120px;
      width: 480px;
      background: #111;
      border-radius: 12px;
      border: 1px solid #333;
      color: #eee;
      font-family: system-ui, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      overflow: hidden;
      z-index: 2147483647;
      user-select: none;
      opacity: 0;
      transform: scale(0.95);
      animation: popIn 0.25s forwards;
    }
    .titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #000;
      color: #fff;
      padding: 8px 12px;
      cursor: move;
      font-size: 15px;
      font-weight: 600;
    }
    .titlebar .left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .titlebar img {
      width: 24px;
      height: 24px;
      filter: invert(1);
    }
    .titlebar .buttons {
      display: flex;
      gap: 6px;
    }
    .titlebar button {
      background: transparent;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      padding: 0;
      transition: background 0.2s;
    }
    .titlebar button:hover { background: rgba(255,255,255,0.1); }
    .content {
      padding: 18px;
      background: #181818;
      max-height: 420px;
      overflow-y: auto;
    }
    .content h3 {
      margin: 0 0 18px;
      font-size: 18px;
      color: #f5f5f5;
      text-align: center;
    }
    .option {
      margin: 12px 0;
      padding: 12px;
      background: #222;
      border-radius: 8px;
      text-align: center;
      transition: background 0.2s;
    }
    .option:hover { background: #2c2c2c; }
    .option button {
      display: block;
      margin: 0 auto 6px;
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      background: #333;
      color: #eee;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    }
    .option button:hover {
      background: #444;
      transform: translateY(-1px);
    }
    .option button:active {
      transform: scale(0.97);
      background: #555;
    }
    .option p {
      margin: 0;
      font-size: 13px;
      color: #aaa;
    }
    .collapsed .content { display: none; }
    .dock-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 54px;
      height: 54px;
      background: #111;
      border: 2px solid #333;
      border-radius: 50%;
      box-shadow: 0 6px 16px rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2147483647;
      transition: transform 0.2s ease, background 0.2s;
    }
    .dock-icon img {
      width: 28px;
      height: 28px;
      filter: invert(1);
    }
    .dock-icon:hover { transform: scale(1.1); background: #222; }
    .config {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .config label {
      font-size: 14px;
      color: #ddd;
      display: block;
      margin-bottom: 4px;
    }
    .config input, .config select {
      width: 95%;
      padding: 8px;
      background: #222;
      border: 1px solid #444;
      border-radius: 6px;
      color: #eee;
    }
    .config .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }
    .config .buttons button {
      flex: none;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #333;
      color: #eee;
      transition: background 0.2s;
    }
    .config .buttons button:hover { background: #444; }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
    shadow.appendChild(style);

    const win = document.createElement("div");
    win.className = "window";
    shadow.appendChild(win);

    const titlebar = document.createElement("div");
    titlebar.className = "titlebar";
    titlebar.innerHTML = `
    <div class="left">
      <img src="https://static.vecteezy.com/system/resources/previews/036/475/917/non_2x/agent-or-spy-icon-incognito-logo-vector.jpg" alt="icon">
      <span>Tab Cloaker Advanced</span>
    </div>
    <div class="buttons">
      <button id="minBtn">–</button>
      <button id="closeBtn">×</button>
    </div>
  `;
    win.appendChild(titlebar);

    const content = document.createElement("div");
    content.className = "content";
    win.appendChild(content);

    const heading = document.createElement("h3");
    heading.innerText = "Select a Cloaking Option:";
    content.appendChild(heading);

    function makeOption(label, desc, onClick) {
        const box = document.createElement("div");
        box.className = "option";
        const btn = document.createElement("button");
        btn.innerText = label;
        btn.onclick = onClick;
        const p = document.createElement("p");
        p.innerText = desc;
        box.appendChild(btn);
        box.appendChild(p);
        return box;
    }

    const tabOption = makeOption(
        "Open in Tab",
        "Opens this page in a new tab inside an iframe.",
        () => {
            const newTab = window.open("", "_blank");
            newTab.document.open();
            newTab.document.write("<html><head><title>about:blank</title></head><body></body></html>");
            newTab.document.close();

            const iframe = newTab.document.createElement("iframe");
            iframe.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;";
            iframe.src = window.location.href;
            newTab.document.body.appendChild(iframe);
        }
    );

    const ORIGINAL_TITLE = document.title || "";
    const ORIGINAL_ICON = (function() {
        const f =
            document.querySelector("link[rel='icon']") ||
            document.querySelector("link[rel='shortcut icon']") ||
            document.querySelector("link[rel='apple-touch-icon']") ||
            document.querySelector("link[rel='apple-touch-icon-precomposed']");
        return f ? f.href : "";
    })();

    const winOption = makeOption(
        "Open in Window",
        "Opens this page in a fullscreen popup window.",
        () => {
            const w = window.open("", "_blank", "fullscreen=yes");
            w.document.title = "Popup Window";

            const style = w.document.createElement("style");
            style.textContent = "* { margin:0; padding:0; } html, body { height:100%; overflow:hidden; }";
            w.document.head.appendChild(style);

            const iframe = w.document.createElement("iframe");
            iframe.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;";
            iframe.src = window.location.href;
            w.document.body.appendChild(iframe);
        }
    );

    const customOption = makeOption(
        "Custom Cloak",
        "Change this tab’s favicon and title using presets or custom values.",
        () => showConfig()
    );

    content.appendChild(tabOption);
    content.appendChild(winOption);
    content.appendChild(customOption);

    const minBtn = titlebar.querySelector("#minBtn");
    const closeBtn = titlebar.querySelector("#closeBtn");

    minBtn.onclick = () => {
        win.classList.toggle("collapsed");
        minBtn.textContent = win.classList.contains("collapsed") ? "+" : "–";
    };

    closeBtn.onclick = () => {
        win.remove();
        const dock = document.getElementById("tab-cloaker-dock");
        if (dock) dock.remove();

        host.remove();
    };

    function showDockIcon() {
        if (document.getElementById("tab-cloaker-dock")) return;
        const dock = document.createElement("div");
        dock.id = "tab-cloaker-dock";
        dock.className = "dock-icon";
        dock.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/6711/6711385.png">`;
        document.body.appendChild(dock);

        dock.onclick = () => {
            dock.remove();
            document.body.appendChild(host);
        };
    }

    let isDragging = false,
        offsetX, offsetY;
    titlebar.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "BUTTON") return;
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    });

    function onDrag(e) {
        if (!isDragging) return;
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    }

    function showConfig() {
        content.innerHTML = "";

        const heading = document.createElement("h3");
        heading.innerText = "Custom Cloak Settings";
        content.appendChild(heading);

        const config = document.createElement("div");
        config.className = "config";

        const presets = {
            "Default": {
                title: ORIGINAL_TITLE,
                icon: ORIGINAL_ICON
            },
            "Google Drive": {
                title: "My Drive - Google Drive",
                icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
            },
            "Wikipedia": {
                title: "Wikipedia, the free encyclopedia",
                icon: "https://en.wikipedia.org/static/favicon/wikipedia.ico"
            },
            "Google Calender": {
                title: "Google Calender",
                icon: "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_19.ico"
            },
            "Google": {
                title: "Google",
                icon: "https://www.google.com/favicon.ico"
            },
            "Google Classroom": {
                title: "Home",
                icon: "https://www.gstatic.com/classroom/ic_product_classroom_144.png"
            },
            "Google Docs": {
                title: "Google Docs",
                icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico"
            },
            "YouTube": {
                title: "YouTube",
                icon: "https://www.youtube.com/favicon.ico"
            }
        };

        const presetLabel = document.createElement("label");
        presetLabel.innerText = "Preset:";
        const presetSelect = document.createElement("select");
        presetSelect.innerHTML = `<option value="">-- Select Preset --</option>` +
            Object.keys(presets).map(k => `<option value="${k}">${k}</option>`).join("");

        config.appendChild(presetLabel);
        config.appendChild(presetSelect);

        const titleLabel = document.createElement("label");
        titleLabel.innerText = "Custom Title:";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = document.title;

        config.appendChild(titleLabel);
        config.appendChild(titleInput);

        const iconLabel = document.createElement("label");
        iconLabel.innerText = "Custom Icon URL:";
        const iconInput = document.createElement("input");
        iconInput.type = "text";
        iconInput.value = getFaviconUrl();

        config.appendChild(iconLabel);
        config.appendChild(iconInput);

        const btnRow = document.createElement("div");
        btnRow.className = "buttons";

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.onclick = () => {
            const chosenPreset = presetSelect.value;
            let title = titleInput.value;
            let icon = iconInput.value;

            if (chosenPreset && presets[chosenPreset]) {
                title = presets[chosenPreset].title;
                icon = presets[chosenPreset].icon;
            }

            if (title) document.title = title;
            if (icon) {
                let existingIcon = document.querySelector("link[rel='shortcut icon']");
                if (existingIcon) existingIcon.href = icon;
                else {
                    const newIcon = document.createElement("link");
                    newIcon.rel = "shortcut icon";
                    newIcon.href = icon;
                    document.head.appendChild(newIcon);
                }
            }

            resetMenu();
        };

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Close";
        cancelBtn.onclick = () => resetMenu();

        btnRow.appendChild(saveBtn);
        btnRow.appendChild(cancelBtn);
        config.appendChild(btnRow);

        presetSelect.onchange = () => {
            if (presetSelect.value && presets[presetSelect.value]) {
                titleInput.value = presets[presetSelect.value].title;
                iconInput.value = presets[presetSelect.value].icon;
            }
        };

        content.appendChild(config);
    }

    function resetMenu() {
        content.innerHTML = "";
        const heading = document.createElement("h3");
        heading.innerText = "Select a Cloaking Option:";
        content.appendChild(heading);
        content.appendChild(tabOption);
        content.appendChild(winOption);
        content.appendChild(customOption);
    }

    function getFaviconUrl() {
        const favicon =
            document.querySelector("link[rel='shortcut icon']") ||
            document.querySelector("link[rel='icon']") ||
            document.querySelector("link[rel='apple-touch-icon']") ||
            document.querySelector("link[rel='apple-touch-icon-precomposed']");
        return favicon ? favicon.href : "";
    }
})();
