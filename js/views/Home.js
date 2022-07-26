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
                        <h5 class="modal-title" id="modalLabel">New message</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="movie-title" class="col-form-label">Title:</label>
                                <input type="text" class="form-control" id="movie-title">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Rating:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
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
        html +=
            `
                <div class="col-sm-4 movieCol" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="${movies[i].title}" data-bs-rating="${movies[i].rating}">
                      <p>${movies[i].title}</p>
                      <p>${movies[i].rating}</p>
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
                // Extract info from data-bs-* attributes
                let title = button.getAttribute('data-bs-title')
                let rating = button.getAttribute('data-bs-rating')

                // If necessary, you could initiate an AJAX request here
                // and then do the updating in a callback.
                //
                // Update the modal's content.
                const modalTitle = addModal.querySelector('.modal-title')
                const modalBodyInput = addModal.querySelector('.modal-body input')

                modalTitle.textContent = 'New message to ' + title
                modalBodyInput.value = title
            })
        })
    })
}

export function HomeEvents() {
    addMovieEventListener()
    // TODO: use an enum for message type
}