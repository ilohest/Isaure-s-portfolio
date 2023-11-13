const currentPage = document.querySelector('.active-page');
const workLink = document.getElementById('work');
const pageID = document.body.id;
const darkButton = document.querySelector('.dark-light-button');
const body = document.querySelector('body');
const now = new Date();
const hour = now.getHours();
const cards = document.querySelectorAll('.card'); 
const buttons = document.querySelectorAll('.button');
const border = document.querySelector('.border-container');
const header = document.querySelector('.header');
const rightSection = document.querySelector('.right-section');
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
  currentPage.textContent = "WORK : Creyda Project";
  const separator = document.createElement('span');
  separator.textContent = " > ";
  currentPage.insertAdjacentElement('beforebegin', separator);
} else if (pageID === "barber-project-page") {
  currentPage.textContent = "WORK : Barber Project";
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




// let currentPosition = 0;
// let animationDuration = 20;
// let isHovered = false;

// slider.addEventListener('mouseover', function() {
//     const styles = window.getComputedStyle(slider);
//     const transformValue = styles.getPropertyValue('transform');
//     currentPosition = parseInt(transformValue.split(',')[4].trim(), 10);
//     console.log('mouseover : ' + currentPosition);
//     animationDuration = 25;
//     isHovered = true;
     

//     // Appliquer directement la position actuelle pour reprendre au bon endroit
//     slider.style.transform = `translateX(${currentPosition}px)`;
//     slider.style.animation = `defilement ${animationDuration}s linear infinite`;
// });

// slider.addEventListener('mouseout', function() {
//     isHovered = false;
//     if (!isHovered) {
//         animationDuration = 20;
//         slider.style.animation = `defilement ${animationDuration}s linear infinite`;
//     }
// });




