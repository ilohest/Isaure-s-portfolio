<template>
    <div class="intro">
        <div class="web-dev anton-regular">Creative <br> Web developer</div>
        <div class="name anton-regular">Isaure Lohest</div>
    </div>
    <div class="what-i-do">
        <p>
            I create websites that people love. I use my passion and skills to create
            digital products and experiences.
        </p>
    </div>

    <div class="achievements-container">
        <div class="work anton-regular">Achievements</div>
        <p>
            In every project, I strive to ensure that each space narrates its own unique story
            through thoughtful and innovative design.
        </p>
    </div>
    <div class="work-container">
        <div class="work-intro-container">
            <p class="idea">
                Everything begins with an <span>IDEA</span> . . .
            </p>
            <p class="perhaps">
                Perhaps you want to launch a business. Maybe you aim to transform a hobby into something more.
                Whatever your case, the way you tell your story online can make all the difference.
            </p>
        </div>
        <div 
            class="card" 
            :class="{ 'project-card': isTitledVideo(video), 'animation-card': !isTitledVideo(video) }"
            v-for="video in orderedVideos" 
            :key="video.id"
        >
            <div class="image-container">
                <router-link :to="video.projectLink" class="link">
                    <img
                        v-show="!videoLoaded[video.id]"
                        :src="video.placeholder"
                        class="video-placeholder"
                        :alt="`Placeholder Image ${video.title} project`"
                    >
                    <video 
                        playsinline
                        @mouseover="pauseVideo(video.id)"
                        @mouseout="playVideo(video.id)"
                        @loadeddata="markVideoAsLoaded(video.id)"
                        :src="video.src"
                        :ref="'video_' + video.id"
                        class="video-projet"
                        autoplay
                        loop
                        muted
                        preload="auto"
                        v-show="videoLoaded[video.id]">
                    </video>
                    <!-- <video 
                        playsinline
                        @mouseover="pauseVideo(video.id)"
                        @mouseout="playVideo(video.id)"
                        @loadeddata="markVideoAsLoaded(video.id)"
                        :src="video.src"
                        :ref="'video_' + video.id"
                        class="video-projet"
                        :autoplay="shouldAutoplay"
                        loop muted preload="auto"
                        v-show="videoLoaded[video.id]">
                    </video> -->
                </router-link>
            </div>
            <div class="project-info">
                <span>{{ video.title }}</span>
                <span>{{ video.year }}</span>
            </div>
        </div>
    </div>

    <div class="about-me-container">
        <div class="about-me-title anton-regular">About me...</div>

        <div class="about-me">
            <div class="about-me-text">
                <p class="graduated">
                    Graduated as a bioengineer with a Master's in Phytopathology, I've always had a deep-seated passion for all things creative.
                    After earning my degree, I led a team in producing a vaccine against malaria, combining my scientific expertise with a drive
                    to make a real-world impact. While science has always been a cornerstone of my career, I've harbored a lifelong passion for
                    drawing, aesthetics, and photography. This love for the visual arts led me to explore another side of my creativity - design
                    and web development. I've transitioned into the design and development field because I adore the creative process - from a
                    blank canvas to a fully functional and visually appealing website.
                </p>
                <p>
                    As a designer and web developer, I bring a unique perspective by blending the analytical thinking from my scientific background
                    with my artistic skills. Whether creating engaging websites or capturing the world through my lens as a photographer, I aim to
                    tell stories that resonate and connect. I am excited to bring my diverse skills to your project, crafting beautiful, functional,
                    and user-friendly digital experiences.
                </p>
            </div>
            
            <div ref="parallaxContainer" class="parallax-container ">
                <img src="../assets/photo_2024-03-21_10-25-00.jpg" alt="Isaure Lohest picture" class="parallax-layer isaure" data-depth="0.5">
            </div>
            
        </div>
        <p class="amazing anton-regular">
            Let's create something <span>amazing</span> together!
        </p>
    </div>

    <div class="contact">
        <span class="anton-regular">Are you minding a project?</span>
        <span class="contact-me" >Contact me about a project, a collaboration, or just to say hello!</span>
    </div>
    
    <div class="last-container">
        <div class="call">
            <img src="../assets/getty-images-2Oj9tGznf5k-unsplash.png" alt="" class="services-image">
        </div>

        <div class="logo">
            <img src="../assets/sticker-isaure-v2-noQR.png" alt="Logo" class="hover-zoom">
        </div>
    </div> 
    <p class="sources">
        The colored abstract shapes in this page are credited to Material Design by Google, sourced from 
        <a href="https://m3.material.io/" target="_blank" rel="noopener noreferrer">Material Design's official website</a>.
    </p>
