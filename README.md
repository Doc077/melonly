<div align="center">
  <img src="public/logo.png" width="72">

  <h1>Melonly Node.js Framework</h1>

  <p align="center">Fast and modern web development framework for Node.js.</p>

  <p align="center">
    <a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/v/@melonly/core.svg?style=flat-square&labelColor=333842&color=8b5cf6" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/dt/@melonly/core.svg?style=flat-square&labelColor=333842&color=3b82f6" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/dm/@melonly/core.svg?style=flat-square&labelColor=333842&color=3b82f6" alt="Month Downloads"></a>
    <a href="https://github.com/Doc077/melonly" target="_blank"><img src="https://img.shields.io/github/stars/Doc077/melonly?style=flat-square&labelColor=333842&color=3b82f6" alt="GitHub Stars"></a>
    <a href="https://github.com/Doc077/melonly" target="_blank"><img src="https://img.shields.io/github/issues/Doc077/melonly?style=flat-square&labelColor=333842&color=22c55e" alt="GitHub Issues"></a>
    <a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/l/@melonly/core.svg?style=flat-square&labelColor=333842&color=22c55e" alt="License"></a>
  </p>

  <h4>
    <a href="https://melonly.pl">Documentation</a>
    <span> · </span>
    <a href="#contributing">Contributing</a>
  </h4>
</div>

<!-- omit in toc -->
### 📓 Table of Contents

- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
- [Creating Project](#creating-project)
  - [Starter Templates](#starter-templates)
- [Running the Application](#running-the-application)
  - [Running with React or Vue](#running-with-react-or-vue)
- [Contributing](#contributing)
- [Security](#security)
- [Information](#information)
- [License](#license)

## About

Melonly is a fast and modern web development framework for Node.js. It makes it easy to create secure and fast web applications with awesome developer experience.

## Requirements

To run Melonly, your environment has to met few requirements:

- Node.js 16+
- [`npm`](https://nodejs.org/en/download/) and [`git`](https://git-scm.com) installed

## Installation

First, you only have to install `@melonly/cli` package before creating your first project:

```shell
$ npm install -g @melonly/cli
```

You can check the Melonly CLI version when it has been properly installed and you'll be able to run melon commands.

```shell
$ melon -v
```

## Creating Project

To create new Melonly project you can use the CLI. Just run the `new` command in your directory:

```shell
$ melon new <project-name>
```

### Starter Templates

Melonly comes with frontend frameworks integration out-of-the-box. You can create your project with predefined [React](https://reactjs.org) or [Vue](https://vuejs.org) template.

```shell
$ melon new <project-name> --template=vue
```

## Running the Application

Once your project has been created you can start it on the local server using `npm start`:

```shell
$ cd <project-name>
$ npm start
```

Your application will be available on `localhost:3000` by default. You can change the port in `.env` configuration file.

**If you don't want to open the browser automatically, use the `npm run start:dev` command.**

### Running with React or Vue

If your project has been created using Vue or React template, you have to run `npm run dev` command inside project's `resources` directory:

```shell
$ cd your-app\resources && npm run dev

# Then run in separate terminal instance:
$ cd your-app && npm start
```

## Contributing

We appreciate every willingness to help developing Melonly. This project is open-source. That means everyone can use and make it.

We encourage you to open issues and pull requests on this GitHub [repository](https://github.com/Doc077/melonly). It helps us a lot with developing the framework.

## Security

If you discovered any bug or security issue please open new issue / pull request in the [repository](https://github.com/Doc077/melonly) or email me: dom.rajkowski@gmail.com.

## Information

Documentation: [melonly.pl](https://melonly.pl)

GitHub repository: [github.com/Doc077/melonly](https://github.com/Doc077/melonly)

Author: [Doc077](https://github.com/Doc077)

## License

Melonly is an open-source framework licensed under the [MIT License](LICENSE).
