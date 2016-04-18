import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import UserTypes from './userTypes';
import IdeaTypes from './ideaTypes';

let schema = (ideaService, skillService, tagService, techService, userService) => {
    let userTypes = UserTypes();
    let ideaTypes = IdeaTypes(userTypes, userService);

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: new GraphQLList(userTypes.UserType),
                resolve: () => {
                    return userService.getMany();
                }
            },
            userSearch: {
                type: new GraphQLList(userTypes.UserSearchType),
                args: {
                    searchStr: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return userService.search(args.searchStr);
                }
            },
            userById: {
                type: userTypes.UserType,
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return userService.getById(args._id);
                }
            },
            userByUsername: {
                type: userTypes.UserType,
                args: {
                    username: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return userService.getByUsername(args.username);
                }
            },
            ideas: {
                type: new GraphQLList(ideaTypes.IdeaType),
                resolve: () => {
                    return ideaService.getMany();
                }
            },
            ideaSearch: {
                type: new GraphQLList(ideaTypes.IdeaSearchType),
                args: {
                    searchStr: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return ideaService.search(args.searchStr);
                }
            },
            ideaById: {
                type: ideaTypes.IdeaType,
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return ideaService.getById(args._id);
                }
            },
            tags: {
                type: new GraphQLList(GraphQLString),
                resolve: () => {
                    return tagService.getMany();
                }
            },
            skills: {
                type: new GraphQLList(GraphQLString),
                resolve: () => {
                    return skillService.getMany();
                }
            },
            technologies: {
                type: new GraphQLList(GraphQLString),
                resolve: () => {
                    return techService.getMany();
                }
            }
        }
    });

    const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createIdea: {
                type: ideaTypes.IdeaType,
                args: {
                    idea: { type: new GraphQLNonNull(ideaTypes.IdeaInputType) }
                },
                resolve: (root, args) => {
                    return ideaService.insert(args.idea);
                }
            },
            updateIdea: {
                type: GraphQLBoolean,
                args: {
                    idea: { type: new GraphQLNonNull(ideaTypes.IdeaInputType) }
                },
                resolve: (root, args) => {
                    return ideaService.update(args.idea);
                }
            },
            deleteIdea: {
                type: GraphQLBoolean,
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return ideaService.remove(args._id);
                }
            },
            createUser: {
                type: userTypes.UserType,
                args: {
                    user: { type: new GraphQLNonNull(userTypes.UserInputType) }
                },
                resolve: (root, args) => {
                    return userService.insert(args.user);
                }
            },
            updateUser: {
                type: GraphQLBoolean,
                args: {
                    user: { type: new GraphQLNonNull(userTypes.UserInputType) }
                },
                resolve: (root, args) => {
                    return userService.update(args.user);
                }
            },
            deleteUser: {
                type: GraphQLBoolean,
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return userService.remove(args._id);
                }
            }
        }
    });

    return new GraphQLSchema({
        query: queryType,
        mutation: mutationType
    });
}

export default schema;
