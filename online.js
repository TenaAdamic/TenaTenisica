const texts = {
  hr: {
    chooseSix: "Odaberi 6 karata",
  },
  en: {
    chooseSix: "Select 6 cards",
  },
};

// Temporarily disable orientation handling to fix the blank page issue
// This feature needs to be implemented differently to avoid conflicts

// Original comment preserved for reference:
// Napravi click event na deck-back-img: kada se klikne, rest-of-back div se sakrije (display none), a spread-container postane vidljiv (opacity 1). Moram pomaknuti prvu kartu (spread-deck-back) na drugi kraj ekrana, desno (transition, transform, translate). Moram posložiti kako će ostale karte stajati u spread containeru (svaku pomaknuti u desno za 43px, zadnja ostaje na mjestu, dakle 20 karata mičem u desno (860: 20 = 43) ), tako da raširene karte odmah budu vidljive kada se klikne na deck-back-img

document.addEventListener("DOMContentLoaded", () => {
  const deckBackImg = document.querySelector(".deck-back-img");
  const restOfBack = document.querySelector(".rest-of-deck");
  const spreadContainer = document.querySelector(".spread-container");
  const spreadDeckBack = document.querySelector("#spread-deck-back");
  const backCardsSpread = document.querySelectorAll(".back-cards-spread");
  const displayPrompt = document.querySelector(".display-prompt");
  const shuffleButton = document.querySelector(".shuffle");
  const backCards = document.querySelectorAll(".rest-of-deck .back-cards");

  const showContainer = document.querySelector(".show-container");
  const facingCards = Array.from(
    showContainer.querySelectorAll(".facing-card")
  );

  const userLanguage = document.documentElement.lang;

  let selectedCount = 0;
  const totalCards = 6;
  const shuffleTimes = 18; // No of shuffles
  let zIndex = backCards.length; // Initial z-index

  // Function to move the specific cards
  function shuffleCards() {
    let shuffleCount = 0;
    const lastCard = backCards[backCards.length - 1];

    const interval = setInterval(() => {
      if (shuffleCount >= shuffleTimes) {
        clearInterval(interval);

        // position and z-index of the cards at the end
        deckBackImg.style.transform = "translate(0, 0)";
        lastCard.style.transform = "translate(0, 0)";

        // deckBackImg is back on top
        deckBackImg.style.zIndex = zIndex;

        return;
      }

      // Move the deckBackImg to the right and up
      // Move the last card to the left
      if (shuffleCount % 2 === 0) {
        deckBackImg.style.transform = "translate(80px, -14px)";
        lastCard.style.transform = "translate(-8px, 0)";

        deckBackImg.style.zIndex = zIndex - 1;
      } else {
        deckBackImg.style.transform = "translate(0, 0)";
        lastCard.style.transform = "translate(0, 0)";

        deckBackImg.style.zIndex = zIndex;
      }

      shuffleCount++;
    }, 160);
  }

  // shuffle button event
  shuffleButton.addEventListener("click", shuffleCards);

  // deck-back-img click event
  deckBackImg.addEventListener("click", function () {
    const baseDistance = 1000;
    const decrement = 50;
    let zIndex = 119;

    // Sakrij the 'rest-of-deck' div
    restOfBack.style.display = "none";
    document.querySelector(".instructions").classList.add("hidden");
    document.querySelector(".reading-intro").classList.add("hidden");
    document.querySelector("#start-over").style.display = "block";

    // if screen width is smaller than 1200px
    if (window.innerWidth < 1200) {
      document.querySelector(".deck-container").classList.add("margin-24");
    }

    // 'spread-container' div with a fade-in effect
    spreadContainer.style.opacity = "1";
    displayPrompt.style.display = "flex";
    
    const lang = document.querySelector("html").getAttribute("lang");
    displayPrompt.innerHTML = texts[lang].chooseSix;

    spreadDeckBack.classList.add("move-right");

    // Loop
    backCardsSpread.forEach((card, i) => {
      if (card.id !== "20") {
        // Sve osim karte s id="20"
        const distance = baseDistance - i * decrement;
        card.style.transform = `translateX(${distance}px)`;
        card.style.zIndex = zIndex--; // Decrease z-index for each card
      }
    });
  });

  // Function to show the custom alert
  function showCustomAlert(message) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = customAlert.querySelector("p");
    alertMessage.textContent = message;
    customAlert.style.display = "block";
  }

  // hide
  function hideCustomAlert() {
    const customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none";
  }

  // "OK" button
  document
    .getElementById("alertOkButton")
    .addEventListener("click", hideCustomAlert);

  // kada kliknem back card (event)
  backCardsSpread.forEach((card) => {
    card.addEventListener("click", function () {
      if (!card.classList.contains("clicked")) {
        selectedCount++;
        card.classList.add("clicked");

        // prompts based on language
        if (selectedCount === 5) {
          displayPrompt.innerHTML =
            userLanguage === "en"
              ? "Select one more card"
              : "Odaberi još jednu kartu";
        } else if (selectedCount === 1) {
          displayPrompt.innerHTML =
            userLanguage === "en"
              ? "Select 5 more cards"
              : `Odaberi još 5 karata`;
        } else if (selectedCount < totalCards) {
          displayPrompt.innerHTML =
            userLanguage === "en"
              ? `Select ${totalCards - selectedCount} more cards`
              : `Odaberi još ${totalCards - selectedCount} karte`;
        } else if (selectedCount === totalCards) {
          displayPrompt.innerHTML =
            userLanguage === "en"
              ? 'Find your reading <i class="fas fa-arrow-right"></i>'
              : 'Preuzmi čitanje <i class="fas fa-arrow-right"></i>';
        } else {
          // Example of when more than 6 cards are selected
          card.classList.remove("clicked");
          showCustomAlert(
            userLanguage === "en"
              ? "You have already selected 6 cards"
              : "Već ste odabrali 6 karata"
          );
        }

        // Make the prompt visible
        displayPrompt.style.display = "flex";
      }
    });
  });

  // // Add the event listener for the prompt separately
  // displayPrompt.addEventListener('click', function () {
  //     if (displayPrompt.innerHTML.includes('Preuzmi čitanje')) {
  //         document.querySelector('.show-container').style.opacity = '1';
  //     }
  // });

  // spreadDeckBack click event
  spreadDeckBack.addEventListener("click", function () {
    if (!spreadDeckBack.classList.contains("clicked")) {
      selectedCount++;
      spreadDeckBack.classList.add("clicked");

      // if (selectedCount === 5) {
      //   displayPrompt.innerHTML = "Odaberi još jednu kartu";
      // } else if (selectedCount === 1) {
      //   displayPrompt.innerHTML = `Odaberi još ${
      //     totalCards - selectedCount
      //   } karata`;
      // } else if (selectedCount < totalCards) {
      //   displayPrompt.innerHTML = `Odaberi još ${
      //     totalCards - selectedCount
      //   } karte`;
      // } else if (selectedCount === totalCards) {
      //   displayPrompt.innerHTML =
      //     'Preuzmi čitanje <i class="fas fa-arrow-right"></i>';
      // } else {
      //   spreadDeckBack.classList.remove("clicked");
      //   showCustomAlert("Već ste odabrali 6 karata");
      // }

      // prompts based on language
      if (selectedCount === 5) {
        displayPrompt.innerHTML =
          userLanguage === "en"
            ? "Select one more card"
            : "Odaberi još jednu kartu";
      } else if (selectedCount === 1) {
        displayPrompt.innerHTML =
          userLanguage === "en"
            ? "Select 5 more cards"
            : `Odaberi još 5 karata`;
      } else if (selectedCount < totalCards) {
        displayPrompt.innerHTML =
          userLanguage === "en"
            ? `Select ${totalCards - selectedCount} more cards`
            : `Odaberi još ${totalCards - selectedCount} karte`;
      } else if (selectedCount === totalCards) {
        displayPrompt.innerHTML =
          userLanguage === "en"
            ? 'Find your reading <i class="fas fa-arrow-right"></i>'
            : 'Preuzmi čitanje <i class="fas fa-arrow-right"></i>';
      } else {
        // Example of when more than 6 cards are selected
        spreadDeckBack.classList.remove("clicked");
        showCustomAlert(
          userLanguage === "en"
            ? "You have already selected 6 cards"
            : "Već ste odabrali 6 karata"
        );
      }

      displayPrompt.style.display = "flex";
    }
  });

  function displaySelectedCards() {
    // hide some elements that don't need to be visible
    document
      .querySelector(".deck-and-spread-container")
      .classList.add("hidden");
    document.querySelector(".instructions").classList.add("hidden");
    document.querySelector(".past-present-future").style.display = "flex";
    document.querySelector(".styled-text").classList.add("hidden");
    document.querySelector(".slider").classList.add("hidden");
    document.querySelector(".personalized-section").classList.add("hidden");
    displayPrompt.classList.add("hidden");

    document.querySelector(".show-container").style.display = "flex";

    // Scroll to the push-down-container or online-reading div
    const scrollTarget = document.querySelector(".push-down-container") || document.querySelector(".online-reading");
    if (scrollTarget) {
      window.scrollTo({
        top: scrollTarget.offsetTop,
        behavior: "smooth",
      });
    }
  }

  // array s porukama
  // const messages = [
  //   "Kako ti vidiš sebe?",
  //   "Što kaže tvoja podsvjest?",
  //   "Što u prošlosti je dovelo do ove situacije?",
  //   "Što moraš znati upravo sada?",
  //   "Kako bi se situacija mogla razvijati u budućnosti?",
  //   "Koja je poruka Tarota?",
  // ];

  // const userLanguage = document.documentElement.lang;

  // Array of messages in Croatian (default)
  const messagesHr = [
    "Kako ti vidiš sebe?",
    "Što kaže tvoja podsvijest?",
    "Što u prošlosti je dovelo do ove situacije?",
    "Što moraš znati upravo sada?",
    "Kako bi se situacija mogla razvijati u budućnosti?",
    "Koja je poruka Tarota?",
  ];

  // Array of messages in English
  const messagesEn = [
    "How do you see yourself?",
    "What does your subconscious say?",
    "What in the past led to this situation?",
    "What do you need to know right now?",
    "How could the situation develop in the future?",
    "What is the message of the Tarot?",
  ];

  // Choose the appropriate array based on the user's language
  const messages = userLanguage === "en" ? messagesEn : messagesHr;

  // event listener na "preuzmi čitanje"
  displayPrompt.addEventListener("click", function () {
    if (
      displayPrompt.innerHTML.includes("Preuzmi čitanje") ||
      displayPrompt.innerHTML.includes("Find your reading")
    ) {
      facingCards.forEach((card) => {
        card.style.display = "none";

        const h3 = card.querySelector("h3");
        if (h3) {
          h3.innerHTML = "";
        }
      });

      // Select 6 random "facing-card" divs
      const selectedCards = [];
      while (selectedCards.length < 6) {
        const randomIndex = Math.floor(Math.random() * facingCards.length);
        const selectedCard = facingCards[randomIndex];
        if (!selectedCards.includes(selectedCard)) {
          selectedCards.push(selectedCard);
        }
      }

      if (selectedCards.length === 6) {
        displaySelectedCards();
      }

      selectedCards.forEach((card, index) => {
        card.style.display = "flex";
        // update the h3 element's innerHTML with the corresponding message
        const h3 = card.querySelector("h3");
        if (h3) {
          h3.innerHTML = messages[index];
        }
      });

      showContainer.style.display = "flex";
    }
  });
});

