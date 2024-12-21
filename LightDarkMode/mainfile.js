(function() {
    async function fetchFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Could not fetch ${filePath}`);
            return await response.text();
        } catch (error) {
            console.error(error);
        }
    }

    async function loadFiles() {
        // Fetch HTML, CSS, and JS content
        const htmlContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/LightDarkMode/indexupdated.html');
        const cssContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/LightDarkMode/style.css');
        const jsContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/LightDarkMode/script.js');

        // Inject the HTML content into the body
        const htmlContainer = document.createElement('div');
        htmlContainer.innerHTML = htmlContent;
        document.body.appendChild(htmlContainer); // Append the HTML to the body

        // Inject the CSS content into the head
        const style = document.createElement('style');
        style.innerHTML = cssContent;
        document.head.appendChild(style); // Append the CSS to the head

        // Inject the JS content into the body
        const script = document.createElement('script');
        script.textContent = jsContent;  // Use textContent instead of innerHTML
        document.body.appendChild(script); // Append the JS to the body
    }

    loadFiles();
})();
