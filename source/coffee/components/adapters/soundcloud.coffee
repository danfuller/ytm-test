define ["jquery","soundcloud-api"], ($,SC) ->

	# Soundcloud API Adapter

	class SoundcloudAPI

		@CLIENTID = '4f4e41c6b6d715009ee6b8f62255b525'


		constructor: ->
			console.log 'Hello SoundcloudApi'

			SC.initialize
				client_id: SoundcloudAPI.CLIENTID

		_resolve: (url, callback) => $.getJSON "http://api.soundcloud.com/resolve.json?url="+url+"&client_id="+SoundcloudAPI.CLIENTID, callback


		getTracksByUser: (id,callback) ->
			@_resolve 'http://soundcloud.com/'+id, (result) ->
				SC.get "/users/"+result.id+"/tracks", { limit: 1000 }, callback

