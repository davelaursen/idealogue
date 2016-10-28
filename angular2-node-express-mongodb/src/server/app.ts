import * as express from 'express';
import * as bodyParser from 'body-parser';

import config from './config';
import notFoundSvc from './utils/notFound';
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

dbManager.connect(config.mongoConnectionString)
    .then((db: any) => {
        let skillService = new SkillService(db);
        let tagService = new TagService(db);
        let techService = new TechnologyService(db);
        let userService =  new UserService(db);
        let ideaService = new IdeaService(db, skillService, tagService, techService);

        registerAuthRoutes(app, userService);
        registerApiRoutes(app, ideaService, skillService, tagService, techService, userService);

        app.get('/api/*', notFoundSvc.middleware);

        app.get('/ping', (req: any, res: any, next: any) => {
            console.log(req.body);
            res.send('pong');
        });


        app.use(express.static('./src/client/'));
        app.use(express.static('./'));

        // All the assets are served at this point.
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', (req: any, res: any) => {
            notFoundSvc.send404(req, res);
        });

        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));

        app.listen(config.port, () => console.log('Listening on port ' + config.port));
    })
    .catch((err: any) => {
        throw new Error('Error connecting to Mongo database: ' + err);
    });
