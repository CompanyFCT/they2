//FIXME => REDUNTANT REDIS
//FIXME => REMOVE COOKIE

/*
 * GET home page.
 */

// var fs = require('fs');
// var path = require('path')

var User = require('../models/user.js');
var nuuid = require('node-uuid');
var redis=null;

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]); 
} else {
  redis = require("redis").createClient();
}

exports._ = function(req, res){
  // console.log(global.public_folder);
  // console.log(fs.readdirSync(global.public_folder + '/images/logos'));
  res.render('index');
};

exports.plan = function(req, res){
  // validations
  var json = {
    name: req.body.name.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').toUpperCase(), //fulltrim
    email: req.body.email,
    phones: req.body.phones,
    type: req.body.type,
    ages: req.body.ages
  };

  User.save(json,function(err){
    if (err){
      console.log ('Error on save!' + errSave);
      res.send({code:500});
    }else{
      res.send({code:200});
    }    
  });
};

exports.admin = function(req, res){
  redis.get("admin", function (err, val) {
    if(val==req.signedCookies.admin && req.signedCookies.admin){
      User.all(function(docs){
        res.render('admin/index', { response: docs, logged: true });
      });
    }else{
      res.render('admin/index');
    }
  });
};

exports.login = function(req, res){
  if(req.body.user=='admin' && req.body.pass=='123456'){
    var _uuid=nuuid.v1();
    res.cookie("admin", _uuid, {signed: true}); //vulnerability here.. find another way! ;)
    redis.setex("admin", 600, _uuid);//10min
    res.send({});
  }else{
    res.send({status:404});
  }
};

exports.logout = function(req, res){
  redis.del("admin");
  res.redirect('/admin');
};

exports.plans = function(req, res){
  res.render('plan');
};

exports.delUser = function(req, res){
  // if(req.body.ids.length>0) User.remove().where("_id").in(req.body.ids).exec();
  if(req.body.ids.length>0) User.remove({_id:{$in:req.body.ids}},function(e,d){});
  res.send({status:200});
};
