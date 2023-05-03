module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'security', 'sonarjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 0,
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'max-len': ['error', { code: 100, ignorePattern: '^import' }],
    'require-await': 'error',
    'no-return-await': 'error',
    'arrow-parens': ['warn', 'always'],
    eqeqeq: ['error', 'always'],
    'security/detect-object-injection': 0,
    curly: 'error',
    'no-undef-init': 'error',
    'prefer-const': 'error',
    'no-eq-null': 'error',
    'max-depth': ['error', 3],
    'no-control-regex': 0,
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-continue': 'warn',
    'no-else-return': ['error', { allowElseIf: true }],
    'no-duplicate-imports': 'error',
    'lines-between-class-members': ['error', 'always'],
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    'no-restricted-syntax': [
      'error',
      {
        /**
         * @see https://palantir.github.io/tslint/rules/static-this/
         */
        selector: 'MethodDefinition[static = true] ThisExpression',
        message:
          "If you're calling a static method, you need to call it with the name of its " +
          "class instead of using 'this'. Static 'this' usage can be confusing for newcomers. " +
          "It can also become imprecise when used with extended classes when a static 'this' of a " +
          'parent class no longer specifically refers to the parent class.',
      },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object:
            'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.' +
            'If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.' +
            'If you want a type meaning "any value", you probably want `unknown` instead.',
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    'no-restricted-imports': ['warn'],
  },
};
