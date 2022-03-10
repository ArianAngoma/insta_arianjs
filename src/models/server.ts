import {ApolloServer} from 'apollo-server';

import {dbConnection} from '../database/config';
import {Mutation, Query, typeDefs} from '../graphql';

export class Server {
  private readonly apolloServer: ApolloServer;
  private readonly port: string;

  constructor() {
    this.connectDB();
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers: {
        Query,
        Mutation,
      },
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
