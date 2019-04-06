module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-constructor': 0,
    'indent': ['error', 2],
    'space-before-function-paren': [ 2, 'never' ],
    'vue/max-attributes-per-line': [ 0 ],
    semi: [ 2, 'always' ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
