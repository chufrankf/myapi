import db from '../models';

/*
 * email: email to search for in Users Database
 * callback: params {error, user, message}. 
 * If success errors will be null, if fail user will be null.
 */
exports.findOne = function(email, callback) {
  db.Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      callback(null, user);
    } else {
      callback(null, null, 'User email not found');
    }
  }).catch( (error) => {
    return callback(error, false);
  });
};