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
document.getElementById("buttonBurger").addEventListener("click", () => {
  document.getElementById("menuBurger").classList.toggle("show");
  document.getElementById("buttonBurger").classList.toggle("cross");
  document.querySelector("body").classList.toggle("hidden-scroll");
});

document.querySelectorAll(".nav__item a").forEach(function (link) {
  link.addEventListener("click", () => {
    document.getElementById("menuBurger").classList.remove("show");
    document.getElementById("buttonBurger").classList.remove("cross");
    document.querySelector("body").classList.remove("hidden-scroll");
  });
});