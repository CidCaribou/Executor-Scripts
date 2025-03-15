javascript:(function(){
    if (!window.Swal) {
        let script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        script.onload = showConfirmation;
        document.head.appendChild(script);
    } else {
        showConfirmation();
    }

    function showConfirmation() {
        Swal.fire({
            title: "Are you sure?",
            text: "Deleting cookies means that when you reload the page, you will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete Cookies",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                document.cookie.split(";").forEach((cookie) => {
                    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
                });
                Swal.fire("Successfully deleted cookies!", "", "success");
            } else {
                Swal.fire("Operation cancelled.", "", "warning");
            }
        });
    }
})();
