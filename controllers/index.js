
/*
 * GET home page.
 */

var User = require('../models/user.js');

exports._ = function(req, res){
  res.render('index');
};

exports.plan = function(req, res){
  //validations
  var json = {
    name: req.body.name, 
    email: req.body.email, 
    phone: req.body.phone
  };
  
  new User(json).save(function (errSave) {
    if (errSave){
      console.log ('Error on save!' + errSave); 
      res.send({code:500});
    }else{
      res.send({code:200});
    }
  });
};
