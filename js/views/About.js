import {showNotification} from "../messaging.js";

export default function About(props) {
    // language=HTML
    return `
<header>
    <h1>About Page</h1>
</header>
<main>
    <div>
        <p>About page is here.</p>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="Test Title">Add Movie</button>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#add-modal" data-bs-title="Test Title 2">Add Movie 2</button>

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
                                <label for="movie-title" class="col-form-label">Recipient:</label>
                                <input type="text" class="form-control" id="movie-title">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Message:</label>
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
    </div>
</main>
    `;
}
// data-bs-title="${props.title}"
// data-bs-genre="${props.genre}"
// data-bs-rating="${props.rating}"
export function AboutEvents() {
    showNotification("Hey, a message!", "danger");
    const addModal = document.getElementById('add-modal')
    addModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        let button = event.relatedTarget
        // Extract info from data-bs-* attributes
        let title = button.getAttribute('data-bs-title')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        const modalTitle = addModal.querySelector('.modal-title')
        const modalBodyInput = addModal.querySelector('.modal-body input')

        modalTitle.textContent = 'New message to ' + title
        modalBodyInput.value = title
    })

}

