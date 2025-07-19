/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {

    const placeholder = document.getElementById('navbar-placeholder');
    const lang = document.documentElement.lang;
    if (placeholder) {
        const navFile = lang === 'en' ? 'navbar_en.html' : 'navbar_hu.html';
        fetch(navFile)
            .then(response => response.text())
            .then(html => {
                placeholder.outerHTML = html;
                const mainNav = document.getElementById('mainNav');
                if (mainNav) {
                    mainNav.classList.add('sticky-top');
                }
            });
    } else {
        const mainNav = document.getElementById('mainNav');
        if (mainNav) {
            mainNav.classList.add('sticky-top');
        }

    }
});
