import { Strategy as LocalStrategy } from 'passport-local';
import { findOne, signIn, signUp } from '../modules/auth/controllers/users';
import passport from 'passport';

export default function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser( (user, callback) => callback(null, user.email) );
  
  passport.deserializeUser( findOne );

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true 
    }, signUp
  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true 
    }, signIn
  ));
}