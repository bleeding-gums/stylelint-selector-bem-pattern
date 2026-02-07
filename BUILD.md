# Build and Release Process

This document outlines the steps required to build, test, and publish the `stylelint-selector-bem-pattern` package.

## 🛠 Prerequisites

- **Node.js**: `^22.0.0`, `^24.0.0`, or `^25.0.0`
- **npm**: Standard npm client

## 📥 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/bleeding-gums/stylelint-selector-bem-pattern.git
cd stylelint-selector-bem-pattern
npm install
```

## 🚀 Development Workflow

### Linting and Formatting

We use ESLint for code quality and Prettier for code formatting.

```bash
# Check for linting issues
npm run lint

# Automatically fix formatting issues
npm run format
```

### Testing

Tests are written using Jest and can be run with:

```bash
npm test
```

The tests run in a band (`--runInBand`) and enable experimental VM modules for ESM support.

## 🏗 Building

The project is written in TypeScript and must be compiled to JavaScript before publishing.

```bash
npm run build
```

The compiled files will be located in the `dist/` directory. This includes:

- `index.js`: The main entry point.
- `index.d.ts`: TypeScript declaration files.

## 📦 Publishing to npm

### 1. Preparation

Ensure the code is clean, tested, and following formatting rules:

```bash
npm run format
npm run build
npm test
npm run lint
```

### 2. Versioning

We follow [Semantic Versioning (SemVer)](https://semver.org/). Update the version in `package.json` and create a Git tag:

```bash
# Example: Patch release
npm version patch -m "chore: release v%s"
```

### 3. Publishing

The `prepare` script in `package.json` ensures the project is built automatically before publishing.

```bash
# Login if you haven't
npm login

# Dry run to verify package contents
npm publish --dry-run

# Publish to npm
npm publish --access public
```

## 🤖 CI/CD

We use GitHub Actions for Continuous Integration. Every push and pull request to the `main` branch triggers:

1. Dependency installation (`npm ci`).
2. Build validation (`npm run build`).
3. Linting (`npm run lint`).
4. Automated testing (`npm test`) across Node.js versions 22, 24, and 25.

Refer to `.github/workflows/ci.yml` for the configuration details.
