module.exports = {
  root: true,
  env: { node: true, browser: true, es2021: true, 'vue/setup-compiler-macros': true },
  reportUnusedDisableDirectives: true,
  globals: {
    computed: 'readonly',
    createError: 'readonly',
    defineEmits: 'readonly',
    defineProps: 'readonly',
    navigateTo: 'readonly',
    nextTick: 'readonly',
    onBeforeUnmount: 'readonly',
    onMounted: 'readonly',
    ref: 'readonly',
    useHead: 'readonly',
    usePageSeo: 'readonly',
    useRoute: 'readonly',
    useRuntimeConfig: 'readonly',
    useSeoMeta: 'readonly',
    useSiteShell: 'readonly',
    useSiteTheme: 'readonly',
    useState: 'readonly',
    watch: 'readonly',
    withDefaults: 'readonly'
  },
  ignorePatterns: [
    '.nuxt/**',
    '.output/**',
    'dist/**',
    'src/assets/Gradient-generator/bundle.js',
    'src/assets/Gradient-generator/Ancienne version/**'
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier' // <-- pas de plugin prettier, juste la config
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser'
    },
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': 'allow-with-description',
            minimumDescriptionLength: 8
          }
        ]
      }
    }
  ]
};
