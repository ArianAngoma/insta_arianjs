import {gql} from 'apollo-server';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
    }

    type Query {
        # User
        getUser: User
    }
`;
