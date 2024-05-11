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
                    Everything begins with an Idea...
                </p>
                <p class="perhaps">
                    Perhaps you want to launch a business. Maybe you aim to transform a hobby into something more.
                    Whatever your case, the way you tell your story online can make all the difference.
                </p>
            </div>
            <div class="card" v-for="video in videos" :key="video.id">
                <div class="image-container">
                    <a :href="video.projectLink" class="button">
                    <img :src="video.placeholder" class="video-placeholder" :alt="`Placeholder Image ${video.title} project`">
                    <video 
                        @mouseover="pauseVideo(video.id)"
                        @mouseout="playVideo(video.id)"
                        :src="video.src"
                        :ref="'video_' + video.id"
                        class="video-projet"
                        autoplay loop muted preload="auto">
                    </video>
                    </a>
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
                        After earning my degree, I led a team in producing a vaccine against malaria, combining my scientific expertise with a drive to make a real-world impact.
                        While science has always been a cornerstone of my career, I've harbored a lifelong passion for drawing, aesthetics, and photography.
                        This love for the visual arts led me to explore another side of my creativity - design and web development.
                        I've transitioned into the design and development field because I adore the creative process - from a blank canvas to a fully functional and visually appealing website.
                    </p>
                    <p>
                        As a designer and web developer, I bring a unique perspective by blending the analytical thinking from my scientific background with my artistic skills.
                        Whether creating engaging websites or capturing the world through my lens as a photographer, I aim to tell stories that resonate and connect.
                        I am excited to bring my diverse skills to your project, crafting beautiful, functional, and user-friendly digital experiences.
                    </p>
                </div>
                
                <img src="../../../ressources/photo_2024-03-21_10-25-00.jpg" alt="Isaure Lohest picture" class="isaure">
            </div>
            <p class="amazing anton-regular">
                Let's create something <span>amazing</span> together !
            </p>
        </div>

        <div class="contact">
            <span class="anton-regular">Are you minding a project ?</span>
            <span class="contact-me" >Contact me about a project, a collaboration, or just to say hello!</span>
        </div>
        
        <div class="logo-container">
            <div class="call">
                <img src="../../../ressources/getty-images-2Oj9tGznf5k-unsplash.jpg" alt="" class="services-image">
            </div>

            <div class="logo">
                <img src="../../../ressources/sticker-isaure-v2-noQR.png" alt="Logo">
            </div>
        </div> 
</template>
  
<script>   
    export default {
        name: 'HomeIsaure',

        data() {
            return {
                videos: [
                    {
                        id: 1,
                        title: "The Perfect Hamburger",
                        year: "2024",
                        placeholder: require('../../../ressources/hamburger-temp.png'),
                        src: require('../../../ressources/video-the-perfect-burger-accueil.mp4'),
                        projectLink: "The-perfect-hamburger-project/the-perfect-hamburger-project.html"
                    },
                    {
                        id: 2,
                        title: "Didacmanía",
                        year: "2024",
                        placeholder: require('../../../ressources/didacmania-temp.png'),
                        src: require('../../../ressources/video-didacmania-accueil.mp4'),
                        projectLink: "Didacmania-project/didacmania-project.html"
                    },
                    {
                        id: 3,
                        title: "Creyda Yoga",
                        year: "2023",
                        placeholder: require('../../../ressources/creyda-temp.png'),
                        src: require('../../../ressources/video-creyda-short-accueil.mp4'),
                        projectLink: "Creyda-project/creyda-project.html"
                    },
                    {
                        id: 4,
                        title: "Gradient Generator",
                        year: "2023",
                        placeholder: require('../../../ressources/gradient-temp.png'),
                        src: require('../../../ressources/video-gradient-accueil.mp4'),
                        projectLink: "Gradient-generator-project/gradient-generator.html"
                    },
                    {
                        id: 5,
                        title: "John Scissors",
                        year: "2023",
                        placeholder: require('../../../ressources/barber-temp.png'),
                        src: require('../../../ressources/video-barbier-accueil.mp4'),
                        projectLink: "John-Scissors-project/john-scissors-project.html"
                    }
                ]
            };
        },
        methods: {
            pauseVideo(videoId) {
                const videos = this.$refs[`video_${videoId}`];
                const video = videos ? videos[0] : null;
                if (video) {
                    video.pause();
                } else {
                    console.error('Video element not found:', `video_${videoId}`);
                }
            },

            playVideo(videoId) {
                const videos = this.$refs[`video_${videoId}`];
                const video = videos ? videos[0] : null;
                if (video) {
                    video.play();
                } else {
                    console.error('Video element not found:', `video_${videoId}`);
                }
            },
        }
    };
</script>

