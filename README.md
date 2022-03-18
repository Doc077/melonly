<p align="center">
    <img src="public/logo.png" width="54">
</p>

<!-- omit in toc -->
## Melonly Node.js Framework

<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/v/@melonly/core.svg?style=flat-square&labelColor=333842&color=fd6f71" alt="Latest Version"></a>
<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/dt/@melonly/core.svg?style=flat-square&labelColor=333842&color=fd6f71" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@melonly/core" target="_blank"><img src="https://img.shields.io/npm/l/@melonly/core.svg?style=flat-square&labelColor=333842&color=fd6f71" alt="License"></a>

Melonly is a fast and modern web development framework for Node.js. It makes it easy to create secure and fast web applications with awesome developer experience.

**Table of Contents**

- [Requirements](#requirements)
- [Installation](#installation)
- [Running Application](#running-application)
- [Directory Structure](#directory-structure)
  - [`/database`](#database)
  - [`/public`](#public)
  - [`/src`](#src)
  - [`/storage`](#storage)
  - [`/tests`](#tests)
  - [`/views`](#views)
- [The Basics](#the-basics)
  - [Configuration](#configuration)
  - [Controllers and Routing](#controllers-and-routing)
    - [Main Application File](#main-application-file)
    - [Routes](#routes)
  - [Views](#views-1)
  - [Services](#services)
  - [HTTP Requests and Responses](#http-requests-and-responses)
    - [Form Input Data](#form-input-data)
    - [Redirects](#redirects)
    - [Headers](#headers)
  - [Mail](#mail)
  - [Websockets and Broadcasting](#websockets-and-broadcasting)
  - [Testing](#testing)
- [License](#license)


## Requirements

- Node.js 15+
- `npm` installed


## Installation

To create new Melonly project you can use the CLI installer. You only have to install `@melonly/cli` package:

```shell
npm install -g @melonly/cli
```

Then you can check the Melonly CLI version if it has been properly installed. Then you'll be able to run `melon` commands:

```shell
# Display Melonly CLI version

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


### `/tests`

This directory stores your unit tests (test files end with `.test.ts` extension).


### `/views`

The `views` directory contains app views rendered by your application. View files have `.melon.html` extension.


## The Basics

### Configuration

All app configuration is stored in `.env` file. This is where database credentials and environment-specific settings should be stored. Melonly automatically reads all `.env` variables to `process.env` object available in your code.

```
DB_CONNECTION=mysql
DB_HOST=localhost
```

You can obtain these variables with `process.env`:

```ts
console.log(process.env.DB_HOST)
```


### Controllers and Routing

Now we can develop our application. Every web app should have *routes* - URLs with some assigned action. Routing system in Melonly is based on controller classes. Framework already ships with one controller in `src/app/app.controller.ts` file by default:

```ts
import { Controller, Get, Request, Response, ViewResponse } from '@melonly/core'

@Controller()
export class AppController {
    constructor(private request: Request, private response: Response) {}

    @Get('/')
    public index(): ViewResponse {
        return this.response.render('home', {
            message: 'Hello World',
        })
    }
}
```

Basically, a controller is just a class with some methods which handles incoming web requests. Each controller should contain decorated methods which register app routes. In the controller above we have one registered route `/`. When the user enters `/` URL, the request will be passed to the `index` method which returns a view with passed variable.

Controller methods should always return some value. Melonly automatically sends proper headers based on returned content. In case of object / array the response will have JSON type. When returned value is text, it will be rendered as HTML.


#### Main Application File

The main application entry is located in `src/main.ts` file. This is the place where controllers, middleware and channels are registered. Every time you create new controller, you have to register them:

```ts
app.registerControllers([
    AppController,
    // Other controllers...
])
```


#### Routes

Route patterns can be also dynamic. Just use `:paramName` syntax:

```ts
@Get('/users/:id')
```

To make paramater optional use the question mark:

```ts
@Get('/users/:id?')
```

Route above will match both `/users` and `/users/327` paths.


### Views

Melonly includes a built-in modern view templating engine. Views are placed in `/views` directory and have the `.melon.html` extension.

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

All directives like conditional blocks and loops use the square brackets and slash syntax. For displaying passed variables use `{{ variable }}` syntax. Variables are automatically escaped from HTML to prevent XSS attacks.

Some frontend frameworks like Vue use the same bracket syntax for displaying data. To render raw brackets put `@` sign before them:

```html
@{{ value }}
```

Rendering views is done using the 'dot' syntax for nested folders:

```ts
// Render views/pages/welcome.melon.html template

return this.response.render('pages.welcome')
```

Note that view file names should not contain dot signs.

You can also customize the default 404 page. All you have to do is to create `views/errors/404.melon.html` file with your custom template. When this file exists, Melonly will serve it as the 404 error page. Otherwise, the default one will be displayed.


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
    constructor(private userService: UserService) {}

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


### HTTP Requests and Responses

Melonly provides a simple API for dealing with web requests and responses. You can inject `Request` and `Response` objects to controller and use them.

```ts
import { Request, Response } from '@melonly/core'

// In controller's constructor

constructor(private request: Request, private response: Response) {}
```

You can get matched URL parameters:

```ts
@Get('/users/:id')
public show(): string {
    return this.request.params.id
}
```

You can also get url query data:

```ts
// Route: /users?view=gallery

const view = this.request.query.view // 'gallery'
```


#### Form Input Data

To retrieve and process incoming form data, use the `request.data` getter:

```ts
import { Post } from '@melonly/core'

@Post('/users')
public create(): string {
    const username = this.request.data.username

    return username
}
```

Input data can be sent by HTML form or AJAX:

```html
<input type="text" name="username">
```

```ts
import axios from 'axios'

axios.post('/users', data)
```


#### Redirects

Example redirect response using the `redirect` method:

```ts
import { RedirectResponse } from '@melonly/core'

@Get('/')
public index(): RedirectResponse {
    return this.response.redirect('/login')
}
```


#### Headers

You can also write response headers:

```ts
this.response.header('X-Custom-Header', 'content')
```


### Mail

Melonly provides a fluent interface for sending emails from your application. All configuration needed for mailing is stored in the `.env` variables:

```
MAIL_ADDRESS=example@mail.com
MAIL_SERVICE=gmail
MAIL_PASSWORD=
```

After providing your mail service credentials you'll be able to create and send your first email. The most basic form is writing raw text message from `Mail.send` method:

```ts
import { Email } from '@melonly/core'

Email.send('recipient@mail.com', 'Test Email', 'This is the test email sent from Melonly application.')
```

Though this is simple and convinient for small-sized applications, we recommend the more object-oriented approach with separate email classes. It allows us to make emails with HTML templates. To generate a new email file use the CLI command:

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

The above email will render `views/mail.welcome.melon.html` template. You can pass any variables to the template like we done it in view rendering.

Sending emails using this method is very similar. Instead of 

```ts
import { WelcomeEmail } from '../mail/welcome.email'

Email.send('recipient@mail.com', new WelcomeEmail())
```


### Websockets and Broadcasting

Modern applications often require established two-way server connection for real-time data updating. The best option is to use Websocket connections. Melonly provides a powerful API for managing these features.

First though, you should get to know the concept of broadcasting channels. Channel is a class used for namespacing events with its own authorization logic. To create new channel class you may use CLI:

```shell
melon make channel chat
```

The new `src/broadcasting/chat.channel.ts` file will contain following template:

```ts
import { BroadcastChannel, ChannelInterface } from '@melonly/core'

@BroadcastChannel('chat/:id')
export class ChatChannel implements ChannelInterface {
    public userAuthorized(): boolean {
        return true
    }
}
```

String argument passed to decorator is channel name with dynamic parameter. The `userAuthorized` method is used to determine whether authenticated user is authorized to join the channel on the client side.

Emitting events on the server side can be done using `Broadcaster`:

```ts
import { Broadcaster } from '@melonly/core'

Broadcaster.event('message', `chat/${chatId}`)
```

Now you'll be able to receive broadcasts on the client side.


### Testing

Testing your application is very important. Melonly ships with [Jest](https://jestjs.io) testing library installed by default. Test files are placed in `/tests` directory. Run `npm test command` to see test results:

```shell
npm test

PASS  tests/app.controller.test.ts
  √ asserts response is truthy (1 ms)

Test Suites: 1 passed, 1 total
```


## License

Melonly is an open-source framework licensed under the [MIT License](LICENSE).

Author: [Doc077](https://github.com/Doc077)

If you discovered a bug or security vulnerability please open an issue / pull request in the repository or email me: dom.rajkowski@gmail.com.

**Logo: [Watermelon icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/watermelon)**
