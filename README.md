I\`de´a\`logue
n. One given to fanciful ideas or theories

**Idealogue** is a system where ideas can be shared and voted on within a group or organization.
It provides a forum for people to share new product ideas, suggest process or tool improvements,
organize Hackathon teams and projects, share information and collaborate on side projects, and
otherwise give people a voice to improve their organization.

Current version: **0.0.1**

Node version: **0.10** required

## Getting Started
Idealogue requires that MongoDB version 2.4.x or newer be installed and running with text search enabled
and the ideas collection properly indexed.  At the time of this writing, the MongoDB node client does
not yet support the ability to create full text indexes through code, so it must be created manually.
If this step is skipped, Idealogue's search functionality will not work properly.

Start up MongoDB using the following command:
```
./mongod --setParameter textSearchEnabled=true
```

Start the Mongo client and execute the following commands:
```
> use idealogue;
> db.ideas.ensureIndex({name:"text", summary:"text", benefits:"text", details:"text", tags:"text", skills:"text", technologies:"text"});
```

Once Mongo is configured, you need to install the REST application.  Pull down the latest code, navigate to
the root directory and install its dependencies using npm:
```
cd idealogue-rest
npm install
```

You can then start up the application (listens on port 8000):
```
node app.js
```

To install the experimental UI (only partially implemented at this time), pull down the latest code, navigate to
the root directory and install it's dependencies using npm:
```
cd idealogue-ui-x
npm install
```

You can then start up the application (listens on port 3000):
```
node app.js
```
