const path = require('path');

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, 'tsconfig.json'),
    tsconfigRootDir: path.resolve(__dirname),
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript/base",
  ],
  rules: {
    "no-console": "error",
    "no-shadow": ["error", {"allow": ["state"]}],
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state",
        ],
      },
    ],
  },
};
