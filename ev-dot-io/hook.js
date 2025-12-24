(function(){
    'use strict';

    console.log('[Scene Hook] Hooking WeakMap...');
    window.worldScene=null;

    const failed=localStorage.getItem('ev.io-hook-failed')==='true';

    WeakMap.prototype.set=new Proxy(WeakMap.prototype.set,{
        apply(t,a,[o]){
            if(o.type==='Scene'&&o.children.length>4){
                window.worldScene=o;
                console.log('[Scene Hook] SCENE FOUND!',o);

                if(failed){
                    Swal.fire({
                        icon:'success',
                        title:'Hook successful',
                        text:'Scene was hooked successfully. The ev.io hacks will work now.'
                    });
                    localStorage.setItem('ev.io-hook-failed','false');
                }
            }
            return Reflect.apply(...arguments);
        }
    });

    console.log('[Scene Hook] WeakMap hooked!');
})();
