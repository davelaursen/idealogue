import { Router } from 'express';
import notFoundSvc from '../../utils/notFound';
import IdeaService from '../../data/services/ideaService';
import SkillService from '../../data/services/skillService';
import TagService from '../../data/services/tagService';
import TechnologyService from '../../data/services/technologyService';

let registerIdeaRoutes = (
    router: Router,
    ideaService: IdeaService,
    skillService: SkillService,
    tagService: TagService,
    techService: TechnologyService) => {

    router.get('/ideas', getIdeas);
    router.get('/ideas/:id', getIdeaById);
    router.post('/ideas', createIdea);
    router.put('/ideas/:id', updateIdea);
    router.delete('/ideas/:id', deleteIdea)

    function getIdeas(req: any, res: any) {
        let searchStr = req.query.search;
        if (searchStr) {
            ideaService.search(searchStr)
                .then((results: any) => {
                    res.json(results || []);
                })
                .catch((err: any) => {
                    res.status(500).send(err).end();
                });
        } else {
            ideaService.getMany()
                .then((ideas: any) => {
                    res.json(ideas || []);
                })
                .catch((err: any) => {
                    res.status(500).send(err).end();
                });
        }
    }

    function getIdeaById(req: any, res: any) {
        ideaService.getById(req.params.id)
            .then((idea: any) => {
                if (idea) {
                    res.json(idea);
                } else {
                    notFoundSvc.send404(req, res);
                }
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }

    function createIdea(req: any, res: any) {
        //TODO: add location header
        ideaService.insert(req.body)
            .then((idea: any) => {
                if (idea) {
                    for (let tag of idea.tags) {
                        tagService.save(tag);
                    }
                    for (let skill of idea.skills) {
                        skillService.save(skill);
                    }
                    for (let tech of idea.technologies) {
                        techService.save(tech);
                    }
                    res.status(201).json(idea);
                } else {
                    res.status(500).send('unknown error').end();
                }
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }

    function updateIdea(req: any, res: any) {
        let idea = req.body;
        if (req.params.id !== idea._id) {
            res.status(400).send('id in payload does not match id in url').end();
        }
        ideaService.update(idea)
            .then((result: any) => {
                if (result === true) {
                    for (let tag of idea.tags) {
                        tagService.save(tag);
                    }
                    for (let skill of idea.skills) {
                        skillService.save(skill);
                    }
                    for (let tech of idea.technologies) {
                        techService.save(tech);
                    }
                    res.status(204).end();
                } else {
                    res.status(500).send('unknown error').end();
                }
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }

    function deleteIdea(req: any, res: any) {
        ideaService.remove(req.params.id)
            .then((result: any) => {
                if (result === true) {
                    res.status(204).end();
                } else {
                    res.status(500).send('unknown error').end();
                }
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }
};

export {registerIdeaRoutes};
