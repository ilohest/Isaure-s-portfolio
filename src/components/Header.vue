<template>
  <header>
    <div
      class="header border-b-1 border-[var(--text-inverse)] text-[var(--text-inverse)]"
      :class="isTransparentHeader ? 'bg-transparent' : 'bg-[var(--surface-accent)]'"
    >
      <router-link to="/" @click="closeMenu" class="mobile-logo-container">
        <img src="/assets/media/common/legacy-img/isaure-logo-W-960.png" alt="logo" class="h-[50px] w-[50px]" />
      </router-link>

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
                :class="{
                  'menu-item': true,
                  show: isMobileMenuOpen,
                  active: isHomeActive,
                }"
                :style="{ '--stagger-delay': '0.05s' }"
              >
                <router-link to="/" @click="closeMenu">Home</router-link>
              </li>

              <li
                :class="{
                  'menu-item': true,
                  show: isMobileMenuOpen,
                  active: isAchievementsActive,
                }"
                :style="{ '--stagger-delay': '0.13s' }"
              >
                <router-link to="/achievements" @click="closeMenu">Achievements</router-link>
              </li>

              <li
                :class="{
                  'menu-item': true,
                  show: isMobileMenuOpen,
                  active: isServicesActive,
                }"
                :style="{ '--stagger-delay': '0.21s' }"
              >
                <router-link to="/services" @click="closeMenu">Services</router-link>
              </li>

              <li
                :class="{
                  'menu-item': true,
                  show: isMobileMenuOpen,
                  active: isContactActive,
                }"
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
      class="desktop-menu border-1 border-[var(--text-inverse)]"
      :class="desktopNavClass"
    >
      <router-link to="/" class="desktop-logo" aria-label="Home">
        <img
          :src="desktopLogoSrc"
          alt="Isaure Lohest"
          class="logo-desktop"
        />
      </router-link>

      <ul>
        <li :class="{ active: isHomeActive }">
          <router-link to="/" @click="closeMenu">Home</router-link>
        </li>

        <li :class="{ active: isAchievementsActive }">
          <router-link to="/achievements" @click="closeMenu">Achievements</router-link>
        </li>

        <li :class="{ active: isServicesActive }">
          <router-link to="/services" @click="closeMenu">Services</router-link>
        </li>

        <li :class="{ active: isContactActive }">
          <router-link to="/contact" @click="closeMenu">Contact</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    onHero: {
      type: Boolean,
      default: false,
    },
    isAtTop: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentMenu: 'main',
      isMobileMenuOpen: false,
    };
  },

  watch: {
    $route() {
      this.closeMenu();
    },
  },

  computed: {
    isHomeActive() {
      return this.$route.path === '/';
    },
    isAchievementsActive() {
      return this.$route.path.startsWith('/achievements');
    },
    isServicesActive() {
      return this.$route.path.startsWith('/services');
    },
    isContactActive() {
      return this.$route.path.startsWith('/contact');
    },
    isServicesRoute() {
      return this.$route.path.startsWith('/services');
    },
    isHomeRoute() {
      return this.$route.path === '/';
    },
    isTransparentHeader() {
      return this.isAtTop && (this.isServicesRoute || this.isHomeRoute);
    },
    desktopNavClass() {
      if (this.isTransparentHeader) {
        return 'header-nav--transparent bg-transparent';
      }

      if (this.isServicesRoute) {
        return 'header-nav--default bg-[var(--surface-accent)]';
      }

      return this.onHero
        ? 'header-nav--hero bg-[var(--text-inverse)]'
        : 'header-nav--default bg-[var(--surface-accent)]';
    },
    desktopLogoSrc() {
      if (this.isTransparentHeader) {
        return '/assets/media/common/legacy-img/isaure-logo-W-960.png';
      }

      if (this.isServicesRoute) {
        return '/assets/media/common/legacy-img/isaure-logo-W-960.png';
      }

      return this.onHero
        ? '/assets/media/common/legacy-img/isaure-logo-B-960.png'
        : '/assets/media/common/legacy-img/isaure-logo-W-960.png';
    },
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMenu() {
      this.isMobileMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.desktop-menu {
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 5px 10px;
}

.logo-desktop {
  height: 35px;
  width: auto;
  display: block;
}
</style>
