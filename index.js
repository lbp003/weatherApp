$(document).ready(function() {
    $('#switch').hide();
    $('.line').hide();
    $('.footer-text').html('&copy '+new Date().getFullYear()+' LBP003');
    $('.footer').css({backgroundColor: 'gray', color: '#ffffff', paddingLeft: '90%'});

    if(navigator.geolocation){
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
            // console.log(currentPosition);

            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;

            // console.log(latitude, longitude);

            var url = 'http://api.weatherstack.com/current?access_key=b7689f345c3c24d74c2ab62bd0846e58&query='+latitude+','+longitude+'&units=m';

            $.getJSON(url, function(data){
                // console.log(typeof data);
                var data = JSON.stringify(data);
                // console.log(typeof data);
                var jsonObj = JSON.parse(data);
                console.log(jsonObj);
                var country = jsonObj.location.country;
                var city = jsonObj.location.name;
                var state = jsonObj.location.region;

                var tempC = jsonObj.current.temperature;
                var tempF = (tempC * 9 / 5 + 32).toFixed(1);
                var lastUpdated = jsonObj.location.observation_time;

                var windSpeed = jsonObj.current.wind_speed;
                var humidity = jsonObj.current.humidity;
                var time = jsonObj.location.localtime.split(' ')[1];
                var cloudcover = jsonObj.current.cloudcover;
                var weatherIcon = jsonObj.current.weather_icons[0];
                var weatherDescriptions = jsonObj.current.weather_descriptions[0];

                $('#switch').show();
                $('.line').show();

                $('#weather').html(city + ', ' + state + ', ' + country);
                $('#info1').html(time);
                $('#info2').html('Wind '+windSpeed+' kmh');
                $('#info3').html(tempC+'&#8451');

                var yes = true;
                $('#switch').on('click', function(){
                    if(yes){
                        $('#info3').html(tempF+'&#8457');
                        $('#switch').html('Show in Celsius');
                        yes = false;
                    }else{
                        $('#info3').html(tempC+'&#8451');
                        $('#switch').html('Show in Farenheight');
                        yes = true;
                    }
                    
                });

                $('#info5').html(weatherDescriptions);
                $('#info6').html('Humidity '+humidity+'%');
            });
        });
    }
})