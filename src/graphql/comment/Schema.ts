import {gql} from 'apollo-server-express';

export const CommentDefs = gql`
    extend type Query {
        getComments(publicationId: ID!): [Comment!]!
    }

    extend type Mutation {
        addComment(input: AddCommentInput!): Comment!
    }

    input AddCommentInput {
        publicationId: ID!
        comment: String!
    }

    type Comment {
        id: ID!
        publicationId: ID!
        comment: String!
        author: User!
        createdAt: String!
        updatedAt: String!
    }
`;
