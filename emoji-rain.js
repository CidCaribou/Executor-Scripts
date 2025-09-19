javascript:(function(){
    var emojis=[
        '💩','🔥','🍕','😂','😎','🤯','🎉','💀','✨','🌈','👀','🐱','🍔','🍟','🍿','🥳',
        '🤡','🦄','🐶','🥶','😱','💖','🤑','🤔','🍩','🍪','🧃','🍫','🍓','🥩','🦖','🎃',
        '👻','🤖','🧸','⚡','☠️','💫','🍭','🪩','🎈','🛸','🌪️','🌊','🌞','🌙','⭐','☁️',
        '🪐','🌸','🌻','🍀','🍎','🍉','🍌','🥑','🥦','🥕','🍗','🍖','🥓','🥪','🍜','🍣',
        '🍰','🍦','🍿','🍩','🍪','🥧','🍼','🥤','🥂','🍾','🎂','🎁','🎶','🎵','🎷','🎸',
        '🥁','🎺','🏀','⚽','⚾','🏈','🎯','🎳','🎮','🕹️','🚀','✈️','🚁','🚗','🚕','🚙','🛵','🏍️',
        '🌍','🌎','🌏','🗺️','🏔️','🏖️','🏝️','🏜️','🏟️','🏰','🕌','⛩️','🕍','🎡','🎢','🎠',
        '🛶','⛵','🚤','🛳️','🛥️','🏗️','🛒','💼','🎒','🪀','🪁','🧩','🎯','🏹','🪓','🛠️','⚔️'
    ];
    
    setInterval(()=>{
        var e=document.createElement('div');
        e.innerText=emojis[Math.floor(Math.random()*emojis.length)];
        e.style.position='fixed';
        e.style.left=Math.random()*100+'vw';
        e.style.top='-2rem';
        e.style.fontSize=(15+Math.random()*35)+'px';
        e.style.pointerEvents='none';
        e.style.zIndex=9999;
        e.style.userSelect='none';
        document.body.appendChild(e);
        var duration = 2000 + Math.random()*2000;
        e.animate([{top:'-2rem'},{top:'100vh'}],{duration:duration,easing:'linear'});
        setTimeout(()=>e.remove(),duration);
    }, 40);
})();
