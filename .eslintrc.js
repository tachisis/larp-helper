module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // Vue правила
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],

    // TypeScript правила
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Общие правила
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'es5'],
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.min.js'],
};
