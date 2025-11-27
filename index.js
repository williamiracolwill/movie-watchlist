const movieSearchForm = document.getElementById("movie-search-form")
const movieList = document.getElementById("movie-list")
const initialState = document.getElementById("initial-state")


movieSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getMovies()
})

async function getMovies() {
    const res = await fetch("http://www.omdbapi.com/?t=Blade+Runner&type=movie&apikey=467c506d")
    const moviedata = await res.json()
    console.log(moviedata)
    movieList.innerHTML = getMovieHtml(moviedata)
}

function getMovieHtml(obj) {
    const {Title, Genre, Runtime, Plot, imdbRating, imdbID, Poster} = obj
    return `
    <div class="movie-item">
        <img src=${Poster} alt="${Title} movie poster"
        <div class="movie-info">
            <div>
                <h2 class="movie-title">${Title}</h2>
                <img src="assets/star-icon.png">
                <p class="movie-rating">${imdbRating}</p>
            <div>
            <div>
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button><img src="assets/add-icon.png"> Watchlist</button>
            </div>
            <p>${Plot}</p>
        </div>
    </div>`
}


// Take data and get html for movie items 
// display items 
// {Title: 'Blade Runner', Year: '1982', Rated: 'R', Released: '25 Jun 1982', Runtime: '117 min', …}
// Actors
// : 
// "Harrison Ford, Rutger Hauer, Sean Young"
// Awards
// : 
// "Nominated for 2 Oscars. 13 wins & 22 nominations total"
// BoxOffice
// : 
// "$32,914,489"
// Country
// : 
// "United States, United Kingdom, Hong Kong"
// DVD
// : 
// "N/A"
// Director
// : 
// "Ridley Scott"
// Genre
// : 
// "Action, Drama, Sci-Fi"
// Language
// : 
// "English, German, Cantonese, Japanese, Hungarian, Arabic, Korean"
// Metascore
// : 
// "84"
// Plot
// : 
// "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator."
// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg"
// Production
// : 
// "N/A"
// Rated
// : 
// "R"
// Ratings
// : 
// (3) [{…}, {…}, {…}]
// Released
// : 
// "25 Jun 1982"
// Response
// : 
// "True"
// Runtime
// : 
// "117 min"
// Title
// : 
// "Blade Runner"
// Type
// : 
// "movie"
// Website
// : 
// "N/A"
// Writer
// : 
// "Hampton Fancher, David Webb Peoples, Philip K. Dick"
// Year
// : 
// "1982"
// imdbID
// : 
// "tt0083658"
// imdbRating
// : 
// "8.1"
// imdbVotes
// : 
// "868,708"
// [[Prototype]]
// : 
// Object