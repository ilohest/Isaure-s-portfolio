const darkButton = document.querySelector('.dark-light-button');
const body = document.querySelector('body');
const now = new Date();
const hour = now.getHours();
const cards = document.querySelectorAll('.card'); 
const buttons = document.querySelectorAll('.button');
const border = document.querySelector('.border-container');
const header = document.querySelector('header');
const rightSection = document.querySelector('.right-section');
const bird = document.querySelector('.bird');
const birdContainer = document.querySelector('.bird-container');
const slider = document.querySelector('.slider');
const videos = document.querySelectorAll('.image-container video');

let compteur = 0;
let darkBackground = false;

// Dark / light control with button

darkButton.addEventListener('click', changeBackground);

function changeBackground() {
  if (!darkBackground) {
    body.classList.add('body-dark'); 
    body.classList.remove('body-light'); 
    cards.forEach((card) => {
      card.classList.add('card-dark'); 
      card.classList.remove('card-light')
    }); 
    buttons.forEach((button) => {
      button.classList.add('button-dark'); 
      button.classList.remove('button-light'); 
    }); 
    border.classList.add('border-dark');
    border.classList.remove('border-light');
    header.classList.add('header-dark');
    header.classList.remove('header-light');
    rightSection.classList.add('right-dark');
    rightSection.classList.remove('right-light');
    darkButton.src = "ressources/light.svg";
    slider.classList.add('slider-dark');
    slider.classList.remove('slider-light');
    bird.classList.add('bird-dark');
    bird.classList.remove('bird-light');
    darkBackground = true;
  } else {
    body.classList.add('body-light'); 
    body.classList.remove('body-dark'); 
    cards.forEach((card) => {
      card.classList.add('card-light'); 
      card.classList.remove('card-dark'); 
    }); 
    buttons.forEach((button) => {
      button.classList.add('button-light'); 
      button.classList.remove('button-dark'); 
    }); 
    border.classList.add('border-light');
    border.classList.remove('border-dark');
    header.classList.add('header-light');
    header.classList.remove('header-dark');
    rightSection.classList.add('right-light');
    rightSection.classList.remove('right-dark');
    darkButton.src = "ressources/dark.svg";
    slider.classList.add('slider-light');
    slider.classList.remove('slider-dark');
    bird.classList.add('bird-light');
    bird.classList.remove('bird-dark');
    darkBackground = false;
  }
}

// Dark / light control with hour of day

if (hour >= 8 && hour < 20) {
  body.classList.add('body-light'); 
    body.classList.remove('body-dark'); 
    cards.forEach((card) => {
      card.classList.add('card-light'); 
      card.classList.remove('card-dark'); 
    }); 
    buttons.forEach((button) => {
      button.classList.add('button-light'); 
      button.classList.remove('button-dark'); 
    }); 
    border.classList.add('border-light');
    border.classList.remove('border-dark');
    header.classList.add('header-light');
    header.classList.remove('header-dark');
    rightSection.classList.add('right-light');
    rightSection.classList.remove('right-dark');
    darkButton.src = "ressources/dark.svg";
    bird.classList.add('bird-light');
    bird.classList.remove('bird-dark');
    darkBackground = false;
} else {
  body.classList.add('body-dark'); 
  body.classList.remove('body-light'); 
  cards.forEach((card) => {
    card.classList.add('card-dark'); 
    card.classList.remove('card-light')
  }); 
  buttons.forEach((button) => {
    button.classList.add('button-dark'); 
    button.classList.remove('button-light'); 
  }); 
  border.classList.add('border-dark');
  border.classList.remove('border-light');
  header.classList.add('header-dark');
  header.classList.remove('header-light');
  rightSection.classList.add('right-dark');
  rightSection.classList.remove('right-light');
  darkButton.src = "ressources/light.svg";
  bird.classList.add('bird-dark');
  bird.classList.remove('bird-light');
  darkBackground = true;
}

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

// Pause video

videos.forEach((video) => {
  video.addEventListener('click', function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
  })

  video.addEventListener('play', function() {
    video.classList.add('active');
  });

  video.addEventListener('pause', function() {
    video.classList.remove('active');
  });
});

