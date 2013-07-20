# encoding: utf-8
require 'nokogiri'
require 'open-uri'
require 'mongo'

include Mongo

['index.html', 'index2.html'].each do |html|
	doc = Nokogiri::HTML(open(html))

	#carencia 
	#hospitais
	#laboratorios

	operadoras = doc.xpath('.//div[@class="operadora"]')
	jsons = []

	operadoras.each do |operadora|
		jsons << {
			:name => operadora.xpath('.//*/img/@src').text.gsub(/.+_/, '').gsub(/\.jpg/,''),
			:planos => []
		}

		operadora.xpath('.//table[@class="tabelas"]').each do |table|
			# #get titulo: individual/familiar/etc
			table.xpath('.//tr[position()=1]//td[@class="fundo_titulo1"]//div').each do |titulo|
				jsons.last[:planos] << {
					:nome => titulo.text,
					:tipo => []
				}

				# get planos: EXECUTIVO, PLENO, MASTER, ETC	
				index = 2
				table.xpath('.//tr[position()=2]//td[@class="fundo_subtitulo"][@width]//div').each do |plano|
					#get acomodacoes
					table.xpath(".//tr[position()=3]//td[@class='fundo_subtitulo'][position()=#{index}]//div").each do |acomodacao|
						unless acomodacao.text=="Acomodação"
							jsons.last[:planos].last[:tipo] << {
								:categoria => plano.text,
								:acomodacao => acomodacao.text,
								:precos => []
							}

							#get ages
							table.xpath(".//tr[position()>3]").each do |age|
								 jsons.last[:planos].last[:tipo].last[:precos] << {
								 		:idade => age.xpath('.//td[@class="fundo_subtitulo"]//div').text,
								 		:preco => age.xpath(".//td[@class='fonte_normal'][position()=#{index-1}]//div").text
								 	}
							end
						end
					end
					index=index+1
				end
			end
		end
	end

	puts "#{jsons.length} elements to try saving"  

	jsons.each_index do | index |
		puts "trying save #{index} element"
		Mongo::Connection.new.db('planovida').collection('planos').save(jsons[index])
	end
end

