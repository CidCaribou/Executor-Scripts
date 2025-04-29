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

  if (typeof Swal === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.onload = function() {
      showSolution();
    };
    document.head.appendChild(script);
  } else {
    showSolution();
  }

  function showSolution() {
    const solution = getWordleSolution();

    if (solution) {
      Swal.fire({
        title: 'Wordle Answer',
        text: `The answer is: ${solution.toUpperCase()}`,
        icon: 'success',
        confirmButtonText: 'Thanks!',
        confirmButtonColor: '#538d4e',
        background: '#ffffff',
        backdrop: 'rgba(0,0,0,0.4)'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Could not find Wordle solution in localStorage. Make sure you are on a Wordle Unlimited.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#538d4e'
      });
    }
  }
})();
