javascript:(function () {
    async function closeActiveSwal() {
        if (window.Swal && Swal.isVisible()) {
            Swal.close();
            // Wait for Swal to finish closing animation
            await new Promise(r => setTimeout(r, 250));
        }
    }

    closeActiveSwal().then(() => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will clear your IndexedDB storage. Some offline app data may be lost.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, clear IndexedDB!",
            cancelButtonText: "No, keep my data"
        }).then((result) => {
            if (result.isConfirmed) {
                clearIndexedDB();
            } else {
                Swal.fire({
                    title: "Operation Canceled",
                    text: "Your IndexedDB was not cleared.",
                    icon: "info",
                    toast: true,
                    position: "top-end",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        });
    });

    function clearIndexedDB() {
        if ("indexedDB" in window) {
            indexedDB.databases().then((databases) => {
                databases.forEach((db) => indexedDB.deleteDatabase(db.name));
            });
        }

        Swal.fire({
            title: "IndexedDB Cleared!",
            text: "Your IndexedDB storage has been successfully cleared.",
            icon: "success",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false
        });
    }
})();
