// Theme Switcher Logic
const themeDarkBtn = document.getElementById('themeDarkBtn');
const themeLightBtn = document.getElementById('themeLightBtn');
const themeAutoBtn = document.getElementById('themeAutoBtn');
const systemMediaMatch = window.matchMedia('(prefers-color-scheme: dark)');

let activeThemeMode = localStorage.getItem('theme-mode') || 'auto';

function applyTheme() {
  if (activeThemeMode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (activeThemeMode === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    if (systemMediaMatch.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  if (themeDarkBtn && themeLightBtn && themeAutoBtn) {
    themeDarkBtn.classList.remove('active');
    themeLightBtn.classList.remove('active');
    themeAutoBtn.classList.remove('active');

    if (activeThemeMode === 'dark') {
      themeDarkBtn.classList.add('active');
    } else if (activeThemeMode === 'light') {
      themeLightBtn.classList.add('active');
    } else {
      themeAutoBtn.classList.add('active');
    }
  }
}

if (themeDarkBtn) {
  themeDarkBtn.addEventListener('click', () => {
    activeThemeMode = 'dark';
    localStorage.setItem('theme-mode', 'dark');
    applyTheme();
  });
}

if (themeLightBtn) {
  themeLightBtn.addEventListener('click', () => {
    activeThemeMode = 'light';
    localStorage.setItem('theme-mode', 'light');
    applyTheme();
  });
}

if (themeAutoBtn) {
  themeAutoBtn.addEventListener('click', () => {
    activeThemeMode = 'auto';
    localStorage.setItem('theme-mode', 'auto');
    applyTheme();
  });
}

systemMediaMatch.addEventListener('change', () => {
  if (activeThemeMode === 'auto') {
    applyTheme();
  }
});

applyTheme();

// Data Sets
const postsData = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: "Welcome to Haky86 Website",
  excerpt: "Welcome to the official website of Haky86. Stay tuned for the latest LineageOS builds, custom ROMs, kernel releases, and recovery updates...",
  date: "September 18, 2026"
}));

const pagesData = [
  { pageId: 'home', title: 'Home Page', content: 'Welcome to Haky86 Home Page. LineageOS Builds, AOSP Custom ROMs, kernels, recoveries.' },
  { pageId: 'blog', title: 'Blog', content: 'Haky86 Website posts, updates, releases, and announcements.' },
  { pageId: 'samsung', title: 'Samsung Devices', content: 'Supported Samsung devices list: Galaxy A23 5G, Galaxy A71.' },
  { pageId: 'samsung/a23xq', title: 'Samsung Galaxy A23 5G (a23xq)', content: 'AOSP Custom ROMs, kernel, recoveries and LineageOS 22.2 / 23.2 builds for a23xq.' },
  { pageId: 'samsung/a71', title: 'Samsung Galaxy A71 (a71)', content: 'AOSP Custom ROMs, kernel, recoveries and LineageOS 23.2 builds for a71.' },
  { pageId: 'about', title: 'About Me', content: 'Haky86 LineageOS maintainer for Samsung SM6150 and SM6375 platforms. Galaxy A23 5G, Galaxy A71, Galaxy M51.' }
];

// Navigation Logic
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');
const pageSections = document.querySelectorAll('.page-section');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

function closeAllDeviceCards() {
  document.querySelectorAll('.device-card').forEach(card => {
    card.classList.remove('open');
  });
}

function navigateTo(pageId) {
  closeAllDeviceCards();

  pageSections.forEach(section => {
    section.classList.remove('active');
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    const itemPage = item.getAttribute('data-page');
    if (itemPage === pageId || (pageId.startsWith('samsung') && itemPage === 'samsung')) {
      item.classList.add('active');
    }
  });

  const targetId = pageId.replace(/\//g, '-') + '-page';
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    targetSection.classList.add('active');
  } else {
    const homeSection = document.getElementById('home-page');
    if (homeSection) homeSection.classList.add('active');
  }

  if (pageId === 'blog') {
    renderPosts(currentPage);
  }

  const mainContainer = document.getElementById('mainContainer');
  if (mainContainer) mainContainer.scrollTop = 0;
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const pageId = item.getAttribute('data-page');
    if (pageId) {
      e.preventDefault();
      window.location.hash = pageId;
      navigateTo(pageId);
      if (navLinks) navLinks.classList.remove('open');
    }
  });
});

document.addEventListener('click', (e) => {
  const pageLink = e.target.closest('.page-link');
  if (pageLink) {
    e.preventDefault();
    const pageId = pageLink.getAttribute('data-page');
    window.location.hash = pageId;
    navigateTo(pageId);
  }
});

