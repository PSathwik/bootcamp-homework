var clearId = 0;
var onSelect = function (e, data){
	var fromCur,
		toCur,
		amount;
	
	clearTimeout(clearId);
	
	if (e.target.id === "currency") {
		fromCur = data;
	}
	else if (e.target.id === "counterCurrency") {
		toCur = data;
	}
	
	if (fromCur === undefined) {
		fromCur = $('#currency').val();
	}
	
	if (toCur === undefined) {
		toCur = $('#counterCurrency').val();
	}
	
	amount = $('#amount').val();
	
	clearId = setTimeout(
		$.ajax,
		500,
		{
			url: 'https://currencyconverter.p.mashape.com/?from='+ fromCur + '&from_amount='+ amount + '&to=' + toCur,
			crossDomain: true,
			headers: {
				'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
			},
			success: function(data) {
				$('#calcAmount').val(data.to_amount);
			}
		});
};

$(document).ready(function(){
	$.ajax({
		url: "https://currencyconverter.p.mashape.com/availablecurrencies/",
		crossDomain: true,
		headers: {
			'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
		},
		success: function(data){
			var source = $('#data-currency-template').html();
			var template = Handlebars.compile(source);

			var parent1 = $('#currency');
			var parent2 = $('#counterCurrency');
			for(loopIndex = 0; loopIndex < data.length; ++loopIndex) {
				var element = template(data[loopIndex]);
				parent1.append(element);
				parent2.append(element);
			}
			
			var options = {
				footer: false,
				select: onSelect
			};

			parent1.selectr(options);
			parent2.selectr(options);
		}
	});
	
	$('#amount').on('keyup', onSelect);
});


