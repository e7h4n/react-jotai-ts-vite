import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(
    {
        ...eslint.configs.recommended,
        ignores: ['dist/**', 'public/**'],
    },
    {
        extends: [
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        files: ['**/*.{ts,tsx}'],
        ignores: ['dist/**', 'public/**'],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'no-undef': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    }
);
