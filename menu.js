/* menu */
const cardList = document.querySelector(".card-list");
const filterButtons = document.querySelectorAll(".filter-menu__item");
const loadMoreBtn = document.getElementById("loadMore");
let drinksData = [];
let currentCategory = "coffee";
let itemsToShow = 4;

function createCardMarkup(drink) {
  return `
        <div class="card" data-category="${drink.category}">
            <div class="card-img">
                <figure>
                    <img src="assets/images/${drink.name
                      .toLowerCase()
                      .replace(/ /g, "-")}.jpg" alt="${drink.name}" />
                </figure>
            </div>
            <div class="card-content">
                <div>
                    <h2 class="heading-3 card-content__title">${drink.name}</h2>
                    <p class="text-medium card-content__desc">${
                      drink.description
                    }</p>
                </div>
                <p class="heading-3 card-content__price">$${drink.price}</p>
            </div>
        </div>
    `;
}

function displayFilteredCards(category, count) {
  const filteredCards = drinksData.filter(
    (drink) => drink.category === category
  );

  cardList.innerHTML = "";
  filteredCards.slice(0, count).forEach((drink) => {
    const cardMarkup = createCardMarkup(drink);
    cardList.innerHTML += cardMarkup;
  });

  if (filteredCards.length <= count) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "flex";
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const productName = card.querySelector(
        ".card-content__title"
      ).textContent;

      const productData = drinksData.find(
        (product) => product.name === productName
      );
      showModal(productData);
    });
  });
}

loadMoreBtn.addEventListener("click", function () {
  itemsToShow += 4;
  displayFilteredCards(currentCategory, itemsToShow);
});

function filterCards(category) {
  itemsToShow = window.innerWidth <= 768 ? 4 : 8;
  currentCategory = category;
  displayFilteredCards(currentCategory, itemsToShow);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterCards(category);
    filterButtons.forEach((btn) => {
      btn.classList.remove("filter-menu__item_active");
    });
    button.classList.add("filter-menu__item_active");
  });
});

fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    drinksData = data;
    filterCards("coffee");
  })
  .catch((error) => {
    console.error(error);
  });

window.addEventListener("resize", function () {
  itemsToShow = window.innerWidth <= 768 ? 4 : 8;
  displayFilteredCards(currentCategory, itemsToShow);
});

/* modal */
function showModal(productData) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div>
      <img src="assets/images/${productData.name
        .toLowerCase()
        .replace(/ /g, "-")}.jpg" class="tab__img" alt="${productData.name}">
    </div>
    <div>
      <h2 class="heading-3">${productData.name}</h2>
      <p class="text-medium modal__desc">${productData.description}</p>
      <p class="text-medium">Size</p>
      <div class="tab__row">
        ${Object.keys(productData.sizes)
          .map(
            (size) => `
          <div class="tab text-button" data-size="${size}">
            <div class="tab__size">
              <p class="">${size}</p>
            </div>
            <p>${productData.sizes[size].size}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <p class="text-medium">Additives</p>
      <div class="tab__row">
        ${productData.additives
          .map(
            (additive, index) => `
          <div class="tab text-button" data-index="${index}">
            <div class="tab__size">
              <p class="">${index + 1}</p>
            </div>
            <p>${additive.name}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="heading-3 modal__price">
        <p>Total:</p>
        <p id="totalPrice">${productData.price}</p>
      </div>
      <div class="modal__info">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_268_12877)">
      <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_268_12877">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      <p class="text-caption">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
      </div>
      <button class="btn-icon-dark modal__btn text-button">Close</button>
    </div>
  `;

  const sizes = modal.querySelectorAll(".tab.text-button[data-size]");
  const defaultSize = modal.querySelector(".tab.text-button[data-size='s']");

  sizes.forEach((size) => {
    size.addEventListener("click", () => {
      sizes.forEach((el) => el.classList.remove("tab-active"));
      size.classList.add("tab-active");
      updatePrice();
    });
  });

  if (defaultSize) {
    defaultSize.classList.add("tab-active");
  }

  const additives = modal.querySelectorAll(".tab.text-button[data-index]");
  additives.forEach((additive) => {
    additive.addEventListener("click", () => {
      additive.classList.toggle("tab-active");
      updatePrice();
    });
  });

  function updatePrice() {
    let basePrice = parseFloat(productData.price);

    const selectedSize = modal.querySelector(
      ".tab.text-button[data-size].tab-active"
    );
    if (selectedSize) {
      const sizeValue = selectedSize.dataset.size;
      if (sizeValue === "s") {
        basePrice += 0;
      } else if (sizeValue === "m") {
        basePrice += 0.5;
      } else if (sizeValue === "l") {
        basePrice += 1.0;
      }
    }

    const selectedAdditives = modal.querySelectorAll(
      ".tab.text-button[data-index].tab-active"
    );
    selectedAdditives.forEach(() => {
      basePrice += 0.5;
    });

    const totalPriceElement = modal.querySelector("#totalPrice");
    if (totalPriceElement) {
      totalPriceElement.textContent = `$${basePrice.toFixed(2)}`;
    }
  }

  updatePrice();

  document.body.appendChild(modal);
  const overlay = document.getElementById("overlay");
  overlay.classList.add("show");
  document.body.classList.add("hidden-scroll");

  function closeModal() {
    modal.remove();
    overlay.classList.remove("show");
    document.body.classList.remove("hidden-scroll");

    document.removeEventListener("keydown", handleEscapeKey);
    overlay.removeEventListener("click", closeModal);
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  const closeModalButton = modal.querySelector(".modal__btn");
  closeModalButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", handleEscapeKey);
}