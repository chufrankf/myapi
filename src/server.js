import express from 'express';
import config from './config/config.json';

import configurePassport from './setup/passport'; 
import configureHandlebars from './setup/handlebars';
import configureRouter from './setup/routes';
import configureGraphQL from './setup/graqhql';
import syncDatabase from './setup/syncDatabase';

const app = express();
configurePassport(app);
configureHandlebars(app);
configureRouter(app);
const gqlServer = configureGraphQL(app);

syncDatabase(app, () => {
  console.info('SETUP - Starting server...');
  app.listen({ port: config.port }, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.');
    } else {
      console.info(`Server ready at http://localhost:${config.port}${gqlServer.graphqlPath}`);
      console.info(`Frontdoor ready at http://localhost:${config.port}/`);
    }
  });
});
    