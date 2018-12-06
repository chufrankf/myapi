import express from 'express';
import config from './config/config.json';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema/graphql';
import models from './schema/db';
import configurePassport from './setup/passport'; 
import exphbs from 'express-handlebars';
import path from 'path';

const app = express();
configurePassport(app);

// Handlebars
app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'));

var hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials/')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routers
app.get('/', (req, res) => res.render('home') );
app.get('/login', (req, res) => res.render('login') );

// GraphQL
console.info('SETUP - GraphQL...');
const server = new ApolloServer({ schema: schema });
server.applyMiddleware({ app });

// Sync Sequelize
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

