<p align="center">
    <img src="public/logo.png" width="54">
</p>

<!-- omit in toc -->
## Melonly Node.js Framework

<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/v/@melonly/core.svg?style=flat-square&labelColor=333842&color=10b981" alt="Latest Version"></a>
<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/dt/@melonly/core.svg?style=flat-square&labelColor=333842&color=10b981" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/l/@melonly/core.svg?style=flat-square&labelColor=333842&color=10b981" alt="License"></a>

Melonly is a fast and modern web development framework for Node.js. It makes it easy to create secure and fast web applications with awesome developer experience.

**Table of Contents**

- [Documentation](#documentation)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running Application](#running-application)
- [License](#license)
- [Information](#information)

## Documentation

Melonly documentation is available on the [official site](https://melonly.pl).

## Requirements

- Node.js 15+
- `npm` installed

## Installation

To create new Melonly project we recommend to use the CLI installer. You only have to install `@melonly/cli` package:

```shell
npm install -g @melonly/cli
```

You can check the Melonly CLI version if it has been properly installed:

```shell
melon -v
```

To create new project run the `new` command in your directory:

```shell
melon new <project-name>
```

## Running Application

Once your project has been created you can start it on the local server using `npm start`:

```shell
cd <project-name>

npm start
```

Your application will be available on `localhost:3000` by default. You can change the port in `.env` configuration file.

If you don't want to open the browser automatically, use the `npm run start:dev` command.

## License

Melonly is an open-source framework licensed under the [MIT License](LICENSE).

If you discovered a bug or security vulnerability please open an issue / pull request in the repository or email me: dom.rajkowski@gmail.com.

## Information

Logo credit: [Watermelon icon created by Freepik - Flaticon](https://www.flaticon.com/free-icons/watermelon)

Documentation: [https://melonly.pl](https://melonly.pl)

Author: [Doc077](https://github.com/Doc077)
