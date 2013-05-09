(function() {
	$('.submit').click(function() {
		var settings = {
			data: JSON.stringify({email: $('.email').val()}),
			type: 'POST',
			contentType: 'application/json',
			success: function(data) {
				console.log(data);
			}
		};

		$.ajax('/emails', settings);
	})
}());