<style scoped>
    .intro {
        display: flex;
        text-transform: uppercase;
        justify-content: space-between;
        font-size: var(--fs-30);
        margin: 20px 0 70px 0;
        color: #eb5027;
        letter-spacing: 0.01em;
    }
    .intro div:nth-child(1) {
        font-weight: 600;
    }
    .what-i-do {
        text-transform: uppercase;
        font-size: var(--fs-24);
        text-align: justify;
        margin-bottom: 70px;
        color: #eb5027;
        font-weight: 600;
    }
    .work {
        text-transform: uppercase;
        font-size: 44px;
        color: #eb5027;
    }
    .web-dev {
        font-size: 44px;
    }
    .work-container {
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(3, 1fr); /* Crée 3 colonnes égales */
        justify-content: center;
        background: #3077b5;
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
        font-size: 28px;
        margin-bottom: 10px;
    }
    .perhaps {
        font-size: 20px;
    }
    .card {
        min-width: 276px;
    }
    .video-placeholder {
        height: 100%;
    }
    .video-placeholder.a {
        transform: translateX(-20%);
    }
    .video-placeholder.b,
    .video-placeholder.c  {
        transform: translateX(-14%);
    }
    .video-placeholder.d {
        transform: translateX(0);
        width: 100%;
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
        transform: translateY(-100%);
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
        cursor: pointer;
        position: relative;
        transition: background-color 0.5s ease; 
    }
    .card::before {
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
    .card:hover::before {
        background-color: rgba(0, 0, 0, 0.6); 
    }
    .card:hover .project-info {
        visibility: visible;
        opacity: 1;
    }
    .contact {
        display: flex;
        text-transform: uppercase;
        justify-content: space-between;
        font-size: var(--fs-30);
        margin: 30px 0;
        background: #eb5027;
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
    }
    .logo-container {
        display: flex;
        justify-content: center;
        margin-bottom: 170px;
    }
    .logo {
        width: 40%;
        display: flex;
        object-fit: cover;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
    }
    .logo img {
        width: 100%;
    }
    .anton-regular {
        font-family: "Anton", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    .about-me-container {
        background: #f6cd45;
        border-radius: 40px;
        padding: 40px;
    }
    .about-me {
        display: flex;
    }
    .isaure {
        object-fit: cover;
        height: 600px;
        border-radius: 40px;
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
    }
    .about-me-title {
        text-transform: uppercase;
        font-size: 44px;
        margin-bottom: 20px;
    }
    .about-me-text {
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .about-me-text p {
        font-size: 20px;
    }
    .achievements-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #eb5027;
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
    }
    .amazing span {
        color: #a6ff00;
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
            grid-template-columns: repeat(1, 1fr);
        }
        .card {
            margin: 0 auto 10px auto!important;
            min-width: 480px;
        }
        .image-container {
            height: 344px!important;
            width: 515px;
        }
        .intro {
            font-size: var(--fs-24)!important;
            margin: 50px 0 50px 0!important;
            flex-direction: column;
            text-align: center;
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
        .achievements-container {
            flex-direction: column;
        }
        .achievements-container p {
            width: unset;
            margin-top: 20px;
        }
        .project-info {
            position: unset;
            top: unset;
            left: unset;
            transform: unset;
            visibility: visible;
            opacity: 1;
            padding-top: 10px;
        }
        .card:hover::before {
            background-color: unset; 
        }
        .video-projet {
            height: unset;
            transform: translateY(-68%);
        }
        .work-intro-container {
            margin-bottom: 20px;
        }
        .isaure {
            object-position: 50% 25%;
        }
        .logo-container[data-v-7c6cb580] {
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
        .logo img {
            width: 50%;
        }
    }
    @media screen and (max-width: 628px) {
        .card {
            height: 450px!important;
            margin: 0 auto 30px auto !important;
            min-width: unset;
            width: 330px;
        }
        .image-container {
            height: 405px!important;
            width: unset;
        }
        .video-placeholder.a {
            transform: translateX(-24%);
        }
        .video-placeholder.d {
            transform: translateX(0);
            width: 100%;
        }
        .video-placeholder.b, .video-placeholder.c {
            transform: translateX(-20%);
        }
        .video-projet {
            display: none!important;
        }
        .video-placeholder {
            display: block!important;
        }
        .work-container {
            padding: 15px;
        }
        .isaure {
            height: 100%;
        }
        .about-me-text p {
            font-size: 18px;
        }
        .about-me-container {
            padding: 15px;
        }
        .achievements-container p {
            padding-left: 0px;
        }
        .work-intro-container {
            margin: 20px;
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
        }
        .amazing {
            margin-top: 20px;
        }
        .services-image {
            height: 400px;
        }
    }
</style>