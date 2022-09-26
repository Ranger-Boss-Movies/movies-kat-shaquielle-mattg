import createView from "../createView.js"


const BASE_URI = `${BACKEND_HOST}/api/s3/download`;
let movies;
export default function Home(props) {
    movies = props.movies;

    console.log(BACKEND_HOST);
    console.log(movies);
    console.log(movies[0]);
    console.log(movies[0].genres);
    console.log(movies[0].genres[0].name);
    console.log(movies[0].genres.map(el => el.name));
    let html = getTopMovieHTML();
    html += displayMovieHTML(movies);
    html += getBottomMovieHTML();
    return html;
}

function getTopMovieHTML() {
    return `
       <header>
            <div class="jumbotron jumbotron-1 d-flex justify-content-center">
                <div class="inner-content text-center text-white p-5">
                    <h1 class="text uppercase">Welcome to Popcorn Cinema!</h1>
                    <p style="color: white">Best movies in the world!</p>
                </div>
            </div>
        </header>

        <div class="modal fade" id="add-modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Add a Movie</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="movie-title" class="col-form-label">Title:</label>
                                <input type="text" class="form-control" id="movie-title">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <i type="button" class="bi bi-trash3-fill" id="delete-btn" data-bs-dismiss="modal" style="color:red; font-size: 2rem"></i>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" id="modal-edit-movie" class="btn btn-primary" data-bs-dismiss="modal">Edit Movie</button>
                        <button type="button" id="modal-add-movie" class="btn btn-primary" data-bs-dismiss="modal">Add Movie</button>
                    </div>
                </div>
            </div>
        </div>
        
        <main>

        
        <div class="container">
            <div class="row">
            
            
    `;
}

function displayMovieHTML(movies) {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        let moviePoster = movies[i].poster
        if(!movies[i].poster) {
            moviePoster = '../../assets/default-poster.png'
        }
        html +=
            `
                 <div class="col-3 movieCol" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="${movies[i].title}" data-bs-rated="${movies[i].rated}" data-bs-genre="${movies[i].genres.map(el => el.name).join('-')}" data-bs-id="${movies[i].id}">
                    <div class="movieColContent">
                      <image class="poster" src="${moviePoster}"></image>
                      <p class="px-2 mb-1">${movies[i].title}</p>
                      <p class="px-2 mb-1">Rated: ${movies[i].rated}</p>
                      <p class="px-2 mb-1"><i class="bi bi-star-fill" style="color:goldenrod"></i> ${movies[i].rating}</p>
                      <p class="px-2 pb-2">${movies[i].genres.map(el => el.name).join(', ')}</p>
                    </div>
                </div>
    `;
    }
    return html
}

function getBottomMovieHTML() {
    return `
        </div>
            </div>
            <button type="button" id="add-movie-btn" data-bs-toggle="modal" data-bs-target="#add-modal">Add Movie</button>
        </main>`;
}





export function HomeEvents() {
    addListeners()
    addMovieEvent()
}

function addListeners() {
    const addModal = document.querySelector('#add-modal')
    addModal.addEventListener('show.bs.modal', function(event) {
        let button = event.relatedTarget;
        let title = button.getAttribute('data-bs-title');
        // let rated = button.getAttribute('data-bs-rated');
        // let genre = button.getAttribute('data-bs-genre').split("-").join(", ");
        let id = button.getAttribute('data-bs-id');
        const modalTitle = addModal.querySelector('.modal-title')
        const titleInput = addModal.querySelector('#movie-title');
        // const ratedInput = addModal.querySelector('#movie-rated');
        // const genreInput = addModal.querySelector('#movie-genre');
        addModal.setAttribute('data-bs-id', id)
        modalTitle.textContent = title
        titleInput.value = title
        // ratedInput.value = rated
        // genreInput.value = genre
        })
    const deleteButton = document.querySelector("#delete-btn")
    deleteButton.addEventListener("click", deleteMovie)
    const modalEditBtn = document.querySelector('#modal-edit-movie')
    modalEditBtn.addEventListener('click', editMovie)
}

function addMovieEvent() {
    const modalAddBtn = document.querySelector('#modal-add-movie')
    modalAddBtn.addEventListener('click', addMovie)
    const addButton = document.querySelector("#add-movie-btn");
    addButton.addEventListener('click', function(event) {
        const modalTitle = document.querySelector('.modal-title')
        modalTitle.textContent = "Add a Movie"
    })
}
async function fetchMovie() {
    const title = document.querySelector('#movie-title').value;
    return await fetch(`${OMDB_URL}&t=${title}`)
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("movie not found");
                return "";
            } else
                return await response.json();
        });
}
async function addMovie() {
    const data = await fetchMovie();
    const title = data.Title;
    const rated = data.Rated;
    const year = data.Year;
    const rating = data.imdbRating;
    const poster = data.Poster;
    const plot = data.Plot;
    const director = {'name': data.Director};
    const genres = [];
    data.Genre.split(", ").map(el => {
        genres.push({'name' : el})
    })
    const actors = [];
    data.Actors.split(", ").map(el => {
        actors.push({'name' : el})
    })
    const movieObject = {
        title,
        rated,
        year,
        rating,
        poster,
        plot,
        director,
        genres,
        actors
    }
    console.log(movieObject);
    console.log("Movie is ready to be inserted");

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)
    }
    fetch(`${BACKEND_HOST}/api/movies/`, requestOptions)
        .then(function(response) {
            if(!response.ok) {
                console.log("Error Adding Movie: " + response.status);
            } else {
                console.log("Movie Added");
                createView('/')
            }
        });
}

// function addMovie() {
//     const titleInput = document.querySelector('#movie-title');
//     const ratedInput = document.querySelector('#movie-rated');
//     const genreInput = document.querySelector('#movie-genre');
//     let movieObject = {};
//     let genreObject = genreInput.value
//     movieObject = {'title': titleInput.value, 'rated': ratedInput.value, 'genre': genreInput.value}
//
//     console.log("Movie is ready to be inserted");
//
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(movieObject)
//     }
//     fetch(`${BACKEND_HOST}/api/movies/`, requestOptions)
//         .then(function(response) {
//             if(!response.ok) {
//                 console.log("Error Adding Movie: " + response.status);
//             } else {
//                 console.log("Movie Added");
//                 createView('/')
//             }
//         });
// }

function deleteMovie() {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    let button = document.querySelector("#add-modal")
    const id = button.getAttribute(`data-bs-id`)
    fetch(`${BACKEND_HOST}/api/movies/${id}`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                console.log("There was an error in deleting movie: " + response.status);
            } else {
                console.log("Movie Deleted Successfully");
                createView('/')
            }
        });
}

function editMovie() {
    let button = document.querySelector("#add-modal")
    const id = button.getAttribute(`data-bs-id`)
    const titleInput = document.querySelector('#movie-title');
    const ratedInput = document.querySelector('#movie-rated');
    const genreInput = document.querySelector('#movie-genre');
    let movieObject = {};
    movieObject = {'title': titleInput.value, 'rated': ratedInput.value, 'genre': genreInput.value}
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)
    }

    fetch(`${BACKEND_HOST}/api/movies/${id}`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                console.log("There was an error in deleting movie: " + response.status);
            } else {
                console.log("Movie Deleted Successfully");
                createView('/')
            }
        });
}