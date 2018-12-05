import express from 'express';
import config from './config/config.json';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema/graphql';
import models from './schema/db';
import configurePassport from './setup/passport'; 

//Initialize Variables
const app = express();

//Initialize Passport
configurePassport(app);

// GraphQL
console.info('SETUP - GraphQL...');
const server = new ApolloServer({ schema: schema });
server.applyMiddleware({ app });

// Sync Sequelize and start service
console.info('SETUP - Syncing database tables...');
models.sequelize.sync({})
  .then(() => {
    console.info('INFO - Database sync complete.');

    console.info('SETUP - Starting server...');

    // Start web server
    app.listen({ port: config.port }, (error) => {
      if (error) {
        console.error('ERROR - Unable to start server.');
      } else {
        console.info(`Server ready at http://localhost:${config.port}${server.graphqlPath}`);
      }
    });
  })
  .catch((error) => {
    console.error(`ERROR - Unable to sync database - ${error}`);
    console.error('ERROR - Server not started.');
  });

