
$(document).ready(function() {
  var glow = $('.confirm_selection');
setInterval(function(){
    glow.toggleClass('glow');
}, 2000);
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var temp;    
  $.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather",
			data: {
        lat: latitude,
				lon: longitude, 
				units: "imperial",
        appid: '67abf673131a2a15d7356632f0a705f1'
			},
			dataType: "json",
			success: function(data) {
        temp = data.main.temp;
				if(data.cod != 200)
				{
					alert("something went wrong");
					return;
				}
				// Stuff to call when the data is ready
				$("#city").html(data.name);

				var iconCode = data.weather[0].icon;
				$(".icon").attr('src', "http://openweathermap.org/img/w/" + iconCode + ".png");

				
				$("#weather").html(data.weather[0].main);

				$("#description").html(data.weather[0].description);

				$("#temperature").html(Math.round(temp) + '&deg F' );

				$('#wind').html(data.wind.speed);

				$('#humidity').html(data.main.humidity);
        
        function changeTemp(temp){
            var cel = (temp - 32) * 5/9;
            return Math.round(cel);
         };
        $("#temperature").click(function(){
          $('#temperature').html(changeTemp(temp) + ' &deg C');
          $('#temperature').toggleClass(changeTemp(temp));
        });
      },
			error: function() {
				// alert("something went wrong");
			}
		});
  });
  }
});