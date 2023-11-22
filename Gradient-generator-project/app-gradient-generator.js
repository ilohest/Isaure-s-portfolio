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
const video = document.querySelector('.video-projet');

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

video.onmouseover = function() {
  video.pause();
}

video.onmouseout = function() {
  video.play();
}

// // Pause video on click

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

  const video = document.querySelector('.video-projet');
  const videoPlaceholder = document.querySelector('.video-placeholder');

  video.style.display = 'none';
  videoPlaceholder.style.display = 'block';

  video.addEventListener('loadeddata', function() {
    // console.log('video.addEventListener(loadeddata : '+ video);
    videoPlaceholder.style.display = 'none';
    video.style.display = 'block';
  });

// Change video source with screen size

window.addEventListener('resize', function() {
  if (window.innerWidth <= 970 && window.innerWidth > 628) { 
    video.src = '../ressources/video-gradient-responsive-970.mp4';
  } else if (window.innerWidth <= 628) {
    video.src = '../ressources/video-gradient-responsive-628.mp4';
  } else {
    video.src = '../ressources/video-gradient.mp4';
  }
  video.load();
});
