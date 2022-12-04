let artists = [];

function getRandomIndexInclusive(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1)); // The maximum is inclusive and the minimum is inclusive
}

function getRandomArtist() {
    const randomIdx = getRandomIndexInclusive(artists.length - 1);

    const artistNameEl = document.getElementById('artist-name');
    artistNameEl.textContent = artists[randomIdx];
}

function setup() {
    fetch('./artistsList.json')
        .then((response) => response.json())
        .then((json) => {
            artists = json.artists.sort((a, b) => {
                return a.localeCompare(b, undefined, { sensitivity: 'base' })
            });

            console.log(artists.join('", \n"'))
        });

    const selectRandomBtn = document.getElementById('select-random-artist');
    selectRandomBtn.addEventListener('click', getRandomArtist)
}

setup()
