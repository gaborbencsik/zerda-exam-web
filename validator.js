'use strict';

var validator = function (req) {
  let text = req.body.feedback;
  let scale = parseInt(req.body.scale);
  let email = req.body.email;

  // function findNiceWords () {
  //   niceWords.forEach
  // };

  if (email.indexOf('@') != -1  && scale >= 10) {
    return true;
  } else {
    return false;
  };
};

module.exports = validator;
