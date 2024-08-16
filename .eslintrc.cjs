module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    'semi': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'ignoredNodes': ['ConditionalExpression'],
    }],
    'no-unused-expressions': 'off',

    '@typescript-eslint/no-unused-vars': ['warn', {
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_',
    }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: [
    'dist',
    '*.cjs',
    '.eslintrc.cjs',
    'tailwind.config.js',
    'src/lib/shadcn-ui-utils.ts',
    'src/components/shadcn-ui/ui/**/*',
  ],
};
