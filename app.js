window.addEventListener('load', function() {
const currentPage = document.querySelector('.active-page');
const workLink = document.getElementById('work');
const pageID = document.body.id;
const darkButton = document.querySelector('.dark-light-button');
const now = new Date();
const hour = now.getHours();
const bird = document.querySelector('.bird');
const birdContainer = document.querySelector('.bird-container');
const slider = document.querySelector('.slider');
const videos = document.querySelectorAll('.image-container video');

let compteur = 0;
let darkBackground = false;

// Breadbrumb

if (pageID === "home-page") {
  currentPage.textContent = "Home";
  workLink.style.display = "none";
} else if (pageID === "creyda-project-page") {
  currentPage.textContent = "Creyda Project";
  const separator = document.createElement('span');
  separator.textContent = " > ";
  currentPage.insertAdjacentElement('beforebegin', separator);
} else if (pageID === "barber-project-page") {
  currentPage.textContent = "John Scissors Project";
  const separator = document.createElement('span');
  separator.textContent = " > ";
  currentPage.insertAdjacentElement('beforebegin', separator);
} else if (pageID === "gradient-project-page") {
  currentPage.textContent = "Gradient generator Project";
  const separator = document.createElement('span');
  separator.textContent = " > ";
  currentPage.insertAdjacentElement('beforebegin', separator);
}

// Dark / light control with button

darkButton.addEventListener('click', () => {
  if (!darkBackground) {
    document.body.classList.add('dark-mode');
    darkButton.src = "../ressources/light.svg";
    bird.classList.add('bird-dark');
    bird.classList.remove('bird-light');
    darkBackground = true;
  } else {
    document.body.classList.remove('dark-mode');
    darkButton.src = "../ressources/dark.svg";
    bird.classList.add('bird-light');
    bird.classList.remove('bird-dark');
    darkBackground = false;
  }
});

// Dark / light control with hour of day

if (hour >= 20 || hour <= 6) {
  document.body.classList.add('dark-mode');
  darkButton.src = "../ressources/light.svg";
  darkBackground = true;
} else {
  document.body.classList.remove('dark-mode');
  darkButton.src = "../ressources/dark.svg";
  darkBackground = false;
}

// Pause video on hover

videos.forEach((vid) => {
  vid.onmouseover = function() {
  vid.pause();
}

vid.onmouseout = function() {
  vid.play();
}
})

// // Pause video on click

// videos.forEach((video) => {
//   video.addEventListener('click', function() {
//     if (video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
//   })

//   video.addEventListener('play', function() {
//     video.classList.add('active');
//   });

//   video.addEventListener('pause', function() {
//     video.classList.remove('active');
//   });
// });

// Bird flight direction control

function voler() {
  if (compteur % 2 === 0) {
    bird.classList.add('birdDG');
    birdContainer.classList.add('droite-gauche');
    birdContainer.classList.remove('gauche-droite');
  } else {
    bird.classList.remove('birdDG');
    birdContainer.classList.remove('droite-gauche');
    birdContainer.classList.add('gauche-droite');
  }
  compteur++;
}

setTimeout(function() {
  voler(); 
  setInterval(voler, 30000);
}, 30000);

// Infinite slider control

slider.innerHTML += slider.innerHTML;

}); // fin du window.addEventListener('load', function() {})

// Placeholder image showed while video is loading

const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(function(imageContainer) {
  const video = imageContainer.querySelector('.video-projet');
  const videoPlaceholder = imageContainer.querySelector('.video-placeholder');

  video.style.display = 'none';
  videoPlaceholder.style.display = 'block';

  video.addEventListener('loadeddata', function() {
    // console.log('video.addEventListener(loadeddata : '+ video);
    videoPlaceholder.style.display = 'none';
    video.style.display = 'block';
  });
});

// REGEX form
document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
      var emailInput = document.getElementById("email");
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(emailInput.value)) {
        alert("Please enter a valid email address.");
        event.preventDefault(); // Empêche la soumission du formulaire
      }
  });
});

// Fonction pou reset le formulaire
function resetForm() {
  // Utilise setTimeout pour s'assurer que le formulaire est réinitialisé après la soumission
  setTimeout(function() {
    document.querySelector('form').reset();
  }, 0);
}

var input = document.querySelector("#phone-number");
//console.log('téléphone '+ input);
window.intlTelInput(input, {
  initialCountry: "be",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Chemin vers utils.js nécessaire pour les fonctions de formatage, etc.
});