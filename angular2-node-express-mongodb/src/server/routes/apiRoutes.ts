import * as express from 'express';
import authMW from '../middleware/authMiddleware';
import IdeaService from '../data/services/ideaService';
import SkillService from '../data/services/skillService';
import TagService from '../data/services/tagService';
import TechnologyService from '../data/services/technologyService';
import UserService from '../data/services/userService';
import {registerIdeaRoutes} from './entityRoutes/ideaRoutes';
import {registerSkillRoutes} from './entityRoutes/skillRoutes';
import {registerTagRoutes} from './entityRoutes/tagRoutes';
import {registerTechRoutes} from './entityRoutes/technologyRoutes';
import {registerUserRoutes} from './entityRoutes/userRoutes';

let registerApiRoutes = (
    app: any,
    ideaService: IdeaService,
    skillService: SkillService,
    tagService: TagService,
    techService: TechnologyService,
    userService: UserService) => {

    let router = express.Router();

    router.use(authMW);

    registerIdeaRoutes(router, ideaService, skillService, tagService, techService);
    registerSkillRoutes(router, skillService);
    registerTagRoutes(router, tagService);
    registerTechRoutes(router, techService);
    registerUserRoutes(router, userService);

    app.use('/api', router);
};

export {registerApiRoutes};
