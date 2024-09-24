module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser', // Needed for @typescript-eslint
      parserOptions: {
        project: './tsconfig.json', // Points to your TypeScript config file
      },
      extends: [
        'standard-with-typescript', 
        'plugin:@typescript-eslint/recommended', 
        'plugin:prettier/recommended', 
        'prettier'
      ],
      rules: {
        // You can add or override specific ESLint rules here
      }
    }
  ],
};