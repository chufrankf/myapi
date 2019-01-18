import jwt from 'jsonwebtoken';
import db from '../models';
import bcrypt from 'bcryptjs';
import config from '../../../config';

// User has already had their email and password auth'd
// We just need to give them a token
function getToken (user) {
  return { token: jwt.sign({ user: user.email }, config.jwt, { expiresIn: "7d" }) };
}

exports.extendToken = function (user, callback) {
  if( user ) {
    return callback(null, getToken(user) );
  } else {
    return callback(null, null, 'Invalid token');
  }
}

/*
 * email: email to login to
 * password: password to login with
 * callback: params {error, user, message}
 */
exports.signIn = function (body, callback) {
  const { email, password } = body;

  db.Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      if ( bcrypt.compareSync(password, user.password) ) {
        return callback(null, getToken(user) );
      } else {
        return callback(null, null, 'Incorrect Password');
      }
    } else {
      return callback(null, null, 'Email not found');
    }
  }).catch( (error) => {
    return callback(error, null);
  });
};


/*
 * email: email to signup to
 * password: password to signup with
 * callback: params {error, user, message}
 */
exports.signUp = function (body, callback) {
  const { email, password } = body;
       
  var salt = bcrypt.genSaltSync(10);
  db.Users.create({
    email: email,
    password: bcrypt.hashSync(password, salt)
  }).then((user) => { 
    return callback(null, getToken(user)); 
  }).catch((error) => {
    return callback(error);
  });
};