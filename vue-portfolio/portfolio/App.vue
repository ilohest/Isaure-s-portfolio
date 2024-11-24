<template>
  <div id="app" class="main">
   
    <!-- Menu horizontal -->
    <div class="navigation-menu">
      <router-link to="/random-recipe"></router-link>
    </div>

    <!-- Affichage des composants en fonction des routes -->
    <router-view></router-view> 
  </div>
</template>
   

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
  