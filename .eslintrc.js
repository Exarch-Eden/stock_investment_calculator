module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/prop-types": "off",
        // turn off prettier warnings
        "prettier/prettier": [
            "off",
            {
                // only apply to objects and arrays
                trailingComma: "es5",
                singleQuote: false,
            },
        ],
        // double quotes only
        quotes: ["error", "double"],
        // four space indentation only
        indent: ["error", 4, { "SwitchCase": 1 }],
        // no warnings for lack of trailing commas
        "comma-dangle": ["off"],
        // no warnings for lack of semi colon at end of line
        semi: "off",
        // NOTE: necessary to turn off non-TS rule
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        // no warnings for lack of {} with if else conditions
        curly: "off",
        "@typescript-eslint/no-explicit-any": ["warn"],
        "@typescript-eslint/ban-ts-comment": ["warn"],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/no-shadow": ["error"],
                "no-shadow": "off",
                "no-undef": "off",
            },
        },
    ],
};
