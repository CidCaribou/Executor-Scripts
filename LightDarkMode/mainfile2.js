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

        const htmlContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/LightDarkMode/index.html');
        const cssContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/LightDarkMode/style1.css');
        const jsContent = await fetchFile('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/LightDarkMode/script.js');

        const htmlContainer = document.createElement('div');
        htmlContainer.innerHTML = htmlContent;
        document.body.appendChild(htmlContainer); 

        const style = document.createElement('style');
        style.innerHTML = cssContent;
        document.head.appendChild(style); 

        const script = document.createElement('script');
        script.textContent = jsContent;  
        document.body.appendChild(script); 
    }

    loadFiles();
})();
