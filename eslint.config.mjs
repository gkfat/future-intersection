//@ts-check

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({})
    .append(
        {
            files: ['**/*.vue'],
            rules: {
                'vue/html-indent': [
                    'error',
                    4,
                    {
                        attribute: 1,
                        alignAttributesVertically: true,
                    },
                ],
                'vue/max-attributes-per-line': [
                    'error', {
                        singleline: { max: 1 },
                        multiline: { max: 1 },
                    },
                ],
                'vue/multi-word-component-names': 'off',
                'vue/html-self-closing': [
                    'error', {
                        html: {
                            void: 'never',
                            normal: 'always',
                            component: 'always',
                        },
                        svg: 'always',
                        math: 'always',
                    },
                ],
                'vue/html-closing-bracket-newline': [
                    'error', {
                        'singleline': 'never',
                        'multiline': 'always',
                        'selfClosingTag': {
                            'singleline': 'never',
                            'multiline': 'always',
                        },
                    },
                ],
            },
        },
    )
    .append(

        // all files
        {
            rules: {
                indent: ['error', 4],
                quotes: ['error', 'single'],
                semi: 'error',
                'comma-dangle': ['error', 'always-multiline'],
                'no-multiple-empty-lines': ['error', { max: 1 }],
                'object-curly-spacing': ['error', 'always'],
                'object-curly-newline': [
                    'error', {
                        multiline: true,
                        minProperties: 2,
                    },
                ],
                'array-bracket-newline': [
                    'error', {
                        multiline: true,
                        minItems: 3,
                    },
                ],
                'array-element-newline': ['error', { minItems: 3 }],
                '@typescript-eslint/no-namespace': 'off',
            },
        },
    );
