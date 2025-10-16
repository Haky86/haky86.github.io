/* -----------------------------
   DOM Elements
------------------------------ */
const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav.navbar');
const themeBtn = document.querySelector('.mode-toggle');
const navItemsWithSubmenu = document.querySelectorAll('nav ul li');

/* -----------------------------
   Load Saved Theme or Default to Dark
------------------------------ */
const savedTheme = localStorage.getItem('theme');

// Apply saved theme, default to dark only if no preference
if (savedTheme === 'light') {
  document.body.classList.remove('dark');
  themeBtn.textContent = '🌞️';
} else {
  document.body.classList.add('dark');
  themeBtn.textContent = '🌛️';
}

/* -----------------------------
   Mobile Navigation Toggle
------------------------------ */
toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});

/* -----------------------------
   Mobile Submenu Toggle
------------------------------ */
navItemsWithSubmenu.forEach(item => {
  const submenu = item.querySelector('ul');
  const link = item.querySelector('a');

  if (submenu) {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('show-submenu');
        const isOpen = item.classList.contains('show-submenu');
        submenu.style.maxHeight = isOpen ? submenu.scrollHeight + 'px' : '0px';
      }
    });
  }
});

/* -----------------------------
   Theme Toggle with Persistence
------------------------------ */
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeBtn.textContent = isDark ? '🌛️' : '🌞️';
  // Save preference correctly
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* -----------------------------
   Reset Navigation on Resize
------------------------------ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelectorAll('nav ul li ul').forEach(ul => ul.style.maxHeight = '');
    document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('show-submenu'));
    nav.classList.remove('show');
  }
});
