define ["jquery","components/catalogue"], ($, Catalogue) ->

	class App

		constructor: ->
			console.log "Hello World :)"

			App.Catologue = new Catalogue()
