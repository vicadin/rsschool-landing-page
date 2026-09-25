  /* theme switcher */
const themeSwitcher = document.getElementById('themeSwitcher');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  function switchTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  themeSwitcher.addEventListener('click', switchTheme);
  
  themeSwitcher.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchTheme();
    }
  });

  /* burger */
const burgerButton = document.getElementById("buttonBurger");
const burgerMenu = document.getElementById("menuBurger");
const body = document.body;

function closeMenu() {
  burgerMenu.classList.remove("show");
  burgerButton.classList.remove("cross");
  body.classList.remove("hidden-scroll");
}

burgerButton.addEventListener("click", () => {
  burgerMenu.classList.toggle("show");
  burgerButton.classList.toggle("cross");
  body.classList.toggle("hidden-scroll");
});

document.querySelectorAll(".nav__item a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && burgerMenu.classList.contains("show")) {
    closeMenu();
  }
});