Game.registerHook('logic', () => { Game.wrinklers.forEach(me => me.hp -= Number.MAX_VALUE) });
