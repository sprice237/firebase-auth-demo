module.exports = {
  extends: ['@sprice237/eslint-config-firebase-auth-demo'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
      },
    ],
  },
};
