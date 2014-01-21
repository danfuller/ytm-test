define ["jquery","ractive","components/adapters/soundcloud","rv!/template/catalogue.html"], ($,Ractive,Soundcloud,template) ->

	Catalogue = Ractive.extend

		el: document.body
		template: template
		append: true

		data:
			tracks: []

		init: ->
			console.log "Hello Catalogue :)"

			@_eventListeners()

			Soundcloud = new Soundcloud()

			Soundcloud.getTracksByUser 'trap-door-official', @_addToCatalogue.bind(@)

		_eventListeners: ->
			#document.addEventListener 'mousemove', (e) => @_mousemoveEventListener(e)
			@on 'activate', @_activate

		_activate: (e) -> 
			track.active = false for track in @data.tracks 
			e.context.active = true
			@update()

		_addToCatalogue: (data) ->
			console.log data
			for track, i in data
				track.artwork_url = track.artwork_url.replace('large.jpg','t300x300.jpg')
				if i is 3 then track.active = true
				@data.tracks.push track
			@_layout()


		_layout: ->
			@set 'width', @data.tracks.length * 330
