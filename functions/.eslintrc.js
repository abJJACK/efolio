module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    // 关闭全局的缩进和对象大括号间距规则
    "object-curly-spacing": "off",
    "indent": "off",
    "max-len": "off",
    "eol-last": "off"
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {
        // 保持对特定文件的规则关闭，已无重复 max-len
        "object-curly-spacing": "off", // 关闭对象大括号间距规则
        "indent": "off", // 关闭缩进规则
        "max-len": "off", // 关闭每行最大长度限制
        "eol-last": "off" // 关闭行末新行规则
      },
    },
  ],
  globals: {},
};