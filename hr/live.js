document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prices-button').addEventListener('click', function(){

        const pricingSection = document.querySelector('.pricing-placeholder');
    
        pricingSection.scrollIntoView({behavior: 'smooth'});
    });

    // Prebaci na "Pripreme za FAQ section"

document.querySelector('.faq-button').addEventListener('click', function() {
   
    const targetFaqSection = document.querySelector('#targetFaqSection');

   
    targetFaqSection.scrollIntoView({ behavior: 'smooth' });
});
});


// "Rezerviraj Termin" form Video Call / Live Reading

document.addEventListener('DOMContentLoaded', () => {
    const bookingButtonVideo = document.querySelector("#booking-button-video");
    const buttonBookLive = document.querySelector("#cta-button-outline");
    const modalVideo = document.querySelector(".modal-content-video");
    const modalLive = document.querySelector(".modal-content-live");
    
    const closeButton = document.querySelector(".close");
    const closeButtonLive = document.querySelector(".close-live");
    
    
    
    function showModalVideo(){
        modalVideo.style.display = "block";
       
    }

    function showModalLive(){
       
        modalLive.style.display = "block";
    }


    
    bookingButtonVideo.addEventListener("click", showModalVideo);

    buttonBookLive.addEventListener("click", showModalLive);

    
    
    
    function hideModal(){
        modalVideo.style.display = "none";

    }

    function hideModalLive(){
        modalLive.style.display = "none";

    }


    
    
    
    closeButton.addEventListener("click", hideModal);
    closeButtonLive.addEventListener("click", hideModalLive);


    // Forma


    
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


