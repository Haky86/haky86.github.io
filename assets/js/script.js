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
