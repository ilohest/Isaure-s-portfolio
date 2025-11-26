<!-- components/Header.vue -->
<template>
  <header>
    <div
      class="header border-b-1 border-[var(--main-white)] bg-[var(--red-bg)] text-[var(--main-white)]"
    >
      <router-link to="/" @click="closeMenu" class="mobile-logo-container"
        ><img src="../assets/img/sticker-isaure-v2-noQR.png" alt="logo" class="logo-menu"
      /></router-link>

      <!-- <div class="sections">
        <div class="left-section hidden md:flex">Available for freelance work</div>
        <div class="right-section">
          <a href="mailto:isaure.lohest@gmail.com">isaure.lohest@gmail.com</a>
        </div>
      </div> -->

      <!-- Menu Mobile -->
      <div class="mobile-menu">
        <button @click="toggleMobileMenu" class="hamburger" :class="{ open: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          :class="{ 'mobile-menu-content': true, opened: isMobileMenuOpen }"
          v-show="isMobileMenuOpen"
        >
          <template v-if="currentMenu === 'main'">
            <ul>
              <li
                :class="{ 'menu-item': true, show: isMobileMenuOpen }"
                :style="{ '--stagger-delay': '0.05s' }"
              >
                <router-link to="/" @click="closeMenu">Home</router-link>
              </li>

              <li
                :class="{ 'menu-item': true, show: isMobileMenuOpen, active: isAchievementsActive }"
                :style="{ '--stagger-delay': '0.13s' }"
              >
                <router-link to="/achievements" @click="closeMenu">Achievements</router-link>
              </li>

              <li
                :class="{ 'menu-item': true, show: isMobileMenuOpen }"
                :style="{ '--stagger-delay': '0.21s' }"
              >
                <router-link to="/services" @click="closeMenu">Services</router-link>
              </li>

              <li
                :class="{ 'menu-item': true, show: isMobileMenuOpen }"
                :style="{ '--stagger-delay': '0.29s' }"
              >
                <router-link to="/contact" @click="closeMenu">Contact</router-link>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>

    <!-- Menu Desktop -->
    <nav
      class="desktop-menu border-round-2xl relative top-[15px] mx-4 border-1 border-[var(--main-white)] bg-[var(--red-bg)] text-[var(--main-white)]"
    >
      <ul>
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li :class="{ active: isAchievementsActive }">
          <router-link to="/achievements" @click="closeMenu">Achievements</router-link>
        </li>

        <li>
          <router-link to="/services" @click="closeMenu">Services</router-link>
        </li>
        <li>
          <router-link to="/contact" @click="closeMenu">Contact</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      currentMenu: 'main',
      // Mobile menu
      isMobileMenuOpen: false,
    };
  },

  watch: {
    $route() {
      this.closeMenu();
    },
  },

  computed: {
    isAchievementsActive() {
      // Vérifie si l'utilisateur est dans une route sous "achievements"
      return this.$route.path.startsWith('/achievements');
    },
  },

  methods: {
    // Mobile menu
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMenu() {
      this.isMobileMenuOpen = false;
    },
  },
};
</script>
