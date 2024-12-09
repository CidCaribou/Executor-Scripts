for (let i in Game.Buildings) {
    let building = Game.Buildings[i];
    if (building.unlock) building.unlock();  // Unlock the building if it's not unlocked
    if (building.buy) building.buy();  // Buy the building
    building.maxLevel();  // Max out the building level
}
