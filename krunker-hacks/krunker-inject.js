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

    await ensureSwal();

    if (!onKrunker) {
        const result = await Swal.fire({
            title: "Wrong Website",
            text: "This script only works on krunker.io. Open it now?",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        });
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Redirecting...",
                toast: true,
                position: "bottom",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
            });
            location.href = "https://krunker.io";
        }
        return;
    }

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
            await Swal.fire({
                title: "Reloading...",
                toast: true,
                position: "bottom",
                icon: "success",
                showConfirmButton: false,
                timer: 1200
            });
            setTimeout(() => location.reload(), 500);
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
            await Swal.fire({
                title: "Disabled",
                text: "Hacks have been turned off",
                icon: "success",
                showConfirmButton: true
            });
            setTimeout(() => location.reload(), 200);
        }
    }
})();
