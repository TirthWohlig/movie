// SEARCH BAR 
function show() {
    document.getElementById("src").style.display = "block",
        document.getElementById("x").style.display = "block",
        document.getElementById("bar").style.display = "none"
};
function hide() {
        location.reload();

};
// SEARCH BAR 

// API 
const API_KEY = "api_key=593b7a4fdb5c248ba602cff028aa98e3";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie/?certification_country=US&certification=Rsort_by=vote_average.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("src")
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    });
};

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(
        movie => {
            const { title, poster_path, vote_average, overview } = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add("movie")
            movieEl.innerHTML =
                `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor()} ">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
`
            main.appendChild(movieEl);
        });
};

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
};
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + "&query=" + searchTerm)
    }
});
// API