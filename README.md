#I\`de´a\`logue
n. One given to fanciful ideas or theories

**Idealogue** is a system where ideas can be shared and voted on within a group or organization.
It provides a forum for people to share new product ideas, suggest process or tool improvements,
organize Hackathon teams and projects, share information and collaborate on side projects, and
otherwise give people a voice to improve their organization.

## Implementations
This project contains multiple implementations using different technologies. While it does provides
real-world value, this is essentially a training project for me and demonstrates how to implement
similar functionality across multiple tech stacks.

#### angular1-node-hapi-mongodb
This project uses the following technologies:

- Frontend: Angular 1.5, UI-Router
- Backend: NodeJS 5.x, Hapi 13.x
- Database: MongoDB 3.x

This implementation uses simple cookie-based authentication, and does not utilize a task manager.
To install and run, follow these steps:

1. Install MongoDB and start it up.
2. Clone this repo and switch to the project directory: `cd idealogue/angular1-node-hapi-mongodb`
3. Run `npm install` and `bower install`.
4. Run the application: `node src/server/app.js`.

#### angular1-typescript-golang-rethinkdb
This project uses the following technologies:

- Frontend: Angular 1.5, UI-Router, TypeScript
- Backend: Golang 1.5, Gorilla, Negroni
- Database: RethinkDB 2.x

This implementation uses Google APIs for authentication, and utilize make as a task manager. For
information on installing and running this project, see the
[Idealogue-go](https://github.com/davelaursen/idealogue-go) repo.

#### react-es6-node-graphql-mongodb
This project uses the following technologies:

- Frontend: React 15.x, React-Router, Flux, ES2015, Sass
- Backend: NodeJS 5.x, Express 4.x, GraphQL, ES2015
- Database: MongoDB 3.x

This implementation uses JWT token authentication, and utilizes gulp as a task manager. To install
and run, follow these steps:

1. Install MongoDB and start it up.
2. Clone this repo and switch to the project directory: `cd idealogue/angular1-node-hapi-mongodb`
3. Run `npm install`.
4. Build the application: `npm run build`.
5. Run the application: `npm start`.
