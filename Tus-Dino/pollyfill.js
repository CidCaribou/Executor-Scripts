(function() {
  if (typeof unsafeWindow === 'undefined') {
    window.unsafeWindow = window; 
  }

  if (typeof GM_info === 'undefined') {
    window.GM_info = {
      script: {
        name: document.title || 'Tus Dino',
        version: '0.17.4',
      },
      scriptHandler: 'Polyfilled',
      version: '0.17.4'
    };
  }

  if (typeof GM_getValue === 'undefined') {
    window.GM_getValue = function(key, defaultValue) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    };
  }

  if (typeof GM_setValue === 'undefined') {
    window.GM_setValue = function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('GM_setValue polyfill error:', e);
      }
    };
  }

  if (typeof GM_deleteValue === 'undefined') {
    window.GM_deleteValue = function(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('GM_deleteValue polyfill error:', e);
      }
    };
  }
})();
