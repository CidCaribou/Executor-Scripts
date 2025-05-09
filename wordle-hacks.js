javascript: (function () {
  if (location.host == 'www.nytimes.com') {
    const date = new Date(),
      year = date.getFullYear(),
      month = (date.getMonth() + 1).toString().padStart(2, '0'),
      day = date.getDate().toString().padStart(2, '0'),
      url = `https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        alert(
          'The answer is: ' + data.solution + '\nAuthor: ' + data.editor
        );
      })
      .catch((error) => console.error(error));
  } else {
    alert('You must run this on the Wordle page.');
  }
})();
