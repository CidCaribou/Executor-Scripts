javascript: (function () {
  if (location.host == 'www.nytimes.com') {
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      formattedMonth = month.toString().length === 1 ? '0' + month : month,
      formattedDay = day.toString().length === 1 ? '0' + day : day,
      url =
        'https://www.nytimes.com/svc/wordle/v2/' +
        year +
        '-' +
        formattedMonth +
        '-' +
        formattedDay +
        '.json';

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
