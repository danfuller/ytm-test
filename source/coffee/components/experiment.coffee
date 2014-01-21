define ["jquery","io","ractive","rv!/template/experiment.html"], ($, io, Ractive, template) ->

	Experiment = Ractive.extend

		el: document.body
		append:	true
		template: template

		users: null

		init: ->
			console.log 'asd'
			@socket = io.connect('http://localhost:1234');

			@_display()
			@_events()
			@_socketEvents()
			@_userConnect()

		_display: ->
			@set 'cheese', 'asd'

		_events: ->
			document.addEventListener 'mousemove'	, (e) => @_mouseMoveHandler(@,e)
			
		_userConnect: ->
			@socket.emit 'connect'

		_mouseMoveHandler: (Experiment, e) ->
			mouse =
				x:	e.x
				y:	e.y

			Experiment.socket.emit 'mousemove', mouse

		_socketEvents: ->
			console.log 'socketEvents'

			@socket.on 'users_updated', (data) =>
				console.log data
				@set 'users', data

			@socket.on 'mouse_updated', (data) =>
				console.log data
				@set 'users', data
