(function() {
    // Prompt the user for the number of sugar lumps they want
    const lumpsAmount = prompt("Enter the number of sugar lumps you want (type 'infinite' for infinite lumps):", "100");

    // Check if the input is "infinite"
    if (lumpsAmount.toLowerCase() === "infinite") {
        // Set sugar lumps to infinity
        Game.lumps = Infinity;
        alert("You now have infinite sugar lumps.");
    }
    // Check if the input is a valid number
    else if (lumpsAmount && !isNaN(lumpsAmount)) {
        // Set the number of sugar lumps in the game to the entered amount
        Game.lumps = Number(lumpsAmount);
        alert(`You now have ${lumpsAmount} sugar lumps.`);
    } else {
        alert("Invalid input. Please enter a valid number or 'infinite'.");
    }
})();
