(function() {
    alert("Made by WASD\n\nHold Left Click Down To Initiate The Auto-Clicker.\n\nMay Not Click Very Quickly Depending On Your Performance.");

    var clickerIsMouseDown = false;
    var clickerCurrentMouseTarget = document.body;

    // Detect mouse button release
    document.body.addEventListener('mouseup', () => {
        clickerIsMouseDown = false;
    });

    // Detect mouse button press
    document.body.addEventListener('mousedown', () => {
        clickerIsMouseDown = true;
    });

    // Track the current mouse target for clicking
    document.body.addEventListener('mousemove', (e) => {
        clickerCurrentMouseTarget = e.target;
    });

    // Set a higher frequency interval (e.g., 1ms or 0ms)
    setInterval(() => {
        if (clickerIsMouseDown) {
            clickerCurrentMouseTarget.click();
        }
    }, 1); // Lower value to make clicks faster
})();
