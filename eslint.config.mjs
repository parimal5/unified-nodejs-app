export default [
  // 1. Ignore staging/temporary directories and build artifacts
  {
    ignores: [
      ".workflow-stage-1/**",
      "dist/**",
      "node_modules/**"
    ]
  },

  // 2. Lint project files with Node 18+ globals
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];