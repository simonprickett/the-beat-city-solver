const response = await fetch('cities.json');
const cities = (await response.json()).cities;

const phraseInput = document.getElementById('phraseInput');

phraseInput.addEventListener('keyup', async function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const phrase = phraseInput.value.trim().toLowerCase();

    if (phrase.length === 0) {
      // TODO handle this better in the UI.
      alert('enter something');
      return;
    }

    // Get uniques from the phrase.
    const phraseUniques = new Set(phraseInput.value.trim().replaceAll(' ', '').toLowerCase());

    // Find cities that have no chars from phraseUniqueChars.
    const matchingCities = cities.filter((city) => {
      const cityUniques = new Set(city.replaceAll(' ', '').toLowerCase());
      const commonChars = cityUniques.intersection(phraseUniques);

      return commonChars.size === 0;
    });
  
    // TODO output matches in a nicer way.
    console.log(matchingCities);

    // Output:
    // Cities containing no letters from "<phrase>"

    for (const matchingCity of matchingCities) {
      console.log(`<li>${matchingCity}</li>`);
    }

    // TODO output the phrase too

    // TODO clear the input
  }
});

phraseInput.focus();

