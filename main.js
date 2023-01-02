let artists = [];

function getRandomIndexInclusive(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

function getRandomArtists() {
    const randomIdx1 = getRandomIndexInclusive(artists.length - 1);
    let randomIdx2 = getRandomIndexInclusive(artists.length - 1);
    let randomIdx3 = getRandomIndexInclusive(artists.length - 1);

    while (randomIdx2 === randomIdx1 || randomIdx2 === randomIdx3) {
        randomIdx2 = getRandomIndexInclusive(artists.length - 1);
    }

    while (randomIdx3 === randomIdx1 || randomIdx3 === randomIdx2) {
        randomIdx3 = getRandomIndexInclusive(artists.length - 1);
    }

    const firstArtistNameEl = document.getElementById('artist-name-1');
    firstArtistNameEl.textContent = artists[randomIdx1];

    const secondArtistNameEl = document.getElementById('artist-name-2');
    secondArtistNameEl.textContent = artists[randomIdx2];

    const thirdArtistNameEl = document.getElementById('artist-name-3');
    thirdArtistNameEl.textContent = artists[randomIdx3];
}

function onlyUnique(value, index, self) {
    if (self.indexOf(value) !== index) console.log('v', value);
    return self.indexOf(value) === index;
}

function setup() {
    fetch('./artistsList.json')
        .then((response) => response.json())
        .then((json) => {
            console.log(json.artists.length)
            artists = json.artists.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).filter(onlyUnique);

            console.log(artists.length);

            console.log(`"${artists.join('", \n"')}"`);

            const selectRandomBtn = document.getElementById('select-random-artist');
            selectRandomBtn.addEventListener('click', getRandomArtists);
            getRandomArtists();
        });
}

setup();
