// @name        Krunker Central Dogeware
// @version     1.5
// @author      Krunker Central
// @description A Krunker hack by Krunker Central - https://krunkercentral.com/

(async () => {
    if (typeof Swal === 'undefined') {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Bypass license check
    localStorage.license = '276gJDUY3I5310187NBF6DHBFbnfnfn38';
    localStorage.licenseTimestamp = Date.now();
    
    const externalScriptUrl = 'https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/krunker-centeral/dogeware.js';
    try {
        const res = await fetch(externalScriptUrl);
        const code = await res.text();
        const s = document.createElement('script');
        s.textContent = code;
        document.body.appendChild(s);
    } catch (e) {
        console.error('Failed to fetch external script:', e);
    }

    Swal.fire({
        icon: 'success',
        title: 'Hacks successfully loaded',
        text: 'Everything is ready!'
    });
})();
