# encoding: utf-8
require 'nokogiri'
require 'open-uri'


idoc = Nokogiri::HTML(open('http://www.planosdesaudeonline.com.br'))

['.//div[@class="item column-1"]//a','.//div[@class="item column-2"]//a'].each do |column|
	idoc.xpath(column).each do|p|
		file = p.xpath('.//@href').text.gsub(/\//,'')

		unless file.start_with?('index.phpit')
			fullpath = "http://www.planosdesaudeonline.com.br/#{file}"

			uri=URI.parse(URI.encode(fullpath.strip))

			output = File.new( "#{file}", "w" )

			fullhtml=Nokogiri::HTML(open(uri)).xpath('//html')

			fullhtml.xpath('.//div[@id="ja-header"]').remove
			fullhtml.xpath('.//div[@id="ja-mainnav"]').remove
			fullhtml.xpath('.//div[@class="article-tools clearfix"]').remove
			fullhtml.xpath('.//div[@style="height:40px;"]').remove
			fullhtml.xpath('.//table[@class="tabela"]').remove
			fullhtml.xpath('.//ul[@class="pagenav"]').remove
			fullhtml.xpath('.//div[@id="ja-footer"]').remove

			fullhtml.each do |html|
				#remove tags
				output << html
			end

			output.close
		end
	end 
end

# idoc = Nokogiri::HTML(open('http://www.planosdesaudeonline.com.br'))

# iplanos = idoc.xpath('.//div[@id="Mod87"]//div[@class="ja-box-ct clearfix"]//ul[@class="menu"]//li//a')

# iplanos.each do|p|
# 	file = p.xpath('.//@href').text.gsub(/\//,'')
# 	fullpath = "http://www.planosdesaudeonline.com.br/#{file}"

# 	output = File.new( "#{file}", "w" )

# 	fullhtml=Nokogiri::HTML(open(fullpath)).xpath('//html')

# 	fullhtml.xpath('.//div[@id="ja-header"]').remove
# 	fullhtml.xpath('.//div[@id="ja-mainnav"]').remove
# 	fullhtml.xpath('.//div[@class="article-tools clearfix"]').remove
# 	fullhtml.xpath('.//div[@style="height:40px;"]').remove
# 	fullhtml.xpath('.//table[@class="tabela"]').remove
# 	fullhtml.xpath('.//ul[@class="pagenav"]').remove
# 	fullhtml.xpath('.//div[@id="ja-footer"]').remove

# 	# fullhtml.xpath('.//body').each do |body|
# 	#   script = Nokogiri::XML::Node.new "script", fullhtml
# 	#   # script.content = '$("a").click(function(){return false;});'
# 	#   # body.add_next_sibling(script)
# 	# end

# 	fullhtml.xpath('//html').each do |html|
# 		output << html
# 	end

# 	output.close
# end 


# '<script>
# 	$("a").click(function(){return false;});
# </script>'