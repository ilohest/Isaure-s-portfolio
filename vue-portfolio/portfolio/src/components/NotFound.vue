<template>
    <div class="not-found">
        <p>
            Oops... Page not found.
        </p>

        <p>
            404
        </p>

        <router-link to="/" class="home">Go back home</router-link>

        <div class="logo">
            <img src="../assets/sticker-isaure-v2-noQR.png" alt="Logo">
        </div>
    </div>
</template>

<script>   
    export default {
        name: 'NotFound',
    };
</script>

<style scoped>
    .not-found {
        text-transform: uppercase;
        letter-spacing: 0.01em;
        margin: 70px 0;
        color: var(--red);
        font-weight: 400;
        font-family: 'Anton';
        font-size: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px
    }
    .home {
        text-decoration: none;
        background: var(--red);
        color: var(--light-content);
        padding: 15px;
        border-radius: 40px;
        font-weight: 400;
        font-family: 'Anton';
        font-size: 28px;
    }
    .logo img {
        width: 250px;
    }
</style>