// Carousel

document.addEventListener("DOMContentLoaded", () => {
  const indicators = document.querySelectorAll(
    ".slider .indicators .indicator"
  );
  const arrowPrev = document.querySelector(".slider .arrows .arrow-prev");
  const arrowNext = document.querySelector(".slider .arrows .arrow-next");

  const handleIndicatorClick = (event) => {
    console.log("Indicator clicked:", event.target);
    const indicator = event.target;
    if (!isActive(indicator)) {
      removeActive();
      addActive(indicator);
      showSlide(indicator.dataset.slide);
    }
  };

  const handlePrevArrowClick = (event) => {
    console.log("Prev arrow clicked");
    let activeSlide = 0;
    let newActiveSlide = indicators.length;
    let ready = false;

    indicators.forEach((indicator) => {
      if (isActive(indicator) && !ready) {
        activeSlide = indicator.dataset.slide;
        if (activeSlide !== "1") {
          newActiveSlide = parseInt(activeSlide) - 1;
        }
        removeActive();
        addActive(
          document.querySelector(
            `.slider .indicators [data-slide='${newActiveSlide}']`
          )
        );
        showSlide(newActiveSlide);
        ready = true;
      }
    });
  };

  const handleNextArrowClick = (event) => {
    console.log("Next arrow clicked");
    let activeSlide = 0;
    let newActiveSlide = 1;
    let ready = false;

    indicators.forEach((indicator) => {
      if (isActive(indicator) && !ready) {
        activeSlide = indicator.dataset.slide;
        if (activeSlide !== indicators.length.toString()) {
          newActiveSlide = parseInt(activeSlide) + 1;
        }
        removeActive();
        addActive(
          document.querySelector(
            `.slider .indicators [data-slide='${newActiveSlide}']`
          )
        );
        showSlide(newActiveSlide);
        ready = true;
      }
    });
  };

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", handleIndicatorClick);
  });

  arrowPrev.addEventListener("click", handlePrevArrowClick);
  arrowNext.addEventListener("click", handleNextArrowClick);

  function isActive(indicator) {
    return indicator.hasAttribute("active");
  }

  function removeActive() {
    document
      .querySelectorAll(".slider .indicators [active]")
      .forEach((item) => {
        item.removeAttribute("active");
      });
  }

  function addActive(indicator) {
    indicator.setAttribute("active", "");
  }

  function showSlide(newActiveSlide) {
    const newPosition = (100 * (newActiveSlide - 1)).toString();
    console.log("Moving to position:", newPosition);
    document.querySelector(
      ".slider-inner"
    ).style.marginLeft = `-${newPosition}%`;
  }
});

