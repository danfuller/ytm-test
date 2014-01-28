define ["jquery","components/catalogue","components/experiment","components/adapters/soundcloud"], ($, Catalogue, Experiment, Soundcloud) ->

	class App

		constructor: ->
			console.log "Hello World :)"
			
			Soundcloud.load()


			App.Experiment = new Experiment()
			App.Catalogue = new Catalogue()
