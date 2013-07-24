var mongoose = require('mongoose'),
// validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
  name: String,
  planos: [{
  	nome: String,
  	tipo: [{
			categoria: String,
			acomodacao: String,
			precos: [{
				idade: String,
				preco: Number
			}]
  	}]
  }]
});

module.exports = mongoose.model('Operator', schema);

/*
schema document!
{
	:name => String,
	:planos => [{
		:nome => String,
		:tipo => [{
			:categoria => String,
			:acomodacao => String,
			:precos => [{
			 		:idade => String,
			 		:preco => Number
				}
			]
		}]	
	}]
}

*/