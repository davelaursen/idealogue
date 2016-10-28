import {Router} from 'express';
import notFoundSvc from '../../utils/notFound';
import TechnologyService from '../../data/services/technologyService';

let registerTechRoutes = (router: Router, techService: TechnologyService) => {

    router.get('/technologies', getTechs);

    function getTechs(req: any, res: any) {
        techService.getMany()
            .then((techs: any) => {
                res.json(techs || []);
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }
};

export {registerTechRoutes};
