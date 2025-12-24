if(!window.Swal){
  const s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(s);
}

let espEnabled = true;
let aimbotEnabled = true;
let espSize = 1;
let aimbotFOV = 150; 
let rightClickAimbot = true; 

const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 2, 1).translate(0, 1, 0));
const material = new THREE.RawShaderMaterial({
    vertexShader: `
    attribute vec3 position;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = 1.0;
    }`,
    fragmentShader: `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`
});

let worldScene = window.worldScene || null;

if (!worldScene) {
    localStorage.setItem('ev.io-hook-failed','true');
    Swal.fire({
  icon:'error',
  title:'Hook not initialized',
  html:'If you are using the <b>bookmarklet</b> version, refresh the page and open Executor as fast as possible.<br><br>If you are using the <b>Tampermonkey</b> or <b>Extension</b> version, please report this bug on the Discord or GitHub or try again by refreshing the page.'
});
    WeakMap.prototype.set = new Proxy(WeakMap.prototype.set, {
        apply(target, thisArgs, [object]) {
            if (object.type === 'Scene' && object.children.length > 4) {
                worldScene = object;
                window.worldScene = object;
                console.log('[ESP] SCENE FOUND!', worldScene);
            }
            return Reflect.apply(...arguments);
        }
    });
} else {
    console.log('[ESP] Using pre-hooked scene!', worldScene);
}

const precision = Math.pow(10, 4);
function createKey(object) {
    return Math.round(precision * object.position.x) + ',' + Math.round(precision * object.position.z);
}

function findHeadBone(player) {
    for (let j = 0; j < player.children.length; j++) {
        const child = player.children[j].children[0];
        if (child && child.isSkinnedMesh) {
            const bones = child.skeleton.bones;
            for (let k = 0; k < bones.length; k++) {
                const bone = bones[k];
                if (bone.name.indexOf('Head') > -1) return bone;
            }
        }
    }
    return null;
}

const canvas = document.getElementById('canvas');
const p = new THREE.Vector3();

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

function animate() {
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    overlayCtx.beginPath();
    overlayCtx.arc(overlayCanvas.width / 2, overlayCanvas.height / 2, aimbotFOV, 0, Math.PI * 2);
    overlayCtx.strokeStyle = 'rgba(255,0,0,0.5)';
    overlayCtx.lineWidth = 2;
    overlayCtx.stroke();

    if (!worldScene && window.worldScene) {
        worldScene = window.worldScene;
        console.log('[ESP] Scene now available!');
    }

    if (!worldScene) return;

    let myCamera;
    const spriteMap = {};
    const players = [];

    for (let i = 0; i < worldScene.children.length; i++) {
        const child = worldScene.children[i];
        if (child.type === 'PerspectiveCamera') myCamera = child;
        else if (child.type === 'Sprite') {
            try {
                if (child.material.map.image.className === 'canvas_healthbar') {
                    child.isEnemy = child.material.depthTest === true;
                    spriteMap[createKey(child)] = child;
                }
            } catch (err) {}
        } else if (child.name !== '' && child.type === 'Group' && child.visible) {
            if (child.headBone === undefined) child.headBone = findHeadBone(child);
            if (child.headBone) players.push(child);
        }
    }

    let targetPlayer;
    let minDistance = Infinity;

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        p.setScalar(0).applyMatrix4(player.headBone.matrixWorld);
        player.isAlive = Math.hypot(p.x - player.position.x, p.z - player.position.z) < 1;

        if (!player.myBox) {
            player.myBox = new THREE.LineSegments(geometry, material);
            player.add(player.myBox);
        }
        player.myBox.scale.setScalar(espSize);
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
            const distToCenter = Math.hypot(x - overlayCanvas.width / 2, y - overlayCanvas.height / 2);

            if (d < minDistance && distToCenter <= aimbotFOV) {
                targetPlayer = player;
                minDistance = d;
            }
        }
        player.myBox.visible &&= espEnabled;
    }

    if (aimbotEnabled && targetPlayer) {
        const yaw = myCamera.rotation.y;
        const pitch = myCamera.rotation.x;
        myCamera.rotation.order = 'YXZ';
        myCamera.lookAt(targetPlayer.position.x, targetPlayer.position.y + 1.5, targetPlayer.position.z);

        if (rightClickAimbot) {
            if (mouseRightDown) {
                canvas.dispatchEvent(new MouseEvent('mousemove', {
                    movementX: (yaw - myCamera.rotation.y) * 500,
                    movementY: (pitch - myCamera.rotation.x) * 500
                }));
            }
        } else {
            canvas.dispatchEvent(new MouseEvent('mousemove', {
                movementX: (yaw - myCamera.rotation.y) * 500,
                movementY: (pitch - myCamera.rotation.x) * 500
            }));
        }
    }
}

