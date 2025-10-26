// Used to hook the Scene function for ev.io
// hook.js
(() => {
  // PUBLIC API object
  const EV = {
    // state (defaults)
    state: {
      espEnabled: true,
      aimbotEnabled: true,
      espSize: 1,
      aimbotFOV: 150,
      rightClickAimbot: true
    },
    // promise that resolves once worldScene + camera are discovered
    ready: null,
    // functions menu will call
    set(key, value) {
      if (key in EV.state) EV.state[key] = value;
    },
    get(key) { return EV.state[key]; },
    showMenu() {
      // menu.js will override this to actually display UI; fallback noop
      console.warn('EV.showMenu not implemented yet');
    }
  };

  // attach to window early so menu.js can access fast
  window.EV = EV;

  // create ready promise that resolves when scene & camera are found
  let readyResolve;
  EV.ready = new Promise(resolve => { readyResolve = resolve; });

  // --- hook internals (your original code, adapted to use EV.state) ---
  const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 2, 1).translate(0, 1, 0));
  const material = new THREE.RawShaderMaterial({
      vertexShader: `attribute vec3 position; uniform mat4 projectionMatrix; uniform mat4 modelViewMatrix; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = 1.0; }`,
      fragmentShader: `void main(){ gl_FragColor = vec4(1.0,0.0,0.0,1.0); }`
  });

  let worldScene = null;
  let myCamera = null;
  const precision = Math.pow(10,4);
  function createKey(object){ return Math.round(precision*object.position.x) + ',' + Math.round(precision*object.position.z); }

  function findHeadBone(player) {
    for (let j = 0; j < player.children.length; j++) {
      const child = player.children[j].children && player.children[j].children[0];
      if (child && child.isSkinnedMesh) {
        const bones = child.skeleton.bones;
        for (let k = 0; k < bones.length; k++) {
          const bone = bones[k];
          if (bone.name && bone.name.indexOf('Head') > -1) return bone;
        }
      }
    }
    return null;
  }

  // overlay canvas
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
  overlayCanvas.style.position = 'absolute';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.pointerEvents = 'none';
  overlayCanvas.style.zIndex = '999999';
  document.body.appendChild(overlayCanvas);
  const overlayCtx = overlayCanvas.getContext('2d');

  const canvas = document.getElementById('canvas') || document.querySelector('canvas');

  // try to detect Scene via WeakMap.set proxy (your original method)
  const originalWeakSet = WeakMap.prototype.set;
  WeakMap.prototype.set = new Proxy(WeakMap.prototype.set, {
    apply(target, thisArgs, args) {
      try {
        const object = args[0];
        if (object && object.type === 'Scene' && object.children && object.children.length > 4) {
          worldScene = object;
          console.log('SCENE FOUND!', worldScene);
        }
      } catch (e) {}
      return Reflect.apply(target, thisArgs, args);
    }
  });

  // fallback poll in case proxy doesn't catch it quickly
  const pollInterval = setInterval(() => {
    if (worldScene) return;
    // attempt common global names
    for (const k of Object.keys(window)) {
      try {
        const v = window[k];
        if (v && v.type === 'Scene' && v.children && v.children.length > 4) {
          worldScene = v;
          console.log('SCENE FOUND via window.' + k, worldScene);
          break;
        }
      } catch (e) {}
    }
  }, 750);

  // animate loop reused by patching rAF. We'll call animate() after each frame from requestAnimationFrame proxy.
  const p = new THREE.Vector3();

  function animate() {
    // draw fov circle
    overlayCtx.clearRect(0,0,overlayCanvas.width, overlayCanvas.height);
    overlayCtx.beginPath();
    overlayCtx.arc(overlayCanvas.width/2, overlayCanvas.height/2, EV.state.aimbotFOV, 0, Math.PI*2);
    overlayCtx.strokeStyle = 'rgba(255,0,0,0.5)';
    overlayCtx.lineWidth = 2;
    overlayCtx.stroke();

    if (!worldScene) return;

    myCamera = myCamera || Array.from(worldScene.children).find(c => c.type === 'PerspectiveCamera');

    const spriteMap = {};
    const players = [];

    // scan children (same as your code)
    for (let i = 0; i < worldScene.children.length; i++) {
      const child = worldScene.children[i];
      if (child.type === 'PerspectiveCamera') myCamera = child;
      else if (child.type === 'Sprite') {
        try {
          if (child.material && child.material.map && child.material.map.image && child.material.map.image.className === 'canvas_healthbar') {
            child.isEnemy = child.material.depthTest === true;
            spriteMap[createKey(child)] = child;
          }
        } catch (err) {}
      } else if (child.name !== '' && child.type === 'Group' && child.visible) {
        if (child.headBone === undefined) child.headBone = findHeadBone(child);
        if (child.headBone) players.push(child);
      }
    }

    let targetPlayer = null;
    let minDistance = Infinity;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      p.setScalar(0).applyMatrix4(player.headBone.matrixWorld);
      player.isAlive = Math.hypot(p.x - player.position.x, p.z - player.position.z) < 1;

      if (!player.myBox) {
        player.myBox = new THREE.LineSegments(geometry, material);
        player.add(player.myBox);
      }
      player.myBox.scale.setScalar(EV.state.espSize);
      if (!player.sprite || player.sprite.parent !== worldScene) {
        player.sprite = spriteMap[createKey(player)];
      }
      player.myBox.visible = player.isAlive && (player.sprite ? player.sprite.isEnemy : true);

      if (player.myBox.visible) {
        const d = player.position.distanceTo(myCamera.position);
        const screenPos = player.headBone.position.clone();
        screenPos.applyMatrix4(player.headBone.matrixWorld);
        const vector = screenPos.project(myCamera);
        const x = (vector.x + 1) / 2 * overlayCanvas.width;
        const y = (-vector.y + 1) / 2 * overlayCanvas.height;
        const distToCenter = Math.hypot(x - overlayCanvas.width/2, y - overlayCanvas.height/2);

        if (d < minDistance && distToCenter <= EV.state.aimbotFOV) {
          targetPlayer = player;
          minDistance = d;
        }
      }
      player.myBox.visible &&= EV.state.espEnabled;
    }

    // simple aimbot rotate camera to target
    if (EV.state.aimbotEnabled && targetPlayer && myCamera) {
      const yaw = myCamera.rotation.y;
      const pitch = myCamera.rotation.x;
      myCamera.rotation.order = 'YXZ';
      myCamera.lookAt(targetPlayer.position.x, targetPlayer.position.y + 1.5, targetPlayer.position.z);

      // dispatch move event to game canvas
      if (window.mouseRightDown) {
        canvas?.dispatchEvent(new MouseEvent('mousemove', {
          movementX: (yaw - myCamera.rotation.y) * 500,
          movementY: (pitch - myCamera.rotation.x) * 500
        }));
      } else {
        canvas?.dispatchEvent(new MouseEvent('mousemove', {
          movementX: (yaw - myCamera.rotation.y) * 500,
          movementY: (pitch - myCamera.rotation.x) * 500
        }));
      }
    }
  }

  // mouse right button state used by aimbot
  window.mouseRightDown = false;
  window.addEventListener('mousedown', e => { if (e.button === 2) window.mouseRightDown = true; });
  window.addEventListener('mouseup',   e => { if (e.button === 2) window.mouseRightDown = false; });

  // patch requestAnimationFrame to call animate each frame (non-intrusive)
  const origRAF = window.requestAnimationFrame;
  window.requestAnimationFrame = new Proxy(origRAF, {
    apply(target, thisArgs, args) {
      // wrap the user callback so original behavior remains and we call animate after
      const originalCb = args[0];
      const wrapped = function(time) {
        try { originalCb && originalCb(time); } catch (e) { console.error(e); }
        try { animate(); } catch (e) { /* animate errors shouldn't break game */ }
      };
      return Reflect.apply(target, thisArgs, [wrapped]);
    }
  });

  // resolve ready when we have scene + camera
  const readyChecker = setInterval(() => {
    if (worldScene && (Array.from(worldScene.children).some(c => c.type === 'PerspectiveCamera'))) {
      clearInterval(readyChecker);
      clearInterval(pollInterval);
      readyResolve();
      console.log('EV ready');
    }
  }, 300);

  // expose a debug show function for menu if needed
  EV._internal = {
    animate,
    getWorldScene: () => worldScene
  };

  // finished hook.js
})();
