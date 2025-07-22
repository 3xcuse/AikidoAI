/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    const getPlaceholder = () => document.getElementById('navbar-placeholder') || document.getElementById('mainNav');
    const lang = document.documentElement.lang;

    const fadeDuration = 300;
    const fadeOut = (el) => {
        if (!el) return Promise.resolve();
        el.classList.add('fade-through-transition', 'fade-through-hidden');
        return new Promise(r => setTimeout(r, fadeDuration));
    };
    const fadeIn = (el) => {
        if (!el) return;
        el.classList.add('fade-through-transition', 'fade-through-hidden');
        requestAnimationFrame(() => el.classList.remove('fade-through-hidden'));
    };

    const initLightbox = () => {
        const items = document.querySelectorAll('.gallery-item');
        const modalEl = document.getElementById('lightboxModal');
        if (!modalEl) return;
        const modal = new bootstrap.Modal(modalEl);
        const body = modalEl.querySelector('.modal-body');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const type = item.dataset.type;
                const src = item.dataset.src || item.getAttribute('src');
                body.innerHTML = '';
                if (type === 'video') {
                    const video = document.createElement('video');
                    video.controls = true;
                    video.className = 'img-fluid rounded';
                    video.src = src;
                    body.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.className = 'img-fluid rounded';
                    img.src = src;
                    body.appendChild(img);
                }
                modal.show();
            });
        });
    };

    const initNavScroll = (mainNav) => {
        let scrollPos = 0;
        const headerHeight = mainNav.clientHeight;
        window.addEventListener('scroll', () => {
            const currentTop = document.body.getBoundingClientRect().top * -1;
            if (currentTop < scrollPos) {
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible');
                } else {
                    mainNav.classList.remove('is-visible', 'is-fixed');
                }
            } else {
                mainNav.classList.remove('is-visible');
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }
            scrollPos = currentTop;
        });
    };

    const loadNav = (navFile) => {
        return new Promise((resolve) => {
            const target = getPlaceholder();
            const cached = sessionStorage.getItem(navFile);
            const finalize = (html) => {
                if (target) {
                    target.outerHTML = html;
                }
                const collapseEl = document.getElementById('navbarResponsive');
                if (collapseEl) {
                    bootstrap.Collapse.getOrCreateInstance(collapseEl);
                }
                const mainNav = document.getElementById('mainNav');
                if (mainNav) {
                    initNavScroll(mainNav);
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
                    const navCollapseEl = document.getElementById('navbarResponsive');
                    const navCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
                    if (navCollapseEl.classList.contains('show')) {
                        navCollapse.hide();
                    }
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
