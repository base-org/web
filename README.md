# Base Web

## Setup

1. Ensure `nvm` is [installed](https://github.com/nvm-sh/nvm#install--update-script).
2. Clone the repository.
3. If `nvm` doesn't auto-load the Node.js environment when changing to the repo directory, run `nvm use`.
4. Enable Yarn by running `corepack enable`.

## Getting started

After cloning the repository begin by installing dependencies at the root.

```shell
yarn
yarn build
```

## Local development

To start a development server on localhost, run `yarn workspace @app/<project> dev`.

For example, to start the `web` app locally, you would run `yarn workspace @app/web dev`.

## Projects

There are three projects which can be run individually.

### Web

```
yarn workspace @app/web dev
```

### Docs

```
yarn workspace @app/base-docs dev
```

### Bridge

```
yarn workspace @app/bridge dev
```

## Contribution

We welcome contributions to Base project! To contribute, please follow these steps:

1. Fork this repository.
2. Commit your changes in a new branch.
3. Create a pull request.

### Visual Changes

If your pull request includes any visual changes to the project, please include before and after screenshots in your pull request description to help us better understand the changes.

### Test Coverage

Please ensure that your pull request has good test coverage for the feature you implemented.

### Review

Thank you for your contribution!
