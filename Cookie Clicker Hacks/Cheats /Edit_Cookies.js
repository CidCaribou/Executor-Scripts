(function() {
    // Prompt user for the number of cookies or if they want infinite cookies
    const userInput = prompt("Enter the number of cookies you want (or type 'infinite' for infinite cookies):");

    if (userInput.toLowerCase() === 'infinite') {
        Game.cookies = Infinity; // Set cookies to infinity
        Game.cookiesPs = Infinity; // Set CPS to infinity
        alert("You now have infinite cookies!");
    } else {
        const cookies = parseInt(userInput);
        if (!isNaN(cookies) && cookies > 0) {
            Game.cookies = cookies; // Set the cookies to the value the user entered
            Game.cookiesPs = cookies / 1000; // Adjust CPS accordingly (you can tweak this part to suit your needs)
            alert("You now have " + cookies + " cookies!");
        } else {
            alert("Invalid input. Please enter a valid number.");
        }
    }
    Game.updateMenu(); // Refresh the game menu to reflect the changes
})();
