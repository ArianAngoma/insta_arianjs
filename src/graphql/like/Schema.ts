import {gql} from 'apollo-server-express';

export const LikeDefs = gql`
    extend type Mutation {
        addLike(publicationId: ID!): Boolean!
    }
`;
