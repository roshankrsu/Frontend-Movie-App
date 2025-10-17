const API_KEY = 'YOUR_API_KEY_HERE';
const SEARCH_API = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const IMG_PATH = 'https://via.placeholder.com/300x450?text=No+Image';

function returnMovies(API_URL) {
    main.innerHTML = '';

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const div_card = document.createElement('div');
                    div_card.className = 'card';

                    const div_row = document.createElement('div');
                    div_row.className = 'row';

                    const div_column = document.createElement('div');
                    div_column.className = 'column';

                    const image = document.createElement('img');
                    image.className = 'thumbnail';
                    image.src = movie.Poster !== "N/A" ? movie.Poster : IMG_PATH;

                    const title = document.createElement('h3');
                    title.textContent = movie.Title;

                    const year = document.createElement('p');
                    year.textContent = movie.Year;

                    const center = document.createElement('center');
                    center.appendChild(image);

                    div_card.appendChild(center);
                    div_card.appendChild(title);
                    div_card.appendChild(year);
                    div_column.appendChild(div_card);
                    div_row.appendChild(div_column);

                    main.appendChild(div_row);
                });
            } else {
                main.innerHTML = `<h2>${data.Error}</h2>`;
            }
        })
        .catch(err => {
            main.innerHTML = `<h2>Error fetching movies</h2>`;
            console.error(err);
        });
}

// Default movies to show on page load
returnMovies(SEARCH_API + 'love');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim();
    if (searchItem) {
        returnMovies(SEARCH_API + encodeURIComponent(searchItem));
        search.value = "";
    }
});
