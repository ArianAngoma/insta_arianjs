import {gql} from 'apollo-server-express';

export const LikeDefs = gql`
    extend type Query {
        isLike(publicationId: ID!): Boolean!
        countLikes(publicationId: ID!): Int!
    }

    extend type Mutation {
        addLike(publicationId: ID!): Boolean!
        deleteLike(publicationId: ID!): Boolean!
    }
`;
