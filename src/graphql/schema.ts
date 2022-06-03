import {gql} from 'apollo-server-express';
import {GraphQLUpload} from 'graphql-upload';

import {UserDefs, UserMutation, UserQuery} from './user';
import {FollowDefs, FollowMutation, FollowQuery} from './follow';
import {
  PublicationDefs,
  PublicationMutation,
  PublicationQuery,
} from './publication';
import {Comment, CommentDefs, CommentMutation, CommentQuery} from './comment';
import {LikeDefs, LikeMutation} from './like';

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
  LikeDefs,
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
    ...LikeMutation,
  },
  Upload: GraphQLUpload,
};
