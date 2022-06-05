import {gql} from 'apollo-server-express';

export const PublicationDefs = gql`
    extend type Query {
        getPublications(username: String!): [Publication!]!
        getPublicationsFollowing: [Publication!]!
    }

    extend type Mutation {
        publish(file: Upload!): Publish!
    }

    type Publish {
        status: Boolean!
        urlFile: String!
    }

    type Publication {
        id: ID!
        author: User!
        file: String!
        fileType: String!
        createdAt: String!
        updatedAt: String!
    }
`;
