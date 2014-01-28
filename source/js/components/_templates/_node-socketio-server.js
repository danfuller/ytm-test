var connectHandler, connectedUsers, createRoomHandler, disconnectHandler, io, joinRoomHandler, server, users,
  _this = this;

server = require('http').createServer().listen(1234);

io = require('socket.io').listen(server);

users = [];

io.sockets.on('connection', function(socket) {
  console.log('client connected');
  socket.on('connect', function(data) {
    return connectHandler(socket);
  });
  socket.on('disconnect', function(data) {
    return disconnectHandler(socket);
  });
  socket.on('createRoom', function(data) {
    return createRoomHandler();
  });
  return socket.on('joinRoom', function(data) {
    return joinRoomHandler();
  });
});

connectHandler = function(socket) {
  console.log('connectHandler');
  return io.sockets.emit('users_updated', users);
};

disconnectHandler = function(socket) {
  var key, user, _i, _len;
  console.log('disconnectHandler');
  console.log(users);
  for (key = _i = 0, _len = users.length; _i < _len; key = ++_i) {
    user = users[key];
    console.log(user, key);
    if (user.id === socket.id) {
      users.splice(key, 1);
      break;
    }
  }
  console.log(users);
  return io.sockets.emit('users_updated', users);
};

createRoomHandler = function() {
  return console.log('createRoomHandler');
};

joinRoomHandler = function() {
  return console.log('joinRoomHandler');
};

connectedUsers = function() {
  return io.sockets.clients().length;
};

/*
	create new game when 2 players connected
*/


/*
//# sourceMappingURL=../../../../source/js/_node-socketio-server.js.map
*/