let mouseRightDown = false;
window.addEventListener('mousedown', e => { if(e.button===2) mouseRightDown=true; });
window.addEventListener('mouseup', e => { if(e.button===2) mouseRightDown=false; });

window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
    apply(target, thisArgs, args) {
        args[0] = new Proxy(args[0], {
            apply(target, thisArgs, args) {
                Reflect.apply(...arguments);
                animate();
            }
        });
        return Reflect.apply(...arguments);
    }
});

function randomString() { return Math.random().toString(32).slice(2).replace(/^\d/,'a'); }

const menuEl = document.createElement('div');
const menuDialogClass = randomString();
const menuMsgClass = randomString();

menuEl.innerHTML = `<style>
.${menuDialogClass} { position:absolute; left:50%; top:50%; padding:20px; background: rgba(50,0,0,0.8); border:6px solid rgba(0,0,0,0.2); color:#fff; transform:translate(-50%,-50%); box-shadow:0 0 0 10000px rgba(0,0,0,0.3); text-align:center; z-index:999999; }
.${menuDialogClass} * { color:#fff; font-family:sans-serif; }
.closeBtn { position:absolute; right:5px; top:5px; width:20px; height:20px; opacity:0.5; cursor:pointer; }
.closeBtn:before,.closeBtn:after { content:' '; position:absolute; left:50%; top:50%; width:100%; height:20%; transform:translate(-50%,-50%) rotate(-45deg); background:#fff; }
.closeBtn:after { transform:translate(-50%,-50%) rotate(45deg); }
.closeBtn:hover { opacity:1; }
.${menuDialogClass} input[type=range] { width:200px; }
.${menuDialogClass} label { display:block; margin:10px 0; text-align:left; }
.hotkeys { margin-top:15px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.3); font-size:13px; text-align:left; line-height:1.4; }
.btn { margin-top:5px; padding:6px 10px; background: rgba(255,255,255,0.1); border-radius:6px; cursor:pointer; text-align:center; }
.btn:hover { background: rgba(255,255,255,0.2); }
.${menuMsgClass} { position:absolute; left:10px; bottom:10px; background:rgba(50,0,0,0.8); color:#fff; padding:15px; animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s; z-index:999999; pointer-events:none; }
@keyframes msg { from { transform:translate(-120%,0); } to { transform:none; } }
</style>

<div class="${menuDialogClass}">
    <div id="closeMenuBtn" class="closeBtn"></div>
    <big>== Ev.IO ESP Menu ==</big><br><br>

    <label><input type="checkbox" id="espToggle" ${espEnabled ? "checked" : ""}> ESP Enabled</label>
    <label><input type="checkbox" id="aimbotToggle" ${aimbotEnabled ? "checked" : ""}> Aimbot Enabled</label>
    <label><input type="checkbox" id="rcAimbotToggle" ${rightClickAimbot ? "checked" : ""}> Right Click Aimbot</label>

    <label>ESP Box Size: <span id="espLabel">${espSize}</span>
        <input type="range" id="espSlider" min="1" max="5" step="1" value="${espSize}">
    </label>

    <label>FOV Circle: <span id="fovLabel">${aimbotFOV}</span>
        <input type="range" id="fovSlider" min="50" max="500" step="10" value="${aimbotFOV}">
    </label>

    <br>
    <div style="display:grid; grid-gap:8px; grid-template-columns:1fr 1fr;">
        <div class="btn" onclick="window.open('https://discord.gg/K24Zxy88VM','_blank')">Discord</div>
        <div class="btn" onclick="window.open('https://www.instagram.com/zertalious/','_blank')">Instagram</div>
        <div class="btn" onclick="window.open('https://twitter.com/Zertalious','_blank')">Twitter</div>
        <div class="btn" onclick="window.open('https://greasyfork.org/en/users/662330-zertalious','_blank')">More scripts</div>
    </div>

    <div class="hotkeys">
        <b>Hotkeys:</b><br>
        [V] Toggle ESP<br>
        [B] Toggle Aimbot<br>
        [,] Decrease ESP Box Size<br>
        [.] Increase ESP Box Size<br>
        [ [ ] Decrease FOV<br>
        [ ] ] Increase FOV<br>
        [H] Show/Hide Menu
    </div>
</div>

<div class="${menuMsgClass}" style="display:none;"></div>`;

