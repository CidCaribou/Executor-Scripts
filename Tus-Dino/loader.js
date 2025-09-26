const loadScript = (src, callback) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
};

loadScript('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/Tus-Dino/pollyfill.js', () =>
  loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js', () =>
    loadScript('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/voxiom.io-hacks/hack.js', () =>
        showSuccessAlert()
      )
    )
  )
);

function showSuccessAlert() {
  Swal.fire({
    title: 'Success!',
    text: 'Scripts Tus Dino loaded successfully!',
    icon: 'success',
    confirmButtonText: 'Okay'
  });
}
