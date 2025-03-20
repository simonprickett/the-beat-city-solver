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
  
    let resultsHTML = '';

    for (const matchingCity of matchingCities) {
      resultsHTML = `${resultsHTML}<li>${matchingCity}</li>`;
    }

    document.getElementById('resultsList').innerHTML = resultsHTML;
    document.getElementById('resultsArea').classList.remove('is-hidden');

    // TODO clear output when phrase input is deleted.
    // TODO explicitly state there are no matches when none are found.
  }
});

phraseInput.focus();

