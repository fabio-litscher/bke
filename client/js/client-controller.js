(function () {
    $(document).ready(function () {
        var socket = io();

        socket.on('update', function() {
            console.log('update');
            console.dir(arguments);
        });

        $('#weather-tile').on('click', function() {
            if($('#weather-tile').hasClass('active')) {
                $('#weather-tile').removeClass('active');
            } else {
                $('#weather-tile').addClass('active');
            }
            socket.emit('weather', $('#weather-tile').hasClass('active'));
        });

        $('#watch-tile').on('click', function() {
            if($('#watch-tile').hasClass('active')) {
                $('#watch-tile').removeClass('active');
            } else {
                $('#watch-tile').addClass('active');
            }
            socket.emit('watch', $('#watch-tile').hasClass('active'));
        });

        $('#calendar-tile').on('click', function() {
            if($('#calendar-tile').hasClass('active')) {
                $('#calendar-tile').removeClass('active');
            } else {
                $('#calendar-tile').addClass('active');
            }
            socket.emit('calendar', $('#calendar-tile').hasClass('active'));
        });
    });
}());