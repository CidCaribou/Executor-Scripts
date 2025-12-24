javascript:(function(){
    function loadSwal(callback) {
        if (window.Swal) {
            callback();
        } else {
            let swalScript = document.createElement('script');
            swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
            swalScript.onload = callback;
            document.head.appendChild(swalScript);
        }
    }

    function showConfirmation() {
        Swal.fire({
            title: "Are you sure?",
            text: "This will clear your browser's cache.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, clear cache!",
            cancelButtonText: "No, keep my cache"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCache();
            } else {
                Swal.fire("Operation Canceled", "Your cache was not cleared.", "warning");
            }
        });
    }

    function clearCache() {
        if ('caches' in window) {
            caches.keys().then((cacheNames) => {
                cacheNames.forEach((cacheName) => {
                    caches.delete(cacheName);
                });
            });
        }

        Swal.fire("Cache Cleared!", "Your browser cache has been successfully cleared.", "success");
    }

    loadSwal(showConfirmation);
})();
