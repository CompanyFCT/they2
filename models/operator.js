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

{
	:name => 'x',
	:planos => [{
		:nome => titulo.text,
		:tipo => [{
			:categoria => plano.text,
			:acomodacao => acomodacao.text,
			:precos => [{
			 		:idade => age.xpath('.//td[@class="fundo_subtitulo"]//div').text,
			 		:preco => age.xpath(".//td[@class='fonte_normal'][position()=#{index-1}]//div").text
				}
			]
		}]	
	}]
}

*/