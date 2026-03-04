<template>
  <section
    class="mt-8 bg-[var(--surface-base)] p-6 text-center text-base text-[var(--text-primary)]"
  >
    <p class="uppercase md:text-2xl">
      I use my passion and skills to create digital products and experiences.
    </p>

    <div class="mt-2 uppercase md:text-2xl">
      <p class="m-0 inline-block align-top">
        Bringing ideas to life:&nbsp;
        <br />
        <span
          v-for="(word, index) in words"
          :key="index"
          class="word transition-opacity duration-300"
          :class="{ 'word--static': showAllWords }"
          v-show="showAllWords || index === currentWord"
        >
          <span
            v-for="(letter, i) in word.text"
            :key="i"
            class="letter inline-block will-change-transform"
            :class="getLetterClass(word, index, i)"
          >
            {{ letter }}
          </span>
        </span>
      </p>
    </div>

    <p class="mt-6 font-light md:text-xl">
      Contact me @
      <a href="mailto:isaurelohest@gmail.com" class="text-inherit">isaurelohest@gmail.com</a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'HomeIntroSection',
  props: {
    words: {
      type: Array,
      required: true,
    },
    currentWord: {
      type: Number,
      required: true,
    },
    showAllWords: {
      type: Boolean,
      default: false,
    },
    letterClassFor: {
      type: Function,
      required: true,
    },
  },
  methods: {
    getLetterClass(_word, wordIndex, letterIndex) {
      return this.letterClassFor(wordIndex, letterIndex);
    },
  },
};
</script>

<style scoped>
.word {
  transition: opacity 0.3s ease;
}

.word--static {
  display: block;
  margin-top: 0.25rem;
}

.letter {
  display: inline-block;
  position: relative;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}

.letter.out {
  transform: rotateX(90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind {
  transform: rotateX(-90deg);
}

.letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
