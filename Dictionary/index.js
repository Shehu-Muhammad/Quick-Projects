function lookUpWord() {
    const word = document.getElementById('word').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
    //   console.log(data);

    const meaning = data[0].meanings[0].definitions[0].definition;
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const definition = document.getElementById('definition');
    definition.innerHTML = meaning;
    const part = document.getElementById('partofspeech');
    part.innerHTML = partOfSpeech;
    })
    .catch(error => {
      document.getElementById("result").innerHTML = error.message;
    });
}