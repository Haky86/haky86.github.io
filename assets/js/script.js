/* ==========================================================================
   Theme Switcher Logic
   ========================================================================== */

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(mode) {
    localStorage.setItem('theme', mode);
    applyTheme(mode);
}

function applyTheme(mode) {
    const root = document.documentElement;
    
    // Highlight active theme switcher button
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));

    const btnDark = document.getElementById('btn-dark');
    const btnLight = document.getElementById('btn-light');
    const btnAuto = document.getElementById('btn-auto');

    if (mode === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (btnDark) btnDark.classList.add('active');
    } else if (mode === 'light') {
        root.setAttribute('data-theme', 'light');
        if (btnLight) btnLight.classList.add('active');
    } else {
        // Auto / System Detection Mode
        if (btnAuto) btnAuto.classList.add('active');
        if (systemPrefersDark.matches) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
    }
}

// Listen for OS system theme changes if set to auto mode
systemPrefersDark.addEventListener('change', () => {
    const currentMode = localStorage.getItem('theme') || 'auto';
    if (currentMode === 'auto') {
        applyTheme('auto');
    }
});

// Initialize Theme on initial page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);
});

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('is-open');
        });
    }
});

/* ==========================================================================
   Collapsible Samsung Device Cards
   ========================================================================== */

function toggleCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.toggle('open');
    }
}

function closeAllCards() {
    document.querySelectorAll('.device-card').forEach(card => {
        card.classList.remove('open');
    });
}

/* ==========================================================================
   Client-Side Search Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    let searchIndex = [];

    // Fetch search JSON index built by Jekyll
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(err => {
            console.error('Failed to load search index:', err);
        });

    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();

        if (query.length === 0) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const filteredResults = searchIndex.filter(item => 
            (item.title && item.title.toLowerCase().includes(query)) || 
            (item.content && item.content.toLowerCase().includes(query))
        );

        searchResults.innerHTML = '';

        if (filteredResults.length === 0) {
            searchResults.innerHTML = `<div class="no-results">No results found for "${this.value}"</div>`;
        } else {
            filteredResults.forEach(item => {
                const resItem = document.createElement('div');
                resItem.className = 'search-result-item';
                resItem.innerHTML = `
                    <div class="search-result-title">
                        <span>${item.title}</span>
                        <span class="search-result-type">${item.type || 'Page'}</span>
                    </div>
                    <div class="search-result-snippet">${item.content ? item.content.substring(0, 100) + '...' : ''}</div>
                `;
                resItem.addEventListener('click', () => {
                    window.location.href = item.url;
                });
                searchResults.appendChild(resItem);
            });
        }

        searchResults.classList.add('active');
    });

    // Close search dropdown on click outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
});
