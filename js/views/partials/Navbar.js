import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();

    // everyone can see home
    let html = `
        <nav>
            <a class="jalopy-nav" href="/" data-link>Popcorn Cinema</a>`;

    // everyone can see about
    html = html + `<a class="jalopy-nav" href="/about" data-link>About</a>`;

    // only logged in can see user info and logout


    html = html + `</nav>`;
    return html;
}