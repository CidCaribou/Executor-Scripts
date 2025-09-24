const scripts = [
  "https://cdn.jsdelivr.net/npm/sweetalert2@11", 
  "https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js", 
  "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/kirka.io-hacks/hacks.js",
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
  try {
    for (const url of scripts) {
      await loadScript(url);
      console.log(`Loaded: ${url}`);
    }
    Swal.fire({
      icon: 'success',
      title: 'Hacks Successfully Initialized!',
      text: "Auto Kill and Wallhack Initialized.",
      showConfirmButton: true,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Failed to load some scripts',
      text: err.message
    });
  }
})();
