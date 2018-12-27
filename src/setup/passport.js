import { Strategy as LocalStrategy } from 'passport-local';
import { findOne, signIn } from '../modules/auth/controllers/users';
import passport from 'passport';

export default function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser( (user, callback) => callback(null, user.email) );
  passport.deserializeUser( findOne );
  passport.use( new LocalStrategy( signIn ));
}