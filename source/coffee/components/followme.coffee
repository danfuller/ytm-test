define ["jquery","ractive","components/adapters/soundcloud","rv!/template/catalogue.html"], ($,Ractive,Soundcloud,template) ->

	Catalogue = Ractive.extend

		el: document.body
		template: template

		data:
			tracks: []

		init: ->
			console.log "Hello Catalogue :)"

			@_eventListeners()

			Soundcloud = new Soundcloud()

			Soundcloud.getTracksByUser 'creamcollective', @_addToCatalogue.bind(@)
			Soundcloud.getTracksByUser 'trap-door-official', @_addToCatalogue.bind(@)


		_addToCatalogue: (data) ->
			for track in data
				#track.artwork_url = track.artwork_url.replace('large.jpg','t500x500.jpg')
				@data.tracks.push track
			@_layout()

		_layout: ->
			left = 60
			top = 60
			for track in @data.tracks
				track.left = left
				track.top = top
				left += 200
				if left + 160 >= window.innerWidth
					left = 60
					top += 270
			@update()

		_eventListeners: ->
			document.addEventListener 'mousemove', (e) => @_mousemoveEventListener(e)

		_mousemoveEventListener: (e) ->
			scrollTop = $('.catalogue').scrollTop()
			displayParams =
				x: e.pageX 
				y: e.pageY + scrollTop

			@_configureDisplay(displayParams)

		_configureDisplay: (param) ->
			#console.log param.x, param.y, param.scroll

			for track in @data.tracks
				track.rotateY = Math.round((((track.left + 80) - param.x) * - 1) * 0.03)
				track.rotateX = Math.round(((track.top + 80) - param.y) * 0.03) #param.y - track.top

			@update()