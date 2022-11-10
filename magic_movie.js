const API_KEY = "api_key=593b7a4fdb5c248ba602cff028aa98e3";



const BASE_URL = "https://api.themoviedb.org/3";



const API_URL = "https://api.themoviedb.org/3" + "/discover/movie/?certification_country=US& certification=Rsort_by=vote_average.desc&" + "api_key=593b7a4fdb5c248ba602cff028aa98e3" + "&page=";



const IMG_URL = "https://image.tmdb.org/t/p/w500/";



const main = document.getElementById("main");



var form = document.getElementById("form");



const search = document.getElementById("src");



const SEARCH_URL = "https://api.themoviedb.org/3" + "/search/movie?" + "api_key=593b7a4fdb5c248ba602cff028aa98e3";



getMovies(API_URL, "1");

function nextPage() {
  var a = parseInt(document.getElementById("page").value);
  var b = a + 1
  a = b
  document.getElementById("page").value = b
  console.log(b)
  getMovies(API_URL, b);
};

function prevPage() {
  var c = parseInt(document.getElementById("page").value); 1
  if (c > 1) {
    var d = c - 1
    c = d
    document.getElementById("page").value = d
    console.log(d)
    getMovies(API_URL, d);
  }

};

function getMovies(ex, page) {
  if (page) {
    ex = ex + page;
  }
  fetch(ex)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);
    });
};

function showMovies(data) {
  main.innerHTML = "";
  if (data.length == 0) {
    document.getElementById("error").style.display = "block"
  }
  else {
    data.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)} ">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
`;
      document.getElementById("error").style.display = "none"

      main.appendChild(movieEl);
    });
  };
}
function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5 && vote <= 8) {
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
  else {
    getMovies(API_URL, "1");
  }

});

