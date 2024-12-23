javascript:(async function() {
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
        const htmlContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Loading/index1.html');
        const cssContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Loading/style.css');
        const jsContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/Loading/script.js');

        // Check if all files were successfully fetched
        if (!htmlContent || !cssContent || !jsContent) {
            console.error("Failed to load one or more files.");
            return;
        }

        // Inject the HTML content directly into the document body
        const htmlContainer = document.createElement('div');
        htmlContainer.innerHTML = htmlContent;
        document.body.appendChild(htmlContainer);

        // Inject the CSS content into the document
        const style = document.createElement('style');
        style.innerHTML = cssContent;
        document.head.appendChild(style);

        // Inject the JS content into the document
        const script = document.createElement('script');
        script.innerHTML = jsContent;
        document.body.appendChild(script);
    }

    // Call the loadFiles function
    await loadFiles();
})();
