(function () {
  fetch('https://pxi-fusion-menu.pages.dev/main/menu.js')
    .then((response) => response.text()) 
    .then((scriptText) => {
      var scriptElement = document.createElement('script');
      scriptElement.textContent = scriptText; 
      document.body.appendChild(scriptElement); 
    })
    .catch((error) => {
      console.error('Error fetching the script:', error); 
    });
})();
