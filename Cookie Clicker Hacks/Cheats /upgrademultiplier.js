(function() {
    // Prompt user to input the price increase factor (can be positive or negative)
    const increaseFactor = prompt("Enter the price increase factor (positive for increasing prices, negative for decreasing prices):", "1");

    // Make sure the input is a valid number
    if (increaseFactor && !isNaN(increaseFactor)) {
        // Apply the custom price increase factor (even negative numbers)
        Game.priceIncrease = Number(increaseFactor);

        // Inform the user of the applied change
        alert(`The price increase factor has been set to ${increaseFactor}. Prices will now increase or decrease accordingly.`);
    } else {
        alert("Invalid input. Please enter a valid number.");
    }
})();
