

export default function(app) {
  // Frontdoor Routers
  app.get('/', (req, res) => res.render('home') );
  app.get('/login', (req, res) => res.render('login') );
  app.get('/signup', (req, res) => res.render('signup') );
}