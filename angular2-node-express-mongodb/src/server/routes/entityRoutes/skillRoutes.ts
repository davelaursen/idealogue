import {Router} from 'express';
import notFoundSvc from '../../utils/notFound';
import SkillService from '../../data/services/skillService';

let registerSkillRoutes = (router: Router, skillService: SkillService) => {

    router.get('/skills', getSkills);

    function getSkills(req: any, res: any) {
        skillService.getMany()
            .then((skills: any) => {
                res.json(skills || []);
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }
};

export {registerSkillRoutes};
