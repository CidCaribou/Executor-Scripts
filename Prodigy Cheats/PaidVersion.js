alert("Requires Spoofer V1");

(async function() {
    async function fetchFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Could not fetch ${filePath}`);
            return await response.text();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function loadFiles() {
        // Fetch external HTML, CSS, and JS content
        const htmlContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Prodigy%20Cheats/Content/index.html');
        const cssContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Prodigy%20Cheats/Content/style.css');
        const jsContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Prodigy%20Cheats/Content/script.js');

        // Check if all files were successfully fetched
        if (!htmlContent || !cssContent || !jsContent) {
            console.error("Failed to load one or more files.");
            return;
        }

        // Create a floating UI container
        const uiElement = document.createElement('div');
        uiElement.style.position = 'fixed';
        uiElement.style.top = '100px'; // Fixed incorrect value '100x' to '100px'
        uiElement.style.right = '10px';
        uiElement.style.zIndex = '10000';
        uiElement.style.background = 'white';
        uiElement.style.border = '1px solid black';
        uiElement.style.padding = '10px';
        uiElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        document.body.appendChild(uiElement);

        // Inject the HTML content into the floating UI container
        uiElement.innerHTML = htmlContent;

        // Inject the CSS content into the document
        const style = document.createElement('style');
        style.innerHTML = cssContent;
        document.head.appendChild(style);

        // Inject the JS content into the document
        const script = document.createElement('script');
        script.innerHTML = jsContent;
        document.body.appendChild(script);
    }

    // Call the loadFiles function after the alert
    await loadFiles();
})();
