(function() {
  var word = prompt("Enter a word:");
  if (!word) return alert("Please enter a word.");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/" + word, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.responseText);
        var verbList = "";
        var defList = "";
        var synonymList = "";

        if (!data || !data[0] || !data[0].meanings) {
          throw new Error("Invalid data structure");
        }

        data[0].meanings.forEach(function(meaning) {
          if (meaning.partOfSpeech === "verb") {
            verbList += meaning.definitions[0].definition + "\n";
          }
          defList += meaning.partOfSpeech + ": " + meaning.definitions[0].definition + "\n";
        });

        var thesaurusReq = new XMLHttpRequest();
        thesaurusReq.open("GET", "https://api.datamuse.com/words?rel_syn=" + word, true);
        thesaurusReq.onload = function() {
          if (thesaurusReq.status === 200) {
            var synonyms = JSON.parse(thesaurusReq.responseText).map(function(syn) {
              return syn.word;
            });
            synonymList += "Synonyms: " + (synonyms.length > 0 ? synonyms.join(", ") : "None found") + "\n";
            alert("Verbs:\n" + verbList + "\nDefinitions:\n" + defList + "\n" + synonymList);
          } else {
            alert("Could not fetch synonyms.");
          }
        };
        thesaurusReq.send();
      } catch (error) {
        alert("Word does not exist.");
      }
    } else {
      alert("Word does not exist.");
    }
  };
  xhr.onerror = function() {
    alert("An error occurred while trying to fetch the data.");
  };
  xhr.send();
})();
