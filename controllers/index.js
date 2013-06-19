
/*
 * GET home page.
 */

var user = require('../models/user.js');

exports._ = function(req, res){
  res.render('index');
};

exports.plan = function(req, res){
  // console.log();
  // req.params.email;
  // req.params.name;
  // req.params.phone;
  res.send({});
};
