# idealogue-ui

UI for Idealogue - uses AngularJS, JQuery, HTML5 and CSS3.

**CURRENTLY IN DEVELOPMENT**
This is actively being developed at this time. I'm currently implementing base functionality. The design is completely
CSS-driven - the HTML has no layout or style information.

_Completed_
* Idea section: happy path has been implemented, minus the ability to sort and filter the ideas list
* People section: happy path has been implemented, minus the ability to sort and filter the people list
* Account section: happy path has been implemented
* Authentication: happy path for login & user registration has been implemented
* Sort and filter functionality for idea and people lists

_In The Works_
* Tests: add unit tests
* Search: happy path
* Administrator: add admin flag to users
* Authorization: can only edit/delete ideas for which you are a proposer (or if you're an admin)
* Import/Export: allow admins to import/export idea and user records

## Getting Started

Install the UI app by navigating to the idealogue-ui directory and installing it's dependencies using npm
and bower:
```
cd idealogue-ui
npm install
bower install
```

You can then start up the application (listens on port 3000):
```
node app.js
```

Use the following command to run tests:
```
./node_modules/karma/bin/karma start karma.conf.js
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
_(Coming soon)_