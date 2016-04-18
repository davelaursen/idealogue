import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import DatabaseManager from './data/databaseManager';
import IdeaService from './data/services/ideaService';
import SkillService from './data/services/skillService';
import TagService from './data/services/tagService';
import TechnologyService from './data/services/technologyService';
import UserService from './data/services/userService';
import {registerAuthRoutes} from './routes/authRoutes';
import {registerApiRoutes} from './routes/apiRoutes';

let app = express();
let dbManager = new DatabaseManager();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

dbManager.connect(config.mongoConnectionString)
    .then(db => {
        let skillService = new SkillService(db);
        let tagService = new TagService(db);
        let techService = new TechnologyService(db);
        let userService =  new UserService(db);
        let ideaService = new IdeaService(db, skillService, tagService, techService);

        registerAuthRoutes(app, userService);
        registerApiRoutes(app, ideaService, skillService, tagService, techService, userService);

        app.use(express.static(__dirname + '/../client/'));
        app.use('/*', express.static(__dirname + '/../client/index.html'));
        app.listen(config.port, () => console.log('Listening on port ' + config.port));
    })
    .catch(err => {
        throw new Error('Error connecting to Mongo database: ' + err);
    });
