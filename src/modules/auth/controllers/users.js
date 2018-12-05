import { Users } from '../models';
import bcrypt from 'bcryptjs';

/*
 * email: email to search for in Users Database
 * callback: params {error, user}. If success errors will be null, if fail user will be null.
 */
function findOne(email, callback) {
  Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      callback(null, user);
    } else {
      callback(user.errors, null);
    }
  }).catch( (error) => {
    console.error('ERROR:', error);
    return callback(error, false, {
      message: 'Something went wrong with the database query for User'
    });
  });
}

/*
 * email: email to login to
 * password: password to login with
 * req: details of the request to pass on
 * callback: params {error, user}
 */
function signIn(req, email, password, callback) {
  findOne(email, (error, user) => {
    if (user && !error) {
      if ( bcrypt.compareSync(password, user.password) ) {
        return callback(null, user.email);
      } else {
        return callback(null, false, {
          message: 'Incorrect password.'
        });
      }
    } else {
      return callback(error, false, {
        message: `Could not find user ${email}`
      });
    }
  });
}

function signUp (email, password, callback) {
  findOne( email, (error, user) => {
    if (user && !error) {
      return callback(null, {
        message: 'That email is already taken'
      });
    } else {
      var salt = bcrypt.genSaltSync(10);
      Users.create({
        email: email,
        password: bcrypt.hashSync(password, salt)
      }).then((newUser) => { 
        return callback(newUser.email); 
      });
    }
  });
}

module.exports = {
  findOne: findOne,
  signIn: signIn,
  signUp: signUp
};