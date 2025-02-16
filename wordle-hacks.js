javascript: (function () {
  if (location.host == 'www.nytimes.com') {
    const year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      day = new Date().getDate(),
      url =
        'https://www.nytimes.com/svc/wordle/v2/' +
        year +
        '-' +
        (month.toString().length === 1 ? '0' + month : month) +
        '-' +
        day +
        '.json'
    fetch(url)
      .then((_0x1cba03) => _0x1cba03.json())
      .then((_0x3581f7) => {
        alert(
          'The answer is: ' +
            _0x3581f7.solution +
            '\nAuthor: ' +
            _0x3581f7.editor
        )
      })
      .catch((_0x16cfd0) => console.error(_0x16cfd0))
  } else {
    alert('You must run this on the Wordle page.')
  }
})()
