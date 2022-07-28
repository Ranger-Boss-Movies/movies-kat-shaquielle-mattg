import createView from "../createView.js"


const BASE_URI = `${BACKEND_HOST}/api/s3/download`;

export default function Home(props) {
    let html = getTopMovieHTML();
    html += displayMovieHTML(props.movies);
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
                            <div class="mb-3">
                                <label for="movie-rating" class="col-form-label">Rating:</label>
                                <input type="text" class="form-control" id="movie-rating">
                            </div>
                            <div class="mb-3">
                                <label for="movie-genre" class="col-form-label">Genre:</label>
                                <input type="text" class="form-control" id="movie-genre">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <i type="button" class="bi bi-trash3-fill" id="delete-btn" data-bs-dismiss="modal" style="color:red; font-size: 2rem"></i>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" id="save-changes-btn" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
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
                 <div class="col-3 movieCol" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="${movies[i].title}" data-bs-rating="${movies[i].rating}" data-bs-genre="${movies[i].genre}" data-bs-id="${movies[i].id}">
                    <div class="movieColContent">
                      <image class="poster" src="${moviePoster}"></image>
                      <p class="px-2 mb-1">${movies[i].title}</p>
                      <p class="px-2 mb-1"><i class="bi bi-star-fill" style="color:goldenrod"></i>${movies[i].rating}</p>
                      <p class="px-2 pb-2">${movies[i].genre}</p>
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
<!--            ADDED BUTTON for ADD MOVIE-->
            <button type="button" id="add-movie-btn" data-bs-toggle="modal" data-bs-target="#add-modal">Add Movie</button>

        </main>`;
}
function editMovieEvent() {
    const addModal = document.querySelector('#add-modal')
    addModal.addEventListener('show.bs.modal', function(event) {
        let button = event.relatedTarget;
        let title = button.getAttribute('data-bs-title');
        let rating = button.getAttribute('data-bs-rating');
        let genre = button.getAttribute('data-bs-genre');
        let id = button.getAttribute('data-bs-id');
        const modalTitle = addModal.querySelector('.modal-title')
        const titleInput = addModal.querySelector('#movie-title');
        const ratingInput = addModal.querySelector('#movie-rating');
        const genreInput = addModal.querySelector('#movie-genre');
        addModal.setAttribute('data-bs-id', id)
        modalTitle.textContent = title
        titleInput.value = title
        ratingInput.value = rating
        genreInput.value = genre
    })
}




export function HomeEvents() {
    editMovieEvent()
    addMovieEvent()
    deleteMovie()
}

// NEW ADD FUNCTION STUFF
function addMovieEvent() {
    const addButton = document.querySelector("#add-movie-btn");
    addButton.addEventListener('click', function(event) {
        const modalTitle = document.querySelector('.modal-title')
        modalTitle.textContent = "Add a Movie"
        const addModal = document.querySelector('#add-modal')
        addModal.addEventListener('show.bs.modal', function(event) {
            const saveChangesBtn = document.querySelector('#save-changes-btn')
            saveChangesBtn.addEventListener('click', addMovie)
        })
    })
}


function addMovie() {
    const titleInput = document.querySelector('#movie-title');
    const ratingInput = document.querySelector('#movie-rating');
    const genreInput = document.querySelector('#movie-genre');
    let movieObject = {};
    movieObject = {'title': titleInput.value, 'rating': ratingInput.value, 'genre': genreInput.value}

    console.log("Movie is ready to be inserted");

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)
    }
    fetch("https://cuddly-equable-trollius.glitch.me/movies", requestOptions)
        .then(function(response) {
            if(!response.ok) {
                console.log("Error Adding Movie: " + response.status);
            } else {
                console.log("Movie Added");
                createView('/')
            }
        });
}

function deleteMovie() {
    let deleteButton = document.querySelector("#delete-btn")
    deleteButton.addEventListener("click", function(event) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        let button = document.querySelector("#add-modal")

        const id = button.getAttribute(`data-bs-id`)

        fetch(`https://cuddly-equable-trollius.glitch.me/movies/${id}`, requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    console.log("There was an error in deleting movie: " + response.status);
                } else {
                    console.log("Movie Deleted Successfully");
                    createView('/')
                }
            });
    })
}