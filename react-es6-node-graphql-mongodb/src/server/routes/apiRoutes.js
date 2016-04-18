import express from 'express';
import graphqlHttp from 'express-graphql';
import {graphql} from 'graphql';
import jwt from 'jsonwebtoken';
import schema from '../data/schema';
import authMW from '../middleware/authMiddleware';

let registerApiRoutes = (app, ideaService, skillService, tagService, techService, userService) => {
    let router = express.Router();

    // NOTE: Uncomment to expose a test graphql endpoint that does not require authentication
    // router.use('/test', graphqlHttp({
    //     schema: schema(ideaService, skillService, tagService, techService, userService),
    //     pretty: true,
    //     graphiql: true
    // }));

    router.use('/graphql', authMW, graphqlHttp({
        schema: schema(ideaService, skillService, tagService, techService, userService),
        pretty: true,
        graphiql: true
    }));

    app.use('/api', router);
};

export {registerApiRoutes};
