(function() {
    'use strict';

    console.log('[Scene Hook] Hooking WeakMap...');

    window.worldScene = null;

    WeakMap.prototype.set = new Proxy(WeakMap.prototype.set, {
        apply(target, thisArgs, [object]) {
            if (object.type === 'Scene' && object.children.length > 4) {
                window.worldScene = object;
                console.log('[Scene Hook] SCENE FOUND!', window.worldScene);
            }
            return Reflect.apply(...arguments);
        }
    });

    console.log('[Scene Hook] WeakMap hooked!');
})();
