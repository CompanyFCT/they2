
/*
 * GET home page.
 */

var Product = require('../models/product.js');

exports._ = function(req, res){
  Product.find(function(errFind,docs){
    var json = null;
    var error = false;

    if(!errFind){ 
      if(docs.length==0){
        // if(!prod) console.log('save');
        json = {name: 'Camiseta VANS BOGUE', description: 'Camiseta VANS tamanho M', price: 100, oldPrice: 150};
        new Product(json).save(function (errSave) {if (errSave) console.log ('Error on save!' + errSave); var error = true;});
      }else{
        // if(!prod) console.log('find');
        json = docs[0];
      }

      var response = { response: json };
      res.render('index', response);
    } else {
      error = true;
      console.log ('Error on save!' + find);
    }

    if(error) res.render('500');
  });
};