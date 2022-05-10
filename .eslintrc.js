module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": "none",
        "requireLast": true
      }
    }],
    // 解决 any 警告  warning: Unexpected any. Specify a different type 
    "@typescript-eslint/no-explicit-any": ["off"]
  }
}
