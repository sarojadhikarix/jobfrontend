(function ($) {
	$(document).ready(function () {
		runMap();
		$.fn.customMap = function () {
			runMap();
		}
		 function runMap(){
		$('#googlemaps').gMap({
			maptype: 'ROADMAP',
			scrollwheel: false,
			zoom: 13,
			markers: [
				{
					address: 'Narayangarh, Chitwan, Nepal', // Your Adress Here
					html: '<strong>My Developer</strong><br>Narayangarh, Chitwan </br>Nepal',
					popup: true,
				}
			],
		});

	}});

})(this.jQuery);