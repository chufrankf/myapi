import { ApolloServer } from 'apollo-server-express';
import { schema } from '../schema/graphql';

export default function(app) {
  // GraphQL
  console.info('SETUP - GraphQL...');
  const server = new ApolloServer({ schema: schema });
  server.applyMiddleware({ app });

  return server;
}