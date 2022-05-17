import {gql} from 'apollo-server-express';
import {GraphQLUpload} from 'graphql-upload';

import {UserDefs, UserQuery, UserMutation} from './user';
import {FollowDefs, FollowQuery, FollowMutation} from './follow';
import {PublicationDefs, PublicationMutation} from './publication';

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    scalar Upload
`;

export const typeDefs = [rootTypeDefs, UserDefs, FollowDefs, PublicationDefs];

export const resolvers = {
  Query: {
    ...UserQuery,
    ...FollowQuery,
  },
  Mutation: {
    ...UserMutation,
    ...FollowMutation,
    ...PublicationMutation,
  },
  Upload: GraphQLUpload,
};
