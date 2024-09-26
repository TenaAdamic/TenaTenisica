// FAQ Section

document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = document.getElementById(button.getAttribute('data-collapse-target'));
            const chevron = button.querySelector('.chevron');

            if (target.style.display === 'block') {
                target.style.display = 'none';
                chevron.classList.remove('rotate');
            } else {
                // Close all accordion contents
                document.querySelectorAll('.accordion-content').forEach(content => {
                    content.style.display = 'none';
                });
                // Reset all chevrons
                document.querySelectorAll('.chevron').forEach(chev => {
                    chev.classList.remove('rotate');
                });

                // Open the clicked accordion content
                target.style.display = 'block';
                chevron.classList.add('rotate');
            }
        });
    });
});


// Napravi click event na deck-back-img: kada se klikne, rest-of-back div se sakrije (display none), a spread-container postane vidljiv (opacity 1). Moram pomaknuti prvu kartu (spread-deck-back) na drugi kraj ekrana, desno (transition, transform, translate). Moram posložiti kako će ostale karte stajati u spread containeru (svaku pomaknuti u desno za 43px, zadnja ostaje na mjestu, dakle 20 karata mičem u desno (860: 20 = 43) ), tako da raširene karte odmah budu vidljive kada se klikne na deck-back-img



document.addEventListener('DOMContentLoaded', () => {
    const deckBackImg = document.querySelector('.deck-back-img');
    const restOfBack = document.querySelector('.rest-of-deck');
    const spreadContainer = document.querySelector('.spread-container');
    const spreadDeckBack = document.querySelector('#spread-deck-back');
    const backCardsSpread = document.querySelectorAll('.back-cards-spread');
    const displayPrompt = document.querySelector('.display-prompt');
    const shuffleButton = document.querySelector('.shuffle');
    const backCards = document.querySelectorAll('.rest-of-deck .back-cards');

    const showContainer = document.querySelector('.show-container');
    const facingCards = Array.from(showContainer.querySelectorAll('.facing-card'));
    

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
                deckBackImg.style.transform = 'translate(0, 0)';
                lastCard.style.transform = 'translate(0, 0)';
                
                // deckBackImg is back on top
                deckBackImg.style.zIndex = zIndex;

                return;
            }

            // Move the deckBackImg to the right and up
            // Move the last card to the left
            if (shuffleCount % 2 === 0) {
                deckBackImg.style.transform = 'translate(80px, -14px)';
                lastCard.style.transform = 'translate(-8px, 0)';
                
                
                deckBackImg.style.zIndex = zIndex - 1;
            } else {
                deckBackImg.style.transform = 'translate(0, 0)';
                lastCard.style.transform = 'translate(0, 0)';
                
                
                deckBackImg.style.zIndex = zIndex;
            }

            shuffleCount++;
        }, 160); 
    }

    // shuffle button event
    shuffleButton.addEventListener('click', shuffleCards);

    // deck-back-img click event
    deckBackImg.addEventListener('click', function () {
        const baseDistance = 1000;
        const decrement = 50;
        let zIndex = 119;

        // Sakrij the 'rest-of-deck' div
        restOfBack.style.display = 'none';
        document.querySelector('.instructions').classList.add('hidden');
        document.querySelector('.reading-intro').classList.add('hidden');
        document.querySelector('#start-over').style.display = 'block';
        
        // if screen width is smaller than 1200px
            if (window.innerWidth < 1200) {
        
        document.querySelector('.deck-container').classList.add('margin-24');

    }

        // 'spread-container' div with a fade-in effect
        spreadContainer.style.opacity = '1';
        displayPrompt.style.display = 'flex';
        displayPrompt.innerHTML = `Odaberi 6 karata`;

        
        spreadDeckBack.classList.add('move-right');

        // Loop 
        backCardsSpread.forEach((card, i) => {
            if (card.id !== "20") { // Sve osim karte s id="20"
                const distance = baseDistance - (i * decrement);
                card.style.transform = `translateX(${distance}px)`;
                card.style.zIndex = zIndex--; // Decrease z-index for each card
            }
        });

      
    });

        // Function to show the custom alert
    function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = customAlert.querySelector('p');
    alertMessage.textContent = message;
    customAlert.style.display = 'block';
    }

    // hide 
    function hideCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
    }

    // "OK" button 
    document.getElementById('alertOkButton').addEventListener('click', hideCustomAlert);

    // kada kliknem back card (event)
    backCardsSpread.forEach(card => {
        card.addEventListener('click', function () {
            if (!card.classList.contains('clicked')) {
                selectedCount++;
                card.classList.add('clicked');
              
    
                // prompts

                if (selectedCount === 5) {
                    displayPrompt.innerHTML = `Odaberi još jednu kartu`;
                } else if (selectedCount === 1) {
                    displayPrompt.innerHTML = `Odaberi još ${totalCards - selectedCount} karata`;
                } else if (selectedCount < totalCards) {
                    displayPrompt.innerHTML = `Odaberi još ${totalCards - selectedCount} karte`;
                } else if (selectedCount === totalCards) {
                    displayPrompt.innerHTML = 'Preuzmi čitanje <i class="fas fa-arrow-right"></i>';
                } else {
                    card.classList.remove('clicked');
                    showCustomAlert('Već ste odabrali 6 karata');
                }
    
                // Make the prompt visible
                displayPrompt.style.display = 'flex';
            }
        });
    });
    
    // // Add the event listener for the prompt separately
    // displayPrompt.addEventListener('click', function () {
    //     if (displayPrompt.innerHTML.includes('Preuzmi čitanje')) {
    //         document.querySelector('.show-container').style.opacity = '1';
    //     }
    // });

    // Handle the spreadDeckBack click event
    spreadDeckBack.addEventListener('click', function () {
        if (!spreadDeckBack.classList.contains('clicked')) {
            selectedCount++;
            spreadDeckBack.classList.add('clicked');

            // Update the prompt message
            if (selectedCount === 5) {
                displayPrompt.innerHTML = `Odaberi još jednu kartu`;
            } else if (selectedCount === 1) {
                displayPrompt.innerHTML = `Odaberi još ${totalCards - selectedCount} karata`;
            }
            else if (selectedCount < totalCards) {
                displayPrompt.innerHTML = `Odaberi još ${totalCards - selectedCount} karte`;
            } else if (selectedCount === totalCards) {
                displayPrompt.innerHTML = 'Preuzmi čitanje <i class="fas fa-arrow-right"></i>';
            } else {
                spreadDeckBack.classList.remove('clicked');
                showCustomAlert('Već ste odabrali 6 karata');
            }
            

            // Make the prompt visible
            displayPrompt.style.display = 'flex';
        }
    });

    function displaySelectedCards() {
        // Hide the deck and the instruction paragraph
        document.querySelector('.deck-and-spread-container').classList.add('hidden');
        document.querySelector('.instructions').classList.add('hidden');
        document.querySelector('.past-present-future').style.display = 'flex';
        document.querySelector('.styled-hr').classList.add('hidden');
        document.querySelector('.slider').classList.add('hidden');
        document.querySelector('.personalized-section').classList.add('hidden');
        displayPrompt.classList.add('hidden');
        document.querySelector('#slider-divider').classList.add('hidden');
       
      
       
       
    
       
        document.querySelector('.show-container').style.display = 'flex';
        
        // Scroll
        window.scrollTo({
            top: document.querySelector('.push-down').offsetTop,
            behavior: 'smooth'
        });
    }
    

    // Array of messages for each card
    const messages = [
        "Kako ti vidiš sebe?",
        "Što kaže tvoja podsvjest?",
        "Što u prošlosti je dovelo do ove situacije?",
        "Što moraš znati upravo sada?",
        "Kako bi se situacija mogla razvijati u budućnosti?",
        "Koja je poruka Tarota?"
    ];

    // Add the event listener for the prompt separately
    displayPrompt.addEventListener('click', function () {
        if (displayPrompt.innerHTML.includes('Preuzmi čitanje')) {
            // Hide all "facing-card" divs initially
            facingCards.forEach(card => {
                card.style.display = 'none';
                // Clear any existing content in the h3 element
                const h3 = card.querySelector('h3');
                if (h3) {
                    h3.innerHTML = ''; // Clear existing h3 content
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

            // Display the selected cards with specific h3 content
            selectedCards.forEach((card, index) => {
                card.style.display = 'flex';
                // Update the h3 element's innerHTML with the corresponding message
                const h3 = card.querySelector('h3');
                if (h3) {
                    h3.innerHTML = messages[index];
                }
            });

            // Show the container
            showContainer.style.display = 'flex';
        }
    });

     
});

// "Rezerviraj Termin" form

document.addEventListener('DOMContentLoaded', () => {
const bookingButton = document.querySelector(".booking-button");
const buttonBookLive = document.querySelector("#cta-button-outline");
const modal = document.querySelector(".modal-content");

const closeButton = document.querySelector(".close");



function showModal(){
    modal.style.display = "block";
}

bookingButton.addEventListener("click", showModal);



function hideModal(){
    modal.style.display = "none";
}



closeButton.addEventListener("click", hideModal);

const form = document.querySelector("#form-content");

form.addEventListener("submit", function(event){
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

})


// Carousel



document.addEventListener('DOMContentLoaded', () => {
const indicators = document.querySelectorAll('.slider .indicators .indicator')
const arrowPrev = document.querySelector('.slider .arrows .arrow-prev')
const arrowNext = document.querySelector('.slider .arrows .arrow-next')

const handleIndicatorClick = (event) => {
  console.log('Indicator clicked:', event.target);
  const indicator = event.target
  if (!isActive(indicator)) {
    removeActive()
    addActive(indicator)
    showSlide(indicator.dataset.slide)
  }
}

const handlePrevArrowClick = (event) => {
  console.log('Prev arrow clicked');
  let activeSlide = 0
  let newActiveSlide = indicators.length
  let ready = false

  indicators.forEach(indicator => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide
      if (activeSlide !== '1') {
        newActiveSlide = parseInt(activeSlide) - 1
      }
      removeActive()
      addActive(document.querySelector(`.slider .indicators [data-slide='${newActiveSlide}']`))
      showSlide(newActiveSlide)
      ready = true
    }
  })
}

const handleNextArrowClick = (event) => {
  console.log('Next arrow clicked');
  let activeSlide = 0
  let newActiveSlide = 1
  let ready = false

  indicators.forEach(indicator => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide
      if (activeSlide !== indicators.length.toString()) {
        newActiveSlide = parseInt(activeSlide) + 1
      }
      removeActive()
      addActive(document.querySelector(`.slider .indicators [data-slide='${newActiveSlide}']`))
      showSlide(newActiveSlide)
      ready = true
    }
  })
}

indicators.forEach(indicator => {
  indicator.addEventListener('click', handleIndicatorClick)
})

arrowPrev.addEventListener('click', handlePrevArrowClick)
arrowNext.addEventListener('click', handleNextArrowClick)

function isActive (indicator) {
  return indicator.hasAttribute('active')
}

function removeActive () {
  document.querySelectorAll('.slider .indicators [active]').forEach(item => {
    item.removeAttribute('active')
  })
}

function addActive (indicator) {
  indicator.setAttribute('active', '')
}

function showSlide (newActiveSlide) {
  const newPosition = (100 * (newActiveSlide - 1)).toString()
  console.log('Moving to position:', newPosition);
  document.querySelector('.slider-inner').style.marginLeft = `-${newPosition}%`
}

});

// Vanilla JavaScript Carousel
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('testimonial-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const items = carousel.children;
    const itemsLength = items.length;
    let currentIndex = 0;
    let dotElements = [];

    function updateCarousel() {
        // Hide all items
        for (let i = 0; i < itemsLength; i++) {
            items[i].style.display = 'none';
            dotElements[i].classList.remove('active');
        }
        // Show the current item
        items[currentIndex].style.display = 'block';
        dotElements[currentIndex].classList.add('active');
    }

    function createDots() {
        for (let i = 0; i < itemsLength; i++) {
            let dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', function () {
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
    }, 20000);
});

// Prebaci na "Pripreme za čitanje"

document.querySelector('.slider-button').addEventListener('click', function() {
   
   
    const targetSection = document.querySelector('.slider-placeholder');

   
    targetSection.scrollIntoView({ behavior: 'smooth' });
});




