define ["jquery","ractive","components/adapters/soundcloud","rv!/template/catalogue.html"], ($,Ractive,Soundcloud,template) ->

	Catalogue = Ractive.extend

		el: document.body
		template: template
		append: true

		data:
			tracks: []

		colors: ['#EE7944','#EE7944','#45EEA9','#EE4562']

		init: ->
			console.log "Hello Catalogue :)"

			@_getTracks()
			@_eventListeners()

		_getTracks: ->
			Soundcloud.getTracksByUser 'trap-door-official', @_addToCatalogue.bind(@)

		_eventListeners: ->
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
				track.color = @colors[Math.floor(Math.random() * @colors.length)]

				@data.tracks.push track
			@_layout()


		_layout: ->
			@set 'width', @data.tracks.length * 330


			#EE7944
			#7945EF
			#45EEA9
			#EE4562
			#62EE45
			#4562EE
	