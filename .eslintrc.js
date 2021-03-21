module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ['prettier', 'import'],
  extends: [
    'eslint:recommended',
    '@vue/standard',
    'plugin:vue/essential',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    /* override/add rules from https://eslint.org/docs/rules/ */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'no-unreachable': 1,
    'comma-dangle': 'off',
    eqeqeq: 1,
    indent: 'off',
    'vue/script-indent': [
      'warn',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
    camelcase: 'off',
    'accessor-pairs': 1,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
}
