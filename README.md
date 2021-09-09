# Nodejs Bootstrap Project
Bootstrap Nodejs project using Typescript + TypeOrm + NestJS + MongoDB. <br>
Swagger UI is exposed at `http://localhost:3000/api` and json openapi can be consumed at `http://localhost:3000/api-json`. <br>
Note: Do not upgrade mongodb npm to version 4. TypeOrm can't handle it yet, even though you can run MongoDB 5 on the Server.  

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

