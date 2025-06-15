import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

const commonRules = {
  // https://eslint.org/docs/latest/rules/curly
  curly: ['error', 'all'],
  // https://eslint.org/docs/latest/rules/padding-line-between-statements
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    { blankLine: 'always', prev: '*', next: 'return' },
  ],
  // https://eslint.org/docs/latest/rules/no-multiple-empty-lines
  'no-multiple-empty-lines': ['error'],
  // https://eslint.org/docs/latest/rules/arrow-body-style
  'arrow-body-style': ['error', 'as-needed'],
  // https://eslint.org/docs/latest/rules/prefer-arrow-callback
  'prefer-arrow-callback': 'off',
  // https://eslint.org/docs/latest/rules/no-underscore-dangle
  'no-underscore-dangle': [
    'error',
    {
      allow: ['_id', '__typename', '__schema', '__dirname', '_global'],
      allowAfterThis: true,
    },
  ],
};

export default [
  skipFormatting,
  js.configs.recommended,

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    rules: {
      ...commonRules,

      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'vue/no-v-html': 'off',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
          style: {
            lang: 'postcss',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineProps', 'defineEmits', 'defineModel'],
          defineExposeLast: true,
        },
      ],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/no-static-inline-styles': [
        'error',
        {
          allowBinding: false,
        },
      ],
    },
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              // Импорты unscoped package (node_modules)
              '^(?!@)(?!\\.).+',
              // Импорты scoped package (node_modules)
              '^@[^/]+/',
              // Импорты из alias './src'
              '^@/app(/|$)',
              '^@/pages(/|$)',
              '^@/widgets(/|$)',
              '^@/features(/|$)',
              '^@/entities(/|$)',
              '^@/shared(/|$)',
              // Импорты из alias './src/modules'
              '^@/modules/[^/]+/pages(/|$)',
              '^@/modules/[^/]+/widgets(/|$)',
              '^@/modules/[^/]+/features(/|$)',
              '^@/modules/[^/]+/entities(/|$)',
              '^@/modules/[^/]+/shared(/|$)',
              // Импорты, начинающиеся с точки
              '^\\.',
            ],
          ],
        },
      ],
    },
  },
];
