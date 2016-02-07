$(document).ready(function(){
	$('#stockInput').on('keypress', function(key) {
		if(key.keyCode === 13) {
			$('.primary').click();
		}
	});
	
	$('.primary').on('click', function(e){
		var loopIndex = 0;
		var stock = $('#stockInput').val();
		
		var source = $('#data-row-template').html();
		var template = Handlebars.compile(source);
		
		$.ajax({
			url:'https://stockvider.p.mashape.com/indicator/DATA/' + stock + '/?end_date=2015-07-20&start_date=2015-05-20',
			crossDomain: true,
			headers: {
				'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
			},
			success: function(data){
				if (data.Error) {
					alert(data.Error);
				}
				
				var source = $('#data-row-template').html();
				var template = Handlebars.compile(source);
				
				var dataSet = data.Dataset;
				var parent = $('table');

				for(loopIndex = 0; loopIndex < dataSet.length; ++loopIndex) {
					parent.append(template(dataSet[loopIndex]));
				}
				
				data.Dataset
			}
		});
	})
});
