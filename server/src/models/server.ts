import {ApolloServer} from 'apollo-server';
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';

import {join} from 'path';

import {dbConnection} from '../database/config';
import {resolvers} from '../graphql/resolver';

const typeDefs = loadSchemaSync(
    join(__dirname, '../graphql/schema.graphql'),
    {loaders: [new GraphQLFileLoader()]},
);

export class Server {
  private readonly apolloServer: ApolloServer;
  private readonly port: string;

  constructor() {
    this.connectDB();
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    this.port = process.env.PORT || '4000';
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  listen(): void {
    this.apolloServer.listen({port: this.port})
        .then(({url}: { url: string }) => {
          return console.log(`Server running on ${url}`);
        });
  }
}
