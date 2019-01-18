import { Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import { findOne } from '../modules/auth/controllers/users';
import passport from 'passport';
import config from '../config';

export default function(app) {

  app.use(passport.initialize());

  passport.serializeUser( (user, callback) => callback(null, user.email) );
  passport.deserializeUser( findOne );
  
  // Note the payload must be the same as the one used to sign the jwt token.
  passport.use('jwt', new JWTStrategy({
    secretOrKey : config.jwt,
    jwtFromRequest : ExtractJwt.fromHeader('authorization')
  }, (payload, done) => {
    findOne(payload.user, (error, user) => {
      if(error) {
        return done(error, false);
      }
      else if(user) {
        done(null, user);
      }
      else{
        done(null, false);
      }
    });
  }));
}