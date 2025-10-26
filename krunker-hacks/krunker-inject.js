(async function() {
  if (location.hostname !== 'krunker.io') return;

  // Load SweetAlert2 if not present
  async function ensureSwal() {
    if (window.Swal) return;
    // load CSS
    const cssHref = 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      document.head && document.head.appendChild(link);
    }
    // load script
    await new Promise((resolve, reject) => {
      if (window.Swal) return resolve();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head && document.head.appendChild(s);
    });
  }

  try {
    await ensureSwal();
  } catch (e) {
    // If Swal fails to load, fallback to native confirm
    const raw = localStorage.getItem('injectkrunkerhacks');
    const enabled = raw === 'true';
    if (!enabled) {
      const ok = confirm('In order for the hacks to work the website will have to reload. Are you sure you want to refresh?');
      if (ok) {
        localStorage.setItem('injectkrunkerhacks', 'true');
        location.reload();
      }
    } else {
      const off = confirm('Hacks are currently enabled. Do you want to turn them off?');
      if (off) {
        localStorage.removeItem('injectkrunkerhacks');
        alert('injectkrunkerhacks removed. Refresh the page if you want the change to fully apply.');
      }
    }
    return;
  }

  const raw = localStorage.getItem('injectkrunkerhacks');
  const enabled = raw === 'true';

  if (!enabled) {
    // Ask to enable and reload
    const result = await Swal.fire({
      title: 'Enable Hacks?',
      text: 'In order for the hacks to work the website will have to reload. Are you sure you want to refresh?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, refresh',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      localStorage.setItem('injectkrunkerhacks', 'true');
      // small delay to let Swal finish animating (optional)
      setTimeout(() => location.reload(), 150);
    }
  } else {
    // Ask to disable
    const result = await Swal.fire({
      title: 'Disable Hacks?',
      text: 'Hacks are currently enabled. Do you want to turn them off?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, turn off',
      cancelButtonText: 'No, keep on'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('injectkrunkerhacks');
      await Swal.fire({ title: 'Disabled', text: 'injectkrunkerhacks removed', icon: 'success', timer: 1400, showConfirmButton: false });
    }
  }
})();
