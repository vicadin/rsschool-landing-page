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

/* slider */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide");
  const slides = document.querySelectorAll(".slide__item");
  const fillDots = document.querySelectorAll(".dots__item_fill");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const intervalTime = 4000;
  let interval;
  let isPaused = false;
  let currentIndex = 0;
  const slideWidth = slides[0].clientWidth;

  function goToSlide(index) {
    const currentSlideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(-${currentSlideWidth * index}px)`;
    currentIndex = index;
    updateIndicators();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
    updateIndicators();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
    updateIndicators();
  }

  function updateIndicators() {
    fillDots.forEach((fill, index) => {
      if (index === currentIndex) {
        fill.classList.add("fill-animate");
      } else {
        fill.classList.remove("fill-animate");
      }
    });
  }

  function startSlider() {
    if (!isPaused) {
      interval = setInterval(nextSlide, intervalTime);
    }
  }

  function pauseSlider() {
    clearInterval(interval);
    updateIndicators();
  }

  slider.addEventListener("mouseenter", () => {
    isPaused = true;
    pauseSlider();
    fillDots.forEach((fill) => {
      fill.style.animationPlayState = "paused";
    });
  });

  slider.addEventListener("mouseleave", () => {
    isPaused = false;
    startSlider();
    fillDots.forEach((fill) => {
      fill.style.animationPlayState = "running";
    });
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    pauseSlider();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    pauseSlider();
  });
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 100;
    const swipeLength = touchEndX - touchStartX;

    if (swipeLength > swipeThreshold) {
      prevSlide();
      pauseSlider();
    } else if (swipeLength < -swipeThreshold) {
      nextSlide();
      pauseSlider();
    }
  }

  updateIndicators();
  startSlider();

  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });
});