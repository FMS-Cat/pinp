module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": 0,
        "indent": [ "error", 2 ],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ],
        "space-in-parens": [ "error", "always" ],
        "object-curly-spacing": [ "error", "always" ],
        "array-bracket-spacing": [ "error", "always" ],
        "computed-property-spacing": [ "error", "always" ],
        "space-infix-ops": [ "error" ],
        "no-unused-vars": [ "warn", { "args": "none" } ]
    }
};