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
  if (typeof GM === 'undefined') window.GM = {};

  const storageGet = (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const storageSet = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('GM_setValue error:', e);
    }
  };

  const storageDelete = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('GM_deleteValue error:', e);
    }
  };

  const storageList = () => {
    try {
      return Object.keys(localStorage);
    } catch (e) {
      console.error('GM_listValues error:', e);
      return [];
    }
  };

  if (typeof GM_getValue === 'undefined') window.GM_getValue = storageGet;
  if (typeof GM_setValue === 'undefined') window.GM_setValue = storageSet;
  if (typeof GM_deleteValue === 'undefined') window.GM_deleteValue = storageDelete;
  if (typeof GM_listValues === 'undefined') window.GM_listValues = storageList;

  if (typeof GM_setClipboard === 'undefined') {
    window.GM_setClipboard = function(text) {
      try {
        navigator.clipboard.writeText(text);
      } catch (e) {
        console.error('GM_setClipboard error:', e);
      }
    };
  }

  if (typeof GM_openInTab === 'undefined') {
    window.GM_openInTab = function(url) {
      window.open(url, '_blank');
    };
  }

  if (!GM.getValue) GM.getValue = async (key, defaultValue) => storageGet(key, defaultValue);
  if (!GM.setValue) GM.setValue = async (key, value) => storageSet(key, value);
  if (!GM.deleteValue) GM.deleteValue = async (key) => storageDelete(key);
  if (!GM.listValues) GM.listValues = async () => storageList();
  if (!GM.info) GM.info = GM_info;
  if (!GM.setClipboard) GM.setClipboard = async (text) => GM_setClipboard(text);
  if (!GM.openInTab) GM.openInTab = async (url) => GM_openInTab(url);

})();
