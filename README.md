# SimpleInvoice

This project uses Reactjs as the base framework for Front-end development. For styling, this project using Material UI and custom theme. And for each interaction user makes like a button click, hovering a component,... an action that attaches to that interaction will send to logic handling section such as calling api, update data and so on.

## Table of Contents

1. [Project Setup](#project-setup)
1. [Tech](#tech)
1. [Engine Locking](#engine-locking)
1. [Code Formatting and Quality Tools](#code-formatting-and-quality-tools)
1. [Git Hooks](#git-hooks)
1. [Directory Structure](#directory-structure)
1. [Testing](#testing)

## Project Setup

We'll begin by cloning this project to our computer. In the command prompt that has linked to your desired directory, input this command

```bash
git clone git@github.com:BoPoppy/Assessment-Project.git
```

> Please note if you has an error run this command, make sure you have git command package installed and ssh key added to your gitlab.

Then we will test to make sure the app is working. We're going to be using `yarn` for this.

> Make sure you install yarn package manager for this project.

```
yarn

yarn start
```

You should see the demo app available on [http://localhost:3000](http://localhost:3000)

Also recommended to run

```
yarn build
```

To ensure you can successfully do a production build of the project.

## Tech

Project uses a number of libraries to work properly:

- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Material UI](https://mui.com/material-ui/getting-started/overview/) - a library of React UI components that implements Google's Material Design.
- [React Hook Form](https://react-hook-form.com/get-started/) - Performant, flexible and extensible forms with easy-to-use validation.
- [moment](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript
- [React-Toastify](https://github.com/fkhadra/react-toastify#readme) - allows you to add notifications to your app with ease. No more nonsense!
- [@reduxjs/toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [redux-saga](https://redux-saga.js.org/) - An intuitive Redux side effect manager.

## Engine Locking

We would like for all developers working on this project to use the same Node engine and package manager we are using. To do that we create two new files:

- `.nvmrc` - Will tell other uses of the project which version of Node is used
- `.npmrc` - Will tell other users of the project which package manager is used

We are using `Node v14 Fermium` and `yarn` for this project so we set those values like so:

`.nvmrc`

```.nvmrc
lts/fermium
```

`.npmrc`

```
engine-strict=true
```

You can check your version of Node with `node --version` and make sure you are setting the correct one. A list of Node version codenames can be found [here](https://github.com/nodejs/Release/blob/main/CODENAMES.md)

Note that the use of `engine-strict` didn't specifically say anything about `yarn`, we do that in `package.json`:

`package.json`

```json
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=14.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
  ...
```

The `engines` field is where you specify the specific versions of the tools you are using. You can also fill in your personal details if you choose.

## Code Formatting and Quality Tools

In order to set a standard that will be used by all contributors to the project to keep the code style consistent and basic best practices followed we will be implementing two tools:

- [eslint](https://eslint.org/) - For best practices on coding standards
- [prettier](https://prettier.io/) - For automatic formatting of code files

### ESLint

We'll begin with ESLint, which is easy because it automatically comes installed and pre-configured with Next.js projects.

We are just going to add a little bit of extra configuration and make it a bit stricter than it is by default. We configure everything in `.eslintrc` which should already exist in the directory:

`.eslintrc`

In the above small code example we have added a few additional defaults, we have said that `React` will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore \_ if you have declared them but not used them in the code.

I find that scenario comes up often when you are working on a feature and want to prepare variables for use later, but have not yet reached the point of implementing them.

### Prettier

Prettier will take care of automatically formatting our files for us.

```
yarn add -D prettier
```

I also recommend you get the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) so that VS Code can handle the formatting of the files for you and you don't need to rely on the command line tool. Having it installed and configured in your project means that VSCode will use your project's settings, so it's still necessary to add it here.

We'll create two files in the root:

`.prettierrc`

```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Those values are entirely at your discretion as to what is best for your team and project.

`.prettierignore`

```
.yarn
.next
dist
node_modules
```

In that file there is a list of directories to let Prettier knows not to waste any resources working on.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

## Git Hooks

We are going to implement a tool called [Husky](https://typicode.github.io/husky/#/)

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc.

This ensures that we are not allowed to push to the remote repository unless our code can successfully build. That seems like a pretty reasonable condition doesn't it? Feel free to test it by committing this change and trying to push.

---

Lastly we are going to add one more tool for linting our commit messages:

```
yarn add -D @commitlint/config-conventional @commitlint/cli
```

`commitlint.config.js`

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

Then enable commitlint with Husky by using:

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# Sometimes above command doesn't work in some command interpreters
# You can try other commands below to write npx --no -- commitlint --edit $1
# in the commit-msg file.
npx husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"
# or
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

## Directory Structure

```
/src
/src/__tests__
/src/assets/icons/
/src/components/
/src/config/
/src/constant/
/src/mocks/
/src/models/
/src/modules/
/src/routers/
/src/services/
/src/store/
/src/theme/
```

- `src` - Components/app/domain logic will live in here.
- `src/__tests__/` - Will contained testcases
- `src/assets/icons/` - Will contained the background icons
- `src/components/` - Will contained all the common, reusable components
- `src/config/` - Will contained config from the installed library such as axios
- `src/constant/` - Will contained constants to use in the projects
- `src/mocks/` - Will contained mocks to use in the testcase
- `src/models/` - Will contained all the type and models to use in the projects
- `src/modules/` - Will contained page modules for the project
- `src/routers/` - Will contained routers for each page in the project
- `src/services/` - Will contained the api call services
- `src/store/` - Will contained the redux store with redux saga logic
- `src/theme/` - Will contained the customed theme using mui

## Testing

All the test files will be at `src/__tests__` directory.

To run command for testing, there are two commands:

```
yarn test: // Watch files for changes and rerun tests related to changed files.
yarn test:ci // running in a CI environment and test coverage information will be collected and reported in the output.
```
