<template>
  <div class="not-found">
    <p class="not-found-title">Oops... Page not found.</p>

    <p class="not-found-code">404</p>
    <p class="not-found-fun">
      LET'S TURN THIS DEAD END INTO A PROJECT YOUR AUDIENCE WILL LOVE.
    </p>

    <router-link to="/" class="button home">Go back home</router-link>
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
  margin: 0;
  min-height: calc(100vh - 120px);
  color: var(--interactive-primary);
  font-weight: 400;
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  font-size: var(--fs-18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

.not-found-title {
  font-size: clamp(2.4rem, 7vw, 6rem);
  line-height: 0.95;
}

.not-found-code {
  font-size: clamp(6rem, 22vw, 16rem);
  line-height: 0.82;
}

.not-found-fun {
  max-width: 32ch;
  font-size: 2rem;
  line-height: 1.9167rem;
  color: var(--surface-inverse);
  text-transform: uppercase;
}
.home {
  text-decoration: none;
  display: inline-block;
  padding: 12px 16px;
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  font-size: var(--fs-18);
}
</style>
