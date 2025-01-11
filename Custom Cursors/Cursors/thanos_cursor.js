(function () {

  const normalCursorUrl = "https://cdn.custom-cursor.com/db/cursor/32/Infinity_Gauntlet_Cursor.png"; 
  const pointerCursorUrl = "https://cdn.custom-cursor.com/db/pointer/32/Infinity_Gauntlet_Pointer.png"; 
  const textCursorUrl = "https://cdn.custom-cursor.com/db/pointer/32/Infinity_Gauntlet_Pointer.png"; 

  function applyCustomCursors() {

    var id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    doMouse();

    async function doMouse() {

      document.querySelectorAll("*").forEach(function (node3) {
        if (window.getComputedStyle(node3).cursor === "pointer") {
          node3.setAttribute("cursor", "pointer");
        }
      });

      document.querySelectorAll('*:not([cursor="pointer"])').forEach(function (node) {
        if (canTypeInElement(node)) {
          node.style.cursor = `url(${textCursorUrl}), text`; 
        } else {
          node.style.cursor = `url(${normalCursorUrl}), default`; 
        }
      });

      document.querySelectorAll('*[cursor="pointer"]').forEach(function (node2) {
        node2.style.cursor = `url(${pointerCursorUrl}), pointer`; 
      });

      await sleep(20);
      doMouse(); 
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function resetCursors() {
    document.querySelectorAll("*").forEach(function (node) {
      node.style.cursor = "default";
    });
  }

  window.resetCursors = resetCursors;

  applyCustomCursors();

  function canTypeInElement(element) {
    if (
      (element instanceof HTMLInputElement && element.type !== "hidden") ||
      element instanceof HTMLTextAreaElement ||
      element.contentEditable === "true"
    ) {
      return true;
    }
    if (element instanceof HTMLSelectElement || element instanceof HTMLOptionElement) {
      return true;
    }
    if (element instanceof HTMLButtonElement || (element.tagName.toLowerCase() === "button" && element.getAttribute("type") === "submit")) {
      return true;
    }
    return false;
  }
})();
