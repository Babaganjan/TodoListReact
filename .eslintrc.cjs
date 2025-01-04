// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     "airbnb/base",
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:react-hooks/recommended",
//   ],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parser: "@typescript-eslint/parser",
//   plugins: ["react-refresh"],
//   rules: {
//     "react-refresh/only-export-components": [
//       "warn",
//       { allowConstantExport: true },
//     ],
//   },
// };

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"], // Добавьте плагин import
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Укажите расширения, которые используете
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/extensions": [
      "error",
      "always", // Измените на always, если требуется
      {
        ts: "never", // Попробуйте удалить расширения для ts
        tsx: "never",
        js: "never",
        jsx: "never",
      },
    ],
    // Добавьте другие ваши правила здесь
  },
};
