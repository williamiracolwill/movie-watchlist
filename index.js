const movieSearchForm = document.getElementById("movie-search-form")
const movieList = document.getElementById("movie-list")
const initialState = document.getElementById("initial-state")
const movieWatchlist = document.getElementById("movie-watchlist")

const moviesArr = []
let savedMovies = []

const watchlistLocalStorage = JSON.parse(localStorage.getItem("savedMovies"))

if (watchlistLocalStorage) {
    savedMovies = watchlistLocalStorage
    renderWatchlist(savedMovies)
}


movieSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const movieFormData = new FormData(movieSearchForm)
    const movieTitle = movieFormData.get("movie-input")
    const modifiedMovieTitle = movieTitle.replace(/ /g, "+")
    getMovies(modifiedMovieTitle)
})

movieList.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.dataset.movie) {
        addMovie(e.target.dataset.movie)
    }
})

function addMovie(movieId) {
    const targetMovieObj = moviesArr.filter(movie => movie.imdbID === movieId)[0]
    savedMovies.push(targetMovieObj)
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies))
    renderWatchlist()
}

async function getMovies(title) {
    try {
        const res = await fetch(`http://www.omdbapi.com/?s=Blade+Runner&type=movie&apikey=467c506d`) // fix later to add dynamic title
        
        if(!res.ok) {
            throw new Error(`Network error: ${res.status}`)
        } 
        const movieData = await res.json()

        if (movieData.Response === "False") {
            throw new Error(movieData.Error || "No results returned from API");
        }
        
        for (let movie of movieData.Search) {
            const res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&type=movie&apikey=467c506d`)
            const movieObj = await res.json()
            moviesArr.push(movieObj)
        }
        movieList.innerHTML = getMovieHtml(moviesArr)
    }
    catch (err) {
        console.error("getMovies error:", err)
        document.getElementById('initial-state').innerHTML = `
            <h3 class="grey-text">Unable to find what you are looking for. Please try another search</h3>`
    }
}

function getMovieHtml(arr) {
    return arr.map(movie => {
        const {Title, Genre, Runtime, Plot, imdbRating, imdbID, Poster} = movie
        return `
        <div class="movie-item">
            <img class="movie-poster" src=${Poster} alt="${Title} movie poster">
            <div class="movie-info">
                <div class="main-info">
                    <h2 class="movie-title">${Title}</h2>
                    <img src="assets/star-icon.png">
                    <p class="movie-rating">"${imdbRating}"</p>
                </div>
                <div class="sub-info">
                    <p>${Runtime}</p>
                    <p>${Genre}</p>
                    <button class="add-movie-btn" data-movie="${imdbID}"><img src="assets/add-icon.png" alt="add button" data-movie="${imdbID}" /> Watchlist</button>
                </div>
                <p class="movie-plot">${Plot}</p>
            </div>
        </div>`
    }).join('')  
}

function getWatchlistHtml(arr) {
    return arr.map(movie => {
        const {Title, Genre, Runtime, Plot, imdbRating, imdbID, Poster} = movie
        return `
        <div class="movie-item">
            <img class="movie-poster" src=${Poster} alt="${Title} movie poster">
            <div class="movie-info">
                <div class="main-info">
                    <h2 class="movie-title">${Title}</h2>
                    <img src="assets/star-icon.png">
                    <p class="movie-rating">"${imdbRating}"</p>
                </div>
                <div class="sub-info">
                    <p>${Runtime}</p>
                    <p>${Genre}</p>
                    <button class="add-movie-btn" data-movie="${imdbID}"><img src="assets/remove-icon.png" alt="remove button" data-movie="${imdbID}" /> Watchlist</button>
                </div>
                <p class="movie-plot">${Plot}</p>
            </div>
        </div>`
    }).join('')
}

function renderWatchlist(arr) {
    movieWatchlist.innerHTML = getWatchlistHtml(arr)
}

renderWatchlist()
// make watchlist html page and set up default state
// handle add to watchlist functionality..