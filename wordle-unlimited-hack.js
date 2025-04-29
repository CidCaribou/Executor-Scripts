javascript:(function() {
  function getWordleSolution() {
    try {
      const gameStateJson = localStorage.getItem('gameState');

      if (!gameStateJson) {
        return null;
      }

      const gameState = JSON.parse(gameStateJson);

      if (gameState && gameState.solution) {
        return gameState.solution;
      }

      return null;
    } catch (error) {
      console.error('Error getting Wordle solution:', error);
      return null;
    }
  }

  const solution = getWordleSolution();

  if (solution) {
    alert('Wordle Solution: ' + solution.toUpperCase());
  } else {
    alert('Error: Could not find Wordle solution in localStorage. Make sure you are on a Wordle game page.');
  }
})();
