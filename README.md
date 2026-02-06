# stylelint-selector-bem-pattern

> [!IMPORTANT]
> This project is a fork of [simonsmith/stylelint-selector-bem-pattern](https://github.com/simonsmith/stylelint-selector-bem-pattern).
>
> **Why this fork?**
> This fork was created to modernize the package, adding support for Node 22, 24, and 25, converting the entire codebase to TypeScript, and ensuring compatibility with Stylelint 17. The original project appeared to be lagging behind modern Node.js and Stylelint versions.

[![NPM version](http://img.shields.io/npm/v/stylelint-selector-bem-pattern.svg)](https://www.npmjs.com/package/stylelint-selector-bem-pattern) [![Build Status](https://github.com/bleeding-gums/stylelint-selector-bem-pattern/actions/workflows/ci.yml/badge.svg)](https://github.com/bleeding-gums/stylelint-selector-bem-pattern/actions/workflows/ci.yml)

A [stylelint](https://github.com/stylelint/stylelint) plugin that incorporates [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter).

To learn more about postcss-bem-linter, please read [that module's documentation](https://github.com/postcss/postcss-bem-linter).

## Installation

```bash
npm install stylelint-selector-bem-pattern
```

## Usage

Add it to your stylelint config `plugins` array, then add `"plugin/selector-bem-pattern"` to your rules, specifying your postcss-bem-linter settings as the primary option.

Even though postcss-bem-linter has the default setting of `{ preset: 'suit' }`, this plugin has no default setting: if you want to use the SUIT preset, you must pass `{ preset: 'suit' }`, and the rule will not work if you do not pass a primary option object.

### Example configuration

```js
// stylelint.config.mjs
export default {
  plugins: ["stylelint-selector-bem-pattern"],
  rules: {
    "plugin/selector-bem-pattern": {
      componentName: "[A-Z]+",
      componentSelectors: {
        initial: "^\\.{componentName}(?:-[a-z]+)?$",
        combined: "^\\.combined-{componentName}-[a-z]+$",
      },
      utilitySelectors: "^\\.util-[a-z]+$",
    },
  },
};
```

For more examples of postcss-bem-linter configuration possibilities, please read [that module's documentation](https://github.com/postcss/postcss-bem-linter).

## Modernization Changes

- **TypeScript**: Completely rewritten in TypeScript for better type safety and developer experience.
- **Modern Node.js**: Support for Node.js 22, 24, and 25.
- **Stylelint 17**: Updated to support the latest Stylelint 17.x versions while maintaining compatibility with 16.x.
- **ESM First**: The package is now fully ESM.
- **Main Branch**: Renamed from `master` to `main`.
