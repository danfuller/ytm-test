# Setup
server = require('http').createServer().listen(1234)
io = require('socket.io').listen(server)

#Game = require('./game').Game
#User = require('./user').User

users = []

# Socket Events
io.sockets.on 'connection', (socket) =>
	console.log 'client connected'

	socket.on 'connect', (data) =>
		connectHandler(socket)

	socket.on 'disconnect', (data) =>
		disconnectHandler(socket)

	socket.on 'mousemove', (data) =>
		mouseMoveHandler(socket, data)

	socket.on 'createRoom', (data) =>
		createRoomHandler()

	socket.on 'joinRoom', (data) =>
		joinRoomHandler()


# Socket Event Handlers
connectHandler = (socket) =>
	console.log 'connectHandler'
	
	user =
		id: socket.id

	# Create new user, add to stored users
	users.push user

	# Emit updated users to all
	io.sockets.emit 'users_updated', users


disconnectHandler = (socket) =>
	console.log 'disconnectHandler'

	# Remove user from users
	for user, key in users
		console.log user, key
		if user.id is socket.id
			users.splice key, 1
			break

	io.sockets.emit 'users_updated', users

# Mouse Move Handler
mouseMoveHandler = (socket, data) =>


	for user, key in users
		console.log user.id, socket.id
		if user.id is socket.id
			user.mouse = data
			break

	io.sockets.emit 'mouse_updated', users


createRoomHandler = ->
	console.log 'createRoomHandler'

joinRoomHandler = ->
	console.log 'joinRoomHandler'

# Misc
connectedUsers = ->
	io.sockets.clients().length


###
	create new game when 2 players connected
###