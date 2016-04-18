import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} from 'graphql';
import UserTypes from './userTypes';
import _ from 'underscore';

let IdeaTypes = (userTypes, userService) => {

    const CommentType = new GraphQLObjectType({
        name: 'Comment',
        fields: {
            userId: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            text: { type: GraphQLString },
            timestamp: { type: GraphQLString }
        }
    });

    const CommentInputType = new GraphQLInputObjectType({
        name: 'CommentInput',
        fields: {
            userId: { type: new GraphQLNonNull(GraphQLString) },
            text: { type: new GraphQLNonNull(GraphQLString) },
            timestamp: { type: new GraphQLNonNull(GraphQLString) }
        }
    });

    const IdeaType = new GraphQLObjectType({
        name: 'Idea',
        fields: {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            summary: { type: GraphQLString },
            benefits: { type: GraphQLString },
            details: { type: GraphQLString },
            tags: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.tags;
                }
            },
            skills: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.skills;
                }
            },
            technologies: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.technologies;
                }
            },
            proposers: {
                type: new GraphQLList(userTypes.UserType),
                resolve: parent => {
                    return userService.getMany({_id: {$in: parent.proposers}});
                }
            },
            votes: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.votes;
                }
            },
            comments: {
                type: new GraphQLList(CommentType),
                resolve: parent => {
                    return userService.getMany()
                        .then(users => {
                            var results = [];
                            _.forEach(parent.comments, function(comment) {
                                var user = _.find(users, {_id: comment.userId || comment.id});
                                results.push({
                                    userId: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    text: comment.text,
                                    timestamp: comment.timestamp
                                });
                            });
                            return results;
                        });
                }
            },
            createdDate: { type: GraphQLString },
            updatedDate: { type: GraphQLString }
        }
    });

    const IdeaSearchType = new GraphQLObjectType({
        name: 'IdeaSearch',
        fields: {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            summary: { type: GraphQLString },
            benefits: { type: GraphQLString },
            details: { type: GraphQLString },
            tags: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.tags;
                }
            },
            skills: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.skills;
                }
            },
            technologies: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.technologies;
                }
            },
            proposers: {
                type: new GraphQLList(userTypes.UserType),
                resolve: parent => {
                    return userService.getMany({_id: {$in: parent.proposers}});
                }
            },
            votes: {
                type: new GraphQLList(GraphQLString),
                resolve: parent => {
                    return parent.votes;
                }
            },
            comments: {
                type: new GraphQLList(CommentType),
                resolve: parent => {
                    return userService.getMany()
                        .then(users => {
                            var results = [];
                            _.forEach(parent.comments, function(comment) {
                                var user = _.find(users, {_id: comment.userId || comment.id});
                                results.push({
                                    userId: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    text: comment.text,
                                    timestamp: comment.timestamp
                                });
                            });
                            return results;
                        });
                }
            },
            createdDate: { type: GraphQLString },
            updatedDate: { type: GraphQLString },
            score: { type: GraphQLFloat }
        }
    });

    const IdeaInputType = new GraphQLInputObjectType({
        name: 'IdeaInput',
        fields: {
            _id: { type: GraphQLString },
            name: { type: new GraphQLNonNull(GraphQLString) },
            summary: { type: new GraphQLNonNull(GraphQLString) },
            benefits: { type: new GraphQLNonNull(GraphQLString) },
            details: { type: new GraphQLNonNull(GraphQLString) },
            tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            skills: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            technologies: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            proposers: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            votes: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            comments: { type: new GraphQLNonNull(new GraphQLList(CommentInputType)) },
            createdDate: { type: new GraphQLNonNull(GraphQLString) },
            updatedDate: { type: new GraphQLNonNull(GraphQLString) }
        }
    });

    return {
        IdeaType: IdeaType,
        IdeaInputType: IdeaInputType,
        IdeaSearchType: IdeaSearchType
    };
}

export default IdeaTypes;
