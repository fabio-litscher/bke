var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/client.html');
});

app.get('/mirror', function (req, res) {
  res.sendFile(__dirname + '/client/mirror.html');
});

server.listen(3000);
console.log('listening on *:3000');

var mirror = null;

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function () {
    if(socket === mirror) {
      console.log('mirror disconnected');
      mirror = null;
    } else {
      console.log('a user disconnected');
    }
  });

  socket.on('connect mirror', function () {
    if(!mirror) {
      console.log('mirror connected');
      mirror = socket;
    }
  });

  socket.on('watch', function(checked) {
    if(mirror) {
      mirror.emit('watch', checked);
    }
  });

  socket.on('weather', function(checked) {
    if(mirror) {
      mirror.emit('weather', checked);
    }
  });

  socket.on('calendar', function(checked) {
    if(mirror) {
      mirror.emit('calendar', checked);
    }
  });
});