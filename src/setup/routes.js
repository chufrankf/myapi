export default function(app) {
  // Routers
  app.get('/', (req, res) => res.render('home') );
  app.get('/login', (req, res) => res.render('login') );
}