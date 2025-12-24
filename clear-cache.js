javascript: (function() {
    if (document.getElementById('cache-editor-root')) return;
    const root = document.createElement('div');
    root.id = 'cache-editor-root';
    document.body.appendChild(root);
    const shadow = root.attachShadow({
        mode: 'open'
    });
    const s = document.createElement('style');
    s.textContent = `#cache-editor-widget{position:fixed;left:50px;top:50px;width:550px;background:#1e1e1e;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.6);border:1px solid #2d2d2d;z-index:999999;font-family:system-ui,-apple-system,sans-serif;color:#e0e0e0;overflow:hidden}#cache-editor-widget.minimized{width:300px;height:auto}#cache-editor-widget.minimized .ce-body{display:none}.ce-titlebar{background:#252525;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #2d2d2d;cursor:move;user-select:none}.ce-title{font-weight:700;font-size:16px;letter-spacing:0.5px;color:#fff}.ce-controls{display:flex;gap:6px}.ce-btn{width:32px;height:32px;border:none;background:transparent;color:#aaa;border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}.ce-btn:hover{background:#2d2d2d}.ce-btn.close:hover{background:#dc2626}.ce-body{padding:16px;max-height:450px;overflow-y:auto}.ce-search-bar{display:flex;gap:8px;margin-bottom:14px}.ce-search{flex:1;background:#252525;border:1px solid #2d2d2d;border-radius:6px;padding:10px 12px;color:#e0e0e0;font-size:13px;outline:none;padding-left:36px}.ce-search:focus{border-color:#3d3d3d}.ce-search-wrap{position:relative;flex:1}.ce-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#6b7280;width:16px;height:16px}.ce-action-btn{padding:10px 14px;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;transition:all 0.2s;background:#252525;color:#fff;border:1px solid #2d2d2d}.ce-action-btn:hover{background:#2d2d2d}.ce-action-btn.danger{background:#3d1f1f;border-color:#4d2f2f}.ce-action-btn.danger:hover{background:#4d2f2f}.ce-info{color:#9ca3af;font-size:12px;margin-bottom:14px;padding:8px 12px;background:#252525;border-radius:6px;border:1px solid #2d2d2d}.ce-items{}.ce-item{background:#252525;border:1px solid #2d2d2d;border-radius:6px;margin-bottom:8px;overflow:hidden;transition:all 0.2s}.ce-item:hover{border-color:#3d3d3d}.ce-item-header{padding:10px 12px;background:#1e1e1e;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #2d2d2d}.ce-key{color:#fff;font-family:monospace;font-size:13px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ce-delete-btn{padding:6px;background:transparent;border:none;color:#888;cursor:pointer;border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all 0.2s}.ce-delete-btn:hover{background:#dc2626;color:#fff}.ce-value{padding:12px;cursor:pointer;transition:background 0.2s}.ce-value:hover{background:#1e1e1e}.ce-value pre{color:#d1d5db;font-family:monospace;font-size:12px;white-space:pre-wrap;word-break:break-all;margin:0;line-height:1.5}.ce-edit-area{padding:12px}.ce-textarea{width:100%;background:#1e1e1e;border:1px solid #2d2d2d;border-radius:6px;padding:10px;color:#e0e0e0;font-family:monospace;font-size:12px;resize:vertical;min-height:100px;outline:none;box-sizing:border-box}.ce-textarea:focus{border-color:#3d3d3d}.ce-edit-controls{display:flex;gap:8px;margin-top:8px}.ce-save-btn{background:#1f3d1f;color:white;border:1px solid:#2f4d2f}.ce-save-btn:hover{background:#2f4d2f}.ce-cancel-btn{background:#252525;color:white;border:1px solid #2d2d2d}.ce-cancel-btn:hover{background:#2d2d2d}.ce-empty{text-align:center;color:#888;padding:40px 0;font-size:13px}`;
    shadow.appendChild(s);
    const w = document.createElement('div');
    w.id = 'cache-editor-widget';
    w.innerHTML = `<div class="ce-titlebar" id="ce-titlebar"><div class="ce-title">CACHE EDITOR</div><div class="ce-controls"><button class="ce-btn" id="ce-minimize"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button><button class="ce-btn close" id="ce-close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div><div class="ce-body"><div class="ce-search-bar"><div class="ce-search-wrap"><svg class="ce-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg><input type="text" class="ce-search" placeholder="Search cache keys..." id="ce-search"></div><button class="ce-action-btn danger" id="ce-clear"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>Clear</button><button class="ce-action-btn" id="ce-refresh"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>Refresh</button></div><div class="ce-info" id="ce-info"></div><div class="ce-items" id="ce-items"></div></div>`;
    shadow.appendChild(w);
    const site = window.location.hostname || 'localhost';
    let pos = {
            x: 50,
            y: 50
        },
        drag = false,
        off = {
            x: 0,
            y: 0
        };
    const tb = shadow.getElementById('ce-titlebar');
    tb.addEventListener('mousedown', e => {
        if (e.target.closest('.ce-btn')) return;
        drag = true;
        off = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        }
    });
    document.addEventListener('mousemove', e => {
        if (drag) {
            pos = {
                x: e.clientX - off.x,
                y: e.clientY - off.y
            };
            w.style.left = pos.x + 'px';
            w.style.top = pos.y + 'px'
        }
    });
    document.addEventListener('mouseup', () => drag = false);
    shadow.getElementById('ce-minimize').addEventListener('click', () => w.classList.toggle('minimized'));
    shadow.getElementById('ce-close').addEventListener('click', () => root.remove());
    const getCaches = async () => {
        const c = {};
        if ('caches' in window) {
            const names = await caches.keys();
            for (const name of names) {
                const cache = await caches.open(name);
                const reqs = await cache.keys();
                for (const req of reqs) {
                    c[req.url] = {
                        cacheName: name,
                        url: req.url,
                        method: req.method
                    }
                }
            }
        }
        return c
    };
    const render = async () => {
        const search = shadow.getElementById('ce-search').value.toLowerCase();
        const data = await getCaches();
        const filtered = Object.entries(data).filter(([k, v]) => k.toLowerCase().includes(search) || v.cacheName.toLowerCase().includes(search));
        const items = shadow.getElementById('ce-items');
        const info = shadow.getElementById('ce-info');
        const totalSize = new Blob([JSON.stringify(data)]).size;
        info.textContent = `${filtered.length} cache entries • ${(totalSize/1024).toFixed(2)} KB • Website: ${site}`;
        if (filtered.length === 0) {
            items.innerHTML = '<div class="ce-empty">' + (search ? 'No matching cache entries found' : 'No cache entries found') + '</div>';
            return
        }
        items.innerHTML = filtered.map(([url, v]) => `<div class="ce-item" data-url="${url.replace(/"/g,'&quot;')}" data-cache="${v.cacheName.replace(/"/g,'&quot;')}"><div class="ce-item-header"><span class="ce-key">${v.cacheName}</span><button class="ce-delete-btn" onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('cache-delete',{detail:{url:'${url.replace(/'/g,"\\'")}',cache:'${v.cacheName.replace(/'/g,"\\'")}'}}))"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div><div class="ce-value" onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('cache-view',{detail:{url:'${url.replace(/'/g,"\\'")}',cache:'${v.cacheName.replace(/'/g,"\\'")}'}}))"><pre>URL: ${url}\nMethod: ${v.method}</pre></div></div>`).join('')
    };
    root.addEventListener('cache-delete', async (e) => {
        const {
            url,
            cache: cacheName
        } = e.detail;
        if (!confirm(`Delete cache entry?\n${url}`)) return;
        const cache = await caches.open(cacheName);
        await cache.delete(url);
        render();
        alert('Cache entry deleted!')
    });
    root.addEventListener('cache-view', async (e) => {
        const {
            url,
            cache: cacheName
        } = e.detail;
        try {
            const cache = await caches.open(cacheName);
            const response = await cache.match(url);
            if (response) {
                const contentType = response.headers.get('content-type') || '';
                let content = '';
                if (contentType.includes('text') || contentType.includes('json') || contentType.includes('javascript')) {
                    content = await response.text()
                } else {
                    content = `Binary content (${contentType})\nSize: ${response.headers.get('content-length')||'unknown'} bytes`
                }
                const items = shadow.getElementById('ce-items');
                const item = Array.from(items.querySelectorAll('.ce-item')).find(el => el.dataset.url === url);
                if (item) {
                    item.querySelector('.ce-value').innerHTML = `<div class="ce-edit-area"><textarea class="ce-textarea" readonly id="ce-view-textarea">${content.length>5000?content.substring(0,5000)+'...':content}</textarea><div class="ce-edit-controls"><button class="ce-action-btn ce-cancel-btn" id="ce-back">Back</button></div></div>`;
                    shadow.getElementById('ce-back').addEventListener('click', () => render())
                }
            }
        } catch (err) {
            alert('Error viewing cache: ' + err.message)
        }
    });
    shadow.getElementById('ce-search').addEventListener('input', render);
    shadow.getElementById('ce-refresh').addEventListener('click', () => {
        render()
    });
    shadow.getElementById('ce-clear').addEventListener('click', async () => {
        if (!confirm('⚠️ Clear ALL cache data? This cannot be undone!')) return;
        const names = await caches.keys();
        for (const name of names) {
            await caches.delete(name)
        }
        render();
        alert('All cache cleared!')
    });
    render()
})();
