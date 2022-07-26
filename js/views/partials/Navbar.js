import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();

    // everyone can see home
    let html = `
        <nav>
            <a id="logo-text" class="jalopy-nav" href="/" data-link><img src="assets/logo.png" alt="popcorn">Popcorn Cinema</a>`;


    html = html + `
        

<a class="jalopy-nav" href="/about" data-link>About</a>
`;






    html = html + `</nav>`;
    return html;
}