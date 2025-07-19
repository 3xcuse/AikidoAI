/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    const getPlaceholder = () => document.getElementById('navbar-placeholder') || document.getElementById('mainNav');
    const lang = document.documentElement.lang;

    const loadNav = (navFile) => {
        return new Promise((resolve) => {
            const target = getPlaceholder();
            const cached = sessionStorage.getItem(navFile);
            const finalize = (html) => {
                if (target) {
                    target.outerHTML = html;
                }
                const mainNav = document.getElementById('mainNav');
                if (mainNav) {
                    mainNav.classList.add('sticky-top');
                }
                resolve();
            };
            if (cached) {
                finalize(cached);
            } else {
                fetch(navFile)
                    .then(r => r.text())
                    .then(html => {
                        sessionStorage.setItem(navFile, html);
                        finalize(html);
                    });
            }
        });
    };

    const initSpa = () => {
        const navLinks = document.querySelectorAll('#mainNav a.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
                    e.preventDefault();
                    navigate(href);
                }
            });
        });

        window.addEventListener('popstate', () => {
            navigate(location.pathname.replace(/^\//, ''), true);
        });
    };

    const updateActiveNav = (url) => {
        const navLinks = document.querySelectorAll('#mainNav a.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === url) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const navigate = (url, replace) => {
        fetch(url)
            .then(r => r.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const newHeader = doc.querySelector('header');
                const newMain = doc.querySelector('main');
                const header = document.querySelector('header');
                const main = document.querySelector('main');

                if (newHeader && header) header.replaceWith(newHeader);
                if (newMain && main) main.replaceWith(newMain);

                document.title = doc.title;
                const newDesc = doc.querySelector('meta[name="description"]');
                const desc = document.querySelector('meta[name="description"]');
                if (newDesc && desc) desc.setAttribute('content', newDesc.getAttribute('content'));

                const newLang = doc.documentElement.lang;
                if (newLang !== document.documentElement.lang) {
                    document.documentElement.lang = newLang;
                    const navFile = newLang === 'en' ? 'navbar_en.html' : 'navbar_hu.html';
                    loadNav(navFile).then(initSpa);
                } else {
                    updateActiveNav(url);
                }

                if (!replace) {
                    history.pushState({}, '', url);
                }
                window.scrollTo(0, 0);
            });
    };

    const navFile = lang === 'en' ? 'navbar_en.html' : 'navbar_hu.html';
    loadNav(navFile).then(() => {
        initSpa();
        updateActiveNav(location.pathname.replace(/^\//, '') || 'index.html');
    });
});
