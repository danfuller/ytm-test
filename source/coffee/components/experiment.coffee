define ["jquery","io","ractive","rv!/template/experiment.html","components/adapters/soundcloud"], ($, io, Ractive, template, Soundcloud) ->

	Experiment = Ractive.extend

		el: document.body
		append:	true
		template: template

		elLoaded: -> @init()

		init: ->
			console.log 'asd'
			@socket = io.connect('http://192.168.0.8:1234');

			@_display()
			@_events()
			@_socketEvents()
			@_userConnect()


		_display: ->
			@set 'cheese', 'asd'

		_events: ->
			document.addEventListener 'mousemove', (e) => @_mouseMoveHandler(@,e)
			@on 'join', @_joinHandler
			
		_userConnect: ->
			@socket.emit 'connect'

		_mouseMoveHandler: (Experiment, e) ->
			@set 'scroll', window.scrollX
			mouse =
				x:	e.pageX 
				y:	e.pageY

			@set 'user.mouse', mouse
			Experiment.socket.emit 'mousemove', mouse

		_socketEvents: ->
			console.log 'socketEvents'

			@socket.on 'users_updated', (data) =>
				#console.log data
				@set 'users', data

			@socket.on 'mouse_updated', (data) =>
				#console.log data
				user = null if user.id is @socket.id for user in data
				@set 'users', data

		_joinHandler: ->
			Soundcloud.auth success:@loadUser.bind(@)

		loadUser: (data) ->
			console.log @
			@set 'user', data
			console.log 'lu', @data.user