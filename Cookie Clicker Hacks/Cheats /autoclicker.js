(function() {
    // Prompt user for the toggle key and click speed, with default values if OK is pressed
    const toggleKey = prompt("Enter The Key You Want To Activate The Auto Clicker";
    const clickSpeed = prompt("Enter the auto-clicker speed in milliseconds (lower = faster, e.g., '1' for super fast):") || "1";

    // Validate the speed input
    let speed = parseInt(clickSpeed);
    if (isNaN(speed) || speed <= 0) {
        alert("Invalid speed entered! Using default speed of 1 millisecond.");
        speed = 1;
    }

    let autoClicking = false;  // Auto clicker state

    // Function to start auto-clicking
    const startAutoClicking = () => {
        if (!autoClicking) {
            autoClicking = true;
            alert("Auto-clicker activated!");
        }
    };

    // Function to stop auto-clicking
    const stopAutoClicking = () => {
        if (autoClicking) {
            autoClicking = false;
            alert("Auto-clicker deactivated!");
        }
    };

    // Event listener for keydown to start clicking
    document.addEventListener('keydown', (e) => {
        if (e.key === toggleKey && !autoClicking) {
            startAutoClicking();
        }
    });

    // Event listener for keyup to stop clicking
    document.addEventListener('keyup', (e) => {
        if (e.key === toggleKey && autoClicking) {
            stopAutoClicking();
        }
    });

    // Auto-clicking loop
    setInterval(() => {
        if (autoClicking) {
            Game.ClickCookie();  // Simulate a cookie click
        }
    }, speed);
})();
