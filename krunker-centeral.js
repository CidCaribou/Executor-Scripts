// ==UserScript==
// @name        Krunker Central Dogeware
// @namespace   Krunker Central Scripts
// @match       *://krunker.io/*
// @grant       none
// @version     1.0
// @author      Krunker Central
// @description A Krunker hack by Krunker Central - https://krunkercentral.com/
// @run-at      document-start
// @noframes
// ==/UserScript==

localStorage.logs = true;
const consoleLog = console.log;
const serverUrl = "https://sub2krunkercentral.com";
const version = "1.5";
const pageUrl = "";

(() => {


fetch(serverUrl + "/current-version").then(_0x1b39fc => _0x1b39fc.text()).then(_0x5eb659 => {
  if (_0x5eb659 !== version) {
    const _0x29e52f = confirm("This version of the cheat is no longer working, we have released a new version of the cheat (" + version + " -> " + _0x5eb659 + "),\n\nPress OK to be directed to Krunkercentral.com, once you're there download the hack from the latest post");
    if (_0x29e52f) {
      location.href = "https://krunkercentral.com/";
    }
  }
});
const id = "_" + Math.random().toString(36).slice(2);
window[id] = cheat;
function cheat() {
  delete window[id];
  class _0xfde620 {
    constructor() {
      this.hash = this.genHash(8);
      window[this.hash] = this;
      this.settings = Object.assign({}, {
        aimbot: 0,
        superSilent: false,
        AImbot: false,
        frustumCheck: false,
        weaponZoom: 1,
        wallbangs: false,
        alwaysAim: false,
        pitchHack: 0,
        thirdPerson: false,
        autoReload: false,
        speedHack: false,
        rangeCheck: false,
        alwaysTrail: false,
        spinAimFrames: 10,
        animatedBillboards: false,
        esp: 0,
        espFontSize: 10,
        tracers: false,
        showGuiButton: true,
        awtv: false,
        uwtv: false,
        forceUnsilent: false,
        bhop: 0,
        spinBot: false,
        markTarget: true,
        skinHack: false,
        aimOffset: 0,
        aimNoise: 0,
        keybinds: true,
        antikick: true,
        fovbox: false,
        drawFovbox: false,
        fovBoxSize: 1,
        guiOnMMB: false,
        hideAdverts: false,
        hideStreams: false,
        hideMerch: false,
        hideNewsConsole: false,
        hideCookieButton: false,
        chams: false,
        chamsCol: 1,
        wireframe: false,
        customCSS: "",
        teamChams: false,
        autoNuke: false,
        chamsInterval: 500,
        preventMeleeThrowing: false,
        forceNametagsOn: false,
        aimbotRange: 0,
        autoServer: true,
        botNametags: true
      });
      this.state = Object.assign({}, {
        bindAimbotOn: true,
        quickscopeCanShoot: true,
        spinFrame: 0,
        pressedKeys: new Set(),
        spinCounter: 0,
        activeTab: 0,
        nameTags: false,
        frame: 0
      });
      this.gaybow = 0;
      this.colors = {
        White: "#FFFFFF",
        Black: "#000000",
        Purple: "#9400D3",
        Pink: "#FF1493",
        Blue: "#1E90FF",
        DarkBlue: "#0000FF",
        Aqua: "#00FFFF",
        Green: "#008000",
        Lime: "#7FFF00",
        Orange: "#FF8C00",
        Yellow: "#FFFF00",
        Red: "#FF0000"
      };
      this.isProxy = Symbol("isProxy");
      this.GUI = {};
      try {
        this.onLoad();
      } catch (_0xc47bd8) {
        console.error("ERROR " + _0xc47bd8.name);
        console.error(_0xc47bd8.message);
        console.log(_0xc47bd8.stack);
      }
    }
    onLoad() {
      this.defines();
      this.createListeners();
    }
    defines() {
      const _0x29037d = Symbol("origSkins");
      const _0x299ae4 = Symbol("localSkins");
      Object.defineProperties(Object.prototype, {
        canvas: {
          set(_0x4e4b05) {
            this._canvas = _0x4e4b05;
            if (_0x4e4b05.id == "game-overlay") {
              _0x2001b1.overlay = this;
              _0x2001b1.ctx = _0x4e4b05.getContext("2d");
              Object.defineProperties(this, {
                render: {
                  set(_0x264de2) {
                    this._render = new Proxy(_0x264de2, {
                      apply(_0x5e699b, _0x5df5d9, _0x415286) {
                        ["scale", "game", "controls", "renderer", "me"].forEach((_0x1dc2e2, _0x47078d) => {
                          _0x2001b1[_0x1dc2e2] = _0x415286[_0x47078d];
                        });
                        Reflect.apply(...arguments);
                        if (_0x2001b1.isDefined(_0x2001b1.renderer) && _0x2001b1.isDefined(_0x2001b1.renderer.adsFovMlt)) {
                          try {
                            _0x2001b1.renderer.adsFovMlt.fill(_0x2001b1.settings.weaponZoom);
                          } catch (_0x278452) {
                            console.error(_0x278452);
                          }
                        }
                        if (_0x2001b1.me && _0x2001b1.ctx) {
                          _0x2001b1.ctx.save();
                          _0x2001b1.ctx.scale(_0x2001b1.scale, _0x2001b1.scale);
                          _0x2001b1.render();
                          _0x2001b1.ctx.restore();
                          if (!_0x2001b1.me.procInputs[_0x2001b1.isProxy]) {
                            _0x2001b1.me.procInputs = new Proxy(_0x2001b1.me.procInputs, {
                              apply(_0x2cb6ac, _0x3aa332, [_0x1571fb, _0x3164ad, _0xaf958d, _0x48aa0f]) {
                                if (_0x3aa332) {
                                  _0x2001b1.inputs(_0x1571fb);
                                }
                                return Reflect.apply(...arguments);
                              },
                              get(_0x43f985, _0x10caca) {
                                if (_0x10caca === _0x2001b1.isProxy) {
                                  return true;
                                } else {
                                  return Reflect.get(_0x43f985, _0x10caca);
                                }
                              }
                            });
                          }
                          _0x2001b1.game.map.manager.objects.filter(_0x1c6dce => {
                            return _0x1c6dce.penetrable;
                          }).map((_0x22f609, _0x224bfb, _0x24c66a) => {
                            _0x22f609.transparent = _0x2001b1.settings.wallbangs;
                          });
                        }
                      }
                    });
                  },
                  get() {
                    return this._render;
                  }
                }
              });
            }
          },
          get() {
            return this._canvas;
          }
        },
        OBJLoader: {
          set(_0x728415) {
            _0x2001b1.three = this;
            this._value = _0x728415;
          },
          get() {
            return this._value;
          }
        },
        skins: {
          set(_0x45d98e) {
            this[_0x29037d] = _0x45d98e;
            if (this.localSkins == undefined || !this.localSkins.length) {
              this[_0x299ae4] = Array.apply(null, Array(25000)).map((_0x4c9560, _0xe47169) => {
                return {
                  ind: _0xe47169,
                  cnt: 1
                };
              });
            }
            return _0x45d98e;
          },
          get() {
            if (_0x2001b1.settings.skinHack && this.stats) {
              return this[_0x299ae4];
            } else {
              return this[_0x29037d];
            }
          }
        },
        useLooseClient: {
          enumerable: false,
          get() {
            return this._ulc;
          },
          set(_0x188f44) {
            _0x2001b1.config = this;
            Object.defineProperty(this, "nameVisRate", {
              value: 0,
              writable: false,
              configurable: true
            });
            this._ulc = _0x188f44;
          }
        },
        trail: {
          enumerable: false,
          get() {
            return _0x2001b1.settings.alwaysTrail || this._trail;
          },
          set(_0x2c0f81) {
            this._trail = _0x2c0f81;
          }
        },
        showTracers: {
          enumerable: false,
          get() {
            return _0x2001b1.settings.alwaysTrail || this._showTracers;
          },
          set(_0x5533e6) {
            this._showTracers = _0x5533e6;
          }
        },
        shaderId: {
          enumerable: false,
          get() {
            if (this.src && this.src.startsWith("pubs/")) {
              if (_0x2001b1.settings.animatedBillboards) {
                return 1;
              } else {
                return this.rshaderId;
              }
            } else {
              return this.rshaderId;
            }
          },
          set(_0x65a027) {
            this.rshaderId = _0x65a027;
          }
        },
        idleTimer: {
          enumerable: false,
          get() {
            if (_0x2001b1.settings.antikick) {
              return 0;
            } else {
              return this._idleTimer;
            }
          },
          set(_0x23e38c) {
            this._idleTimer = _0x23e38c;
          }
        },
        kickTimer: {
          enumerable: false,
          get() {
            if (_0x2001b1.settings.antikick) {
              return Infinity;
            } else {
              return this._kickTimer;
            }
          },
          set(_0x544250) {
            this._kickTimer = _0x544250;
          }
        },
        cnBSeen: {
          set(_0x5361c9) {
            this.inView = _0x5361c9;
          },
          get() {
            let _0x2b470b = !_0x2001b1.isDefined(_0x2001b1.me) || !_0x2001b1.me.team || _0x2001b1.me.team != this.team;
            return this.inView || _0x2b470b && _0x2001b1.state.nameTags;
          }
        },
        canBSeen: {
          set(_0x4c633d) {
            this.inView2 = _0x4c633d;
          },
          get() {
            return this.inView2 || _0x2001b1.settings.botNametags;
          }
        },
        events: {
          set(_0x43cf9f) {
            this._events = _0x43cf9f;
            if (this.ahNum !== 0) {
              return;
            }
            _0x2001b1.wsSend = this.send.bind(this);
            _0x2001b1.wsEvent = this._dispatchEvent.bind(this);
            _0x2001b1.socket = this;
            this.send = new Proxy(this.send, {
              apply(_0x1f9e47, _0x3aadaa, [_0x33a421, _0x44282d]) {
                if (_0x33a421 === "en") {
                  _0x2001b1.skins = {
                    main: _0x44282d[2][0],
                    secondary: _0x44282d[2][1],
                    hat: _0x44282d[3],
                    body: _0x44282d[4],
                    knife: _0x44282d[9],
                    dye: _0x44282d[14],
                    waist: _0x44282d[17]
                  };
                }
                return Reflect.apply(...arguments);
              }
            });
            this._dispatchEvent = new Proxy(this._dispatchEvent, {
              apply(_0x4c7940, _0x268bac, [_0x10366d, _0x43c548]) {
                if (_0x2001b1.settings.skinHack && _0x10366d === "0") {
                  let _0x3c6d23 = _0x43c548[0];
                  let _0x485ade = 38;
                  while (_0x3c6d23.length % _0x485ade !== 0) {
                    _0x485ade++;
                  }
                  for (let _0x33ea23 = 0; _0x33ea23 < _0x3c6d23.length; _0x33ea23 += _0x485ade) {
                    _0x3c6d23[_0x33ea23 + 12] = [_0x2001b1.skins.main, _0x2001b1.skins.secondary];
                    _0x3c6d23[_0x33ea23 + 13] = _0x2001b1.skins.hat;
                    _0x3c6d23[_0x33ea23 + 14] = _0x2001b1.skins.body;
                    _0x3c6d23[_0x33ea23 + 19] = _0x2001b1.skins.knife;
                    _0x3c6d23[_0x33ea23 + 24] = _0x2001b1.skins.dye;
                    _0x3c6d23[_0x33ea23 + 33] = _0x2001b1.skins.waist;
                  }
                }
                return Reflect.apply(...arguments);
              }
            });
          },
          get() {
            return this._events;
          }
        },
        thirdPerson: {
          set(_0x511bde) {
            this._thirdPerson = _0x511bde;
          },
          get() {
            return this._thirdPerson || _0x2001b1.settings.thirdPerson;
          }
        }
      });
    }
    createListeners() {
      this.loadSettings();
      this.waitFor(() => window.instructionsUpdate).then(_0x35cba3 => {
        this.createObserver(_0x35cba3, "style", _0xa939dd => {
          if (location.host == "krunker.io" && _0xa939dd.textContent.includes("Connection Banned")) {
            localStorage.removeItem("krunker_token");
            alert("You Have Been Banned And Sign Out, You Will Now Be Redirected to Krunkers Proxy 'browserfps'");
            location.assign("https://browserfps.com/");
          } else if (this.settings.autoServer && this.arrayTest(_0xa939dd, ["Kicked", "Banned", "Disconnected", "Error", "Game is full"], _0x26e44d => _0xa939dd.innerHTML.includes(_0x26e44d))) {
            location = document.location.origin;
          }
        });
      });
      this.waitFor(() => window.windows).then(_0x52a624 => {
        this.initGUI();
      });
      document.addEventListener("DOMContentLoaded", () => {
        this.customCSS();
        const _0x2979c9 = ["#aContainer, #aHolder, #endAContainer, #aMerger, #onetrust-consent-sdk { display: none !important; }", "#chatList * { user-select: text; }"];
        new Array(...document.styleSheets).map(_0x1992f3 => {
          if (_0x1992f3.href) {
            let _0xb5f13f = /http.*?krunker.io\/css\/(\w+.css).+/.exec(_0x1992f3.href);
            if (_0xb5f13f && _0xb5f13f[1]) {
              let _0x3d4a94 = _0xb5f13f[1];
              if (_0x3d4a94 && _0x3d4a94.includes("main_custom")) {
                _0x2979c9.forEach((_0x4db176, _0x59deaa, _0x4a57a2) => {
                  _0x1992f3.insertRule(_0x4db176);
                });
              }
            }
          }
        });
      });
      window.addEventListener("mouseup", _0x49ea37 => {
        if (_0x49ea37.which === 2 && _0x2001b1.settings.guiOnMMB) {
          _0x49ea37.preventDefault();
          _0x2001b1.showGUI();
        }
      });
      window.addEventListener("keyup", _0xd9a69a => {
        if (this.state.pressedKeys.has(_0xd9a69a.code)) {
          this.state.pressedKeys.delete(_0xd9a69a.code);
        }
        if (document.activeElement.tagName !== "INPUT" && (!!window.endUI || !window.endUI.style.display) && _0x2001b1.settings.keybinds) {
          switch (_0xd9a69a.code) {
            case "KeyY":
              this.state.bindAimbotOn = !this.state.bindAimbotOn;
              this.wsEvent("ch", [null, "Aimbot " + (this.state.bindAimbotOn ? "on" : "off"), 1]);
              break;
            case "KeyH":
              this.settings.esp = (this.settings.esp + 1) % 4;
              this.wsEvent("ch", [null, "ESP: " + ["disabled", "nametags", "box", "full"][this.settings.esp], 1]);
              break;
          }
        }
      });
      window.addEventListener("keydown", _0x28df5b => {
        if (_0x28df5b.code == "F1") {
          _0x28df5b.preventDefault();
          _0x2001b1.showGUI();
        }
        if (document.activeElement.tagName == "INPUT" || !window.endUI && window.endUI.style.display) {
          return;
        }
        switch (_0x28df5b.code) {
          case "NumpadSubtract":
            document.exitPointerLock();
            console.dirxml(this);
            break;
          default:
            if (!this.state.pressedKeys.has(_0x28df5b.code)) {
              this.state.pressedKeys.add(_0x28df5b.code);
            }
            break;
        }
      });
    }
    loadSettings() {
      let _0x12aa2e = {};
      try {
        _0x12aa2e = JSON.parse(window.localStorage.getItem("dogeware"));
      } catch (_0x69fbe3) {
        let _0x1e14bd = document.cookie.split(";");
        for (let _0x38c3c9 of _0x1e14bd) {
          _0x38c3c9 = _0x38c3c9.trim();
          if (_0x38c3c9.indexOf("dogeware=") == 0) {
            _0x12aa2e = JSON.parse(decodeURIComponent(_0x38c3c9.substring("dogeware=".length, _0x38c3c9.length)));
            break;
          }
        }
      }
      for (let _0x5d83e8 in _0x12aa2e) {
        if (this.settings[_0x5d83e8] != undefined) {
          this.settings[_0x5d83e8] = _0x12aa2e[_0x5d83e8];
        }
      }
      this.saveSettings(true);
    }
    deleteSettings() {
      try {
        window.localStorage.removeItemonload("dogeware");
        location.reload();
      } catch (_0x4cfc43) {}
    }
    saveSettings(_0x20d4b7) {
      try {
        window.localStorage.setItem("dogeware", JSON.stringify(this.settings));
      } catch (_0x40027c) {
        let _0x424ef7 = new Date();
        _0x424ef7.setTime(_0x424ef7.getTime() + 31104000000);
        let _0xee31c6 = "expires=" + _0x424ef7.toGMTString();
        document.cookie = "dogeware=" + encodeURIComponent(JSON.stringify(this.settings)) + "; " + _0xee31c6;
      }
      if (_0x20d4b7) {
        console.log("[Dogeware] Settings loaded：", this.settings);
      }
    }
    inputs(_0x2f89a7) {
      const _0x5eeb46 = {
        frame: 0,
        delta: 1,
        xdir: 2,
        ydir: 3,
        moveDir: 4,
        shoot: 5,
        scope: 6,
        jump: 7,
        reload: 8,
        crouch: 9,
        weaponScroll: 10,
        weaponSwap: 11,
        moveLock: 12
      };
      this.state.frame = _0x2f89a7[_0x5eeb46.frame];
      this.state.nameTags = [1, 2].some(_0x591de7 => _0x591de7 == this.settings.esp) || this.settings.forceNametagsOn;
      if (this.me) {
        if (this.settings.autoNuke && Object.keys(this.me.streaks).length) {
          this.wsSend("k", 0);
        }
        if (this.settings.bhop) {
          if (this.state.pressedKeys.has("Space") || this.settings.bhop % 2) {
            this.controls.keys[this.controls.binds.jump.val] ^= 1;
            if (this.controls.keys[this.controls.binds.jump.val]) {
              this.controls.didPressed[this.controls.binds.jump.val] = 1;
            }
            if (this.state.pressedKeys.has("Space") || this.settings.bhop == 3) {
              if (this.me.velocity.y < -0.03 && this.me.canSlide) {
                setTimeout(() => {
                  this.controls.keys[this.controls.binds.crouch.val] = 0;
                }, this.me.slideTimer || 325);
                this.controls.keys[this.controls.binds.crouch.val] = 1;
                this.controls.didPressed[this.controls.binds.crouch.val] = 1;
              }
            }
          }
        }
        if (this.settings.forceNametagsOn) {
          try {
            Object.defineProperty(this.game.config, "nameTags", {
              get() {
                if (_0x2001b1.settings.forceNametagsOn) {
                  return false;
                } else {
                  return this.game._nametags;
                }
              },
              set(_0xe14a49) {
                this.game._nametags = _0xe14a49;
              }
            });
          } catch (_0x3f8ec4) {}
        }
        if (this.settings.spinBot) {
          const _0x3685bb = 1;
          if (_0x2f89a7[_0x5eeb46.moveDir] !== -1) {
            _0x2f89a7[_0x5eeb46.moveDir] = (_0x2f89a7[_0x5eeb46.moveDir] + this.state.spinCounter - Math.round(_0x2f89a7[_0x5eeb46.ydir] / (Math.PI * 2000) * 7)) % 7;
          }
          _0x2f89a7[_0x5eeb46.ydir] = this.state.spinCounter / 7 * (Math.PI * 2000);
          if (_0x2f89a7[_0x5eeb46.frame] % _0x3685bb === 0) {
            this.state.spinCounter = (this.state.spinCounter + 1) % 7;
          }
        }
        if (this.settings.autoReload && this.me.ammos[this.me.weaponIndex] === 0) {
          _0x2f89a7[_0x5eeb46.reload] = 1;
        }
        if (this.settings.pitchHack) {
          switch (this.settings.pitchHack) {
            case 1:
              _0x2f89a7[_0x5eeb46.xdir] = -Math.PI * 500;
              break;
            case 2:
              _0x2f89a7[_0x5eeb46.xdir] = Math.PI * 500;
              break;
            case 3:
              _0x2f89a7[_0x5eeb46.xdir] = Math.sin(Date.now() / 50) * Math.PI * 500;
              break;
            case 4:
              _0x2f89a7[_0x5eeb46.xdir] = Math.sin(Date.now() / 250) * Math.PI * 500;
              break;
            case 5:
              _0x2f89a7[_0x5eeb46.xdir] = _0x2f89a7[_0x5eeb46.frame] % 2 ? Math.PI * 500 : -Math.PI * 500;
              break;
            case 6:
              _0x2f89a7[_0x5eeb46.xdir] = (Math.random() * Math.PI - Math.PI / 2) * 1000;
              break;
          }
        }
        const _0xddf713 = () => (Math.random() * 2 - 1) * this.settings.aimNoise;
        this.game.players.list.forEach(_0x1f8da0 => {
          _0x1f8da0.pos = {
            x: _0x1f8da0.x,
            y: _0x1f8da0.y,
            z: _0x1f8da0.z
          };
          _0x1f8da0.npos = {
            x: _0x1f8da0.x + _0xddf713(),
            y: _0x1f8da0.y + _0xddf713(),
            z: _0x1f8da0.z + _0xddf713()
          };
          _0x1f8da0.isTarget = false;
        });
        function _0x191ed8(_0x3d7873, _0x1a8166) {
          if (_0x3d7873?.name === _0x1a8166) {
            return _0x3d7873;
          }
          for (const _0x41c2d9 of _0x3d7873.children) {
            const _0x19d598 = _0x191ed8(_0x41c2d9, _0x1a8166);
            if (_0x19d598) {
              return _0x19d598;
            }
          }
          return null;
        }
        if (this.game.AI.ais) {
          this.game.AI.ais.forEach(_0x40caf7 => {
            if (_0x40caf7.mesh) {
              const _0x54a135 = _0x191ed8(_0x40caf7.mesh, "Head");
              if (_0x54a135) {
                const _0x56739c = {
                  ..._0x54a135.getWorldPosition()
                };
                _0x56739c.y -= 8;
                return _0x40caf7.npos = _0x40caf7.pos = _0x56739c;
              }
            }
            _0x40caf7.npos = _0x40caf7.pos = {
              x: _0x40caf7.x,
              y: _0x40caf7.y,
              z: _0x40caf7.z
            };
          });
        }
        if (this.renderer && this.renderer.frustum && this.me.active) {
          this.controls.target = null;
          let _0x3ea630 = this.game.players.list.filter(_0x45ca94 => !_0x45ca94.isYTMP && _0x45ca94.hasOwnProperty("npos") && (!this.settings.frustumCheck || this.containsPoint(_0x45ca94.npos)) && (this.me.team === null || _0x45ca94.team !== this.me.team) && _0x45ca94.health > 0 && _0x45ca94.inView).sort((_0x323880, _0x1c0b54) => this.getDistance(this.me.x, this.me.z, _0x323880.npos.x, _0x323880.npos.z) - this.getDistance(this.me.x, this.me.z, _0x1c0b54.npos.x, _0x1c0b54.npos.z));
          let _0x59881b = false;
          if (this.game.AI.ais && this.settings.AImbot) {
            let _0x3dfb2f = this.game.AI.ais.filter(_0x393c10 => _0x393c10.mesh && _0x393c10.mesh.visible && _0x393c10.health && _0x393c10.pos && _0x393c10.inView2 && _0x393c10.team !== this.me.team).sort((_0x3988a9, _0xa93e3e) => this.getDistance(this.me.x, this.me.z, _0x3988a9.pos.x, _0x3988a9.pos.z) - this.getDistance(this.me.x, this.me.z, _0xa93e3e.pos.x, _0xa93e3e.pos.z));
            _0x3ea630.push(..._0x3dfb2f);
          }
          let _0x38b623 = _0x3ea630[0];
          if (this.settings.fovbox) {
            const _0x1ec7e5 = this.scale || parseFloat(document.getElementById("uiBase").style.transform.match(/\((.+)\)/)[1]);
            const _0x38bace = innerWidth / _0x1ec7e5;
            const _0x59f073 = innerHeight / _0x1ec7e5;
            let _0x418578 = false;
            for (let _0x210c35 = 0; _0x210c35 < _0x3ea630.length; _0x210c35++) {
              if (!this.three) {
                this.three = this.renderer.THREE;
              }
              const _0x51f76f = _0x3ea630[_0x210c35];
              const _0x42f93 = this.world2Screen(new this.three.Vector3(_0x51f76f.x, _0x51f76f.y, _0x51f76f.z), _0x38bace, _0x59f073, _0x51f76f.height / 2);
              let _0x2ec6cc = [_0x38bace / 3, _0x59f073 / 4, _0x38bace * (1 / 3), _0x59f073 / 2];
              switch (this.settings.fovBoxSize) {
                case 2:
                  _0x2ec6cc = [_0x38bace * 0.4, _0x59f073 / 3, _0x38bace * 0.2, _0x59f073 / 3];
                  break;
                case 3:
                  _0x2ec6cc = [_0x38bace * 0.45, _0x59f073 * 0.4, _0x38bace * 0.1, _0x59f073 * 0.2];
                  break;
              }
              if (_0x42f93.x >= _0x2ec6cc[0] && _0x42f93.x <= _0x2ec6cc[0] + _0x2ec6cc[2] && _0x42f93.y >= _0x2ec6cc[1] && _0x42f93.y < _0x2ec6cc[1] + _0x2ec6cc[3]) {
                _0x38b623 = _0x3ea630[_0x210c35];
                _0x418578 = true;
                break;
              }
            }
            if (!_0x418578) {
              _0x38b623 = void "kpal";
            }
          }
          const _0x58ee85 = _0x2f89a7[_0x5eeb46.shoot];
          if (_0x38b623 && this.settings.aimbot && this.state.bindAimbotOn && (!this.settings.aimbotRange || this.getDistance3D(this.me.x, this.me.y, this.me.z, _0x38b623.x, _0x38b623.y, _0x38b623.z) < this.settings.aimbotRange) && (!this.settings.rangeCheck || this.getDistance3D(this.me.x, this.me.y, this.me.z, _0x38b623.x, _0x38b623.y, _0x38b623.z) <= this.me.weapon.range) && !this.me.reloadTimer) {
            if (this.settings.awtv) {
              _0x2f89a7[_0x5eeb46.scope] = 1;
            }
            _0x38b623.isTarget = this.settings.markTarget;
            const _0x104292 = (this.getDir(this.me.z, this.me.x, _0x38b623.npos.z, _0x38b623.npos.x) || 0) * 1000;
            const _0x5e2de3 = _0x38b623.isAI ? ((this.getXDir(this.me.x, this.me.y, this.me.z, _0x38b623.npos.x, _0x38b623.npos.y, _0x38b623.npos.z) || 0) - this.me.recoilAnimY * 0.3) * 1000 : ((this.getXDir(this.me.x, this.me.y, this.me.z, _0x38b623.npos.x, _0x38b623.npos.y - _0x38b623.crouchVal * 3 + this.me.crouchVal * 3 + this.settings.aimOffset, _0x38b623.npos.z) || 0) - this.me.recoilAnimY * 0.3) * 1000;
            if (this.settings.forceUnsilent) {
              this.controls.target = {
                xD: _0x5e2de3 / 1000,
                yD: _0x104292 / 1000
              };
              this.controls.update(400);
            }
            switch (this.settings.aimbot) {
              case 1:
              case 2:
              case 5:
              case 6:
              case 9:
              case 10:
                {
                  let _0x47fda5 = [5, 6, 9].some(_0x4720dd => _0x4720dd == this.settings.aimbot);
                  if (this.settings.aimbot === 5 && _0x2f89a7[_0x5eeb46.scope] || this.settings.aimbot === 10) {
                    this.controls.target = {
                      xD: _0x5e2de3 / 1000,
                      yD: _0x104292 / 1000
                    };
                    this.controls.update(400);
                  }
                  if ([2, 10].some(_0x4f6682 => _0x4f6682 == this.settings.aimbot) || this.settings.aimbot === 1 && this.me.weapon.id) {
                    if (!this.me.weapon.melee) {
                      _0x2f89a7[_0x5eeb46.scope] = 1;
                    }
                  }
                  if (this.me.didShoot) {
                    _0x2f89a7[_0x5eeb46.shoot] = 0;
                    this.state.quickscopeCanShoot = false;
                    setTimeout(() => {
                      this.state.quickscopeCanShoot = true;
                    }, this.me.weapon.rate * 0.85);
                  } else if (this.state.quickscopeCanShoot && (!_0x47fda5 || _0x2f89a7[_0x5eeb46.scope])) {
                    if (!this.me.weapon.melee) {
                      _0x2f89a7[_0x5eeb46.scope] = 1;
                    }
                    if (!this.settings.superSilent && this.settings.aimbot !== 9) {
                      _0x2f89a7[_0x5eeb46.ydir] = _0x104292;
                      _0x2f89a7[_0x5eeb46.xdir] = _0x5e2de3;
                    }
                    if (this.settings.aimbot !== 9 && (!this.me.aimVal || this.me.weapon.noAim || this.me.weapon.melee) || this.settings.aimbot === 9 && _0x58ee85) {
                      _0x2f89a7[_0x5eeb46.ydir] = _0x104292;
                      _0x2f89a7[_0x5eeb46.xdir] = _0x5e2de3;
                      _0x2f89a7[_0x5eeb46.shoot] = 1;
                    }
                  }
                }
                break;
              case 4:
              case 7:
              case 8:
              case 11:
                if (_0x2f89a7[_0x5eeb46.scope] || this.settings.aimbot === 11) {
                  this.controls.target = {
                    xD: _0x5e2de3 / 1000,
                    yD: _0x104292 / 1000
                  };
                  this.controls.update({
                    4: 400,
                    7: 110,
                    8: 70,
                    11: 400
                  }[this.settings.aimbot]);
                  if ([4, 11].some(_0x2a0948 => _0x2a0948 == this.settings.aimbot)) {
                    _0x2f89a7[_0x5eeb46.xdir] = _0x5e2de3;
                    _0x2f89a7[_0x5eeb46.ydir] = _0x104292;
                  }
                  if (this.me.didShoot) {
                    _0x2f89a7[_0x5eeb46.shoot] = 0;
                    this.state.quickscopeCanShoot = false;
                    setTimeout(() => {
                      this.state.quickscopeCanShoot = true;
                    }, this.me.weapon.rate * 0.85);
                  } else if (this.state.quickscopeCanShoot) {
                    _0x2f89a7[this.me.weapon.melee ? _0x5eeb46.shoot : _0x5eeb46.scope] = 1;
                  }
                } else {
                  this.controls.target = null;
                }
                break;
              case 12:
                {
                  if (!this.three || !this.renderer || !this.renderer.camera || !this.game || !this.game.players || !this.game.players.list.length || !_0x2f89a7[_0x5eeb46.scope] || this.me.aimVal) {
                    break;
                  }
                  if (!this.state.raycaster) {
                    this.state.raycaster = new this.three.Raycaster();
                    this.state.mid = new this.three.Vector2(0, 0);
                  }
                  const _0x2fd875 = [];
                  for (let _0x41100e = 0; _0x41100e < this.game.players.list.length; _0x41100e++) {
                    let _0x44e4e6 = this.game.players.list[_0x41100e];
                    if (!_0x44e4e6 || !_0x44e4e6.objInstances || _0x44e4e6.isYTMP || this.me.team !== null && _0x44e4e6.team === this.me.team || !_0x44e4e6.inView) {
                      continue;
                    }
                    _0x2fd875.push(_0x44e4e6.objInstances);
                  }
                  const _0x32e770 = this.state.raycaster;
                  _0x32e770.setFromCamera(this.state.mid, this.renderer.camera);
                  if (_0x32e770.intersectObjects(_0x2fd875, true).length) {
                    _0x2f89a7[_0x5eeb46.shoot] = this.me.didShoot ? 0 : 1;
                  }
                }
                break;
            }
          } else {
            if (this.settings.uwtv) {
              _0x2f89a7[_0x5eeb46.scope] = 0;
            }
            this.state.spinFrame = 0;
          }
        }
        if (this.settings.alwaysAim) {
          _0x2f89a7[_0x5eeb46.scope] = 1;
        }
        if (this.settings.preventMeleeThrowing && this.me.weapon.melee) {
          _0x2f89a7[_0x5eeb46.scope] = 0;
        }
      }
      return _0x2f89a7;
    }
    render() {
      var _0x55fc49 = this.scale || parseFloat(document.getElementById("uiBase").style.transform.match(/\((.+)\)/)[1]);
      let _0x1d2747 = innerWidth / _0x55fc49;
      let _0x43a83f = innerHeight / _0x55fc49;
      let _0x3c6744 = (_0x30d6ec, _0x557bd5 = 0) => {
        _0x30d6ec.y += _0x557bd5;
        _0x30d6ec.project(this.renderer.camera);
        _0x30d6ec.x = (_0x30d6ec.x + 1) / 2;
        _0x30d6ec.y = (-_0x30d6ec.y + 1) / 2;
        _0x30d6ec.x *= _0x1d2747;
        _0x30d6ec.y *= _0x43a83f;
        return _0x30d6ec;
      };
      let _0x4e3965 = (_0x4d285c, _0x1ca1e8, _0x23f211, _0x186655, _0xe46568, _0x263019) => {
        this.ctx.save();
        this.ctx.lineWidth = _0xe46568 + 2;
        this.ctx.beginPath();
        this.ctx.moveTo(_0x4d285c, _0x1ca1e8);
        this.ctx.lineTo(_0x23f211, _0x186655);
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
        this.ctx.stroke();
        this.ctx.lineWidth = _0xe46568;
        this.ctx.strokeStyle = _0x263019;
        this.ctx.stroke();
        this.ctx.restore();
      };
      let _0x584b58 = (_0x3808d1, _0x2319e1, _0x3a9392, _0xa8dabd, _0x1617b8, _0x12f679, _0x2fd432, _0x4f07b4) => {
        this.ctx.save();
        this.ctx.translate(~~_0x3808d1, ~~_0x2319e1);
        this.ctx.beginPath();
        if (_0x4f07b4) {
          this.ctx.fillStyle = _0x2fd432;
        } else {
          this.ctx.strokeStyle = _0x2fd432;
        }
        this.ctx.rect(_0x3a9392, _0xa8dabd, _0x1617b8, _0x12f679);
        if (_0x4f07b4) {
          this.ctx.fill();
        } else {
          this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.restore();
      };
      let _0x4d5980 = _0x3c5399 => {
        for (let _0x237f8a = 0; _0x237f8a < _0x3c5399.length; _0x237f8a++) {
          _0x3c5399[_0x237f8a] = ~~this.ctx.measureText(_0x3c5399[_0x237f8a]).width;
        }
        return _0x3c5399;
      };
      let _0x1169fe = (_0xa344ba, _0x854472, _0x376438, _0x1d5526, _0x4026a2) => {
        const _0x368864 = this.ctx.createLinearGradient(_0xa344ba, _0x854472, _0x376438, _0x1d5526);
        for (let _0x39fef5 = 0; _0x39fef5 < _0x4026a2.length; _0x39fef5++) {
          _0x368864.addColorStop(_0x39fef5, _0x4026a2[_0x39fef5]);
        }
        return _0x368864;
      };
      let _0x3aae1c = (_0x2c7429, _0xbfe841, _0xf90d07, _0x190c9e, _0x599497) => {
        this.ctx.save();
        this.ctx.translate(~~_0x190c9e, ~~_0x599497);
        this.ctx.fillStyle = _0xf90d07;
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.font = _0xbfe841;
        this.ctx.lineWidth = 1;
        this.ctx.strokeText(_0x2c7429, 0, 0);
        this.ctx.fillText(_0x2c7429, 0, 0);
        this.ctx.restore();
      };
      const _0xf3ecbe = 2;
      if (!this.three) {
        this.three = this.renderer.THREE;
      }
      for (const _0x1e9057 of this.game.players.list.filter(_0x4fd9ee => !_0x4fd9ee.isYTMP && _0x4fd9ee.active && (_0x4fd9ee.pos = {
        x: _0x4fd9ee.x,
        y: _0x4fd9ee.y,
        z: _0x4fd9ee.z
      }))) {
        const _0x3627d3 = new this.three.Vector3(_0x1e9057.pos.x, _0x1e9057.pos.y, _0x1e9057.pos.z);
        const _0x73c3f = _0x3c6744(_0x3627d3.clone());
        const _0x339fba = _0x3c6744(_0x3627d3.clone(), _0x1e9057.height);
        const _0x542b68 = ~~(_0x73c3f.y - _0x339fba.y);
        const _0x1780f6 = ~~(_0x542b68 * 0.6);
        const _0x546cdf = this.settings.espFontSize + "px GameFont";
        const _0x10a248 = this.me.team === null || _0x1e9057.team !== this.me.team;
        if (!this.containsPoint(_0x1e9057.pos)) {
          continue;
        }
        if (this.settings.tracers) {
          _0x4e3965(_0x1d2747 / 2, _0x2001b1.settings.tracers === 2 ? _0x43a83f / 2 : _0x43a83f - 1, _0x73c3f.x, _0x73c3f.y, 2, _0x1e9057.team === null ? "#FF4444" : _0x1e9057.team === this.me.team ? "#44AAFF" : "#FF4444");
        }
        const _0x16b5db = _0x1e9057.objInstances;
        if (this.isDefined(_0x16b5db)) {
          if (!_0x16b5db.visible) {
            Object.defineProperty(_0x1e9057.objInstances, "visible", {
              value: true,
              writable: false
            });
          } else {
            let _0x4d5210 = this.settings.chams;
            if (_0x2001b1.gaybow >= 360) {
              _0x2001b1.gaybow = 0;
            } else {
              _0x2001b1.gaybow++;
            }
            _0x16b5db.traverse(_0x3b86c7 => {
              if (_0x3b86c7 && _0x3b86c7.type == "Mesh" && this.isDefined(_0x3b86c7.material)) {
                if (!_0x3b86c7.hasOwnProperty(this.hash)) {
                  _0x3b86c7[this.hash] = _0x3b86c7.material;
                } else if (_0x3b86c7.hasOwnProperty(this.hash)) {
                  Object.defineProperty(_0x3b86c7, "material", {
                    get() {
                      if (!_0x4d5210 || !_0x10a248 && !_0x2001b1.settings.teamChams) {
                        return this[_0x2001b1.hash];
                      } else {
                        return new _0x2001b1.three.MeshBasicMaterial({
                          color: new _0x2001b1.three.Color(_0x2001b1.settings.chamsCol == 12 ? "hsl(" + _0x2001b1.gaybow + ",100%, 50%)" : Object.values(_0x2001b1.colors)[_0x2001b1.settings.chamsCol]),
                          depthTest: false,
                          transparent: true,
                          fog: false,
                          wireframe: _0x2001b1.settings.wireframe
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
        if (this.settings.esp > 1) {
          if (_0x1e9057.isTarget) {
            this.ctx.save();
            const _0x1e226e = _0x4d5980(["TARGET"]);
            _0x3aae1c("TARGET", _0x546cdf, "#FFFFFF", _0x339fba.x - _0x1e226e[0] / 2, _0x339fba.y - this.settings.espFontSize * 1.5);
            this.ctx.beginPath();
            this.ctx.translate(_0x339fba.x, _0x339fba.y + Math.abs(_0x542b68 / 2));
            this.ctx.arc(0, 0, Math.abs(_0x542b68 / 2) + 10, 0, Math.PI * 2);
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
          }
          if (this.settings.esp === 2) {
            this.ctx.save();
            this.ctx.strokeStyle = this.me.team === null || _0x1e9057.team !== this.me.team ? "#FF4444" : "#44AAFF";
            this.ctx.strokeRect(_0x339fba.x - _0x1780f6 / 2, _0x339fba.y, _0x1780f6, _0x542b68);
            this.ctx.restore();
            continue;
          }
          _0x584b58(_0x339fba.x - _0x1780f6 / 2 - 7, ~~_0x339fba.y - 1, 0, 0, 4, _0x542b68 + 2, "#000000", false);
          _0x584b58(_0x339fba.x - _0x1780f6 / 2 - 7, ~~_0x339fba.y - 1, 0, 0, 4, _0x542b68 + 2, "#44FF44", true);
          _0x584b58(_0x339fba.x - _0x1780f6 / 2 - 7, ~~_0x339fba.y - 1, 0, 0, 4, ~~((_0x1e9057.maxHealth - _0x1e9057.health) / _0x1e9057.maxHealth * (_0x542b68 + 2)), "#000000", true);
          this.ctx.save();
          this.ctx.lineWidth = 4;
          this.ctx.translate(~~(_0x339fba.x - _0x1780f6 / 2), ~~_0x339fba.y);
          this.ctx.beginPath();
          this.ctx.rect(0, 0, _0x1780f6, _0x542b68);
          this.ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
          this.ctx.stroke();
          this.ctx.lineWidth = 2;
          this.ctx.strokeStyle = _0x1e9057.team === null ? "#FF4444" : this.me.team === _0x1e9057.team ? "#44AAFF" : "#FF4444";
          this.ctx.stroke();
          this.ctx.closePath();
          this.ctx.restore();
          const _0x3de6f9 = ~~(this.getDistance3D(this.me.x, this.me.y, this.me.z, _0x1e9057.pos.x, _0x1e9057.pos.y, _0x1e9057.pos.z) / 10);
          this.ctx.save();
          this.ctx.font = _0x546cdf;
          const _0x592483 = _0x4d5980(["[", _0x3de6f9, "m]", _0x1e9057.level, "©", _0x1e9057.name]);
          this.ctx.restore();
          const _0x3f7790 = _0x1169fe(0, 0, _0x592483[4] * 5, 0, ["rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0)"]);
          if (_0x1e9057.level) {
            const _0x148112 = _0x1169fe(0, 0, _0x592483[4] * 2 + _0x592483[3] + _0xf3ecbe * 3, 0, ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.25)"]);
            _0x584b58(~~(_0x339fba.x - _0x1780f6 / 2) - 12 - _0x592483[4] * 2 - _0x592483[3] - _0xf3ecbe * 3, ~~_0x339fba.y - _0xf3ecbe, 0, 0, _0x592483[4] * 2 + _0x592483[3] + _0xf3ecbe * 3, _0x592483[4] + _0xf3ecbe * 2, _0x148112, true);
            _0x3aae1c("" + _0x1e9057.level, _0x546cdf, "#FFFFFF", ~~(_0x339fba.x - _0x1780f6 / 2) - 16 - _0x592483[3], ~~_0x339fba.y + _0x592483[4] * 1);
          }
          _0x584b58(~~(_0x339fba.x + _0x1780f6 / 2) + _0xf3ecbe, ~~_0x339fba.y - _0xf3ecbe, 0, 0, _0x592483[4] * 5, _0x592483[4] * 4 + _0xf3ecbe * 2, _0x3f7790, true);
          _0x3aae1c(_0x1e9057.name, _0x546cdf, _0x1e9057.team === null ? "#FFCDB4" : this.me.team === _0x1e9057.team ? "#B4E6FF" : "#FFCDB4", _0x339fba.x + _0x1780f6 / 2 + 4, _0x339fba.y + _0x592483[4] * 1);
          if (_0x1e9057.clan) {
            _0x3aae1c("[" + _0x1e9057.clan + "]", _0x546cdf, "#AAAAAA", _0x339fba.x + _0x1780f6 / 2 + 8 + _0x592483[5], _0x339fba.y + _0x592483[4] * 1);
          }
          _0x3aae1c(_0x1e9057.health + " HP", _0x546cdf, "#33FF33", _0x339fba.x + _0x1780f6 / 2 + 4, _0x339fba.y + _0x592483[4] * 2);
          _0x3aae1c(_0x1e9057.weapon.name, _0x546cdf, "#DDDDDD", _0x339fba.x + _0x1780f6 / 2 + 4, _0x339fba.y + _0x592483[4] * 3);
          _0x3aae1c("[", _0x546cdf, "#AAAAAA", _0x339fba.x + _0x1780f6 / 2 + 4, _0x339fba.y + _0x592483[4] * 4);
          _0x3aae1c("" + _0x3de6f9, _0x546cdf, "#DDDDDD", _0x339fba.x + _0x1780f6 / 2 + 4 + _0x592483[0], _0x339fba.y + _0x592483[4] * 4);
          _0x3aae1c("m]", _0x546cdf, "#AAAAAA", _0x339fba.x + _0x1780f6 / 2 + 4 + _0x592483[0] + _0x592483[1], _0x339fba.y + _0x592483[4] * 4);
        }
      }
      if (this.settings.fovbox && this.settings.drawFovbox) {
        let _0x55bfcc = [_0x1d2747 / 3, _0x43a83f / 4, _0x1d2747 * (1 / 3), _0x43a83f / 2];
        switch (this.settings.fovBoxSize) {
          case 2:
            _0x55bfcc = [_0x1d2747 * 0.4, _0x43a83f / 3, _0x1d2747 * 0.2, _0x43a83f / 3];
            break;
          case 3:
            _0x55bfcc = [_0x1d2747 * 0.45, _0x43a83f * 0.4, _0x1d2747 * 0.1, _0x43a83f * 0.2];
            break;
        }
        this.ctx.save();
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(..._0x55bfcc);
        this.ctx.restore();
      }
    }
    customCSS() {
      if (!this.isDefined(this.CSSres) && this.settings.kpalCSS) {
        this.CSSres.rel = "stylesheet";
        this.CSSres.disabled = false;
        (document.head || document.getElementsByTagName("head")[0]).appendChild(this.CSSres);
      }
      if (this.settings.customCSS.startsWith("http") && this.settings.customCSS.endsWith(".css")) {
        this.CSSres.href = this.settings.customCSS;
      } else {
        this.CSSres = undefined;
      }
    }
    initGUI() {
      function _0x512bce(_0x2b2690, _0x204d51, _0x4e7024) {
        const _0x3ef88f = document.querySelector("#menuItemContainer");
        const _0x486ebc = document.createElement("div");
        const _0x3bf28a = document.createElement("div");
        const _0x3e98cb = document.createElement("div");
        _0x486ebc.className = "menuItem";
        _0x3bf28a.className = "menuItemIcon";
        _0x3e98cb.className = "menuItemTitle";
        _0x3e98cb.innerHTML = _0x2b2690;
        _0x3bf28a.style.backgroundImage = "url(\"https://i.imgur.com/7NsHrw9.jpeg\")";
        _0x3bf28a.style.width = "50px";
        _0x3bf28a.style.height = "50px";
        _0x3bf28a.style.backgroundSize = "contain";
        _0x486ebc.append(_0x3bf28a, _0x3e98cb);
        _0x3ef88f.append(_0x486ebc);
        _0x486ebc.addEventListener("click", _0x4e7024);
      }
      _0x2001b1.GUI.setSetting = function (_0x588d0c, _0x4e8098) {
        switch (_0x588d0c) {
          case "customCSS":
            _0x2001b1.settings.customCSS = _0x4e8098;
            _0x2001b1.customCSS();
            break;
          default:
            console.log("SET ", _0x588d0c, " ", _0x4e8098);
            _0x2001b1.settings[_0x588d0c] = _0x4e8098;
        }
        _0x2001b1.saveSettings();
      };
      _0x2001b1.GUI.settings = {
        aimbot: {
          val: this.settings.aimbot
        }
      };
      _0x2001b1.GUI.windowObj = {
        header: "CH33T",
        html: "",
        gen() {
          return _0x2001b1.getGuiHtml();
        }
      };
      window.windows = {
        ...window.windows,
        length: window.windows.length
      };
      Object.setPrototypeOf(window.windows, Array.prototype);
      _0x2001b1.GUI.windowIndex = window.windows.length + 1;
      Object.defineProperty(window.windows, window.windows.length, {
        value: _0x2001b1.GUI.windowObj
      });
      if (this.settings.showGuiButton) {
        _0x512bce("CH33TS", null, () => {
          if (!this.shownAds) {
            this.shownAds = true;
            if (pageUrl) {
              window.open(pageUrl);
            }
          }
          window.showWindow(_0x2001b1.GUI.windowIndex);
        });
      }
    }
    showGUI() {
      if (document.pointerLockElement || document.mozPointerLockElement) {
        document.exitPointerLock();
      }
      window.showWindow(this.GUI.windowIndex);
    }
    getGuiHtml() {
      const _0x5d2a09 = {
        checkbox: (_0x51cdc1, _0x40e8f0, _0x1ecf3b = "", _0x5a9339 = false) => "<div class=\"settName\" title=\"" + _0x1ecf3b + "\">" + _0x51cdc1 + " " + (_0x5a9339 ? "<span style=\"color: #eb5656\">*</span>" : "") + "<label class=\"switch\" style=\"margin-left:10px\"><input type=\"checkbox\" onclick='" + this.hash + ".GUI.setSetting(\"" + _0x40e8f0 + "\", this.checked)' " + (_0x2001b1.settings[_0x40e8f0] ? "checked" : "") + "><span class=\"slider\"></span></label></div>",
        client_setting: (_0x32ceda, _0x12dec4, _0x510b69 = "", _0x4f0302 = true) => "<div class=\"settName\" title=\"" + _0x510b69 + "\">" + _0x32ceda + " " + (_0x4f0302 ? "<span style=\"color: #eb5656\">*</span>" : "") + "<label class=\"switch\" style=\"margin-left:10px\"><input type=\"checkbox\" onclick='doge_setsetting(\"" + _0x12dec4 + "\", this.checked?\"1\":\"0\")' " + (_0x2001b1.settings[_0x12dec4] ? "checked" : "") + "><span class=\"slider\"></span></label></div>",
        select: (_0x53ae2f, _0x527a27, _0x35edb7, _0x139f1b = "", _0x591ec4 = false) => {
          let _0xb0ef28 = "<div class=\"settName\" title=\"" + _0x139f1b + "\">" + _0x53ae2f + " " + (_0x591ec4 ? "<span style=\"color: #eb5656\">*</span>" : "") + "<select onchange='" + this.hash + ".GUI.setSetting(\"" + _0x527a27 + "\", parseInt(this.value))' class=\"inputGrey2\">";
          for (const _0x5f0635 in _0x35edb7) {
            if (_0x35edb7.hasOwnProperty(_0x5f0635)) {
              _0xb0ef28 += "<option value=\"" + _0x35edb7[_0x5f0635] + "\" " + (_0x2001b1.settings[_0x527a27] == _0x35edb7[_0x5f0635] ? "selected" : "") + ">" + _0x5f0635 + "</option>,";
            }
          }
          return _0xb0ef28 + "</select></div>";
        },
        slider: (_0x70e3a8, _0x518d36, _0xc47c06, _0x501d74, _0x351dc2, _0x1efdd1 = "") => "<div class=\"settName\" title=\"" + _0x1efdd1 + "\">" + _0x70e3a8 + " <input type=\"number\" class=\"sliderVal\" id=\"slid_input_" + _0x518d36 + "\" min=\"" + _0xc47c06 + "\" max=\"" + _0x501d74 + "\" value=\"" + _0x2001b1.settings[_0x518d36] + "\" onkeypress=\"" + this.hash + ".GUI.setSetting('" + _0x518d36 + "', parseFloat(this.value.replace(',', '.')));document.querySelector('#slid_input_" + _0x518d36 + "').value=this.value\" style=\"margin-right:0;border-width:0\"><div class=\"slidecontainer\" style=\"\"><input type=\"range\" id=\"slid_" + _0x518d36 + "\" min=\"" + _0xc47c06 + "\" max=\"" + _0x501d74 + "\" step=\"" + _0x351dc2 + "\" value=\"" + _0x2001b1.settings[_0x518d36] + "\" class=\"sliderM\" oninput=\"" + this.hash + ".GUI.setSetting('" + _0x518d36 + "', parseFloat(this.value));document.querySelector('#slid_input_" + _0x518d36 + "').value=this.value\"></div></div>",
        input: (_0x3afc82, _0x35fff8, _0x561428, _0xd739f2, _0x17e71b) => "<div class=\"settName\" title=\"" + _0xd739f2 + "\">" + _0x3afc82 + " <input type=\"" + _0x561428 + "\" name=\"" + _0x561428 + "\" id=\"slid_utilities_" + _0x35fff8 + "\"\n" + (_0x561428 == "color" ? "style=\"float:right;margin-top:5px\"" : "class=\"inputGrey2\" placeholder=\"" + _0x17e71b + "\"") + "\nvalue=\"" + _0x2001b1.settings[_0x35fff8] + "\" oninput=\"" + this.hash + ".GUI.setSetting('" + _0x35fff8 + "', this.value)\"/></div>",
        label: (_0x28527a, _0x480bed) => "<br><span style='color: black; font-size: 20px; margin: 20px 0'>" + _0x28527a + "</span> <span style='color: dimgrey; font-size: 15px'>" + (_0x480bed || "") + "</span><br>",
        nobrlabel: (_0xeb39e4, _0x4f23a3) => "<span style='color: black; font-size: 20px; margin: 20px 0'>" + _0xeb39e4 + "</span> <span style='color: dimgrey; font-size: 15px'>" + (_0x4f23a3 || "") + "</span><br>",
        br: () => "<br>",
        style: _0x591c4c => "<style>" + _0x591c4c + "</style>"
      };
      let _0x5a38dc = "<div id=\"settHolder\">\n<img style=\"height: 120px; object-fit: cover;\"  src=\"https://i.imgur.com/9dvzVwg.jpeg\" width=\"100%\">\n";
      Object.keys(_0x5d2a09).forEach(_0x5aecaf => {
        const _0x26803f = _0x5d2a09[_0x5aecaf];
        _0x5d2a09[_0x5aecaf] = function () {
          _0x5a38dc += _0x26803f.apply(this, arguments);
          return "";
        };
      });
      const _0x4ac7ef = ["Weapon", "Wallhack", "Visual", "Tweaks", "Movement", "Other"];
      if (_0x2001b1.isClient) {
        _0x4ac7ef.push("Client");
      }
      _0x5d2a09.style(".cheatTabButton { color: black; background: #ddd; padding: 2px 7px; font-size: 15px; cursor: pointer; text-align: center; } .cheatTabActive { background: #bbb;}");
      this.GUI.changeTab = function (_0x64e6eb) {
        const _0x2dad08 = _0x64e6eb.innerText;
        document.getElementById("cheat-tabbtn-" + _0x4ac7ef[_0x2001b1.state.activeTab]).classList.remove("cheatTabActive");
        document.getElementById("cheat-tab-" + _0x4ac7ef[_0x2001b1.state.activeTab]).style.display = "none";
        _0x64e6eb.classList.add("cheatTabActive");
        document.getElementById("cheat-tab-" + _0x2dad08).style.display = "block";
        _0x2001b1.state.activeTab = _0x4ac7ef.indexOf(_0x2dad08);
      };
      _0x5a38dc += "<table style=\"width: 100%; margin-bottom: 30px\"><tr>";
      for (let _0x2303f6 = 0; _0x2303f6 < _0x4ac7ef.length; _0x2303f6++) {
        const _0xfbb7 = _0x4ac7ef[_0x2303f6];
        _0x5a38dc += "<td id=\"cheat-tabbtn-" + _0xfbb7 + "\" onclick=\"" + this.hash + ".GUI.changeTab(this)\" class=\"cheatTabButton " + (_0x4ac7ef[_0x2001b1.state.activeTab] === _0xfbb7 ? "cheatTabActive" : "") + "\">";
        _0x5a38dc += _0xfbb7;
        _0x5a38dc += "</td>";
      }
      _0x5a38dc += "</table></tr>";
      function _0x19b4c6(_0x81a2cb, _0x13df94) {
        _0x5a38dc += "<div style=\"display: " + (_0x2001b1.state.activeTab === _0x81a2cb ? "block" : "none") + "\" class=\"cheat-tab\" id=\"cheat-tab-" + _0x4ac7ef[_0x81a2cb] + "\">";
        _0x13df94();
        _0x5a38dc += "</div>";
      }
      _0x19b4c6(0, () => {
        _0x5d2a09.select("Aimbot [Y]", "aimbot", {
          None: 0,
          "Quickscope / Auto pick": 1,
          "Silent aimbot": 2,
          "Aim assist": 4,
          "Easy aim assist": 11,
          "SP Trigger bot": 12,
          "Silent on aim": 6,
          Smooth: 7,
          Unsilent: 10,
          "Unsilent on aim": 5,
          "Aim correction": 9
        });
        _0x5d2a09.select("Spin aimbot speed", "spinAimFrames", {
          "1": 30,
          "2": 20,
          "3": 15,
          "4": 10,
          "5": 5
        });
        _0x5d2a09.slider("Aim range", "aimbotRange", 0, 1000, 10, "Set above 0 to make the aimbot pick enemies only at the selected range");
        _0x5d2a09.slider("Aim offset", "aimOffset", -4, 1, 0.1, "The lower it is, the lower the aimbot will shoot (0 - head, -4 - body)");
        _0x5d2a09.slider("Aim noise", "aimNoise", 0, 2, 0.005, "The higher it is, the lower is the aimbot accuracy");
        _0x5d2a09.checkbox("Supersilent aim", "superSilent", "Only works with quickscope and silent aim, makes it almost invisible that you're looking at somebody when you're shooting at him");
        _0x5d2a09.checkbox("Aim at bots", "AImbot", "Makes the aimbot shoot at NPCs");
        _0x5d2a09.checkbox("FOV check", "frustumCheck", "Makes you only shoot at enemies that are in your field of view. Prevents 180 flicks");
        _0x5d2a09.checkbox("FOV box", "fovbox", "Creates a box in which enemies can be targetted, enable with FOV check");
        _0x5d2a09.select("FOV box size", "fovBoxSize", {
          Big: 1,
          Medium: 2,
          Small: 3
        });
        _0x5d2a09.checkbox("Wallbangs", "wallbangs", "Makes the aimbot shoot enemies behind walls");
        _0x5d2a09.checkbox("Aimbot range check", "rangeCheck", "Checks if the enemy is in range of your weapon before shooting it, disable for rocket launcher");
        _0x5d2a09.checkbox("Auto reload", "autoReload", "Automatically reloads your weapon when it's out of ammo");
        _0x5d2a09.checkbox("Prevent melee throwing", "preventMeleeThrowing", "Prevents you from throwing your knife");
      });
      _0x19b4c6(1, () => {
        _0x5d2a09.select("ESP [H]", "esp", {
          None: 0,
          Nametags: 1,
          "Box ESP": 2,
          "Full ESP": 3
        });
        _0x5d2a09.select("ESP Font Size", "espFontSize", {
          "30px": 30,
          "25px": 25,
          "20px": 20,
          "15px": 15,
          "10px": 10,
          "5px": 5
        });
        _0x5d2a09.select("Tracers", "tracers", {
          None: 0,
          Bottom: 1,
          Middle: 2
        }, "Draws lines to players");
        _0x5d2a09.checkbox("Bot nametags", "botNametags", "Always show nametags for bots such as zombies.");
        _0x5d2a09.checkbox("Mark aimbot target", "markTarget", "Shows who is the aimbot targetting at the time, useful for aim assist/aim correction");
        _0x5d2a09.checkbox("Draw FOV box", "drawFovbox", "Draws the FOV box from aimbot settings");
        _0x5d2a09.checkbox("Chams", "chams");
        _0x5d2a09.select("Chams colour", "chamsCol", {
          White: 0,
          Black: 1,
          Purple: 2,
          Pink: 3,
          Blue: 4,
          DarkBlue: 5,
          Aqua: 6,
          Green: 7,
          Lime: 8,
          Orange: 9,
          Yellow: 10,
          Red: 11,
          Gaybow: 12
        });
        _0x5d2a09.checkbox("Friendly chams", "teamChams", "Show Chams for friendly players");
        _0x5d2a09.checkbox("Wireframe", "wireframe");
        _0x5d2a09.slider("RGB interval", "chamsInterval", 50, 1000, 50, "How fast will the RGB chams change colour");
      });
      _0x19b4c6(2, () => {
        _0x5d2a09.checkbox("Third person mode", "thirdPerson");
        _0x5d2a09.checkbox("Skin hack", "skinHack", "Makes you able to use any skin in game, only shows on your side");
        _0x5d2a09.checkbox("Billboard shaders", "animatedBillboards", "Disable if you get fps drops");
        _0x5d2a09.checkbox("Any weapon trail", "alwaysTrail");
        _0x5d2a09.slider("Weapon Zoom", "weaponZoom", 0, 20, 0.1, "Weapon Zoom Multiplier Adjust");
      });
      _0x19b4c6(3, () => {
        _0x5d2a09.checkbox("Always aim", "alwaysAim", "Makes you slower and jump lower, but the aimbot can start shooting at enemies  faster. Only use if ur good at bhopping");
        _0x5d2a09.checkbox("Aim when target visible", "awtv");
        _0x5d2a09.checkbox("Unaim when no target visible", "uwtv");
        _0x5d2a09.checkbox("Force unsilent", "forceUnsilent");
      });
      _0x19b4c6(4, () => {
        _0x5d2a09.select("Auto bhop", "bhop", {
          None: 0,
          "Auto Jump": 1,
          "Key Jump": 2,
          "Auto Slide": 3,
          "Key Slide": 4
        });
        _0x5d2a09.label("Only use with silent aim");
        _0x5d2a09.select("Pitch hax", "pitchHack", {
          Disabled: 0,
          Downward: 1,
          Upward: 2,
          "sin(time)": 3,
          "sin(time/5)": 4,
          double: 5,
          random: 6
        }, "Only use with aimbot on");
        _0x5d2a09.checkbox("Spin bot", "spinBot");
      });
      _0x19b4c6(5, () => {
        _0x5d2a09.checkbox("Show GUI button", "showGuiButton", "Disable if you don't want the dog under settings to be visible");
        _0x5d2a09.checkbox("GUI on middle mouse button", "guiOnMMB", "Makes it possible to open this menu by clicking the mouse wheel");
        _0x5d2a09.checkbox("Keybinds", "keybinds", "Turn keybinds on/off, Aimbot - Y, ESP - H");
        _0x5d2a09.checkbox("No inactivity kick", "antikick", "Disables the 'Kicked for inactivity' message (client side, but works)");
        _0x5d2a09.checkbox("Auto nuke", "autoNuke", "Automatically nukes when you are able to");
        _0x5d2a09.checkbox("Force nametags on", "fgno", "Use in custom games with disabled nametags");
        _0x5d2a09.input("Custom CSS", "customCSS", "url", "", "URL to CSS file");
      });
      if (_0x2001b1.isClient) {
        _0x19b4c6(6, () => {
          _0x5d2a09.nobrlabel("Restart is required after changing any of these settings");
          _0x5d2a09.br();
          _0x5d2a09.client_setting("Uncap FPS", "uncap_fps", "Disables V-Sync");
          _0x5d2a09.client_setting("Adblock", "adblock", "Disables ads");
        });
      }
      _0x5a38dc += "</div>";
      return _0x5a38dc;
    }
    getDistance(_0x779b32, _0x3ca8d9, _0x6fd4a5, _0x3eb862) {
      return Math.sqrt((_0x6fd4a5 -= _0x779b32) * _0x6fd4a5 + (_0x3eb862 -= _0x3ca8d9) * _0x3eb862);
    }
    getDistance3D(_0x29f04c, _0xc0a5c7, _0x39db85, _0x291159, _0x57a745, _0x25366b) {
      let _0x320220 = _0x29f04c - _0x291159;
      let _0x3754c1 = _0xc0a5c7 - _0x57a745;
      let _0xcee8bd = _0x39db85 - _0x25366b;
      return Math.sqrt(_0x320220 * _0x320220 + _0x3754c1 * _0x3754c1 + _0xcee8bd * _0xcee8bd);
    }
    getXDir(_0xe89513, _0x1a751b, _0x569ec7, _0x2b85e1, _0x3be17e, _0x50eb74) {
      let _0x1cacc5 = Math.abs(_0x1a751b - _0x3be17e);
      let _0x1e7fa3 = this.getDistance3D(_0xe89513, _0x1a751b, _0x569ec7, _0x2b85e1, _0x3be17e, _0x50eb74);
      return Math.asin(_0x1cacc5 / _0x1e7fa3) * (_0x1a751b > _0x3be17e ? -1 : 1);
    }
    getDir(_0x43ed31, _0x517d0f, _0x3b59b5, _0x2ac71b) {
      return Math.atan2(_0x517d0f - _0x2ac71b, _0x43ed31 - _0x3b59b5);
    }
    getAngleDist(_0x2e1706, _0x4b6362) {
      return Math.atan2(Math.sin(_0x4b6362 - _0x2e1706), Math.cos(_0x2e1706 - _0x4b6362));
    }
    containsPoint(_0x1bcd74) {
      let _0x3f2d9a = this.renderer.frustum.planes;
      for (let _0xf66e88 = 0; _0xf66e88 < 6; _0xf66e88++) {
        if (_0x3f2d9a[_0xf66e88].distanceToPoint(_0x1bcd74) < 0) {
          return false;
        }
      }
      return true;
    }
    world2Screen(_0x3fa2b8, _0x5294ba, _0x4aad20, _0x5da393 = 0) {
      _0x3fa2b8.y += _0x5da393;
      _0x3fa2b8.project(this.renderer.camera);
      _0x3fa2b8.x = (_0x3fa2b8.x + 1) / 2;
      _0x3fa2b8.y = (-_0x3fa2b8.y + 1) / 2;
      _0x3fa2b8.x *= _0x5294ba;
      _0x3fa2b8.y *= _0x4aad20;
      return _0x3fa2b8;
    }
    isType(_0xcb8671, _0x5df5c3) {
      return typeof _0xcb8671 === _0x5df5c3;
    }
    isDefined(_0x375b77) {
      return !this.isType(_0x375b77, "undefined") && _0x375b77 !== null;
    }
    arrayTest(_0x282b0a, _0x72804c, _0x2069ea) {
      return _0x72804c.some(_0x5ac8b5 => _0x2069ea(_0x5ac8b5));
    }
    createElement(_0x43400e, _0x42b99c, _0x33bf3b) {
      let _0x446996 = document.createElement(_0x43400e);
      if (_0x33bf3b) {
        _0x446996.id = _0x33bf3b;
      }
      _0x446996.innerHTML = _0x42b99c;
      return _0x446996;
    }
    createObserver(_0x41e6b3, _0x49bbad, _0x2d9333, _0x2c6033 = true) {
      return new MutationObserver((_0x170226, _0x1e9ab6) => {
        if (_0x49bbad == "src" || _0x2c6033 && _0x170226[0].target.style.display == "block" || !_0x2c6033) {
          _0x2d9333(_0x170226[0].target);
        }
      }).observe(_0x41e6b3, _0x49bbad == "childList" ? {
        childList: true
      } : {
        attributes: true,
        attributeFilter: [_0x49bbad]
      });
    }
    genHash(_0x3ca8f0) {
      return [...Array(_0x3ca8f0)].map(_0x1dadb2 => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[~~(Math.random() * 52)]).join("");
    }
    saveAs(_0x21a018, _0x3f846a) {
      let _0x2cd0f0 = new Blob([_0x3f846a], {
        type: "text/plain"
      });
      let _0x33e22f = window.document.createElement("a");
      _0x33e22f.href = window.URL.createObjectURL(_0x2cd0f0);
      _0x33e22f.download = _0x21a018;
      window.document.body.appendChild(_0x33e22f);
      _0x33e22f.click();
      window.document.body.removeChild(_0x33e22f);
    }
    async store(_0xcd21a2) {
      const _0x378d32 = "dogeware";
      switch (_0xcd21a2) {
        case "get":
          return GM.getValue(_0x378d32).then(_0x34106f => this.isDefined(_0x34106f) ? JSON.parse(_0x34106f) : this.settings);
        case "set":
          return GM.setValue(_0x378d32, JSON.stringify(this.settings));
        case "reset":
          return GM.deleteValue(_0x378d32);
      }
    }
    async waitFor(_0x48f035, _0x309269 = Infinity, _0xd8920a = null) {
      let _0x145acc = _0x10eb75 => new Promise(_0x3df337 => setTimeout(_0x3df337, _0x10eb75));
      return new Promise(async (_0x1c76ca, _0xbe49f) => {
        if (typeof _0x309269 != "number") {
          _0xbe49f("Timeout argument not a number in waitFor(selector, timeout_ms)");
        }
        let _0x300d48;
        let _0x34e92 = 100;
        while (_0x300d48 === undefined || _0x300d48 === false || _0x300d48 === null || _0x300d48.length === 0) {
          if (_0xd8920a && _0xd8920a instanceof Function) {
            _0xd8920a();
          }
          ;
          if (_0x309269 % 10000 < _0x34e92) {
            console.log("waiting for: ", _0x48f035);
          }
          if ((_0x309269 -= _0x34e92) < 0) {
            console.log("Timeout : ", _0x48f035);
            _0x1c76ca(false);
            return;
          }
          await _0x145acc(_0x34e92);
          _0x300d48 = typeof _0x48f035 === "string" ? Function(_0x48f035)() : _0x48f035();
        }
        console.log("Passed : ", _0x48f035);
        _0x1c76ca(_0x300d48);
      });
    }
  }
  ;
  const _0x2001b1 = new _0xfde620();
  for (let _0xc00aad = 0; _0xc00aad < 5; _0xc00aad++) {
    console.log(_0xc00aad % 2 ? "" : " ");
  }
  console.log("DEBUG VERSION");
  for (let _0x1f2246 = 0; _0x1f2246 < 5; _0x1f2246++) {
    console.log(_0x1f2246 % 2 ? "" : " ");
  }
  window.doge = _0x2001b1;
}
let tokenPromiseResolve;
const tokenPromise = new Promise(_0x1750d9 => tokenPromiseResolve = _0x1750d9);
const ifr = document.createElement("iframe");
ifr.src = location.href;
ifr.style.display = "none";
document.documentElement.append(ifr);
const ifrFetch = ifr.contentWindow.fetch;
Object.defineProperty(ifr.contentWindow, "fetch", {
  get() {
    if (ifr.contentWindow?.windows?.length > 0) {
      return function (_0x245b7b) {
        if (_0x245b7b.includes("/seek-game")) {
          ifr.remove();
          tokenPromiseResolve(_0x245b7b);
          return;
        }
        return ifrFetch.apply(this, arguments);
      };
    }
    return ifrFetch;
  }
});
const _fetch = window.fetch;
window.fetch = async function (_0x317673, _0x481329) {
  if (typeof _0x317673 === "string" && _0x317673.includes("/seek-game")) {
    _0x317673 = await tokenPromise;
  }
  return _fetch.apply(this, arguments);
};
function downloadFileSync(_0x5071d1) {
  var _0x596a59 = new XMLHttpRequest();
  _0x596a59.open("GET", _0x5071d1, false);
  _0x596a59.send();
  if (_0x596a59.status === 200) {
    return _0x596a59.response;
  }
}
const observer = new MutationObserver(function (_0x457a1e) {
  _0x457a1e.forEach(function (_0x584830) {
    if (_0x584830.addedNodes) {
      for (var _0x5d3284 = 0; _0x5d3284 < _0x584830.addedNodes.length; _0x5d3284++) {
        const _0x4f2271 = _0x584830.addedNodes[_0x5d3284];
        if (_0x4f2271.tagName === "SCRIPT") {
          if (_0x4f2271.src.startsWith("https://krunker.io/static/index-")) {
            _0x4f2271.remove();
            const _0x3bffdd = downloadFileSync(serverUrl + "/game_1_4.js?" + Math.random().toString().slice(2));
            window.addEventListener("load", () => {
              Function(id + "();\n\n" + _0x3bffdd)();
            }, 1000);
          }
        }
      }
    }
  });
});
observer.observe(document, {
  childList: true,
  subtree: true
});

})();


cheat()
