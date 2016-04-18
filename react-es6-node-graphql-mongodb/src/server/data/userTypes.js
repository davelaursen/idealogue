import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat
} from 'graphql';

let UserTypes = () => {
    const UserType = new GraphQLObjectType({
        name: 'User',
        fields: {
            _id: { type: GraphQLString },
            username: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            createdDate: { type: GraphQLString },
            updatedDate: { type: GraphQLString }
        }
    });

    const UserSearchType = new GraphQLObjectType({
        name: 'UserSearch',
        fields: {
            _id: { type: GraphQLString },
            username: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            createdDate: { type: GraphQLString },
            updatedDate: { type: GraphQLString },
            score: { type: GraphQLFloat }
        }
    });

    const UserInputType = new GraphQLInputObjectType({
        name: 'UserInput',
        fields: {
            _id: { type: GraphQLString },
            username: { type: new GraphQLNonNull(GraphQLString) },
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            createdDate: { type: new GraphQLNonNull(GraphQLString) },
            updatedDate: { type: new GraphQLNonNull(GraphQLString) }
        }
    });

    return {
        UserType: UserType,
        UserInputType: UserInputType,
        UserSearchType: UserSearchType
    };
}

export default UserTypes;