document.body.appendChild(menuEl);

const dialogEl = document.getElementsByClassName(menuDialogClass)[0];
const msgEl = document.getElementsByClassName(menuMsgClass)[0];
const closeMenuBtn = document.getElementById('closeMenuBtn');

closeMenuBtn.addEventListener('click', () => dialogEl.style.display = 'none');

document.getElementById("espToggle").addEventListener("change", e => {
    espEnabled = e.target.checked;
    showMsg("ESP: " + (espEnabled ? "ON" : "OFF"));
});
document.getElementById("aimbotToggle").addEventListener("change", e => {
    aimbotEnabled = e.target.checked;
    showMsg("Aimbot: " + (aimbotEnabled ? "ON" : "OFF"));
});
document.getElementById("rcAimbotToggle").addEventListener("change", e => {
    rightClickAimbot = e.target.checked;
    showMsg("Right Click Aimbot: " + (rightClickAimbot ? "ON" : "OFF"));
});
document.getElementById("espSlider").addEventListener("input", e => {
    espSize = parseInt(e.target.value);
    document.getElementById("espLabel").innerText = espSize;
    showMsg("ESP Box Size: " + espSize);
});
document.getElementById("fovSlider").addEventListener("input", e => {
    aimbotFOV = parseInt(e.target.value);
    document.getElementById("fovLabel").innerText = aimbotFOV;
    showMsg("FOV Circle: " + aimbotFOV);
});

function showMsg(msg) {
    msgEl.innerText = msg;
    msgEl.style.display = 'none';
    void msgEl.offsetWidth;
    msgEl.style.display = '';
}

window.addEventListener('keyup', event => {
    switch(event.code){
        case 'KeyV': espEnabled = !espEnabled; showMsg('ESP: ' + (espEnabled?'ON':'OFF')); break;
        case 'KeyB': aimbotEnabled = !aimbotEnabled; showMsg('Aimbot: ' + (aimbotEnabled?'ON':'OFF')); break;
        case 'Comma': if(espSize>1){espSize--; showMsg('ESP Box Size Decreased'); document.getElementById("espSlider").value=espSize; document.getElementById("espLabel").innerText=espSize;} break;
        case 'Period': if(espSize<5){espSize++; showMsg('ESP Box Size Increased'); document.getElementById("espSlider").value=espSize; document.getElementById("espLabel").innerText=espSize;} break;
        case 'BracketLeft': if(aimbotFOV>50){aimbotFOV-=10; showMsg('FOV Circle Decreased'); document.getElementById("fovSlider").value=aimbotFOV; document.getElementById("fovLabel").innerText=aimbotFOV;} break;
        case 'BracketRight': if(aimbotFOV<500){aimbotFOV+=10; showMsg('FOV Circle Increased'); document.getElementById("fovSlider").value=aimbotFOV; document.getElementById("fovLabel").innerText=aimbotFOV;} break;
        case 'KeyH': dialogEl.style.display = dialogEl.style.display === 'none' ? 'block' : 'none'; break;
    }
});
