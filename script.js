

class ShoppingCart {
  constructor() {
    this.listProducts = document.querySelector(".list-products");
    this.totalElement = document.querySelector(".total");
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateTotal();
  }

  attachEventListeners() {
    // Event delegation for all cart interactions
    this.listProducts.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;

      if (e.target.classList.contains("plus-btn")) {
        this.increaseQuantity(card);
      } else if (e.target.classList.contains("minus-btn")) {
        this.decreaseQuantity(card);
      } else if (e.target.classList.contains("like-btn")) {
        this.toggleLike(e.target);
      } else if (e.target.classList.contains("delete-btn")) {
        this.deleteItem(card);
      }
    });
  }

  increaseQuantity(card) {
    const quantityElement = card.querySelector(".quantity");
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity++;
    quantityElement.textContent = currentQuantity;

    // Add animation effect
    quantityElement.classList.add("updating");
    setTimeout(() => {
      quantityElement.classList.remove("updating");
    }, 300);

    this.updateTotal();
  }

  decreaseQuantity(card) {
    const quantityElement = card.querySelector(".quantity");
    let currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 0) {
      currentQuantity--;
      quantityElement.textContent = currentQuantity;

      // Add animation effect
      quantityElement.classList.add("updating");
      setTimeout(() => {
        quantityElement.classList.remove("updating");
      }, 300);

      this.updateTotal();
    }
  }

  toggleLike(likeBtn) {
    likeBtn.classList.toggle("liked");

    // Add heart beat animation
    if (likeBtn.classList.contains("liked")) {
      likeBtn.style.animation = "heartBeat 0.6s ease-in-out";
      setTimeout(() => {
        likeBtn.style.animation = "";
      }, 600);
    }
  }

  deleteItem(card) {
    // Add removing animation
    card.classList.add("removing");

    setTimeout(() => {
      card.closest(".card-body").remove();
      this.updateTotal();
      this.checkEmptyCart();
    }, 500);
  }

  updateTotal() {
    let total = 0;
    const cards = this.listProducts.querySelectorAll(".card");

    cards.forEach((card) => {
      const price = parseFloat(card.dataset.price);
      const quantity = parseInt(card.querySelector(".quantity").textContent);
      total += price * quantity;
    });

    // Animate total change
    this.totalElement.classList.add("updating");
    this.totalElement.textContent = `${total} $`;

    setTimeout(() => {
      this.totalElement.classList.remove("updating");
    }, 300);
  }

  checkEmptyCart() {
    const cards = this.listProducts.querySelectorAll(".card-body");

    if (cards.length === 0) {
      this.listProducts.innerHTML = `
              <div class="empty-cart col-12">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some amazing products to get started!</p>
              </div>
            `;
    }
  }
}

// Initialize the shopping cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ShoppingCart();
});

document
  .querySelector(".dropdown-toggle")
  .addEventListener("click", function () {
    document.querySelector(".dropdown-menu").classList.toggle("show");
  });
