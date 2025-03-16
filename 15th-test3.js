// Dynamically load SweetAlert2
const swalScript = document.createElement('script');
swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(swalScript);

swalScript.onload = function() {
    setTimeout(() => Swal.close(), 0); // Immediately close any lingering alerts
    main();
};

// Toast function (isolated from main alerts)
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

// Function to reset SweetAlert2 completely
function resetSwal() {
    Swal.close();
    Swal.update({ timer: null, showConfirmButton: true });
}

function main() {
    let url = "https://www.minecraft.net/en-us/15th-anniversary";

    function showLoading() {
        resetSwal();
        Swal.fire({
            title: "Please Wait",
            text: "Processing...",
            allowOutsideClick: false,
            timer: null,
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
                resetSwal();
                console.log("Status Code:", response.status);
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
