<p align="center">
    <img src="assets/logo.png" width="54">
</p>

<!-- omit in toc -->
## Melonly Node.js Framework

[![npm version](https://badge.fury.io/js/@melonly%2Fcore.svg)](https://www.npmjs.com/package/@melonly/core)

Melonly is a fast and modern web development framework for Node.js. It makes easy to create secure and fast web applications with awesome developer experience.

**Table of Contents**

- [Requirements](#requirements)
- [Installation](#installation)
- [Running Application](#running-application)
- [Directory Structure](#directory-structure)
  - [`/database`](#database)
  - [`/public`](#public)
  - [`/src`](#src)
  - [`/storage`](#storage)
  - [`/views`](#views)
- [The Basics](#the-basics)
  - [Configuration](#configuration)
  - [Controllers and Routing](#controllers-and-routing)
  - [Views](#views-1)
  - [Services](#services)
  - [HTTP Request and Response](#http-request-and-response)
  - [Mail](#mail)
- [License](#license)


## Requirements

- Node.js v16.4.2+
- `npm` installed


## Installation

To create a fresh Melonly project you can use the CLI installer. You only have to install `@melonly/cli` package.

```shell
npm install -g @melonly/cli
```

You can check the CLI version if properly installed. Then you'll be able to run `melon` commands:

```shell
# Display information about CLI version

melon -v
```

To create new project run the `new` command in your directory:

```shell
melon new <project-name>
```


## Running Application

Once your project has been created you can run it on the local server with `npm start`:

```shell
cd <project-name>

npm start
```

Your application will be available on `localhost:3000` by default. You can change the port in `.env` configuration file.

If you don't want to open the browser automatically, use the `npm run start:dev` command.


## Directory Structure

Default Melonly application structure consists of several main folders:


### `/database`

In this directory database migrations are created. You can also store `sqlite` database there.


### `/public`

This is the only directory visible to users. This is where you should put client side things like compiled styles, JS scripts and images.


### `/src`

The `src` directory contains your application code. Feel free to modify and change it to your needs.


### `/storage`

There are stored cache and temporary files. TypeScript code is compiled into `dist` directory inside this folder. You don't need to edit anything there.


### `/views`

The `views` directory contains app views rendered by your application. View files have `.melon.html` extension.


## The Basics

### Configuration

App configuration is based on `.env` file. This is where database credentials and environment-specific settings should be stored. Melonly automatically reads all `.env` variables to `process.env` object available in your code.

```
APP_PORT=3000

DATABASE_CONNECTION=mysql
DATABASE_HOST=localhost
```

You can reference these variables this way:

```ts
console.log(process.env.APP_PORT)
```


### Controllers and Routing

Now we can develop our application. Main entry file for the Node app is `src/main.ts` file. This is the place where app middleware and controllers are registered. Routing system in Melonly is done using controller classes. Framework already ships with one controller in `src/app/app.controller.ts` file by default:

```ts
import { Controller, Get, Request, Response, ViewResponse } from '@melonly/core'

@Controller()
export class AppController {
    constructor(private readonly request: Request, private readonly response: Response) {}

    @Get('/')
    public index(): ViewResponse {
        return this.response.render('home', {
            message: 'Hello World',
        })
    }
}
```

Basically, a controller is just a class which handles web requests. Each controller should contain decorated methods registering routes. In the example above, when the user enters `/` route, the request will be passed to the `index` method which returns a view with passed variable.

Controller routes can be created as dynamic patterns with `:paramName` syntax:

```ts
@Get('/users/:id')
```

To make paramater optional use the question mark:

```ts
@Get('/users/:id?')
```

This route will match both `/users` and `/users/327` paths.


### Views

Melonly includes a built-in view templating engine. Views are placed in `/views` directory and have the `.melon.html` extension.

Melonly's template engine allows you to create loops, conditionals and variable interpolation.

The example template with foreach loop and conditional rendering looks like this:

```html
<h1>{{ title }}</h1>

[each item in [1, 2, 3]]
    <div>{{ item }}</div>
[/each]

[if logged]
    <a href="/logout">Log out</a>
[/if]
```

All control directives like conditional blocks and loops use the square brackets syntax with `{{ ... }}` for variable interpolation.

Some frontend frameworks like Vue use the same bracket syntax for displaying data. To render raw brackets put `@` sign before them:

```html
@{{ value }}
```

Rendering views is done using the 'dot' syntax for nested folders:

```ts
// This will render views/pages/some-view.melon.html template

return this.response.render('pages.some-view')
```

Note that view file names should not contain dot signs.


### Services

Melonly strongly encourages you to write clean code separated into small parts. We believe that controllers should be only responsible for request and response handling. All other buisness logic should be located in service classes. Service class is an injectable class with methods responsible for transforming some data.

To create new service run the following command:

```shell
melon make service user
```

`user` is just a name for the generated class. The path will look like `src/user/user.service.ts` It will contain the following code:

```ts
import { Injectable } from '@melonly/core'

@Injectable()
export class UserService {
    public getMessage(): string {
        return 'Hello World!'
    }
}
```

Since the class has been declared as injectable, we can type-hint the controller constructor to get injected services:

```ts
import { UserService } from './user.service'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    // ...
}
```

Injected services will be automatically available in the controller:

```ts
@Get('/users')
public index(): string {
    return this.userService.getMessage()
}
```


### HTTP Request and Response

Melonly provides a simple API for dealing with web requests and responses. You can inject `Request` and `Response` objects to controller and use them.

```ts
import { Request, Response } from '@melonly/core'

// In controller's constructor...

constructor(private readonly request: Request, private readonly response: Response) {}
```

Example redirect response using the `redirect` method:

```ts
import { RedirectResponse } from '@melonly/core'

@Get('/')
public index(): RedirectResponse {
    return this.response.redirect('/login')
}
```

Obtaining matched url parameters:

```ts
@Get('/users/:id')
public show(): string {
    return this.response.parameter('id')
}
```

You can also get url query data:

```ts
// URI: /users?view=all

return this.response.queryParam('view') // 'all'
```


### Mail

Melonly provides a fluent interface for sending emails from your application. All configuration needed for that is stored in the `.env` file variables:

```
MAIL_ADDRESS=example@mail.com
MAIL_SERVICE=gmail
MAIL_PASSWORD=
```

After providing your mail service credentials you'll be able to create and send your first email. The most basic form is writing raw text message from `Mail.send` method:

```ts
import { Email } from '@melonly/core'

Email.send('recipient@address.com', 'Test Email', 'This is the test email sent from Melonly application.')
```

Even though this is simple and convinient for fast testing, we recommend the more object-oriented approach with separate email classes. It will allow us to make template based emails. To generate new email file use the CLI command:

```shell
melon make email welcome
```

This command will create a new `mail/welcome.email.ts` file. It will look like this:

```ts
import { Email } from '@melonly/core'

export class WelcomeEmail extends Email {
    public subject(): string {
        return 'Welcome'
    }

    public build(): string {
        return this.fromTemplate('mail.welcome')
    }
}
```

In the example above email will render `views/mail.welcome.melon.html` template. You can pass any variables to the template like we done it in view rendering.

Sending email using classes is very similar:

```ts
import { WelcomeEmail } from '../mail/welcome.email'

Email.send('recipient@address.com', new WelcomeEmail())
```


## License

Melonly is an open-source framework licensed under the [MIT License](melonly/LICENSE).

Author: [Doc077](https://github.com/Doc077)

If you discovered a bug or security vulnerability please open an issue / pull request in the repository or email me: dom.rajkowski@gmail.com.

**Logo: [Watermelon icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/watermelon)**
