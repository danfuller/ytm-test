require.config
	paths:
		"jquery": "../vendor/jquery"
		"ractive": "../vendor/ractive"
		"soundcloud-api": "http://connect.soundcloud.com/sdk"
		"text"			: "../vendor/text"
		"rv"			: "../vendor/rv"

	shim:
		app: ["jquery"]

		'soundcloud-api':
			exports: 'SC'

	stubModules: ["rv", "text"]


require ["app"], (App) -> new App()