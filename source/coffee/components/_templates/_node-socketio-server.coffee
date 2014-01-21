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

	socket.on 'createRoom', (data) =>
		createRoomHandler()

	socket.on 'joinRoom', (data) =>
		joinRoomHandler()


# Socket Event Handlers
connectHandler = (socket) =>
	console.log 'connectHandler'
	
	# Create new user, add to stored users
	#users.push(new User(socket.id))

	# Emit updated users to all
	io.sockets.emit 'users_updated', users


disconnectHandler = (socket) =>
	console.log 'disconnectHandler'

	console.log users

	# Remove user from users
	for user, key in users
		console.log user, key
		if user.id is socket.id
			users.splice key, 1
			break

	console.log users

	io.sockets.emit 'users_updated', users

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