</template>
  
<script>  
    import Parallax from 'parallax-js'; 
    
    export default {
        name: 'HomeIsaure',

        data() {
            return {
                videos: [
                    {
                        id: 14,
                        title: "Tranche de cake",
                        year: "2024",
                        placeholder: require('../assets/tranchedecake.png'),
                        src: require('../assets/video-tdc-accueil.mp4'),
                        projectLink: "/achievements/tranche-de-cake-project"
                    },
                    {
                        id: 13,
                        title: "",
                        year: "",
                        placeholder: require('../assets/illustration1-0.png'),
                        src: require('../assets/Google_Mio_Color_1080x1080.mp4'),
                        projectLink: ""
                    },
                    {
                        id: 12,
                        title: "",
                        year: "",
                        placeholder: require('../assets/illustration2-0.png'),
                        src: require('../assets/Google_Mio_Elevation_1080x1080.mp4'),
                        projectLink: ""
                    },
                    {
                        id: 11,
                        title: "Boda Marta & Pedro",
                        year: "2024",
                        placeholder: require('../assets/M&P-temp.png'),
                        src: require('../assets/M&P-accueil.mp4'),
                        projectLink: "/achievements/boda-marta-y-pedro-project"
                    },
                    {
                        id: 10,
                        title: "Académie Clé Do Ré",
                        year: "2024",
                        placeholder: require('../assets/cledore-temp.png'),
                        src: require('../assets/video-cledore-accueil.mp4'),
                        projectLink: "/achievements/academie-cle-do-re-project"
                    },
                    {
                        id: 9,
                        title: "La petite serre urbaine",
                        year: "2024",
                        placeholder: require('../assets/la-petite-serre-urbaine-temp.png'),
                        src: require('../assets/video-petite-serre.mp4'),
                        projectLink: "/achievements/la-petite-serre-urbaine-project"
                    },
                    {
                        id: 8,
                        title: "The Perfect Hamburger",
                        year: "2024",
                        placeholder: require('../assets/hamburger-temp.png'),
                        src: require('../assets/video-the-perfect-burger-accueil.mp4'),
                        projectLink: "/achievements/the-perfect-hamburger-project"
                    },
                    {
                        id: 7,
                        title: "",
                        year: "",
                        placeholder: require('../assets/illustration3-0.png'),
                        src: require('../assets/Google_Mio_Web_1080x1080.mp4'),
                        projectLink: ""
                    },
                    {
                        id: 6,
                        title: "Didacmanía",
                        year: "2024",
                        placeholder: require('../assets/didacmania-temp.png'),
                        src: require('../assets/video-didacmania-accueil.mp4'),
                        projectLink: "/achievements/didacmania-project"
                    },
                    {
                        id: 5,
                        title: "",
                        year: "",
                        placeholder: require('../assets/illustration4-0.png'),
                        src: require('../assets/Google_Mio_Shape_1080x1080.mp4'),
                        projectLink: ""
                    },
                    {
                        id: 4,
                        title: "Creyda Yoga",
                        year: "2023",
                        placeholder: require('../assets/creyda-temp.png'),
                        src: require('../assets/video-creyda-short-accueil.mp4'),
                        projectLink: "/achievements/creyda-project"
                    },
                    {
                        id: 3,
                        title: "Gradient Generator",
                        year: "2023",
                        placeholder: require('../assets/gradient-temp.png'),
                        src: require('../assets/video-gradient-accueil.mp4'),
                        projectLink: "/achievements/gradient-project"
                    },
                    {
                        id: 2,
                        title: "John Scissors",
                        year: "2023",
                        placeholder: require('../assets/barber-temp.png'),
                        src: require('../assets/video-barbier-accueil.mp4'),
                        projectLink: "/achievements/john-scissors-project"
                    },
                    {
                        id: 1,
                        title: "",
                        year: "",
                        placeholder: require('../assets/illustration5-0.png'),
                        src: require('../assets/Google_Mio_UnderstandingLayout_1080x1080.mp4'),
                        projectLink: ""
                    }
                ],
                videoLoaded: {},
                parallaxInstance: null 
            };
        },

        computed: {
            // shouldAutoplay() {
            //     return !this.isMobileDevice();
            // },

            orderedVideos() {
                // Retourne les vidéos triées par ID décroissant
                return [...this.videos].sort((a, b) => b.id - a.id);
            },

            isTitledVideo() {
                // Différencie les cartes projet (project-card) des cartes avec les animations google (animation-card)
                return (video) => video.title && video.title.trim() !== "";
            }
        },

        mounted() {          
            this.initializeParallax();

            // Ajouter un écouteur pour surveiller la taille de l'écran
            window.addEventListener('resize', this.handleResize);
        },

        beforeUnmount() {
            // Supprimer l'écouteur de redimensionnement lorsque le composant est détruit
            window.removeEventListener('resize', this.handleResize);
        },

        methods: {
            pauseVideo(videoId) {
                const video = this.videos.find((v) => v.id === videoId);

                if (this.isTitledVideo(video)) {
                    const videos = this.$refs[`video_${videoId}`];
                    const videoElement = videos ? videos[0] : null;

                    if (videoElement) {
                        videoElement.pause();
                    } else {
                        console.error("Video element not found:", `video_${videoId}`);
                    }
                }
            },

            playVideo(videoId) {
                const videos = this.$refs[`video_${videoId}`];
                const videoElement = videos ? videos[0] : null;

                if (videoElement) {
                    videoElement.play();
                } else {
                    console.error("Video element not found:", `video_${videoId}`);
                }
            },

            markVideoAsLoaded(videoId) {
                this.videoLoaded[videoId] = true;
            },

            // isMobileDevice() {
            //     return window.innerWidth <= 628;
            // },

            initializeParallax() {
                // Vérifie la taille de l'écran et applique l'effet parallax uniquement si l'écran est > 970px
                if (window.innerWidth > 970) {
                    this.parallaxInstance = new Parallax(this.$refs.parallaxContainer);
                }
            },

            handleResize() {
                // Si l'écran est inférieur à 970px, désactive parallax
                if (window.innerWidth < 970 && this.parallaxInstance) {
                    this.parallaxInstance.destroy(); // Désactive l'effet parallax
                    this.parallaxInstance = null;
                } else if (window.innerWidth >= 970 && !this.parallaxInstance) {
                    // Réinitialiser parallax si l'écran est à nouveau supérieur à 970px
                    this.initializeParallax();
                }
            }
        }
    };
