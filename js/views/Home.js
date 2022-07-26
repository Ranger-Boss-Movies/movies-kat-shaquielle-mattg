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
        
        <main>
    `;
}

function displayMovieHTML(movies) {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        html +=
        `<div class="container">
            <div class="row">
                <div class="col-lg-2">
                      <p>${movies[i].title}</p>
                      <p>Rating</p>
                </div>
            </div>
        </div>
    `;
    }
    return html
}

function getBottomMovieHTML() {
    return `
        </main>`;
}

export function HomeEvents() {
    // TODO: use an enum for message type
    // const authority = getUserRole();
    const user = getUser();
    if(!user) {
        showNotification("Welcome visitor", "secondary");
    } else {
        showNotification("Welcome " + user.userName, "info");
    }
}