import {gql} from 'apollo-server-express';

export const FollowDefs = gql`
    extend type Query {
        isFollow(username: String!): Boolean!
        getFollowers(username:  String!): [User!]!
        getFollowing(username: String!): [User!]!
    }

    extend type Mutation {
        follow(username: String!): Boolean!
        unFollow(username: String!): Boolean!
    }
`;
