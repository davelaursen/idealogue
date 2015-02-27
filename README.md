#I\`de´a\`logue
n. One given to fanciful ideas or theories

**Idealogue** is a system where ideas can be shared and voted on within a group or organization.
It provides a forum for people to share new product ideas, suggest process or tool improvements,
organize Hackathon teams and projects, share information and collaborate on side projects, and
otherwise give people a voice to improve their organization.

**CURRENTLY IN DEVELOPMENT**
While the Idealogue REST service is fairly stable, the Idealogue UI and X-UI (experimental UI)
are being actively developed, and currently only have limited functionality. Please see the README
files for each project to determine it's current state and see what's currently being worked on.

Current version: **0.0.1**

Node version: **0.10** required

## Getting Started
Idealogue requires that MongoDB version 2.6.x or newer be installed.

Start the Mongo server, then use the Mongo client to execute the following commands:
```
> use idealogue;
> db.ideas.ensureIndex({name:"text", summary:"text", benefits:"text", details:"text", tags:"text", skills:"text", technologies:"text"});
```

You'll need to add an API key so that the UI can communicate with the REST application:
```
> db.apiKeys.insert({_id:"c4088588-3c0e-11e3-bee0-ce3f5508acd9"});
```

Once Mongo is configured, you need to install the REST application. Pull down the latest code, navigate to
the root directory and install its dependencies using npm:
```
cd idealogue-rest
npm install
```

You can then start up the application (listens on port 8000):
```
node app.js
```

To install the UI, navigate to the idealogue-ui directory and install it's dependencies using npm:
```
cd idealogue-ui
npm install
```

You can then start up the application (listens on port 3000):
```
node app.js
```
