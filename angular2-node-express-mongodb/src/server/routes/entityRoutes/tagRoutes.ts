import {Router} from 'express';
import notFoundSvc from '../../utils/notFound';
import TagService from '../../data/services/tagService';

let registerTagRoutes = (router: Router, tagService: TagService) => {

    router.get('/tags', getTags);

    function getTags(req: any, res: any) {
        tagService.getMany()
            .then((tags: any) => {
                res.json(tags || []);
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }
};

export {registerTagRoutes};
