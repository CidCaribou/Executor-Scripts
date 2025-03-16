const swalScript = document.createElement('script');
swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(swalScript);

swalScript.onload = function() {
    resetSwal(); // Ensure no lingering timers or settings
    main();
};

// Function to reset SweetAlert2 before executing any new alert
function resetSwal() {
    Swal.close(); // Close any existing alerts
    Swal.fire({ showConfirmButton: false, timer: null }); // Reset internal Swal state
}

// Toast function using Swal.mixin() to prevent interference with main alerts
const showToast = (message, icon) => {
  Swal.mixin({
    toast: true,
    position: 'bottom',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  }).fire();
};

function main() {
    let url = "https://www.minecraft.net/en-us/15th-anniversary";

    function showLoading() {
        resetSwal(); // Reset SweetAlert2 before showing a new alert
        Swal.fire({
            title: "Please Wait",
            text: "Processing...",
            allowOutsideClick: false,
            timer: null, // Ensure it does NOT auto-close
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    function processRequest() {
        showLoading(); 

        try {
            const mcTokenData = localStorage.getItem('MCToken');
            if (!mcTokenData) {
                resetSwal();
                Swal.fire("Error", "No Minecraft Token found in localStorage!", "error");
                return;
            }
            const mcToken = JSON.parse(mcTokenData).mcToken;

            fetch("https://net.web.minecraft-services.net/api/v1.0/grant/offer?offer=7118a7d5-240e-4f6d-8959-5269ba041938", {
                headers: {
                    accept: "*/*",
                    authorization: mcToken,
                    "content-type": "application/json",
                },
                method: "PUT",
                credentials: "include"
            })
            .then(response => {
                console.log("Status Code:", response.status);
                resetSwal(); // Reset before showing result alert
                if (response.status === 204) {
                    Swal.fire("Success", "Please log out of Minecraft and then log back in to claim the cape.", "success");
                } else {
                    Swal.fire("Error", "Patched or something went wrong.", "error");
                }
            })
            .catch(() => {
                resetSwal();
                Swal.fire("Error", "Network request failed.", "error");
            });

        } catch (e) {
            resetSwal();
            Swal.fire("Error", "An unexpected error occurred.", "error");
        }
    }

    function checkLoggedIn() {
        resetSwal();
        Swal.fire({
            title: "Are you logged into Minecraft?",
            text: "Make sure you're logged into your Minecraft account before proceeding.",
            icon: "question",
            showCancelButton: true,
            timer: null,
            confirmButtonText: "Yes, I'm logged in",
            cancelButtonText: "No, take me to login"
        }).then((result) => {
            if (result.isConfirmed) {
                processRequest(); 
            } else {
                window.open("https://www.minecraft.net/", "_blank");
                resetSwal();
                Swal.fire("Please Login", "Redirecting you to Minecraft.net", "info");
            }
        });
    }

    if (window.location.href !== url) {
        resetSwal();
        Swal.fire({
            title: "Incorrect Website",
            text: "Would you like to go to the correct website? If so please reopen the script on the correct website.",
            icon: "warning",
            showCancelButton: true,
            timer: null,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(url, "_blank");
            } else {
                resetSwal();
                Swal.fire("Operation Cancelled", "", "info");
            }
        });
    } else {
        resetSwal();
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to proceed?",
            icon: "question",
            showCancelButton: true,
            timer: null,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                checkLoggedIn();
            } else {
                resetSwal();
                Swal.fire("Operation Cancelled", "", "info");
            }
        });
    }
}
