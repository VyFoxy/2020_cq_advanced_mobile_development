module.exports = {
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'jsconfig.json',
    jsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['unused-imports'],
  root: true,
  extends: 'next/core-web-vitals',
  ignorePatterns: [
    '.eslintrc.js',
    'next.config.js',
    // "ecosystem.config.js",
    'index.js'
  ],
  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
    'comma-dangle': ['error', 'never'],
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'no-undef': 2,
    'no-bitwise': 0,
    'no-control-regex': 0
  }
};
