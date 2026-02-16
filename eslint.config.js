import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/essential'],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ga: 'readonly',
        process: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
      },
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },

  eslintConfigPrettier,

  {
    ignores: [
      'dist/**',
      '.quasar/**',
      'node_modules/**',
      'quasar.config*.temporary.compiled*',
    ],
  },
]
