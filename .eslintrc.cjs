module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        pathGroups: [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "~/constants/.+",
            "group": "external",
            "position": "after"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import/newline-after-import": [
      "warn",
      {
        "count": 2
      }
    ]
  },
}
