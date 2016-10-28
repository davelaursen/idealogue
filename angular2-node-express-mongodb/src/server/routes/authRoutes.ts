import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

let registerAuthRoutes = (app: any, userService: any) => {
    let router = express.Router();

    router.post('/login', (req: any, res: any) => {
        console.log('test', req.body);
        userService.getByUsername(req.body.username)
            .then((user: any) => {
                if (user.password === req.body.password) {
                    let obj = { _id: user._id };
                    let token = jwt.sign(obj, config.secret, {
                        expiresIn: 86400 //24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Authentication successful.',
                        token: token,
                        user: user
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Authentication failed!'
                    });
                }
            })
            .catch((err: any) => {
                res.json({
                    success: false,
                    message: 'An error occurred: ' + err
                });
            });
    });

    router.post('/signup', (req: any, res: any) => {
        userService.getByUsername(req.body.username)
            .then((user: any) => {
                if (user) {
                    res.json({
                        success: false,
                        message: 'Username is already in use'
                    });
                } else {
                    userService.insert(req.body)
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'User successfully created'
                            });
                        })
                        .catch((err: any) => {
                            res.json({
                                success: false,
                                message: 'An error occurred: ' + err
                            });
                        });
                }
            })
            .catch((err: any) => {
                res.json({
                    success: false,
                    message: 'An error occurred: ' + err
                });
            });
    });

    app.use('/auth', router);
};

export {registerAuthRoutes};
