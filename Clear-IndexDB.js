javascript:(function(){
    let swalScript = document.createElement('script');
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalScript.onload = function() {
          
    Swal.close(); 
        
        showConfirmation();
    };
    document.head.appendChild(swalScript);

    function showConfirmation() {
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
                Swal.fire("Operation Canceled", "Your IndexedDB was not cleared.", "info");
            }
        });
    }

    function clearIndexedDB() {
        if ('indexedDB' in window) {
            indexedDB.databases().then((databases) => {
                databases.forEach((db) => indexedDB.deleteDatabase(db.name));
            });
        }

        Swal.fire("IndexedDB Cleared!", "Your IndexedDB storage has been successfully cleared.", "success");
    }
})();
