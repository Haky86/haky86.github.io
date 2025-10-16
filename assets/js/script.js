/* -----------------------------
   DOM Elements
------------------------------ */
const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav.navbar');
const themeBtn = document.querySelector('.mode-toggle');
const navItemsWithSubmenu = document.querySelectorAll('nav ul li');

/* -----------------------------
   Load Saved Theme
------------------------------ */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
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
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? '🌛️' : '🌞️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* -----------------------------
   Reset Navigation on Resize
------------------------------ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelectorAll('nav ul li ul').forEach(ul => {
      ul.style.maxHeight = '';
    });
    document.querySelectorAll('nav ul li').forEach(li => {
      li.classList.remove('show-submenu');
    });
    nav.classList.remove('show');
  }
});

/* -----------------------------
   Digital Clock
------------------------------ */
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  const clockEl = document.getElementById('digital-clock');
  if (clockEl) {
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

setInterval(updateClock, 1000);
updateClock();
