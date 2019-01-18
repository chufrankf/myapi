
// results should always be in the form of {error, user, message}
// include res so that we can make a res.json call
exports.handleCallbackAsJson = (error, result, message, res) => {
  let output = {};

  if( error ) {
    output.error = error;
    if( error.message ) {
      output.message = error.message;
    }
  }

  if( result ) {
    output.result = result;
  }

  if( message ) {
    output.message = message;
  }

  return res.json(output);
};
