import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

let registerAuthRoutes = (app, userService) => {
    let router = express.Router();

    router.post('/login', (req, res) => {
        userService.getByUsername(req.body.username)
            .then(user => {
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
            .catch(err => {
                res.json({
                    success: false,
                    message: 'An error occurred: ' + err
                });
            });
    });

    router.post('/signup', (req, res) => {
        userService.getByUsername(req.body.username)
            .then(user => {
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
                        .catch(err => {
                            res.json({
                                success: false,
                                message: 'An error occurred: ' + err
                            });
                        });
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'An error occurred: ' + err
                });
            });
    });

    app.use('/auth', router);
};

export {registerAuthRoutes};
