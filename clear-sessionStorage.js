javascript:(function(){
    let swalScript = document.createElement('script');
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalScript.onload = function() {
        showConfirmation();
    };
    document.head.appendChild(swalScript);

    function showConfirmation() {
        Swal.fire({
            title: "Are you sure?",
            text: "This will clear your session storage. Data stored for this session will be lost.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, clear session storage!",
            cancelButtonText: "No, keep my data"
        }).then((result) => {
            if (result.isConfirmed) {
                clearSessionStorage();
            } else {
                Swal.fire("Operation Canceled", "Your session storage was not cleared.", "info");
            }
        });
    }

    function clearSessionStorage() {
        sessionStorage.clear();
        Swal.fire("Session Storage Cleared!", "Your session storage has been successfully cleared.", "success");
    }
})();
