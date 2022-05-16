import {gql} from 'apollo-server-express';

export const FollowDefs = gql`
    extend type Query {
        isFollow(username: String!): Boolean!
        getFollowers(username:  String!): [User!]!
        getFollowing(username: String!): [User!]!
    }

    extend type Mutation {
        register(input: UserInput!): AuthPayload!
        login(input: LoginInput!): AuthPayload!
        renewToken: AuthPayload!
        updateAvatar(file: Upload!): UpdateAvatar!
        deleteAvatar: Boolean!
        updateUser(input: updateUserInput!): Boolean!
    }
`;
