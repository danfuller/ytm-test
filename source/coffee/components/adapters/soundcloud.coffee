define ["jquery","soundcloud-api"], ($, SC) ->

	# Soundcloud API Adapter

	class SoundcloudAPI

		@CLIENTID = '4f4e41c6b6d715009ee6b8f62255b525'
		@REDIRECT_URL = 'http://192.168.0.10/callback.html'
		
		@load: () ->
			console.log 'init'
			SC.initialize
				client_id: SoundcloudAPI.CLIENTID
				redirect_uri: SoundcloudAPI.REDIRECT_URL



		@auth: (callback = {}) ->
			SC.connect () ->
  			SC.get '/me', (me) -> callback.success(me)

		@authSuccess: (me) ->
  		console.log me

		@_resolve: (url, callback) => $.getJSON "http://api.soundcloud.com/resolve.json?url="+url+"&client_id="+SoundcloudAPI.CLIENTID, callback


		@getTracksByUser: (id,callback) ->
			@_resolve 'http://soundcloud.com/'+id, (result) ->
				SC.get "/users/"+result.id+"/tracks", { limit: 50 }, callback

		