// Device Accordion Logic
document.querySelectorAll('.device-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.parentElement;
    if (card) card.classList.toggle('open');
  });
});

// Blog Pagination Logic
const postsPerPage = 4;
let currentPage = 1;

function renderPosts(page) {
  const postsContainer = document.getElementById('posts-container');
  if (!postsContainer) return;
  
  postsContainer.innerHTML = '';

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const pagePosts = postsData.slice(startIndex, endIndex);

  pagePosts.forEach(post => {
    const postElement = document.createElement('article');
    postElement.className = 'post-card';
    postElement.innerHTML = `
      <div class="post-preview">Haky86</div>
      <h3 class="post-title"><a href="#post-${post.id}">${post.title}</a></h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">${post.date}</div>
    `;
    postsContainer.appendChild(postElement);
  });

  renderPagination();
}

function renderPagination() {
  const paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;
  
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(postsData.length / postsPerPage);
  if (totalPages <= 1) return;

  const mainContainer = document.getElementById('mainContainer');

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts(currentPage);
      if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.classList.add('active-page');
    }
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderPosts(currentPage);
      if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPosts(currentPage);
      if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationContainer.appendChild(nextBtn);
}

// Search Component Logic
const searchInput = document.getElementById('searchInput');
const searchResultsDropdown = document.getElementById('searchResultsDropdown');

if (searchInput && searchResultsDropdown) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      searchResultsDropdown.classList.remove('active');
      searchResultsDropdown.innerHTML = '';
      return;
    }

    const activePagesData = (window.siteSearchData && window.siteSearchData.pages) || pagesData;
    const activePostsData = (window.siteSearchData && window.siteSearchData.posts) || postsData;

    const matchedPages = activePagesData.filter(page => 
      (page.title && page.title.toLowerCase().includes(query)) || 
      (page.content && page.content.toLowerCase().includes(query)) ||
      (page.excerpt && page.excerpt.toLowerCase().includes(query))
    );

    const matchedPosts = activePostsData.filter(post => 
      (post.title && post.title.toLowerCase().includes(query)) || 
      (post.excerpt && post.excerpt.toLowerCase().includes(query))
    );

    if (matchedPages.length === 0 && matchedPosts.length === 0) {
      searchResultsDropdown.innerHTML = `<div class="search-no-results">No results found for "${e.target.value}"</div>`;
      searchResultsDropdown.classList.add('active');
      return;
    }

    let dropdownHTML = '';

    if (matchedPages.length > 0) {
      dropdownHTML += `<div class="search-category-title">Pages</div>`;
      matchedPages.forEach(page => {
        const url = page.url || `#${page.pageId}`;
        const desc = page.content || page.excerpt || '';
        dropdownHTML += `
          <div class="search-result-item" data-type="page" data-url="${url}" data-page="${page.pageId || ''}">
            <span class="search-item-title">${page.title}</span>
            <span class="search-item-desc">${desc}</span>
          </div>
        `;
      });
    }

    if (matchedPosts.length > 0) {
      dropdownHTML += `<div class="search-category-title">Posts</div>`;
      matchedPosts.forEach(post => {
        const url = post.url || `#post-${post.id}`;
        dropdownHTML += `
          <div class="search-result-item" data-type="post" data-url="${url}" data-page="blog">
            <span class="search-item-title">${post.title}</span>
            <span class="search-item-desc">${post.excerpt}</span>
          </div>
        `;
      });
    }

    searchResultsDropdown.innerHTML = dropdownHTML;
    searchResultsDropdown.classList.add('active');
  });

  searchResultsDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) {
      const targetUrl = item.getAttribute('data-url');
      const pageId = item.getAttribute('data-page');

      if (targetUrl && !targetUrl.startsWith('#')) {
        window.location.href = targetUrl;
      } else if (pageId) {
        window.location.hash = pageId;
        navigateTo(pageId);
      }

      searchInput.value = '';
      searchResultsDropdown.classList.remove('active');
      searchResultsDropdown.innerHTML = '';
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-input-wrapper')) {
      searchResultsDropdown.classList.remove('active');
    }
  });
}

// Lifecycle Listeners
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (pageSections.length > 0) {
    navigateTo(hash || 'home');
  }
});

window.addEventListener('load', () => {
  closeAllDeviceCards();
  const hash = window.location.hash.replace('#', '');
  if (pageSections.length > 0) {
    navigateTo(hash || 'home');
  }
});
