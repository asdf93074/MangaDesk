module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'require-jsdoc': 0,
    'max-len': [0, {'code': 130}],
    'linebreak-style': 0,
    'react/prop-types': 0,
    'no-tabs': 0,
		'indent': 0,
		'object-curly-spacing': 0,
  },
};
