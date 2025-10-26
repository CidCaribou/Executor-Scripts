(async function() {
  const onKrunker = location.hostname.endsWith("krunker.io");

  async function ensureSwal() {
    if (window.Swal) return; 
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  if (!onKrunker) {
    try {
      await ensureSwal();
      const result = await Swal.fire({
        title: "Wrong Website",
        text: "This script only works on krunker.io. Open it now?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      });
      if (result.isConfirmed) location.href = "https://krunker.io";
    } catch (e) {
      if (confirm("This script only works on krunker.io. Open it now?")) {
        location.href = "https://krunker.io";
      }
    }
    return;
  }

  await ensureSwal();
  const enabled = localStorage.getItem("injectkrunkerhacks") === "true";

  if (!enabled) {
    const result = await Swal.fire({
      title: "Enable Hacks?",
      text: "The page must reload to activate hacks. Refresh now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, refresh"
    });
    if (result.isConfirmed) {
      localStorage.setItem("injectkrunkerhacks", "true");
      setTimeout(() => location.reload(), 150);
    }
  } else {
    const result = await Swal.fire({
      title: "Disable Hacks?",
      text: "Turn off hacks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, turn off and refresh."
    });
    if (result.isConfirmed) {
      localStorage.removeItem("injectkrunkerhacks");
      setTimeout(() => location.reload(), 150);
      await Swal.fire({
        title: "Disabled",
        text: "Hacks have been turned off",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    }
  }
})();
