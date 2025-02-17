Swal.fire({
  title: "Set Scroll Speed, Stop Key & Play/Pause Key",
  html: `
    <label>Scroll Speed:</label>
    <input id="scrollSpeedInput" type="number" class="swal2-input" placeholder="Enter speed">
    <br><br>
    <label style="display: block; text-align: center;  margin: -10px 0;">Stop Key:</label>
    <input id="stopKeyInput" type="text" maxlength="1" class="swal2-input" placeholder="Enter a key">
    <br><br>
    <label>Play/Pause Key:</label>
    <input id="playPauseKeyInput" type="text" maxlength="1" class="swal2-input" placeholder="Enter a key">
        <label style="display: block; text-align: center;  margin: 10px 0;">You can also use arrow keys to control the speed.</label>

  `,
  showCancelButton: true,
  confirmButtonText: "Start Scrolling",
  preConfirm: () => {
    return {
      speed: parseInt(document.getElementById('scrollSpeedInput').value) || 50,
      stopKey: document.getElementById('stopKeyInput').value.toLowerCase(),
      playPauseKey: document.getElementById('playPauseKeyInput').value.toLowerCase()
    };
  }
}).then((result) => {
  if (result.isConfirmed) {
    var s = result.value.speed;
    var stopKey = result.value.stopKey;
    var playPauseKey = result.value.playPauseKey;

    (function (window, document) {
      var isScrolling = false, scrollTimeout;
      var scrollSpeed = result.value.speed;
      var adjustIncrement = 1;
      var jumpIncrement = 0;
      var isStopped = false;

      function start() {
        window.addEventListener('keydown', keyPressed);
        window.addEventListener('keyup', keyReleased);
        autoScroll();
      }

      function autoScroll() {
        if (!isScrolling || isStopped) return;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        window.scrollBy(0, scrollSpeed); 
        scrollTimeout = setTimeout(autoScroll, 16); 
      }

     var keysPressed = {};

      function keyPressed(event) {
        var key = event.key.toLowerCase();
        keysPressed[key] = true;

        if (isStopped) return; 

        if (keysPressed[stopKey]) {
          turnOff();
        }

        if (keysPressed[playPauseKey]) {
          toggleScroll();
        }

        if (keysPressed['arrowdown']) {
          event.preventDefault();
          scrollSpeed -= adjustIncrement;
          autoScroll();
          Swal.fire({
            title: "Speed Decreased",
            text: `Scroll speed: ${scrollSpeed}`,
            icon: "warning",
            toast: true,
            position: "top-end",
            timer: 1000,
            showConfirmButton: false
          });
        }
        if (keysPressed['arrowup']) {
          event.preventDefault();
          scrollSpeed += adjustIncrement;
          autoScroll();
          Swal.fire({
            title: "Speed Increased",
            text: `Scroll speed: ${scrollSpeed}`,
            icon: "success",
            toast: true,
            position: "top-end",
            timer: 1000,
            showConfirmButton: false
          });
        }
      }

      function keyReleased(event) {
        delete keysPressed[event.key.toLowerCase()];
      }

      function toggleScroll() {
        if (isStopped) return; 

        isScrolling = !isScrolling;
        Swal.fire({
          title: isScrolling ? "Scrolling Resumed" : "Scrolling Paused",
          icon: "warning",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false
        });

        if (isScrolling) {
          autoScroll();
        } else {
          clearTimeout(scrollTimeout);
        }
      }

      function turnOff() {
        clearTimeout(scrollTimeout);
        isScrolling = false;
        isStopped = true; 
        Swal.fire({
          title: "Auto Scrolling Stopped",
          icon: "error",
          position: "center",
          showConfirmButton: true
        });

        window.removeEventListener('keydown', keyPressed);
        window.removeEventListener('keyup', keyReleased);
      }

      isScrolling = true;
      start();
    })(window, document);
  }

  if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire({
      title: "Operation Cancelled",
      text: "You cancelled the auto scrolling.",
      icon: "error",
      position: "center"
    });
  }
});
