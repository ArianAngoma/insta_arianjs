import {gql} from 'apollo-server-express';

export const PublicationDefs = gql`
    extend type Mutation {
        publish(file: Upload!): Publish!
    }

    type Publish {
        status: Boolean!
        urlFile: String!
    }
`;
