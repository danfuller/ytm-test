define ["jquery","components/catalogue","components/experiment"], ($, Catalogue, Experiment) ->

	class App

		constructor: ->
			console.log "Hello World :)"

			App.Catalogue = new Catalogue()
			App.Experiment = new Experiment()
