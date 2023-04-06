# MyForum Backend

Here you'll have all the code for the backend of our application. We dont use the standard NestJs project structure in our main project, so let me introduce you to the "custom" structure.

## Structure

In a standard NestJs projects, you would have all the resources separated in theire respective directories, the problem is when you start to have a lot of different objects that depends on each other, you dont realy know where to put your code.

So we took the problem the other way and decided to put all the controllers in the same directory, same for the services...

So we end up with the following structure (within an app in `apps`) :

```
src
|    app.module.ts
|    main.ts
└─── controllers
└─── services
```

As we want some logic to be shared by multiple apps (example of an application and some microservices), reusablce pieces of codes are located in the folder `libs`. It contains logic that can by shared by multiple apps : such as auth or database schemas.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