// Prebaci na "Pripreme za čitanje"

document.querySelector(".slider-button").addEventListener("click", function () {
  const targetSection = document.querySelector(".slider-placeholder");

  targetSection.scrollIntoView({ behavior: "smooth" });
});

// Enhanced orientation handler for mobile devices with multiple detection methods
(function() {
  // Create and add rotation message element with dismiss button
  const rotateMessage = document.createElement('div');
  rotateMessage.className = 'rotate-message';
  const lang = document.documentElement.lang;
  rotateMessage.innerHTML = `
    <div class="rotate-message-icon">📱</div>
    <h2>${lang === 'hr' ? 'Rotiraj uređaj' : 'Rotate Your Device'}</h2>
    <p>${lang === 'hr' ?
      'Za bolje iskustvo, molimo okrenite uređaj u vodoravni položaj' :
      'For the best experience, please rotate your device to landscape mode'}</p>
    <button class="rotate-message-dismiss" style="margin-top: 1rem; padding: 0.5rem 1rem; background-color: #622569; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
      ${lang === 'hr' ? 'Nastavi u portret orijentaciji' : 'Continue in portrait'}
    </button>
  `;
  rotateMessage.style.display = 'none';
  document.body.appendChild(rotateMessage);

  // Track if user manually dismissed
  let userDismissed = false;

  // Add dismiss handler
  rotateMessage.querySelector('.rotate-message-dismiss')?.addEventListener('click', () => {
    rotateMessage.style.display = 'none';
    userDismissed = true;
  });

  // Use matchMedia for reliable orientation detection
  const portraitQuery = window.matchMedia('(orientation: portrait)');

  // Debounce timeout reference
  let orientationCheckTimeout;

  // Function to check if we should show rotation message
  function checkOrientation() {
    // Don't show if user manually dismissed
    if (userDismissed) {
      return;
    }

    const spreadContainer = document.querySelector('.spread-container');
    const displayPrompt = document.querySelector('.display-prompt');
    const isMobile = window.innerWidth <= 768;

    // Use multiple methods to detect portrait orientation (most reliable first)
    let isPortrait;
    if (portraitQuery && portraitQuery.matches !== undefined) {
      // Method 1: matchMedia (most reliable)
      isPortrait = portraitQuery.matches;
    } else if (window.screen?.orientation?.type) {
      // Method 2: Screen Orientation API (modern browsers)
      isPortrait = window.screen.orientation.type.includes('portrait');
    } else if (window.orientation !== undefined) {
      // Method 3: window.orientation (deprecated but still works on older devices)
      isPortrait = Math.abs(window.orientation) !== 90;
    } else {
      // Method 4: Fallback to dimensions (least reliable)
      isPortrait = window.innerHeight > window.innerWidth;
    }

    // Check if spread-container is visible (opacity > 0)
    const spreadVisible = spreadContainer &&
      window.getComputedStyle(spreadContainer).opacity !== '0' &&
      window.getComputedStyle(spreadContainer).opacity !== '';

    // Check if display-prompt is visible and has content
    const promptVisible = displayPrompt &&
      !displayPrompt.classList.contains('hidden') &&
      displayPrompt.innerHTML.trim() !== '';

    // Show message if mobile, portrait, and either element is visible
    if (isMobile && isPortrait && (spreadVisible || promptVisible)) {
      rotateMessage.style.display = 'flex';
    } else {
      rotateMessage.style.display = 'none';
    }
  }

  // Debounced check with multiple attempts (handles delayed viewport updates)
  function debouncedOrientationCheck() {
    clearTimeout(orientationCheckTimeout);

    // Check immediately
    checkOrientation();

    // Check again after delays to handle browsers that update dimensions late
    setTimeout(checkOrientation, 100);
    setTimeout(checkOrientation, 300);
    setTimeout(checkOrientation, 500);
  }

  // Listen to resize events with debouncing
  window.addEventListener('resize', debouncedOrientationCheck);

  // Listen to orientation changes using the best available API
  if (window.screen?.orientation) {
    // Modern Screen Orientation API
    window.screen.orientation.addEventListener('change', debouncedOrientationCheck);
  } else {
    // Fallback to deprecated orientationchange event
    window.addEventListener('orientationchange', debouncedOrientationCheck);
  }

  // Listen to matchMedia changes
  if (portraitQuery && portraitQuery.addEventListener) {
    portraitQuery.addEventListener('change', debouncedOrientationCheck);
  } else if (portraitQuery && portraitQuery.addListener) {
    // Fallback for older browsers
    portraitQuery.addListener(debouncedOrientationCheck);
  }

  // Check when spread container or display prompt changes
  const observer = new MutationObserver(checkOrientation);
  const spreadContainer = document.querySelector('.spread-container');
  const displayPrompt = document.querySelector('.display-prompt');

  if (spreadContainer) {
    observer.observe(spreadContainer, { attributes: true, attributeFilter: ['style', 'class'] });
  }
  if (displayPrompt) {
    observer.observe(displayPrompt, { childList: true, characterData: true, subtree: true });
  }

  // Initial check with delays
  setTimeout(checkOrientation, 100);
  setTimeout(checkOrientation, 500);
})();
