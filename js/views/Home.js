import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

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
                        <h5 class="modal-title" id="modalLabel"></h5>
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
                        <i class="bi bi-trash3-fill" style="color:red; font-size: 2rem"></i>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Add Movie</button>
                    </div>
                </div>
            </div>
        </div>
        
        <main>
        <button id="add-movie" type="button">Add Movie</button>
        <div class="container">
            <div class="row">
            
            
    `;
}

function displayMovieHTML(movies) {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        html +=
            `
                <div class="col-sm-4 movieCol" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="${movies[i].title}" data-bs-rating="${movies[i].rating}" data-bs-genre="${movies[i].genre}">
                      <p>${movies[i].title}</p>
                      <p><i class="bi bi-star-fill" style="color:goldenrod"></i>${movies[i].rating}</p>
                      <p>${movies[i].genre}</p>
                </div>
    `;
    }
    return html
}

function getBottomMovieHTML() {
    return `
        </div>
            </div>
        </main>`;
}
function addMovieEventListener() {
    const movieCol = document.querySelectorAll(".movieCol");
    movieCol.forEach(function(col) {
        col.addEventListener('click', function(event) {
            const addModal = document.getElementById('add-modal')
            addModal.addEventListener('show.bs.modal', function(event) {
                // Button that triggered the modal
                let button = event.relatedTarget
                let title = button.getAttribute('data-bs-title');
                let rating = button.getAttribute('data-bs-rating');
                let genre = button.getAttribute('data-bs-genre');
                const modalTitle = addModal.querySelector('.modal-title')
                const titleInput = addModal.querySelector('#movie-title');
                const ratingInput = addModal.querySelector('#movie-rating');
                const genreInput = addModal.querySelector('#movie-genre');
                modalTitle.textContent = title
                titleInput.value = title
                ratingInput.value = rating
                genreInput.value = genre

            })
        })
    })
}




export function HomeEvents() {
    addMovieEventListener()

}

