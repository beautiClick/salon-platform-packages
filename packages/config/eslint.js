import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Base flat config shared by every Salon repo.
 * Order matters: later entries override earlier ones, so Prettier's
 * "turn off formatting rules" config goes LAST.
 */
export const base = tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.next/**', '**/coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // Force `import type` for type-only imports (pairs with verbatimModuleSyntax).
      '@typescript-eslint/consistent-type-imports': 'error',
      // Underscore prefix is the escape hatch for intentionally unused args.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
);
