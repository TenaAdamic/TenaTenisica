// FAQ Section

document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.getElementById(
        button.getAttribute("data-collapse-target")
      );
      const chevron = button.querySelector(".chevron");

      if (target.style.display === "block") {
        target.style.display = "none";
        chevron.classList.remove("rotate");
      } else {
        // Close all accordion contents
        document.querySelectorAll(".accordion-content").forEach((content) => {
          content.style.display = "none";
        });
        // Reset all chevrons
        document.querySelectorAll(".chevron").forEach((chev) => {
          chev.classList.remove("rotate");
        });

        // Open the clicked accordion content
        target.style.display = "block";
        chevron.classList.add("rotate");
      }
    });
  });
});

// "Rezerviraj Termin" form

document.addEventListener("DOMContentLoaded", () => {
  const bookingButton = document.querySelector(".booking-button");
  const buttonBookLive = document.querySelector("#cta-button-outline");
  const modal = document.querySelector(".modal-content");

  const closeButton = document.querySelector(".close");

  function showModal() {
    modal.style.display = "block";
  }

  bookingButton.addEventListener("click", showModal);

  function hideModal() {
    modal.style.display = "none";
  }

  closeButton.addEventListener("click", hideModal);

  const form = document.querySelector("#form-content");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("message").value;

    if (email.value == "" || message.value == "") {
      alert("Potrebno je ispuniti oba polja");
    } else {
      alert("Uspješno poslano!");

      email.value = "";
      message.value = "";
    }
  });
});

// Vanilla JavaScript Carousel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("testimonial-carousel");
  const dotsContainer = document.getElementById("carousel-dots");
  const items = carousel.children;
  const itemsLength = items.length;
  let currentIndex = 0;
  let dotElements = [];

  function updateCarousel() {
    // Hide all items
    for (let i = 0; i < itemsLength; i++) {
      items[i].style.display = "none";
      dotElements[i].classList.remove("active");
    }
    // Show the current item
    items[currentIndex].style.display = "block";
    dotElements[currentIndex].classList.add("active");
  }

  function createDots() {
    for (let i = 0; i < itemsLength; i++) {
      let dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", function () {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
      dotElements.push(dot);
    }
  }

  createDots();
  updateCarousel();

  // Automatically cycle through items every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % itemsLength;
    updateCarousel();
  }, 30000);
});
