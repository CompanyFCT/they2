
/*
 * GET home page.
 */

var User = require('../models/user.js');

exports._ = function(req, res){
  res.render('index');
};

exports.error = function(req, res){
  res.render('500');
};

exports.plan = function(req, res){
  var status=200;

  //validations
  var json = {
    name: req.body.name, 
    email: req.body.mail, 
    phone: req.body.phone
  };
  
  new User(json).save(function (errSave) {if (errSave) console.log ('Error on save!' + errSave); status = 500;});

  res.send({code:500});
};
