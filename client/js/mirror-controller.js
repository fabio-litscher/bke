(function () {
    $(document).ready(function () {
        var socket = io();
        socket.emit('connect mirror');

        socket.on('watch', function (checked) {
            if(checked) {
                $('#watch-container').show();
            } else {
                $('#watch-container').hide();
            }
        });

        socket.on('weather', function (checked) {
            if(checked) {
                $('#weather-container').show();
                refreshWeather();
            } else {
                $('#weather-container').hide();
            }
        });

        socket.on('calendar', function (checked) {
            if(checked) {
                $('#calendar-container').show();
            } else {
                $('#calendar-container').hide();
            }
        });

        function refreshTime () {
            var now = new Date();

            var hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
            var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
            var seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

            var time = hours + ":" + minutes + ":" + seconds;

            $("#time")[0].innerText = time;
        }

        function refreshWeather() {
            navigator.geolocation.getCurrentPosition(function(position) {
                if ("geolocation" in navigator) {
                    loadWeather(position.coords.latitude+','+position.coords.longitude);
                }
                else {
                    loadWeather("St. Gallen");
                }
            });
        }

        function loadWeather(location) {
            $.simpleWeather({
                location: location,
                woeid: '',
                unit: 'c',
                success: function(weather) {
                    html = '<h2>'+weather.city+', '+weather.region+'</h2>';
                    html += '<h3><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h3>';
                    html += '<span class="currently weather-snippet">'+weather.currently+'</span>';
                    html += '<span class="weather-snippet">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</span>';

                    $("#weather").html(html);
                },
                error: function(error) {
                    $("#weather").html('<p>'+error+'</p>');
                }
            });
        }

        function refreshCalendar() {
            var now = new Date();

            var days = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            var month = (now.getMonth() < 9) ? "0" + (now.getMonth()+1) : (now.getMonth()+1);
            var years = now.getFullYear();
            var date = days + "." + month + "." + years;

            $("#date")[0].innerText = date;
        }

        refreshTime();
        refreshWeather();
        refreshCalendar();
        setInterval(refreshTime, 1000);
        setInterval(refreshWeather, 600000);
    });
}());