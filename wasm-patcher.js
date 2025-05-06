javascript:(function() {
  'use strict';

  const UnityWasmScanner = {
    memoryFindings: {},
    lastSearchValues: [],
    searchHistory: [],
    customMemoryPath: '',
    commonMemoryPaths: [
      'unityInstance.Module.HEAPU8',
      'gameInstance.Module.HEAPU8',
      'Module.HEAPU8',
      'unityGame.Module.HEAPU8',
      'UnityLoader.Module.HEAPU8',
      'window.Module.HEAPU8',
      'g.Module.HEAPU8',
      'UnityInstance.Module.HEAPU8',
      'GameInstance.Module.HEAPU8',
      'game.Module.HEAPU8',
      'unity.Module.HEAPU8',
      'app.Module.HEAPU8',
      'unityInstance.Module.wasmMemory.buffer',
      'gameInstance.Module.wasmMemory.buffer',
      'Module.wasmMemory.buffer',
      'Module.wasmModule.exports.memory.buffer',
      'window.wasmMemory.buffer',
      'unityFramework.Module.HEAPU8',
      'unityInstance.dataHEAPU8',
      'GameManager.Module.HEAPU8',
      'UnityModule.HEAPU8',
      'WebGLModule.HEAPU8',
      'UnityGame.Module.HEAPU8',
      'gameInstance.dataHeap',
      'GameInstance.dataHeap',
      'unityCanvas.Module.HEAPU8',
      'instance.exports.memory.buffer',
      'wasm.memory.buffer',
      'wasmInstance.exports.memory.buffer',
      'webassemblyInstance.exports.memory.buffer'
    ],
    moduleNames: [
      'Module', 'unityInstance', 'gameInstance', 'UnityLoader', 'game',
      'unity', 'app', 'GameInstance', 'UnityInstance', 'instance', 'wasm',
      'wasmInstance', 'webassemblyInstance', 'wasmModule', 'unityModule',
      'WebGLModule', 'UnityGame', 'UnityFramework', 'webgl', 'UnityWebgl',
      'player', 'webglApp', 'unityGame', 'gameManager', 'GameManager',
      'Canvas', 'unityCanvas', 'GameCanvas', 'wasmMemory', 'Memory', 'memory'
    ],
    foundMemory: null,
    foundMemoryPath: '',

    init: function() {
      console.log('WASM Memory Scanner initialized');
      this.autoDetectMemory();
      this.createUI();
      this.attachEventListeners();
      this.setupInputCaptureHandling();
    },

    setupInputCaptureHandling: function() {
      try {
        const container = document.getElementById('wasm-scanner-ui');
        if (!container) return;

        console.log("Setting up standard input handling");
        container.style.position = 'fixed';
        container.style.zIndex = '2147483647';
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => {
          input.setAttribute('autocomplete', 'off');
          input.setAttribute('spellcheck', 'false');
          input.style.zIndex = '2147483647';
        });

      } catch (err) {
        console.error("Error in input handling setup:", err);
      }
    },

    autoDetectMemory: function() {
      console.log('Attempting to auto-detect WebAssembly memory...');
      for (const path of this.commonMemoryPaths) {
        const memory = this.getMemoryFromPath(path);
        if (memory) {
          this.foundMemory = memory;
          this.foundMemoryPath = path;
          console.log(`Successfully found memory at path: ${path}`);
          return;
        }
      }
      for (const moduleName of this.moduleNames) {
        const patterns = [
          `${moduleName}.Module.HEAPU8`,
          `${moduleName}.HEAPU8`,
          `${moduleName}.Module.wasmMemory.buffer`,
          `${moduleName}.wasmMemory.buffer`,
          `${moduleName}.exports.memory.buffer`,
          `${moduleName}.memory.buffer`,
          `${moduleName}.dataHeap`,
          `${moduleName}.buffer`,
          `${moduleName}.instance.exports.memory.buffer`
        ];
        for (const pattern of patterns) {
          const memory = this.getMemoryFromPath(pattern);
          if (memory) {
            this.foundMemory = memory;
            this.foundMemoryPath = pattern;
            console.log(`Successfully found memory using dynamic pattern: ${pattern}`);
            return;
          }
        }
      }
      console.log('Common paths failed, attempting deep search...');
      this.deepSearchMemory();
    },

    deepSearchMemory: function() {
      for (const key in window) {
        try {
          if (window[key] && typeof window[key] === 'object') {
            if (window[key].HEAPU8 && window[key].HEAPU8.buffer instanceof ArrayBuffer) {
              this.foundMemory = window[key].HEAPU8;
              this.foundMemoryPath = `window.${key}.HEAPU8`;
              console.log(`Deep search found memory at: ${this.foundMemoryPath}`);
              return;
            }
            if (window[key].buffer instanceof ArrayBuffer) {
              this.foundMemory = window[key];
              this.foundMemoryPath = `window.${key}`;
              console.log(`Deep search found memory buffer at: ${this.foundMemoryPath}`);
              return;
            }
            if (window[key].wasmMemory && window[key].wasmMemory.buffer instanceof ArrayBuffer) {
              this.foundMemory = new Uint8Array(window[key].wasmMemory.buffer);
              this.foundMemoryPath = `window.${key}.wasmMemory.buffer (as Uint8Array)`;
              console.log(`Deep search found wasmMemory at: ${this.foundMemoryPath}`);
              return;
            }
            if (window[key].exports && window[key].exports.memory && window[key].exports.memory.buffer instanceof ArrayBuffer) {
              this.foundMemory = new Uint8Array(window[key].exports.memory.buffer);
              this.foundMemoryPath = `window.${key}.exports.memory.buffer (as Uint8Array)`;
              console.log(`Deep search found WebAssembly exports memory at: ${this.foundMemoryPath}`);
              return;
            }
            for (const subKey in window[key]) {
              try {
                if (window[key][subKey] && typeof window[key][subKey] === 'object') {
                  if (window[key][subKey].HEAPU8 && window[key][subKey].HEAPU8.buffer instanceof ArrayBuffer) {
                    this.foundMemory = window[key][subKey].HEAPU8;
                    this.foundMemoryPath = `window.${key}.${subKey}.HEAPU8`;
                    console.log(`Deep search found memory at: ${this.foundMemoryPath}`);
                    return;
                  }
                  if (window[key][subKey].buffer instanceof ArrayBuffer) {
                    this.foundMemory = window[key][subKey];
                    this.foundMemoryPath = `window.${key}.${subKey}`;
                    console.log(`Deep search found memory buffer at: ${this.foundMemoryPath}`);
                    return;
                  }
                  if (window[key][subKey].wasmMemory && window[key][subKey].wasmMemory.buffer instanceof ArrayBuffer) {
                    this.foundMemory = new Uint8Array(window[key][subKey].wasmMemory.buffer);
                    this.foundMemoryPath = `window.${key}.${subKey}.wasmMemory.buffer (as Uint8Array)`;
                    console.log(`Deep search found wasmMemory at: ${this.foundMemoryPath}`);
                    return;
                  }
                  if (window[key][subKey].exports && window[key][subKey].exports.memory && window[key][subKey].exports.memory.buffer instanceof ArrayBuffer) {
                    this.foundMemory = new Uint8Array(window[key][subKey].exports.memory.buffer);
                    this.foundMemoryPath = `window.${key}.${subKey}.${deepKey}.exports.memory.buffer (as Uint8Array)`;
                    console.log(`Deep search found WebAssembly exports memory at: ${this.foundMemoryPath}`);
                    return;
                  }
                  for (const deepKey in window[key][subKey]) {
                    try {
                      if (window[key][subKey][deepKey] && typeof window[key][subKey][deepKey] === 'object') {
                        if (window[key][subKey][deepKey].HEAPU8 && window[key][subKey][deepKey].HEAPU8.buffer instanceof ArrayBuffer) {
                          this.foundMemory = window[key][subKey][deepKey].HEAPU8;
                          this.foundMemoryPath = `window.${key}.${subKey}.${deepKey}.HEAPU8`;
                          console.log(`Deep search found memory at: ${this.foundMemoryPath}`);
                          return;
                        }
                        if (window[key][subKey][deepKey].buffer instanceof ArrayBuffer) {
                          this.foundMemory = window[key][subKey][deepKey];
                          this.foundMemoryPath = `window.${key}.${subKey}.${deepKey}`;
                          console.log(`Deep search found memory buffer at: ${this.foundMemoryPath}`);
                          return;
                        }
                        if (window[key][subKey][deepKey].wasmMemory && window[key][subKey][deepKey].wasmMemory.buffer instanceof ArrayBuffer) {
                          this.foundMemory = new Uint8Array(window[key][subKey][deepKey].wasmMemory.buffer);
                          this.foundMemoryPath = `window.${key}.${subKey}.${deepKey}.wasmMemory.buffer (as Uint8Array)`;
                          console.log(`Deep search found wasmMemory at: ${this.foundMemoryPath}`);
                          return;
                        }
                        if (window[key][subKey][deepKey].exports && window[key][subKey][deepKey].exports.memory && window[key][subKey][deepKey].exports.memory.buffer instanceof ArrayBuffer) {
                          this.foundMemory = new Uint8Array(window[key][subKey][deepKey].exports.memory.buffer);
                          this.foundMemoryPath = `window.${key}.${subKey}.${deepKey}.exports.memory.buffer (as Uint8Array)`;
                          console.log(`Deep search found WebAssembly exports memory at: ${this.foundMemoryPath}`);
                          return;
                        }
                      }
                    } catch (e) { }
                  }
                }
              } catch (e) { }
            }
          }
        } catch (e) { }
      }
      this.findLargeTypedArrays();
    },

    findLargeTypedArrays: function() {
      console.log('Looking for large TypedArrays that might be WASM memory...');
      let candidates = [];
      const findArraysInObject = (obj, path) => {
        for (const key in obj) {
          try {
            if (key === 'document' || key === 'window' || key === 'parent' ||
                key === 'top' || key === 'frames' || key === 'self' ||
                key === 'console') {
              continue;
            }
            const value = obj[key];
            const newPath = path ? `${path}.${key}` : key;
            if (value instanceof Uint8Array || value instanceof Int8Array) {
              candidates.push({
                path: newPath,
                array: value,
                size: value.length
              });
            } else if (value instanceof ArrayBuffer) {
              candidates.push({
                path: newPath,
                array: new Uint8Array(value),
                size: value.byteLength
              });
            } else if (value && value.buffer instanceof ArrayBuffer) {
              candidates.push({
                path: newPath,
                array: new Uint8Array(value.buffer),
                size: value.buffer.byteLength
              });
            } else if (value && typeof value === 'object' && newPath.split('.').length < 4) {
              findArraysInObject(value, newPath);
            }
          } catch (e) { }
        }
      };
      findArraysInObject(window, '');
      candidates.sort((a, b) => b.size - a.size);
      candidates = candidates.filter(c => c.size > 1000000);
      console.log(`Found ${candidates.length} large typed arrays`);
      if (candidates.length > 0) {
        const largest = candidates[0];
        this.foundMemory = largest.array;
        this.foundMemoryPath = largest.path;
        console.log(`Selected largest array: ${largest.path} with size ${largest.size}`);
        return;
      }
      console.log('No suitable typed arrays found');
    },

    getMemoryFromPath: function(path) {
      try {
        const pathSegments = path.split('.');
        let currentObj = window;
        for (const segment of pathSegments) {
          if (segment === 'window') continue;
          if (currentObj && typeof currentObj[segment] !== 'undefined') {
            currentObj = currentObj[segment];
          } else {
            return null;
          }
        }
        if (currentObj && currentObj.buffer instanceof ArrayBuffer) {
          return currentObj;
        } else if (currentObj && typeof currentObj.HEAPU8 !== 'undefined') {
          return currentObj.HEAPU8;
        }
      } catch (e) { }
      return null;
    },

    getWasmMemory: function() {
      if (this.foundMemory) {
        return this.foundMemory;
      }
      if (this.customMemoryPath && this.customMemoryPath.trim() !== '') {
        const memory = this.getMemoryFromPath(this.customMemoryPath);
        if (memory) {
          this.foundMemory = memory;
          this.foundMemoryPath = this.customMemoryPath;
          this.updateMemoryStatus(true);
          return memory;
        }
      }
      this.autoDetectMemory();
      if (this.foundMemory) {
        this.updateMemoryStatus(true);
      }
      return this.foundMemory;
    },

    createUI: function() {
      const container = document.createElement('div');
      container.id = 'wasm-scanner-ui';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1E1E1E;
        color: #CCCCCC;
        padding: 10px;
        border-radius: 3px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        z-index: 2147483647;
        width: 500px;
        max-height: 80vh;
        overflow: auto;
        border: 1px solid #555;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      `;
      const titleBar = document.createElement('div');
      titleBar.innerHTML = '<b>Wasm-Patcher</b> <span style="font-size: 11px; opacity: 0.8;">Made by Wasd</span>';
      titleBar.style.cssText = `
        margin-bottom: 8px;
        cursor: move;
        padding: 5px;
        background-color: #2C2C2C;
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #444;
      `;

      const buttonsContainer = document.createElement('div');
      buttonsContainer.style.cssText = `
        display: flex;
        gap: 6px;
      `;

      const greenButton = document.createElement('div');
      greenButton.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #28c941;
        cursor: pointer;
      `;
      greenButton.addEventListener('click', (e) => {
        e.stopPropagation();
        alert("Fullscreen not finished");
      });

      const orangeButton = document.createElement('div');
      orangeButton.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ffbd2e;
        cursor: pointer;
      `;
      orangeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const mainPanel = document.querySelector('#wasm-scanner-ui > div:nth-child(2)');
        const statusArea = document.getElementById('wasm-scan-status');
        if (mainPanel.style.display === 'none') {
          mainPanel.style.display = 'grid';
          statusArea.style.display = 'block';
        } else {
          mainPanel.style.display = 'none';
          statusArea.style.display = 'none';
        }
      });

      const redButton = document.createElement('div');
      redButton.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ff5f57;
        cursor: pointer;
      `;
      redButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = document.getElementById('wasm-scanner-ui');
        if (container) {
          document.body.removeChild(container);
        }
      });

      buttonsContainer.appendChild(greenButton);
      buttonsContainer.appendChild(orangeButton);
      buttonsContainer.appendChild(redButton);

      const titleText = document.createElement('div');
      titleText.innerHTML = titleBar.innerHTML;
      titleBar.innerHTML = '';
      titleBar.appendChild(titleText);
      titleBar.appendChild(buttonsContainer);

      container.appendChild(titleBar);

      const mainPanel = document.createElement('div');
      mainPanel.id = 'wasm-scanner-main-panel';
      mainPanel.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 8px;
        min-height: 520px;
      `;

      const resultsColumn = document.createElement('div');
      resultsColumn.style.cssText = `
        grid-column: 1;
        display: flex;
        flex-direction: column;
        min-width: 230px;
      `;
      const tableHeader = document.createElement('div');
      tableHeader.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-color: #333;
        padding: 4px;
        color: white;
        border-bottom: 1px solid #555;
      `;
      ['Address', 'Value', 'Previous'].forEach(header => {
        const cell = document.createElement('div');
        cell.textContent = header;
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.style.fontWeight = 'bold';
        cell.style.padding = '3px 0';
        tableHeader.appendChild(cell);
      });
      resultsColumn.appendChild(tableHeader);
      const resultsArea = document.createElement('div');
      resultsArea.id = 'wasm-scan-results';
      resultsArea.style.cssText = `
        height: 350px;
        overflow-y: auto;
        overflow-x: hidden;
        border: 1px solid #444;
        background: #222;
        word-break: break-word;
        white-space: normal;
      `;
      resultsColumn.appendChild(resultsArea);
      const foundCounter = document.createElement('div');
      foundCounter.style.cssText = `
        padding: 4px 5px;
        background-color: #2C2C2C;
        color: white;
        text-align: center;
        border: 1px solid #444;
        border-top: none;
        font-size: 12px;
      `;
      foundCounter.innerHTML = `Found: <span id="found-count">0</span>`;
      resultsColumn.appendChild(foundCounter);
      const watchedValuesArea = document.createElement('div');
      watchedValuesArea.style.cssText = `
        margin-top: 10px;
        border: 1px solid #444;
        background: #222;
      `;
      const watchedHeader = document.createElement('div');
      watchedHeader.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: #333;
        padding: 4px;
        color: white;
        border-bottom: 1px solid #555;
      `;
      ['Address', 'Value'].forEach(header => {
        const cell = document.createElement('div');
        cell.textContent = header;
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.style.fontWeight = 'bold';
        cell.style.padding = '3px 0';
        watchedHeader.appendChild(cell);
      });
      watchedValuesArea.appendChild(watchedHeader);
      const watchedContent = document.createElement('div');
      watchedContent.id = 'wasm-watched-values';
      watchedContent.style.cssText = `
        min-height: 30px;
        max-height: 100px;
        overflow-y: auto;
      `;
      watchedValuesArea.appendChild(watchedContent);
      const watchedInfo = document.createElement('div');
      watchedInfo.style.cssText = `
        padding: 4px;
        font-size: 11px;
        color: #999;
        text-align: center;
        border-top: 1px solid #444;
      `;
      watchedInfo.textContent = "Double-click an address to add it here";
      watchedValuesArea.appendChild(watchedInfo);
      resultsColumn.appendChild(watchedValuesArea);
      mainPanel.appendChild(resultsColumn);
      const scanControls = document.createElement('div');
      scanControls.style.cssText = `
        grid-column: 2;
        background: #2C2C2C;
        padding: 8px;
        border: 1px solid #444;
        min-width: 230px;
      `;
      const memoryStatusArea = document.createElement('div');
      memoryStatusArea.id = 'wasm-memory-status-area';
      memoryStatusArea.style.marginBottom = '10px';
      memoryStatusArea.style.padding = '5px';
      memoryStatusArea.style.backgroundColor = this.foundMemory ? '#1a3a1a' : '#3a1a1a';
      memoryStatusArea.style.borderRadius = '3px';
      memoryStatusArea.style.fontSize = '12px';
      if (this.foundMemory) {
        memoryStatusArea.innerHTML = `<div><b>Memory Found!</b> Path: ${this.foundMemoryPath}</div>`;
      } else {
        memoryStatusArea.innerHTML = `<div><b>Memory Not Found</b> - Try specifying a path below:</div>`;
      }
      scanControls.appendChild(memoryStatusArea);
      const valueInputArea = document.createElement('div');
      valueInputArea.style.marginBottom = '8px';
      const valueLabel = document.createElement('div');
      valueLabel.textContent = 'Value:';
      valueLabel.style.cssText = `
        font-size: 12px;
        margin-bottom: 4px;
        color: #ccc;
      `;
      valueInputArea.appendChild(valueLabel);
      const valueDisplay = document.createElement('input');
      valueDisplay.id = 'wasm-scan-value';
      valueDisplay.type = 'number';
      valueDisplay.value = '0';
      valueDisplay.step = '1';
      valueDisplay.setAttribute('autocomplete', 'off');
      valueDisplay.setAttribute('spellcheck', 'false');
      valueDisplay.style.cssText = `
        background-color: #111;
        border: 1px solid #555;
        width: 100%;
        padding: 8px;
        height: 35px;
        box-sizing: border-box;
        font-size: 14px;
        color: white;
        font-family: monospace;
        -webkit-user-select: text;
        user-select: text;
        z-index: 2147483647;
        position: relative;
      `;
      valueInputArea.appendChild(valueDisplay);
      scanControls.appendChild(valueInputArea);
      const scanTypeArea = document.createElement('div');
      scanTypeArea.style.marginBottom = '8px';
      const scanTypeLabel = document.createElement('div');
      scanTypeLabel.textContent = 'Scan Type:';
      scanTypeLabel.style.cssText = `
        font-size: 12px;
        margin-bottom: 4px;
        color: #ccc;
      `;
      scanTypeArea.appendChild(scanTypeLabel);
      const scanTypeSelect = document.createElement('select');
      scanTypeSelect.id = 'wasm-scan-strategy';
      scanTypeSelect.style.cssText = `
        width: 100%;
        padding: 4px;
        background-color: #111;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
        margin-bottom: 6px;
      `;
      const scanTypes = [
        'Exact Value', 'Increased', 'Decreased', 'Changed', 'Unchanged'
      ];
      scanTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase().replace(' ', '_');
        option.textContent = type;
        scanTypeSelect.appendChild(option);
      });
      scanTypeArea.appendChild(scanTypeSelect);
      scanControls.appendChild(scanTypeArea);
      const valueTypeArea = document.createElement('div');
      valueTypeArea.style.marginBottom = '8px';
      const valueTypeLabel = document.createElement('div');
      valueTypeLabel.textContent = 'Value Type:';
      valueTypeLabel.style.cssText = `
        font-size: 12px;
        margin-bottom: 4px;
        color: #ccc;
      `;
      valueTypeArea.appendChild(valueTypeLabel);
      const valueTypeSelect = document.createElement('select');
      valueTypeSelect.id = 'wasm-scan-type';
      valueTypeSelect.style.cssText = `
        width: 100%;
        padding: 4px;
        background-color: #111;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
        margin-bottom: 6px;
      `;
      const valueTypes = [
        'All', '4 Bytes', '2 Bytes', '1 Byte', 'Float', 'Double'
      ];
      const typeMapping = {
        'All': 'all',
        '4 Bytes': 'int32',
        '2 Bytes': 'int16',
        '1 Byte': 'int8',
        'Float': 'float32',
        'Double': 'float64'
      };
      valueTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = typeMapping[type];
        option.textContent = type;
        valueTypeSelect.appendChild(option);
      });
      valueTypeArea.appendChild(valueTypeSelect);
      scanControls.appendChild(valueTypeArea);

      const typeToStepMapping = {
        'int32': '1',
        'int16': '1',
        'int8': '1',
        'float32': '0.1',
        'float64': '0.01',
        'all': '1'
      };

      valueTypeSelect.addEventListener('change', () => {
        const selectedType = valueTypeSelect.value;
        const stepValue = typeToStepMapping[selectedType] || '1';
        const valueInput = document.getElementById('wasm-scan-value');
        if (valueInput) {
          valueInput.step = stepValue;
          if (selectedType.startsWith('int')) {
            valueInput.setAttribute('inputmode', 'numeric');
            valueInput.step = '1';
          } else {
            valueInput.removeAttribute('inputmode');
          }
        }
      });

      const scanOptionsArea = document.createElement('div');
      scanOptionsArea.style.marginBottom = '8px';
      const scanOptionsLabel = document.createElement('div');
      scanOptionsLabel.textContent = 'Memory Scan Options:';
      scanOptionsLabel.style.cssText = `
        font-size: 12px;
        margin-bottom: 4px;
        color: #ccc;
      `;
      scanOptionsArea.appendChild(scanOptionsLabel);
      const regionSelect = document.createElement('select');
      regionSelect.style.cssText = `
        width: 100%;
        padding: 4px;
        background-color: #111;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
        margin-bottom: 6px;
      `;
      const regionOption = document.createElement('option');
      regionOption.textContent = 'All';
      regionSelect.appendChild(regionOption);
      scanOptionsArea.appendChild(regionSelect);
      const pathDisplay = document.createElement('input');
      pathDisplay.id = 'wasm-memory-path';
      pathDisplay.type = 'text';
      pathDisplay.style.cssText = `
        background-color: #111;
        border: 1px solid #555;
        width: 100%;
        padding: 4px;
        margin-bottom: 6px;
        height: 25px;
        box-sizing: border-box;
        font-size: 12px;
        color: white;
      `;
      pathDisplay.value = this.foundMemoryPath || '';
      scanOptionsArea.appendChild(pathDisplay);
      scanControls.appendChild(scanOptionsArea);
      const pathButtonsArea = document.createElement('div');
      pathButtonsArea.style.marginBottom = '10px';
      pathButtonsArea.style.display = 'flex';
      pathButtonsArea.style.flexWrap = 'wrap';
      pathButtonsArea.style.gap = '5px';
      const commonPaths = [
        { label: 'unityInstance', path: 'unityInstance.Module.HEAPU8' },
        { label: 'Module', path: 'Module.HEAPU8' },
        { label: 'gameInstance', path: 'gameInstance.Module.HEAPU8' }
      ];

      // Add FSM scanner button
      const fsmScanBtn = document.createElement('button');
      fsmScanBtn.innerText = 'Scan FSM/UI Labels';
      fsmScanBtn.style.cssText = `
        padding: 3px 5px;
        background-color: #336699;
        font-size: 11px;
        cursor: pointer;
        border: 1px solid #555;
        color: white;
        margin-top: 5px;
        width: 100%;
      `;
      fsmScanBtn.onclick = (e) => {
        e.stopPropagation();
        this.scanForFSMAndLabels();
      };
      pathButtonsArea.appendChild(fsmScanBtn);

      commonPaths.forEach(item => {
        const btn = document.createElement('button');
        btn.innerText = item.label;
        btn.style.cssText = `
          padding: 3px 5px;
          font-size: 11px;
          cursor: pointer;
          background: #333;
          border: 1px solid #555;
          color: white;
        `;
        btn.onclick = (e) => {
          e.stopPropagation();
          pathDisplay.value = item.path;
          this.customMemoryPath = item.path;
          try {
            const memory = this.getMemoryFromPath(item.path);
            if (memory) {
              this.foundMemory = memory;
              this.foundMemoryPath = item.path;
              this.updateMemoryStatus(true);
              this.updateStatus(`Memory found at ${this.foundMemoryPath}. Ready to scan.`);
            } else {
              this.updateMemoryStatus(false);
              this.updateStatus('Failed to find memory with specified path.');
            }
          } catch(err) {
            console.error("Path button error:", err);
            this.updateStatus("Error setting memory path. Try again.");
          }
        };
        pathButtonsArea.appendChild(btn);
      });
      const detectBtn = document.createElement('button');
      detectBtn.innerText = 'Auto-Detect';
      detectBtn.style.cssText = `
        padding: 3px 5px;
        background-color: #336633;
        font-size: 11px;
        cursor: pointer;
        border: 1px solid #555;
        color: white;
      `;
      detectBtn.onclick = (e) => {
        e.stopPropagation();
        try {
          this.foundMemory = null;
          this.autoDetectMemory();
          if (this.foundMemory) {
            pathDisplay.value = this.foundMemoryPath;
            this.customMemoryPath = this.foundMemoryPath;
            this.updateMemoryStatus(true);
          } else {
            this.updateMemoryStatus(false);
          }
        } catch(err) {
          console.error("Auto-detect error:", err);
          this.updateStatus("Error during auto-detection. Try again.");
        }
      };
      pathButtonsArea.appendChild(detectBtn);
      scanControls.appendChild(pathButtonsArea);
      const scanButtonsArea = document.createElement('div');
      scanButtonsArea.style.cssText = `
        display: flex;
        gap: 6px;
        margin-top: 10px;
      `;
      const btnSearch = document.createElement('button');
      btnSearch.innerText = 'First Scan';
      btnSearch.id = 'wasm-scan-search';
      btnSearch.style.cssText = `
        padding: 5px 10px;
        flex: 1;
        cursor: pointer;
        background: #333;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
      `;
      scanButtonsArea.appendChild(btnSearch);
      const btnNarrow = document.createElement('button');
      btnNarrow.innerText = 'Next Scan';
      btnNarrow.id = 'wasm-scan-narrow';
      btnNarrow.style.cssText = `
        padding: 5px 10px;
        flex: 1;
        cursor: pointer;
        background: #333;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
      `;
      scanButtonsArea.appendChild(btnNarrow);
      const btnUndo = document.createElement('button');
      btnUndo.innerText = 'Undo Scan';
      btnUndo.id = 'wasm-scan-undo';
      btnUndo.style.cssText = `
        padding: 5px 10px;
        cursor: pointer;
        background: #333;
        border: 1px solid #555;
        color: white;
        font-size: 12px;
      `;
      scanButtonsArea.appendChild(btnUndo);
      scanControls.appendChild(scanButtonsArea);
      mainPanel.appendChild(scanControls);
      container.appendChild(mainPanel);
      const statusArea = document.createElement('div');
      statusArea.id = 'wasm-scan-status';
      statusArea.style.cssText = `
        margin-top: 10px;
        font-size: 11px;
        color: #aaa;
        border-top: 1px solid #444;
        padding-top: 6px;
      `;
      container.appendChild(statusArea);
      document.body.appendChild(container);
      this.makeDraggable(container, titleBar);
      this.updateStatus(this.foundMemory ?
        `Memory found at ${this.foundMemoryPath}. Ready to scan.` :
        'No memory found automatically. Try entering a path or clicking Auto-Detect.');
    },

    // FSM and UI Label Scanner
    scanForFSMAndLabels: function() {
      const memory = this.getWasmMemory();
      if (!memory) {
        alert('Failed to access WebAssembly memory. Try entering a custom memory path.');
        return;
      }
      const buffer = memory.buffer;
      const u8 = new Uint8Array(buffer);
      const minStrLen = 3;
      const maxStrLen = 64;
      const ascii = (b) => b >= 32 && b <= 126;

      this.updateStatus('Scanning for FSM names, state names, UI labels...');

      // Create progress overlay
      const progressOverlay = document.createElement('div');
      progressOverlay.id = 'wasm-scan-progress';
      progressOverlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      `;
      const progressText = document.createElement('div');
      progressText.innerText = 'Scanning memory for strings...';
      progressText.style.marginBottom = '10px';
      const progressBar = document.createElement('div');
      progressBar.style.cssText = `
        width: 300px;
        height: 10px;
        background: #333;
        border-radius: 5px;
        overflow: hidden;
      `;
      const progressFill = document.createElement('div');
      progressFill.style.cssText = `
        height: 100%;
        width: 0%;
        background: #4a8af4;
        transition: width 0.3s;
      `;
      progressBar.appendChild(progressFill);
      progressOverlay.appendChild(progressText);
      progressOverlay.appendChild(progressBar);
      document.body.appendChild(progressOverlay);

      // Start scanning in chunks to avoid freezing the UI
      let strings = [];
      let cur = [];
      let i = 0;
      const chunkSize = 1000000; // Process 1MB at a time
      const scanChunk = () => {
        const startTime = performance.now();
        const endIdx = Math.min(i + chunkSize, u8.length);

        for (; i < endIdx; i++) {
          if (ascii(u8[i])) {
            cur.push(u8[i]);
            if (cur.length > maxStrLen) cur = [];
          } else {
            if (cur.length >= minStrLen) {
              try {
                const s = String.fromCharCode.apply(null, cur);
                strings.push({ str: s, addr: i - cur.length });
              } catch (e) {
                // Skip oversized arrays
              }
            }
            cur = [];
          }
        }

        // Update progress
        const progress = Math.min(i / u8.length * 100, 100);
        progressFill.style.width = `${progress}%`;
        progressText.innerText = `Scanning memory: ${Math.round(progress)}% (found ${strings.length} strings)`;

        if (i < u8.length) {
          // Still more to scan, continue in next frame
          setTimeout(scanChunk, 0);
        } else {
          // Finished scanning, process results
          progressText.innerText = 'Filtering and organizing results...';
          setTimeout(finalizeResults, 0);
        }
      };

      const finalizeResults = () => {
        // Filter for likely FSM/state/UI label names
        const fsmRegexes = [
          /fsm/i, /state/i, /label/i, /ui/i, /button/i, /menu/i, /panel/i, /window/i,
          /dialog/i, /scene/i, /canvas/i, /text/i, /input/i, /toggle/i, /slider/i, /dropdown/i,
          /screen/i, /page/i, /view/i, /container/i, /modal/i, /popup/i, /tooltip/i,
          /transition/i, /animation/i, /machine/i, /trigger/i, /event/i, /action/i,
          /enabled/i, /disabled/i, /visible/i, /hidden/i, /active/i, /inactive/i,
          /open/i, /close/i, /start/i, /end/i, /init/i, /finish/i
        ];
        const matches = strings.filter(s =>
          fsmRegexes.some(r => r.test(s.str)) &&
          s.str.length <= maxStrLen && s.str.length >= minStrLen
        );
        // Remove duplicates
        const seen = new Set();
        const uniqueMatches = matches.filter(s => {
          if (seen.has(s.str)) return false;
          seen.add(s.str);
          return true;
        });
        // Remove progress overlay
        if (progressOverlay && progressOverlay.parentNode) {
          progressOverlay.parentNode.removeChild(progressOverlay);
        }
        // Show modal
        UnityWasmScanner.showFSMModal(uniqueMatches);
        UnityWasmScanner.updateStatus(`FSM/UI label scan complete. Found ${uniqueMatches.length} matches.`);
      };

      scanChunk();
    },

    showFSMModal: function(matches) {
      const existing = document.getElementById('wasm-fsm-modal');
      if (existing) existing.remove();
      const modal = document.createElement('div');
      modal.id = 'wasm-fsm-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      const inner = document.createElement('div');
      inner.style.cssText = `
        background: #232b3a;
        color: #fff;
        border-radius: 6px;
        box-shadow: 0 0 20px #000a;
        padding: 24px 18px 18px 18px;
        min-width: 350px;
        max-width: 90vw;
        max-height: 80vh;
        overflow: auto;
        position: relative;
      `;
      const closeBtn = document.createElement('button');
      closeBtn.innerText = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: 8px; right: 10px;
        background: #333;
        color: #fff;
        border: none;
        font-size: 20px;
        border-radius: 3px;
        cursor: pointer;
        width: 32px; height: 32px;
        line-height: 28px;
        text-align: center;
      `;
      closeBtn.onclick = () => modal.remove();
      inner.appendChild(closeBtn);
      const title = document.createElement('div');
      title.innerHTML = `<b>FSM/State/UI Label Strings</b> <span style="font-size:12px; color:#aaf;">(${matches.length} found)</span>`;
      title.style.cssText = `font-size: 18px; margin-bottom: 10px;`;
      inner.appendChild(title);
      if (matches.length === 0) {
        const none = document.createElement('div');
        none.innerText = 'No likely FSM/state/UI label strings found.';
        none.style.cssText = 'color: #ccc; font-size: 14px; margin: 20px 0;';
        inner.appendChild(none);
      } else {
        const list = document.createElement('div');
        list.style.cssText = `
          max-height: 50vh;
          overflow-y: auto;
          font-size: 13px;
          background: #1a2230;
          border: 1px solid #444;
          border-radius: 4px;
          padding: 8px;
        `;
        matches.forEach(m => {
          const row = document.createElement('div');
          row.style.cssText = `
            display: flex;
            align-items: center;
            border-bottom: 1px solid #333;
            padding: 3px 0;
            gap: 8px;
          `;
          const addr = document.createElement('span');
          addr.innerText = m.addr;
          addr.style.cssText = `color: #aaf; font-family: monospace; font-size: 12px;`;
          const str = document.createElement('span');
          str.innerText = m.str;
          str.style.cssText = `color: #fff; font-family: monospace;`;
          row.appendChild(addr);
          row.appendChild(str);
          list.appendChild(row);
        });
        inner.appendChild(list);
      }
      modal.appendChild(inner);
      document.body.appendChild(modal);
    },

    makeDraggable: function(element, dragHandle) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      let isDragging = false;
      dragHandle.addEventListener('mousedown', dragMouseDown, { passive: false });
      function dragMouseDown(e) {
        if (e.button !== 0) return;
        isDragging = true;
        e.stopPropagation();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement, { once: true, passive: false });
        document.addEventListener('mousemove', elementDrag, { passive: false });
      }
      function elementDrag(e) {
        if (!isDragging) return;
        e.stopPropagation();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
      }
      function closeDragElement(e) {
        isDragging = false;
        document.removeEventListener('mousemove', elementDrag);
      }
    },

    updateStatus: function(message) {
      const statusEl = document.getElementById('wasm-scan-status');
      if (statusEl) {
        statusEl.textContent = message;
      }
    },

    tryPath: function() {
      const pathDisplay = document.getElementById('wasm-memory-path');
      this.customMemoryPath = pathDisplay.value || '';
      this.foundMemory = null;
      const memory = this.getWasmMemory();
      if (memory) {
        this.updateMemoryStatus(true);
        this.updateStatus(`Memory found at ${this.foundMemoryPath}. Ready to scan.`);
      } else {
        this.updateMemoryStatus(false);
        this.updateStatus('Failed to find memory with specified path.');
      }
    },

    updateMemoryStatus: function(found) {
      const memoryStatusArea = document.getElementById('wasm-memory-status-area');
      if (memoryStatusArea) {
        memoryStatusArea.style.backgroundColor = found ? '#1a3a1a' : '#3a1a1a';
        if (found) {
          memoryStatusArea.innerHTML = `<div><b>Memory Found!</b> Path: ${this.foundMemoryPath}</div>`;
        } else {
          memoryStatusArea.innerHTML = `<div><b>Memory Not Found</b> - Try specifying a path below:</div>`;
        }

        const mainPanel = document.getElementById('wasm-scanner-main-panel');
        if (mainPanel) {
          mainPanel.style.display = 'grid';
          mainPanel.style.gridTemplateColumns = '1fr 1fr';

          setTimeout(() => {
            mainPanel.style.display = 'grid';
            mainPanel.style.gridTemplateColumns = '1fr 1fr';
          }, 10);
        }
      }
    },

    attachEventListeners: function() {
      const container = document.getElementById('wasm-scanner-ui');
      if (container) {
        document.getElementById('wasm-scan-search')?.addEventListener('click', () => {
          this.performInitialSearch();
        });
        document.getElementById('wasm-scan-narrow')?.addEventListener('click', () => {
          this.narrowSearch();
        });
        document.getElementById('wasm-scan-undo')?.addEventListener('click', () => {
          this.undoLastSearch();
        });
      }
    },

    updateResults: function() {
      const resultsEl = document.getElementById('wasm-scan-results');
      if (!resultsEl) return;
      const addresses = Object.keys(this.memoryFindings);
      const foundCount = document.getElementById('found-count');
      if (foundCount) {
        foundCount.textContent = addresses.length;
      }
      if (addresses.length === 0) {
        resultsEl.innerHTML = '<p style="padding: 10px; color: #ccc; font-size: 12px; text-align: center;">No matches found</p>';
        return;
      }
      const displayLimit = 100;
      const limitedAddresses = addresses.slice(0, displayLimit);
      let html = '';
      if (addresses.length > displayLimit) {
        html += `<div style="padding: 5px; color: #ccc; font-size: 12px; background: #222; text-align: center;">Showing first ${displayLimit} of ${addresses.length} matches</div>`;
      }
      html += '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; width: 100%; border-collapse: collapse; font-size: 12px;">';
      for (const addr of limitedAddresses) {
        const item = this.memoryFindings[addr];
        const currentValue = typeof item === 'object' && item !== null ? item.value : item;
        const description = typeof item === 'object' && item !== null ? item.description : '';
        let previousValue = '';
        const historyItem = this.searchHistory.length > 0 ? this.searchHistory[this.searchHistory.length - 1] : null;
        if (historyItem && historyItem[addr] !== undefined) {
          previousValue = typeof historyItem[addr] === 'object' ? historyItem[addr].value : historyItem[addr];
        }
        let valueStyle = 'color: #ccc;';
        if (previousValue !== '' && previousValue !== currentValue) {
          if (currentValue > previousValue) {
            valueStyle = 'color: #8cff8c;';
          } else if (currentValue < previousValue) {
            valueStyle = 'color: #ff8c8c;';
          }
        }
        const hasDescription = description && description.trim() !== '';
        html += `
          <div style="padding: 4px 5px; color: #ccc; border-bottom: 1px solid #333; text-align: center;">${addr}</div>
          <div style="padding: 4px 5px; ${valueStyle}; border-bottom: 1px solid #333; text-align: center;">${currentValue}</div>
          <div style="padding: 4px 5px; color: #888; border-bottom: 1px solid #333; text-align: center;">${previousValue}</div>
        `;
        if (hasDescription) {
          html += `
            <div style="grid-column: 1 / span 3; padding: 2px 5px; color: #aaffaa; font-size: 10px; background: #1a1a1a; border-bottom: 1px solid #333; text-align: left;">
              ${description}
            </div>
          `;
        }
      }
      html += '</div>';
      resultsEl.innerHTML = html;
      const cells = resultsEl.querySelectorAll('div[style*="border-bottom"]');
      let currentRow = 0;
      for (let i = 0; i < cells.length; i += 3) {
        if (i >= cells.length) break;
        const addressCell = cells[i];
        const valueCell = i+1 < cells.length ? cells[i + 1] : null;
        const previousCell = i+2 < cells.length ? cells[i + 2] : null;
        if (!addressCell) continue;
        const address = addressCell.textContent;
        const item = this.memoryFindings[address];
        const currentValue = typeof item === 'object' && item !== null ? item.value : item;
        [addressCell, valueCell, previousCell].forEach(cell => {
          if (!cell) return;
          cell.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.toggleWatchAddress(address);
          });
        });
      }
    },

    updateWatchedValues: function() {
      const memory = this.getWasmMemory();
      if (!memory) return;
      const dataView = new DataView(memory.buffer);
      const watchedAddressesList = Object.keys(this.watchedAddresses);
      const searchType = document.getElementById('wasm-scan-type').value || 'int32';
      const watchedEl = document.getElementById('wasm-watched-values');
      if (!watchedEl) return;
      if (watchedAddressesList.length === 0) {
        watchedEl.innerHTML = '<div style="padding: 8px; color: #777; text-align: center; font-size: 12px;">No addresses being watched</div>';
        return;
      }
      let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; width: 100%; font-size: 12px;">';
      for (const addr of watchedAddressesList) {
        try {
          const address = parseInt(addr, 10);
          const value = this.readMemoryValue(dataView, address, searchType);
          html += `
            <div style="padding: 4px 5px; color: #ccc; border-bottom: 1px solid #333; text-align: center;">${addr}</div>
            <div style="padding: 4px 5px; color: #fff; border-bottom: 1px solid #333; text-align: center;" data-address="${addr}">${value}</div>
          `;
        } catch (e) {
          html += `
            <div style="padding: 4px 5px; color: #ccc; border-bottom: 1px solid #333; text-align: center;">${addr}</div>
            <div style="padding: 4px 5px; color: #ff8c8c; border-bottom: 1px solid #333; text-align: center;">Error reading</div>
          `;
        }
      }
      html += '</div>';
      watchedEl.innerHTML = html;

      const valueCells = watchedEl.querySelectorAll('div[data-address]');
      valueCells.forEach(cell => {
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const existingContextMenus = document.querySelectorAll('.wasm-context-menu');
          existingContextMenus.forEach(menu => {
            document.body.removeChild(menu);
          });

          const address = cell.getAttribute('data-address');
          const currentValue = this.readMemoryValue(dataView, parseInt(address, 10), searchType);

          const contextMenu = document.createElement('div');
          contextMenu.className = 'wasm-context-menu';
          contextMenu.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: #2C2C2C;
            border: 1px solid #555;
            z-index: 2147483647;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
          `;

          const editOption = document.createElement('div');
          editOption.textContent = 'Edit value';
          editOption.style.cssText = `
            padding: 5px 10px;
            cursor: pointer;
            color: white;
            font-size: 12px;
            border-bottom: 1px solid #444;
          `;
          editOption.addEventListener('click', () => {
            this.showEditValueDialog(address, currentValue);
            try {
              if (contextMenu && contextMenu.parentNode) {
                contextMenu.parentNode.removeChild(contextMenu);
              }
            } catch (err) {
              console.log("Error removing context menu:", err);
            }
          });
          contextMenu.appendChild(editOption);

          const addDescriptionOption = document.createElement('div');
          addDescriptionOption.textContent = 'Add description';
          addDescriptionOption.style.cssText = `
            padding: 5px 10px;
            cursor: pointer;
            color: white;
            font-size: 12px;
            border-bottom: 1px solid #444;
          `;
          addDescriptionOption.addEventListener('click', () => {
            this.showAddDescriptionDialog(address);
            try {
              if (contextMenu && contextMenu.parentNode) {
                contextMenu.parentNode.removeChild(contextMenu);
              }
            } catch (err) {
              console.log("Error removing context menu:", err);
            }
          });
          contextMenu.appendChild(addDescriptionOption);

          const deleteOption = document.createElement('div');
          deleteOption.textContent = 'Stop watching';
          deleteOption.style.cssText = `
            padding: 5px 10px;
            cursor: pointer;
            color: #ff8c8c;
            font-size: 12px;
          `;
          deleteOption.addEventListener('click', () => {
            this.toggleWatchAddress(address);
            try {
              if (contextMenu && contextMenu.parentNode) {
                contextMenu.parentNode.removeChild(contextMenu);
              }
            } catch (err) {
              console.log("Error removing context menu:", err);
            }
          });
          contextMenu.appendChild(deleteOption);

          document.body.appendChild(contextMenu);
          setTimeout(() => {
            const closeMenu = (e) => {
              try {
                if (!contextMenu.contains(e.target)) {
                  if (contextMenu && contextMenu.parentNode) {
                    contextMenu.parentNode.removeChild(contextMenu);
                  }
                  document.removeEventListener('click', closeMenu);
                  document.removeEventListener('contextmenu', closeMenu);
                }
              } catch (err) {
                console.log("Error closing context menu:", err);
                document.removeEventListener('click', closeMenu);
                document.removeEventListener('contextmenu', closeMenu);
              }
            };
            document.addEventListener('click', closeMenu);
            document.addEventListener('contextmenu', closeMenu);
          }, 0);
        });

        cell.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          const currentValue = this.readMemoryValue(dataView, parseInt(address, 10), searchType);
          this.showEditValueDialog(address, currentValue);
        });

        cell.style.cursor = 'pointer';
      });
    },

    showEditValueDialog: function(address, currentValue) {
      const searchType = document.getElementById('wasm-scan-type').value || 'int32';
      const isFloat = searchType === 'float32' || searchType === 'float64';
      const stepValue = isFloat ? (searchType === 'float64' ? '0.01' : '0.1') : '1';
      const dialog = document.createElement('div');
      dialog.id = 'wasm-edit-dialog';
      dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2C2C2C;
        border: 1px solid #555;
        padding: 15px;
        z-index: 2147483647;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        min-width: 300px;
      `;
      dialog.innerHTML = `
        <div style="margin-bottom: 10px; color: white; font-size: 14px;">
          Edit value for address ${address}
        </div>
        <input type="number" id="new-value-input" value="${currentValue}" step="${stepValue}"
               style="width: 100%; padding: 8px; background: #111; border: 1px solid #555; color: white; margin-bottom: 15px; font-size: 14px; z-index: 2147483647;">
        <div style="display: flex; justify-content: flex-end; gap: 5px;">
          <button id="cancel-edit" style="padding: 8px 15px; background: #333; color: white; border: 1px solid #555; cursor: pointer;">Cancel</button>
          <button id="confirm-edit" style="padding: 8px 15px; background: #007700; color: white; border: 1px solid #555; cursor: pointer;">OK</button>
        </div>
      `;

      const existingDialog = document.getElementById('wasm-edit-dialog');
      if (existingDialog && existingDialog.parentNode) {
        try {
          existingDialog.parentNode.removeChild(existingDialog);
        } catch(e) {
          console.log("Error removing existing dialog:", e);
        }
      }

      document.body.appendChild(dialog);
      const valueInput = document.getElementById('new-value-input');

      const removeDialog = () => {
        try {
          if (dialog && dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
          }
        } catch(e) {
          console.log("Error removing dialog:", e);
        }
      };

      if (valueInput) {
        if (!isFloat) {
          valueInput.setAttribute('inputmode', 'numeric');
        }
        valueInput.focus();
        valueInput.select();
        valueInput.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            const newValue = parseFloat(valueInput.value);
            if (!isNaN(newValue)) {
              this.modifyMemoryValue(Number(address), newValue);
              this.updateWatchedValues();
            }
            removeDialog();
          } else if (e.key === 'Escape') {
            removeDialog();
          }
        });
      }

      const cancelBtn = document.getElementById('cancel-edit');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          removeDialog();
        });
      }

      const confirmBtn = document.getElementById('confirm-edit');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const newValue = parseFloat(valueInput.value);
          if (!isNaN(newValue)) {
            this.modifyMemoryValue(Number(address), newValue);
            this.updateWatchedValues();
          }
          removeDialog();
        });
      }
    },

    modifyMemoryValue: function(address, newValue) {
      console.log(`Attempting to set memory at ${address} to exact value: ${newValue}`);

      const memory = this.getWasmMemory();
      if (!memory) {
        alert('Failed to access WebAssembly memory');
        return;
      }

      const dataView = new DataView(memory.buffer);
      const maxAddress = dataView.byteLength - 8;

      if (address < 0 || address > maxAddress) {
        alert(`Cannot modify memory at address ${address}: Out of bounds`);
        return;
      }

      const searchType = document.getElementById('wasm-scan-type').value || 'int32';
      console.log(`Current search type: ${searchType}`);

      let typeSize = 4;
      switch (searchType) {
        case 'int8': typeSize = 1; break;
        case 'int16': typeSize = 2; break;
        case 'int32': case 'float32': typeSize = 4; break;
        case 'float64': typeSize = 8; break;
      }

      if (address + typeSize > dataView.byteLength) {
        alert(`Cannot modify memory at address ${address}: Not enough space for ${searchType}`);
        return;
      }

      try {
        const oldValue = this.readMemoryValue(dataView, address, searchType);
        console.log(`Previous value at address ${address} was: ${oldValue}`);

        const exactValue = newValue;
        console.log(`Writing exact value: ${exactValue}`);

        switch (searchType) {
          case 'int8':
            dataView.setInt8(address, exactValue);
            break;
          case 'int16':
            dataView.setInt16(address, exactValue, true);
            break;
          case 'int32':
            dataView.setInt32(address, exactValue, true);
            break;
          case 'float32':
            dataView.setFloat32(address, exactValue, true);
            break;
          case 'float64':
            dataView.setFloat64(address, exactValue, true);
            break;
          case 'all':
            if (address + 4 <= dataView.byteLength) {
              dataView.setInt32(address, exactValue, true);
            } else if (address + 2 <= dataView.byteLength) {
              dataView.setInt16(address, exactValue, true);
            } else if (address + 1 <= dataView.byteLength) {
              dataView.setInt8(address, exactValue);
            }
            break;
          default:
            if (address + 4 <= dataView.byteLength) {
              dataView.setInt32(address, exactValue, true);
            }
        }

        const verifiedValue = this.readMemoryValue(dataView, address, searchType);
        console.log(`Value after modification: ${verifiedValue}`);

        if (verifiedValue !== exactValue) {
          console.log(`Verification failed! Value didn't match. Trying alternative method...`);

          switch (searchType) {
            case 'float32':
              dataView.setInt32(address, Math.round(exactValue), true);
              break;
            case 'int32':
              dataView.setFloat32(address, exactValue, true);
              break;
            default:
              if (address + 4 <= dataView.byteLength) {
                dataView.setInt32(address, exactValue, true);
              }
          }

          const secondVerifiedValue = this.readMemoryValue(dataView, address, searchType);
          console.log(`Value after alternative modification: ${secondVerifiedValue}`);

          if (secondVerifiedValue !== exactValue) {
            if (address + 1 <= dataView.byteLength) dataView.setInt8(address, exactValue);
            if (address + 2 <= dataView.byteLength) dataView.setInt16(address, exactValue, true);
            if (address + 4 <= dataView.byteLength) {
              dataView.setInt32(address, exactValue, true);
              dataView.setFloat32(address, exactValue, true);
            }
            if (address + 8 <= dataView.byteLength) dataView.setFloat64(address, exactValue, true);
          }
        }

        const protectionBypasser = setInterval(() => {
          try {
            if (!this.getWasmMemory() || !this.getWasmMemory().buffer) {
              clearInterval(protectionBypasser);
              return;
            }

            const currentValue = this.readMemoryValue(dataView, address, searchType);
            if (currentValue !== exactValue) {
              console.log(`Value changed from ${exactValue} to ${currentValue}. Attempting to restore...`);

              if (address + typeSize <= dataView.byteLength) {
                switch (searchType) {
                  case 'int8':
                    dataView.setInt8(address, exactValue);
                    break;
                  case 'int16':
                    dataView.setInt16(address, exactValue, true);
                    break;
                  case 'int32':
                    dataView.setInt32(address, exactValue, true);
                    break;
                  case 'float32':
                    dataView.setFloat32(address, exactValue, true);
                    break;
                  case 'float64':
                    dataView.setFloat64(address, exactValue, true);
                    break;
                  case 'all':
                    if (address + 4 <= dataView.byteLength) {
                      dataView.setInt32(address, exactValue, true);
                    } else if (address + 2 <= dataView.byteLength) {
                      dataView.setInt16(address, exactValue, true);
                    } else if (address + 1 <= dataView.byteLength) {
                      dataView.setInt8(address, exactValue);
                    }
                    break;
                  default:
                    if (address + 4 <= dataView.byteLength) {
                      dataView.setInt32(address, exactValue, true);
                    }
                }

                const restoredValue = this.readMemoryValue(dataView, address, searchType);
                console.log(`Value after restore attempt: ${restoredValue}`);
              }
            }
          } catch (e) {
            console.error("Error in protection bypasser:", e);
            clearInterval(protectionBypasser);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(protectionBypasser);
        }, 3000);

        setTimeout(() => {
          try {
            const finalValue = this.readMemoryValue(dataView, address, searchType);
            console.log(`Final value at address ${address}: ${finalValue}`);

            this.updateMemoryFindings(address, finalValue);
            this.updateResults();
            this.updateStatus(`Modified value at address ${address} to ${exactValue}. ` +
              (finalValue === exactValue ? 'Modification successful!' : `Current value is ${finalValue}`));
            this.updateWatchedValues();
          } catch (e) {
            console.error("Error verifying memory change:", e);
          }
        }, 50);
      } catch (e) {
        console.error("Memory modification error:", e);
        alert(`Error modifying memory: ${e.message}`);
      }
    },

    readMemoryValue: function(dataView, address, type) {
      try {
        const maxAddress = dataView.byteLength - 8;

        if (address < 0 || address > maxAddress) {
          return 0;
        }

        let typeSize = 4;
        switch (type) {
          case 'int8': typeSize = 1; break;
          case 'int16': typeSize = 2; break;
          case 'int32': case 'float32': typeSize = 4; break;
          case 'float64': typeSize = 8; break;
        }

        if (address + typeSize > dataView.byteLength) {
          return 0;
        }

        let result = 0;
        switch (type) {
          case 'int8':
            result = dataView.getInt8(address);
            break;
          case 'int16':
            result = dataView.getInt16(address, true);
            break;
          case 'int32':
            result = dataView.getInt32(address, true);
            break;
          case 'float32':
            result = dataView.getFloat32(address, true);
            const int32Val = dataView.getInt32(address, true);
            if (Number.isInteger(result) && int32Val === result) {
              result = int32Val;
            }
            break;
          case 'float64':
            result = dataView.getFloat64(address, true);
            break;
          case 'all':
            try {
              if (address + 4 <= dataView.byteLength) {
                result = dataView.getInt32(address, true);
                if (result > 2147483647 || result < -2147483648) {
                  const floatVal = dataView.getFloat32(address, true);
                  if (!isNaN(floatVal) && isFinite(floatVal)) {
                    result = floatVal;
                  }
                }
              } else if (address + 2 <= dataView.byteLength) {
                result = dataView.getInt16(address, true);
              } else if (address + 1 <= dataView.byteLength) {
                result = dataView.getInt8(address);
              }
            } catch (e) {
              result = 0;
            }
            break;
          default:
            if (address + 4 <= dataView.byteLength) {
              result = dataView.getInt32(address, true);
            }
        }

        return Number.isNaN(result) ? 0 : result;
      } catch (e) {
        console.log("Memory read error at address", address, ":", e);
        return 0;
      }
    },

    updateMemoryFindings: function(address, newValue) {
      const currentItem = this.memoryFindings[address];
      if (typeof currentItem === 'object' && currentItem !== null && 'description' in currentItem) {
        this.memoryFindings[address] = {
          value: newValue,
          description: currentItem.description
        };
      } else {
        this.memoryFindings[address] = newValue;
      }
    },

    showAddDescriptionDialog: function(address) {
      const dialog = document.createElement('div');
      dialog.id = 'wasm-description-dialog';
      dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2C2C2C;
        border: 1px solid #555;
        padding: 15px;
        z-index: 2147483647;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        min-width: 300px;
      `;

      let existingDescription = '';
      const item = this.memoryFindings[address];
      if (typeof item === 'object' && item !== null && item.description) {
        existingDescription = item.description;
      }

      dialog.innerHTML = `
        <div style="margin-bottom: 10px; color: white; font-size: 14px;">
          Add description for address ${address}
        </div>
        <input type="text" id="description-input" value="${existingDescription}"
               style="width: 100%; padding: 8px; background: #111; border: 1px solid #555; color: white; margin-bottom: 15px; font-size: 14px; z-index: 2147483647;">
        <div style="display: flex; justify-content: flex-end; gap: 5px;">
          <button id="cancel-description" style="padding: 8px 15px; background: #333; color: white; border: 1px solid #555; cursor: pointer;">Cancel</button>
          <button id="confirm-description" style="padding: 8px 15px; background: #007700; color: white; border: 1px solid #555; cursor: pointer;">Save</button>
        </div>
      `;

      const existingDialog = document.getElementById('wasm-description-dialog');
      if (existingDialog && existingDialog.parentNode) {
        try {
          existingDialog.parentNode.removeChild(existingDialog);
        } catch(e) {
          console.log("Error removing existing dialog:", e);
        }
      }

      document.body.appendChild(dialog);

      const removeDialog = () => {
        try {
          if (dialog && dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
          }
        } catch(e) {
          console.log("Error removing dialog:", e);
        }
      };

      const descriptionInput = document.getElementById('description-input');
      if (descriptionInput) {
        descriptionInput.focus();
        descriptionInput.select();
        descriptionInput.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            const description = descriptionInput.value.trim();
            this.saveDescription(address, description);
            removeDialog();
          } else if (e.key === 'Escape') {
            removeDialog();
          }
        });
      }

      const cancelBtn = document.getElementById('cancel-description');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          removeDialog();
        });
      }

      const confirmBtn = document.getElementById('confirm-description');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const description = descriptionInput.value.trim();
          this.saveDescription(address, description);
          removeDialog();
        });
      }
    },

    watchedAddresses: {},
    watchInterval: null,

    toggleWatchAddress: function(address) {
      if (this.watchedAddresses[address]) {
        delete this.watchedAddresses[address];
      } else {
        this.watchedAddresses[address] = true;
      }
      if (Object.keys(this.watchedAddresses).length > 0 && !this.watchInterval) {
        this.watchInterval = setInterval(() => this.updateWatchedValues(), 500);
      } else if (Object.keys(this.watchedAddresses).length === 0 && this.watchInterval) {
        clearInterval(this.watchInterval);
        this.watchInterval = null;
      }
      this.updateWatchedValues();
      this.updateStatus(`${Object.keys(this.watchedAddresses).length} addresses being watched`);
    },

    getTypeSize: function(type) {
      switch (type) {
        case 'int8': return 1;
        case 'int16': return 2;
        case 'int32': case 'float32': return 4;
        case 'float64': return 8;
        default: return 4;
      }
    },

    getCompareFunction: function(type, value) {
      const epsilon = 0.001;
      switch (type) {
        case 'int8':
        case 'int16':
        case 'int32':
          return (x) => x === value;
        case 'float32':
        case 'float64':
          return (x) => Math.abs(x - value) < epsilon;
        default:
          return (x) => x === value;
      }
    },

    saveDescription: function(address, description) {
      const memory = this.getWasmMemory();
      if (!memory) {
        return;
      }
      const dataView = new DataView(memory.buffer);
      const searchType = document.getElementById('wasm-scan-type').value || 'int32';
      const currentValue = this.readMemoryValue(dataView, address, searchType);
      const currentItem = this.memoryFindings[address];
      if (typeof currentItem === 'object' && currentItem !== null) {
        currentItem.description = description;
        this.memoryFindings[address] = currentItem;
      } else {
        this.memoryFindings[address] = {
          value: currentValue,
          description: description
        };
      }
      this.updateResults();
      this.updateStatus(`Added description to address ${address}`);
    },

    performInitialSearch: function() {
      try {
        const valueDisplay = document.getElementById('wasm-scan-value');
        const searchValue = valueDisplay.value;
        const searchType = document.getElementById('wasm-scan-type').value || 'int32';
        const scanStrategySelect = document.getElementById('wasm-scan-strategy');
        const searchStrategy = scanStrategySelect ? scanStrategySelect.value : 'exact_value';
        const pathDisplay = document.getElementById('wasm-memory-path');
        this.customMemoryPath = pathDisplay.value;
        if (searchStrategy !== 'exact_value' && !this.lastSearchValues.length) {
          alert('Initial search can only use Exact Value strategy. Other strategies are for narrowing results.');
          return;
        }
        if (!searchValue || isNaN(Number(searchValue))) {
          alert('Please enter a valid number to search for');
          return;
        }
        const memory = this.getWasmMemory();
        if (!memory) {
          alert('Failed to access WebAssembly memory. Try entering a custom memory path.');
          return;
        }
        this.updateStatus('Searching memory...');
        this.searchHistory.push({...this.memoryFindings});
        const previousValues = {...this.memoryFindings};
        this.memoryFindings = {};
        this.lastSearchValues = [];
        const numValue = searchValue ? Number(searchValue) : 0;
        setTimeout(() => {
          const dataView = new DataView(memory.buffer);
          const stride = this.getTypeSize(searchType);
          const compareFunc = this.getCompareFunction(searchType, numValue);
          const maxMemorySize = memory.length;
          const safeMaxBound = maxMemorySize - (stride * 2);
          for (let i = 0; i < safeMaxBound; i += stride) {
            try {
              const value = this.readMemoryValue(dataView, i, searchType);
              const originalValue = previousValues[i];
              if (compareFunc(value)) {
                this.memoryFindings[i] = value;
                this.lastSearchValues.push({address: i, value: value, previous: originalValue});
              }
            } catch (e) {}
          }
          this.updateResults();
          this.updateStatus(`Search complete. Found ${Object.keys(this.memoryFindings).length} matches.`);
        }, 100);
      } catch (e) {
        console.error("Error in performInitialSearch:", e);
      }
    },

    narrowSearch: function() {
      const valueDisplay = document.getElementById('wasm-scan-value');
      const searchValue = valueDisplay.value;
      const searchType = document.getElementById('wasm-scan-type').value || 'int32';
      const scanStrategySelect = document.getElementById('wasm-scan-strategy');
      const searchStrategy = scanStrategySelect ? scanStrategySelect.value : 'exact_value';
      const pathDisplay = document.getElementById('wasm-memory-path');
      this.customMemoryPath = pathDisplay.value;
      if (!searchValue || isNaN(Number(searchValue))) {
        alert('Please enter a valid number to search for');
        return;
      }
      if (this.lastSearchValues.length === 0) {
        alert('No previous search results. Perform an initial search first.');
        return;
      }
      const memory = this.getWasmMemory();
      if (!memory) {
        alert('Failed to access WebAssembly memory');
        return;
      }
      this.updateStatus('Narrowing search...');
      this.searchHistory.push({...this.memoryFindings});
      const numValue = searchValue ? Number(searchValue) : 0;
      const dataView = new DataView(memory.buffer);
      const newFindings = {};
      const newLastSearchValues = [];
      switch (searchStrategy) {
        case 'exact_value':
          for (const item of this.lastSearchValues) {
            try {
              const value = this.readMemoryValue(dataView, item.address, searchType);
              const originalValue = item.value;
              if (Math.abs(value - numValue) < 0.001) {
                newFindings[item.address] = value;
                newLastSearchValues.push({address: item.address, value: value, previous: originalValue});
              }
            } catch (e) {}
          }
          break;
        case 'increased':
          for (const item of this.lastSearchValues) {
            try {
              const value = this.readMemoryValue(dataView, item.address, searchType);
              if (value > item.value) {
                newFindings[item.address] = value;
                newLastSearchValues.push({address: item.address, value: value, previous: item.value});
              }
            } catch (e) {}
          }
          break;
        case 'decreased':
          for (const item of this.lastSearchValues) {
            try {
              const value = this.readMemoryValue(dataView, item.address, searchType);
              if (value < item.value) {
                newFindings[item.address] = value;
                newLastSearchValues.push({address: item.address, value: value, previous: item.value});
              }
            } catch (e) {}
          }
          break;
        case 'changed':
          for (const item of this.lastSearchValues) {
            try {
              const value = this.readMemoryValue(dataView, item.address, searchType);
              if (value !== item.value) {
                newFindings[item.address] = value;
                newLastSearchValues.push({address: item.address, value: value, previous: item.value});
              }
            } catch (e) {}
          }
          break;
        case 'unchanged':
          for (const item of this.lastSearchValues) {
            try {
              const value = this.readMemoryValue(dataView, item.address, searchType);
              if (value === item.value) {
                newFindings[item.address] = value;
                newLastSearchValues.push({address: item.address, value: value, previous: item.value});
              }
            } catch (e) {}
          }
          break;
      }
      this.memoryFindings = newFindings;
      this.lastSearchValues = newLastSearchValues;
      this.updateResults();
      this.updateStatus(`Narrowing complete. Found ${Object.keys(this.memoryFindings).length} matches.`);
    },

    undoLastSearch: function() {
      if (this.searchHistory.length === 0) {
        alert('No search history to undo');
        return;
      }
      this.memoryFindings = this.searchHistory.pop();
      this.updateResults();
      this.updateStatus('Reverted to previous search results');
    },

  };

  UnityWasmScanner.init();
})();
