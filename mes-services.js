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
    } else if (pageID === "didacmania-project-page") {
      currentPage.textContent = "Didacmanía Project";
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
    
    // Function to toggle detailed content
    function toggleContent(serviceId) {
        var contentId = serviceId + '-content';
        var content = document.getElementById(contentId);
        var toggle = document.getElementById(serviceId + '-toggle').querySelector('.icon-toggle');
    
        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block';
            toggle.src = "ressources/remove.svg"; // Change to your 'remove' icon
            toggle.alt = "Remove";
        } else {
            content.style.display = 'none';
            toggle.src = "ressources/add.svg"; // Change to your 'add' icon
            toggle.alt = "Add";
        }
    }
    
    // Registering toggleContent globally for onclick access
    window.toggleContent = toggleContent;
    
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
    
    
    
    