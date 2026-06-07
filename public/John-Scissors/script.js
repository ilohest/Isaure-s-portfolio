// Navigation : menu hamburger

const nav = document.querySelector('.main-nav');
const navToggler = document.querySelector('.nav-toggler');
const togglerImg = navToggler.querySelector('img');
const navLinks = document.querySelectorAll('.main-nav a')

navToggler.addEventListener("click", toggleNav);

function toggleNav(){
    nav.classList.toggle("active") 
    if(togglerImg.src.includes("hamburger")){
        togglerImg.src = "ressources/cross.svg";
        navToggler.ariaExpanded = true; 

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
            nav.classList.remove("active");
            navToggler.ariaExpanded = false;
        })})
    }
    else {
        togglerImg.src = "ressources/hamburger.svg";
        navToggler.ariaExpanded = false;
    }
}

// About section : slider 

const slideshowImages = document.querySelectorAll(".slideshow-images-container img");
const fadeSlideDots = document.querySelectorAll(".dot");

    // Au clic & slideshow automatique : 

fadeSlideDots.forEach(dot => dot.addEventListener("click", fadeSlideshow));

let currentFadeIndex = 1;
let fadeIntervalID; 

function fadeSlideshow(e){
    slideshowImages[currentFadeIndex - 1].classList.remove("active");
    fadeSlideDots[currentFadeIndex - 1].classList.remove("active");
    fadeSlideDots[currentFadeIndex - 1].ariaDisabled = "false";
    if(e) { 
        currentFadeIndex = e.target.getAttribute("data-fadeIndex"); 
        clearInterval(fadeIntervalID) 
        fadeIntervalID = window.setInterval(fadeSlideshow, 3500) 
    } else {
        currentFadeIndex++; 
        if(currentFadeIndex > slideshowImages.length) { 
             currentFadeIndex = 1;
        }
    }
    slideshowImages[currentFadeIndex - 1].classList.add("active");
    fadeSlideDots[currentFadeIndex - 1].classList.add("active");
    fadeSlideDots[currentFadeIndex - 1].ariaDisabled = "true";
}

fadeIntervalID = window.setInterval(fadeSlideshow, 3500);

    // Au slide gauche/droite :

    slideshowImages.forEach(image => {
        let touchStartX = 0; 
        let touchEndX = 0;
    
        image.addEventListener('touchstart', handleTouchStart, false); 
        image.addEventListener('touchmove', handleTouchMove, false); 
        image.addEventListener('touchend', handleTouchEnd, false); 
    
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
        }
    
        function handleTouchMove(e) {
            touchEndX = e.touches[0].clientX;
        }
    
        function handleTouchEnd() {
            slideshowImages[currentFadeIndex - 1].classList.remove("active");
            fadeSlideDots[currentFadeIndex - 1].classList.remove("active");
            fadeSlideDots[currentFadeIndex - 1].ariaDisabled = "false";

            clearInterval(fadeIntervalID);
            fadeIntervalID = window.setInterval(fadeSlideshow, 3500);

            if (touchEndX < touchStartX) {
                // glissement vers la droite, appeler la fonction pour afficher l'image suivante
                currentFadeIndex++;
                if (currentFadeIndex > slideshowImages.length) {
                    currentFadeIndex = 1;
                }
            } else if (touchEndX > touchStartX) {
                // glissement vers la gauche, appeler la fonction pour afficher l'image précédente
                currentFadeIndex--;
                if (currentFadeIndex < 1) {
                    currentFadeIndex = slideshowImages.length;
                }
            }
            slideshowImages[currentFadeIndex - 1].classList.add("active");
            fadeSlideDots[currentFadeIndex - 1].classList.add("active");
            fadeSlideDots[currentFadeIndex - 1].ariaDisabled = "true";
            touchStartX = 0;
            touchEndX = 0;
        }
    })
    
// Smooth scroll links

const smoothScrollLinks = [ 
    ...navLinks,
    ...document.querySelectorAll('.hero a')
]

smoothScrollLinks.forEach(link => link.addEventListener('click', handleSmoothScroll)); 

function handleSmoothScroll(e) {
    e.preventDefault(); 

    const linkHref = e.target.getAttribute("href").substring(1); 

    /* smooth scroll */
    window.scrollTo({ 
        top: document.getElementById(linkHref).offsetTop * 0.95, 
        behavior: 'smooth'
    })

    /* ajout d'ID dans le lien */
    window.history.pushState("", "", `${document.location.pathname}#${linkHref}`) 
}