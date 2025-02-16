Swal.fire({
  title: "Set Scroll Speed & Stop Key",
  html: `
    <label>Scroll Speed:</label>
    <input id="scrollSpeedInput" type="number" class="swal2-input" placeholder="Enter speed">
    <br><br>
    <label style="display: block; text-align: center;  margin: -10px 0;">Stop Key:</label>
    <input id="stopKeyInput" type="text" maxlength="1" class="swal2-input" placeholder="Enter a key">
  `,
  showCancelButton: true,
  confirmButtonText: "Start Scrolling",
  preConfirm: () => {
    return {
      speed: parseInt(document.getElementById('scrollSpeedInput').value) || 50,
      stopKey: document.getElementById('stopKeyInput').value.toLowerCase()
    };
  }
}).then((result) => {
  if (result.isConfirmed) {
    var s = result.value.speed;
    var stopKey = result.value.stopKey;

    (function(window, document) {
      var isScrolling = false, scrollTimeout;
      var scrollSpeed = s;
      var adjustIncrement = 2;
      var jumpIncrement = 50;

      function start() {
        window.addEventListener('keydown', keyPressed);
        window.addEventListener('keyup', keyReleased, false);
        autoScroll();
      }

      function autoScroll() {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        window.scrollBy(0, s);
        scrollTimeout = setTimeout(autoScroll, scrollSpeed);
        isScrolling = true;
      }

      var keysPressed = {};

      function keyPressed(event) {
        keysPressed[event.key.toLowerCase()] = true;

        if (keysPressed[stopKey]) {
          turnOff();
        }

        if (keysPressed['arrowdown']) {
          event.preventDefault();
          window.scrollBy(0, jumpIncrement);
          autoScroll();
        }
        if (keysPressed['arrowup']) {
          event.preventDefault();
          window.scrollBy(0, -jumpIncrement);
          autoScroll();
        }
        if (keysPressed['arrowright']) {
          event.preventDefault();
          scrollSpeed -= adjustIncrement;
          autoScroll();
        }
        if (keysPressed['arrowleft']) {
          event.preventDefault();
          scrollSpeed += adjustIncrement;
          autoScroll();
        }
      }

      function keyReleased(event) {
        delete keysPressed[event.key.toLowerCase()];
      }

      function turnOff() {
        clearTimeout(scrollTimeout);
        isScrolling = false;
      }

      start();
    })(window, document);
  }
  if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire({
      title: "Operation Cancelled",
      text: "You cancelled the auto scrolling.",
      icon: "warning"
    });
  }
});
