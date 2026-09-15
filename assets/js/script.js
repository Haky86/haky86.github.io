/* --- Theme Switcher Logic --- */
let currentThemeSetting = localStorage.getItem('user-theme') || 'auto';

function applyTheme() {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let effectiveTheme = currentThemeSetting;

  if (currentThemeSetting === 'auto') {
    effectiveTheme = systemPrefersDark ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', effectiveTheme);

  const darkBtn = document.getElementById('theme-dark');
  const lightBtn = document.getElementById('theme-light');
  const autoBtn = document.getElementById('theme-auto');

  if (darkBtn) darkBtn.classList.toggle('active', currentThemeSetting === 'dark');
  if (lightBtn) lightBtn.classList.toggle('active', currentThemeSetting === 'light');
  if (autoBtn) autoBtn.classList.toggle('active', currentThemeSetting === 'auto');
}

function setTheme(mode) {
  currentThemeSetting = mode;
  localStorage.setItem('user-theme', mode);
  applyTheme();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentThemeSetting === 'auto') {
    applyTheme();
  }
});

// Initialize theme on DOM load
applyTheme();

/* --- Mobile Menu & Collapsible Cards Logic --- */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
});

// Toggle Expandable Device Cards
function toggleCard(headerElement) {
  const card = headerElement.closest('.card');
  if (card) {
    card.classList.toggle('open');
  }
}

/* --- Live Site Search --- */
let searchIndex = [];

// Fetch index once on page load
fetch('/search.json')
  .then(response => response.json())
  .then(data => {
    searchIndex = data;
  })
  .catch(err => console.error('Failed to load search index:', err));

document.addEventListener('DOMContentLoaded', () => {
  const searchInputs = document.querySelectorAll('.search-input');

  searchInputs.forEach(input => {
    const container = input.closest('.search-container');
    let resultsContainer = container ? container.querySelector('.search-results-dropdown') : null;

    if (!resultsContainer && container) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'search-results-dropdown';
      container.appendChild(resultsContainer);
    }

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query.length < 2) {
        if (resultsContainer) resultsContainer.classList.remove('active');
        return;
      }

      const matches = searchIndex.filter(item => {
        const titleMatch = item.title && item.title.toLowerCase().includes(query);
        const contentMatch = item.content && item.content.toLowerCase().includes(query);
        return titleMatch || contentMatch;
      }).slice(0, 6); // Limit results to 6 items

      renderSearchResults(matches, resultsContainer);
    });
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      document.querySelectorAll('.search-results-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
});

function renderSearchResults(results, container) {
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = '<div class="search-result-item" style="color: var(--text-muted);">No results found</div>';
  } else {
    container.innerHTML = results.map(item => `
      <a href="${item.url}" class="search-result-item">
        <div class="search-result-type">${item.type}</div>
        <div class="search-result-title">${item.title}</div>
      </a>
    `).join('');
  }

  container.classList.add('active');
}
