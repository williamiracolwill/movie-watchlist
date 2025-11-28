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
    const res = await fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=467c506d`)
    const movieData = await res.json()
    // console.log(movieData.Search)
    let moviesArr = []
    for (let movie of movieData.Search) {
        const res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&type=movie&apikey=467c506d`)
        const movieObj = await res.json()
        moviesArr.push(movieObj)
    }
    movieList.innerHTML = getMovieHtml(moviesArr)
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
    })

    
}


// Take data and get html for movie items 
// display items 
// 