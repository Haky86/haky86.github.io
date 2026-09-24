/* ==========================================================================
   assets/js/script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------- DYNAMIC YEAR ----------------
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ---------------- DARK / LIGHT / AUTO MODE SWITCHER ----------------
    const themeSwitcherBtn = document.getElementById('themeSwitcher');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;
    const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modes order: auto -> light -> dark
    const modes = ['auto', 'light', 'dark'];
    let currentMode = localStorage.getItem('user-theme-mode') || 'auto';

    function applyTheme(mode) {
        let activeTheme = mode;
        if (mode === 'auto') {
            activeTheme = systemDarkQuery.matches ? 'dark' : 'light';
        }
        
        htmlElement.setAttribute('data-theme', activeTheme);

        if (themeIcon && themeSwitcherBtn) {
            if (mode === 'auto') {
                themeIcon.textContent = '📱️';
                themeSwitcherBtn.title = 'Theme: System (Auto)';
            } else if (mode === 'light') {
                themeIcon.textContent = '🌞️';
                themeSwitcherBtn.title = 'Theme: Light';
            } else if (mode === 'dark') {
                themeIcon.textContent = '🌝️';
                themeSwitcherBtn.title = 'Theme: Dark';
            }
        }
    }

    if (themeSwitcherBtn) {
        themeSwitcherBtn.addEventListener('click', () => {
            const currentIndex = modes.indexOf(currentMode);
            currentMode = modes[(currentIndex + 1) % modes.length];
            localStorage.setItem('user-theme-mode', currentMode);
            applyTheme(currentMode);
        });
    }

    // System preference change listener
    systemDarkQuery.addEventListener('change', () => {
        if (currentMode === 'auto') {
            applyTheme('auto');
        }
    });

    // Synchronize button UI state with pre-loaded theme
    applyTheme(currentMode);

    // ---------------- DYNAMIC NAV POSITIONING ----------------
    function updateNavPosition() {
        const header = document.getElementById('siteHeader');
        const nav = document.getElementById('siteNav');
        if (window.innerWidth > 768 && header && nav) {
            nav.style.top = header.offsetHeight + 'px';
        } else if (nav) {
            nav.style.top = '0px';
        }
    }

    window.addEventListener('resize', updateNavPosition);
    updateNavPosition();

    // ---------------- MOBILE MENU TOGGLE ----------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // ---------------- SEARCH WIDGET & DROPDOWN (PAGES + POSTS) ----------------
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchData = [];

    // Fetch posts and pages from generated search.json
    fetch('/search.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            searchData = data;
        })
        .catch(error => {
            console.error('Error fetching search.json:', error);
        });

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            searchResults.innerHTML = '';

            if (query === '') {
                searchResults.classList.remove('active');
                return;
            }

            const filteredItems = searchData.filter(item => {
                const titleMatch = item.title && item.title.toLowerCase().includes(query);
                const slugMatch = item.slug && item.slug.toLowerCase().includes(query);
                const keywordMatch = Array.isArray(item.keywords) && item.keywords.some(kw => kw.toLowerCase().includes(query));

                return titleMatch || slugMatch || keywordMatch;
            });

            if (filteredItems.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No pages or posts found</div>';
            } else {
                filteredItems.forEach(item => {
                    const resultItem = document.createElement('a');
                    resultItem.className = 'search-result-item';
                    resultItem.href = item.url;
                    resultItem.style.textDecoration = 'none';
                    resultItem.style.color = 'inherit';
                    resultItem.style.display = 'block';

                    resultItem.innerHTML = `
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-slug">${item.slug}</div>
                    `;

                    searchResults.appendChild(resultItem);
                });
            }

            searchResults.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // ---------------- DEVICE CARDS TOGGLE ----------------
    const deviceCards = document.querySelectorAll('.device-card');

    deviceCards.forEach(card => {
        const header = card.querySelector('.card-header');
        if (header) {
            header.addEventListener('click', () => {
                card.classList.toggle('open');
            });
        }
    });
});
