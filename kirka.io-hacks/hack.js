const scripts = [
  "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/kirka.io-hacks/silent.js",
  "https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js",
  "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/kirka.io-hacks/wallhack.js"
];

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve(url);
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

(async function() {
  for (const url of scripts) {
    try {
      await loadScript(url);
      console.log(`Loaded: ${url}`);
    } catch (err) {
      console.error(err);
    }
  }
})();
