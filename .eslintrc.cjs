/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto', //不让prettier检测文件每行结束的格式
                singleQuote: true, // 单引号
                semi: false, // 无分号
                printWidth: 80, // 每行宽度至多80字符
                ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
            }
        ],
        'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
        'no-undef': 'error',
        'vue/no-v-model-argument': 'off'
    },
    globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
    }
}