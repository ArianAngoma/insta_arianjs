import {gql} from 'apollo-server-express';

export const CommentDefs = gql`
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
        userId: ID!
        comment: String!
        createdAt: String!
        updatedAt: String!
    }
`;
