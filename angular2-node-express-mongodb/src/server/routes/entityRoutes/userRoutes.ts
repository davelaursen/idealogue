import {Router} from 'express';
import notFoundSvc from '../../utils/notFound';
import UserService from '../../data/services/userService';

let registerUserRoutes = (router: Router, userService: UserService) => {
    router.get('/users', getUsers);
    router.get('/users/:id', getUserById);
    router.put('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser)

    function getUsers(req: any, res: any) {
        let searchStr = req.query.search;
        if (searchStr) {
            userService.search(searchStr)
                .then((results: any) => {
                    res.json(results || []);
                })
                .catch((err: any) => {
                    res.status(500).send(err).end();
                });
        } else {
            userService.getMany()
                .then((users: any) => {
                    res.json(users || []);
                })
                .catch((err: any) => {
                    res.status(500).send(err).end();
                });
        }
    }

    function getUserById(req: any, res: any) {
        userService.getById(req.params.id)
            .then((user: any) => {
                if (user) {
                    res.json(user);
                } else {
                    notFoundSvc.send404(req, res);
                }
            })
            .catch((err: any) => {
                res.status(500).send(err).end();
            });
    }

    function updateUser(req: any, res: any) {
        let user = req.body;
        if (req.params.id !== user._id) {
            res.status(400).send('id in payload does not match id in url').end();
        }
        userService.update(user)
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

    function deleteUser(req: any, res: any) {
        userService.remove(req.params.id)
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

export {registerUserRoutes};
