module.exports = {
  root: true,
  env: { node: true, browser: true, es2021: true },
  ignorePatterns: [
    'src/assets/Gradient-generator/bundle.js',
    'src/assets/Gradient-generator/Ancienne version/**',
    'dist/**'
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier' // <-- pas de plugin prettier, juste la config
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off'
  }
};
