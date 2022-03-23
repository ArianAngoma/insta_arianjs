import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        getUser(id: ID, email: String, username: String): User!
    }

    type Mutation {
        # User
        register(input: UserInput!): AuthPayload!
        login(input: LoginInput!): AuthPayload!
        renewToken: AuthPayload!
        updateAvatar(file: Upload!): UpdateAvatar!
        deleteAvatar: Boolean!
        updateUser(input: updateUserInput!): Boolean!
    }

    scalar Upload

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input updateUserInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        web: String
        description: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        avatar: String
        web: String
        description: String
        createdAt: String!
        updatedAt: String!
    }

    type UpdateAvatar {
        status: Boolean!
        urlAvatar: String!
    }
`;

