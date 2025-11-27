const movieSearchForm = document.getElementById("movie-search-form")
const movieList = document.getElementById("movie-list")
const initialState = document.getElementById("initial-state")


movieSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const movieFormData = new FormData(movieSearchForm)
    const movieTitle = movieFormData.get("movie-input")
    const modifiedMovieTitle = movieTitle.replace(/ /g, "+")
    getMovies(modifiedMovieTitle)
})

async function getMovies(title) {
    const res = await fetch(`http://www.omdbapi.com/?t=${title}&type=movie&apikey=467c506d`)
    const moviedata = await res.json()
    console.log(moviedata)
    movieList.innerHTML = getMovieHtml(moviedata)
}

function getMovieHtml(obj) {
    const {Title, Genre, Runtime, Plot, imdbRating, imdbID, Poster} = obj
    return `
    <div class="movie-item">
        <img class="movie-poster" src=${Poster} alt="${Title} movie poster">
        <div class="movie-info">
            <div class="main-info">
                <h2 class="movie-title">${Title}</h2>
                <img src="assets/star-icon.png">
                <p class="movie-rating">${imdbRating}</p>
            </div>
            <div class="sub-info">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button class="add-movie-btn"><img src="assets/add-icon.png"> Watchlist</button>
            </div>
            <p class="movie-plot">${Plot}</p>
        </div>
    </div>`
}


// Take data and get html for movie items 
// display items 
// 