import {gql} from 'apollo-server-express';
import {GraphQLUpload} from 'graphql-upload';

import {UserDefs, UserQuery, UserMutation} from './user';
import {FollowDefs, FollowQuery, FollowMutation} from './follow';
import {
  PublicationDefs,
  PublicationQuery,
  PublicationMutation,
} from './publication';
import {CommentDefs, CommentMutation, CommentQuery, Comment} from './comment';

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    scalar Upload
`;

export const typeDefs = [
  rootTypeDefs,
  UserDefs,
  FollowDefs,
  PublicationDefs,
  CommentDefs,
];

export const resolvers = {
  Comment,
  Query: {
    ...UserQuery,
    ...FollowQuery,
    ...PublicationQuery,
    ...CommentQuery,
  },
  Mutation: {
    ...UserMutation,
    ...FollowMutation,
    ...PublicationMutation,
    ...CommentMutation,
  },
  Upload: GraphQLUpload,
};
