import { ApolloServer } from 'apollo-server-express';
import { schema } from '../schema/graphql';

export default function(app) {
  // GraphQL
  console.info('SETUP - GraphQL...');
  const server = new ApolloServer({ 
    schema: schema,
    context: ({ req }) => {
      return { user: req.user };
    }
  });
  server.applyMiddleware({ app });

  return server;
}