import passport from 'passport';
import { signUp, signIn, extendToken } from '../controllers/auth';
import { handleCallbackAsJson } from '../../../routers/handlers';

const auth = passport.authenticate('jwt', { session: false });

export default function(app) {

  // Test Authentication
  app.get('/api/auth/version', auth, (req, res) => { 
    res.json({ 
      message: 'Jibaga.REST.v1.0', 
      email: req.user.email
    }); 
  });
  
  // ----- Authentication -----
  // localhost:3000/api/signin
  // body: {
  //  email: String!
  //  password: String!
  // }
  // results: 
  // {
  //  error: String
  //  token: String
  // }
  app.post('/api/auth/signin',(req, res) => { 
    signIn(req.body, (error, results, message) => { 
      handleCallbackAsJson(error, results, message, res); 
    });
  });
  
  // localhost:3000/api/signin
  // {
  //  email: String!
  //  password: String!
  // }
  // results: 
  // {
  //  error: String
  //  token: String
  // }
  app.post('/api/auth/signup',(req, res) => { 
    signUp(req.body, (error, results, message) => { 
      handleCallbackAsJson(error, results, message, res); 
    }); 
  });

  // localhost:3000/api/extend
  // Give a valid token and return a new token that has dates refreshed.
  // results: 
  // {
  //  error: String
  //  token: String
  // }
  app.post('/api/auth/extend', auth, (req, res) => { 
    extendToken(req.user, (error, results, message) => { 
      handleCallbackAsJson(error, results, message, res); 
    }); 
  });
}