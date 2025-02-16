javascript:(function(){ 
    Swal.fire({
        title: "Are you sure?",
        text: "This will clear all your local storage data, including saved settings and progress.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "No, keep my data"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire("Cleared!", "Your local storage has been successfully cleared.", "success");
        } else {
            Swal.fire("Operation Canceled", "Local storage was not cleared.", "warning");
        }
    });
})();