</script>

<style scoped>
    .intro {
        display: flex;
        text-transform: uppercase;
        justify-content: space-between;
        font-size: var(--fs-30);
        margin: 70px 0 70px 0;
        color: var(--red);
        letter-spacing: 0.01em;
    }
    .intro div:nth-child(1) {
        font-weight: 600;
    }
    .link{
        display: grid;
        height: 100%;
    }
    .project-info {
        pointer-events: none;
    }
    .what-i-do {
        text-transform: uppercase;
        font-size: var(--fs-24);
        text-align: justify;
        margin-bottom: 70px;
        color: var(--red);
        font-weight: 600;
    }
    .work {
        text-transform: uppercase;
        font-size: 44px;
        color: var(--red);
    }
    .web-dev {
        font-size: 44px;
    }
    .work-container {
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        background: var(--blue-bg);
        width: 100%;
        border-radius: 40px;
        padding: 40px;
        margin-bottom: 30px;
        color: var(--light-content);
    }
    .work-intro-container {
        margin-right: 20px;
    }
    .idea {
        font-family: 'Anton';
        font-size: 34px;
        margin-bottom: 10px;
    }
    .perhaps {
        font-size: 20px;
    }
    .video-placeholder {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .image-container {
        overflow: hidden;
        /* max-width: 330px; */
        width: 100%;
        height: 400px;
        position: relative;
        border-radius: 20px;
    }
    .video-projet {
        cursor: pointer;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .video-hamburger {
        object-fit: contain;
        transform: translateX(0);
        height: unset;
    }
    .project-info {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-direction: column;
        align-items: center;
        visibility: hidden; 
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
        color: white;
        z-index: 2;
        color: var(--light-content);
    }
    .project-info span {
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    }
    .card {
        position: relative;
    }
    .project-card {
        cursor: pointer;
        transition: background-color 0.5s ease; 
    }
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 0.5s ease;
        border-radius: 20px;
        z-index: 1;
        pointer-events: none;
    }
    .animation-card {
        pointer-events: none;
    }
    .animation-card::before {
        content: none;
    }
    .project-card:hover::before {
        background-color: rgba(0, 0, 0, 0.6); 
    }
    .project-card:hover .project-info {
        visibility: visible;
        opacity: 1;
    }
    .contact {
        display: flex;
        text-transform: uppercase;
        justify-content: space-between;
        font-size: var(--fs-30);
        margin: 30px 0;
        background: var(--red-bg);
        border-radius: 40px;
        padding: 40px;
    }
    .contact span {
        color: var(--light-content);
        display: flex;
        align-items: center;
    }
    .contact-me {
        text-align: end;
        font-family: 'Anton';
        text-transform: none;
    }
    .last-container {
        display: flex;
        justify-content: center;
        gap: 40px;
    }
    .logo {
        width: 40%;
        display: flex;
        object-fit: cover;
        justify-content: center;
        align-items: center;
        margin-bottom: 90px;
    }
    .logo img {
        width: 80%;
    }
    .anton-regular {
        font-family: "Anton", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    .about-me-container {
        background: var(--yellow-bg);
        border-radius: 40px;
        padding: 40px;
    }
    .about-me {
        display: flex;
    }
    .isaure {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 110%; 
        min-height: 110%;
        border-radius: 40px;
        object-fit: cover;
    } 
    .parallax-container {
        overflow: hidden;  /* Empêche le débordement visuel des enfants */
        position: relative;
        height: 620px;
        width: 40%;
        padding: 65px;
    }
    .parallax-layer, .isaure {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;  /* Assure que l'image couvre le conteneur si nécessaire */
    }
    .graduated {
        padding-bottom: 15px;;
    }
    .amazing {
        font-size: 30px;
        text-align: center;
        text-transform: uppercase;
        margin-top: 40px;
        letter-spacing: 0.01em;
        transition: transform 0.3s ease;
    }
    .amazing:hover {
        transform: scale(1.3);
    }
    .about-me-title {
        text-transform: uppercase;
        font-size: 44px;
        margin-bottom: 20px;
    }
    .about-me-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
    }
    .about-me-text p {
        font-size: 20px;
    }
    .achievements-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--red);
        margin-bottom: 30px;
    }
    .achievements-container h1 {
        width: 40%;
        margin: 0;
    }
    .achievements-container p {
        width: 60%;
        padding-left: 40px;
        font-weight: 600;
        font-size: 20px;
    }
    .services-image {
        width: 100%;
        border-radius: 40px;
        object-fit: cover;
        height: 610px;
    }
    .call {
        width: 60%;
        margin-bottom: 90px;
    }
    .amazing span,
    .idea span {
        color: #a6ff00;
        transition: transform 0.3s ease;
        display: inline-block;
    }
    .idea span:hover {
        transform: scale(1.3);
    }
    img.hover-zoom {
        transition: transform 0.5s ease;
    }
    img.hover-zoom:hover {
        transform: scale(1.08);
    }
    .sources {
        padding-bottom: 47px;
        text-align: end;
        font-size: 14px;
        color: var(--red);
    }
    .sources a {
        color: inherit;
    }

    /* Responsive */
    @media screen and (max-width: 1200px) {
        .image-container {
            height: 420px!important;
        }
        .video-hamburger {
            transform: translateX(0)!important;
        }
        .video-projet.last {
            /* transform: translateX(-6%); */
            cursor: pointer;
        }
        .work-container {
            margin: 30px auto;
        }
    }
    @media screen and (max-width: 970px) {
        .work {
            text-align: center;
        }
        .work-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px; 
        }
        .card {
            margin: 0 auto; 
            width: auto;
        }
        .intro {
            font-size: var(--fs-24)!important;
            margin: 20px 0 50px 0!important;
        }
        .intro div:nth-child(2) {
            padding-top: 30px;
        }
        .what-i-do {
            font-size: var(--fs-20)!important;
            margin-bottom: 50px!important;
        }
        .contact {
            font-size: var(--fs-24)!important;
        }
        .dark-light-button {
            height: 20px!important;
            bottom: 40px!important;
            left: 40px!important;
        }
        .about-me {
            flex-direction: column;
            gap: 20px;
        }
        .perhaps {
            font-size: 18px;
        }
        .achievements-container {
            flex-direction: column;
        }
        .achievements-container p {
            width: unset;
            margin-top: 20px;
        }
        .project-info {
            visibility: visible;
            opacity: 1;
            background: rgba(255, 255, 255, 0.2); /* Couleur semi-transparente */
            backdrop-filter: blur(10px); /* Flou à l'arrière-plan */
            border: 1px solid rgba(255, 255, 255, 0.3); /* Bordure subtile */
            border-radius: 10px;
            padding: 10px;
            color: var(--red-bg); /* Couleur du texte */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre douce pour donner de la profondeur */
            position: absolute; /* S'assure que l'élément est bien placé au-dessus de l'image */
            top: 50%; /* Ajustez selon vos besoins */
            left: 50%;
            transform: translate(-50%, -50%); /* Centre l'élément */
            z-index: 2; /* S'assure que le texte est au-dessus de l'image */
            width: 34vw;
        }
        .animation-card>.project-info {
            display: none;
        }
        .card:hover::before {
            background-color: unset; 
        }
        .work-intro-container {
            margin-bottom: 20px;
        }
        .isaure {
            object-position: 50% 25%;
        }
        .last-container {
            flex-direction: column;
        }
        .call{
            width: unset;
            margin-bottom: 30px;
        }
        .logo {
            width: unset;
            margin-bottom: 130px;
        }
        .about-me-text,
        .parallax-container {
            width: unset;
        }
        .isaure {
            transform: unset;
            min-width: unset;
            min-height: unset;
        }
    }
    @media screen and (max-width: 628px) {
        .work-intro-container {
            grid-column: span 2; /* Étend le premier élément sur 2 colonnes */
        }
        .card {
            height: 55vw!important;
        }
        .image-container {
            height: 100%!important;
            width: 100%;
        }
        .video-placeholder.a {
            transform: translateX(-24%);
        }
        .video-placeholder.d {
            transform: translateX(0);
            width: 100%;
        }
        .video-placeholder.b,
        .video-placeholder.c {
            transform: translateX(-20%);
        }
        .intro {
            flex-direction: column;
            text-align: center;
        }
        .work-container {
            padding: 15px;
        }
        .isaure {
            height: 100%;
        }
        .about-me-container,
        .contact {
            border-radius: 20px;
            padding: 15px;
        }
        .services-image,
        .isaure {
            border-radius: 20px;
        }
        .about-me-text p {
            font-size: 18px;
        }
        .achievements-container p {
            padding-left: 0px;
        }
        .work-container {
            border-radius: 20px!important;
        }
        .contact {
            flex-direction: column;
        }
        .contact-me {
            text-align: start;
            margin-top: 10px;
        }
        .logo img {
            width: 100%;
            max-width: 325px;
        }
        .amazing {
            margin-top: 20px;
        }
        .services-image {
            height: 400px;
        }
        .last-container {
            flex-direction: column;
        }
        .sources {
            display: none;
        }
    }
</style>