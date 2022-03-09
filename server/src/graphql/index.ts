import {join} from 'path';

import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';

export {Query} from './Query';
export {Mutation} from './Mutation';

export const typeDefs = loadSchemaSync(
    join(__dirname, './schema.graphql'),
    {loaders: [new GraphQLFileLoader()]},
);
