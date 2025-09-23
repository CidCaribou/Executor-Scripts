function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback; 
  script.onerror = function () {
    console.error(`Failed to load script: ${src}`);
  };
  document.head.appendChild(script);
}

loadScript('https://cdn.jsdelivr.net/npm/lil-gui@0.19.2/dist/lil-gui.umd.min.js', function () {
  console.log('lil-gui loaded');
  loadScript('https://unpkg.com/three@0.150.0/build/three.min.js', function () {
    console.log('three.js loaded');
  loadScript('https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/voxiom.io-hacks/hack.js', function () {
    console.log('hacks loaded');

    if (typeof swal === 'undefined') {
      loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js', function () {
        console.log('SweetAlert2 loaded');
        showSuccessAlert();
      });
    } else {
      console.log('swal is already defined');
      showSuccessAlert();
    }
  });
});

function showSuccessAlert() {
  Swal.fire({
    title: 'Success!',
    text: 'Scripts loaded successfully!',
    icon: 'success',
    confirmButtonText: 'Okay'
  });
}
