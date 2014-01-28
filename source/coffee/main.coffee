require.config
	paths:
		"jquery": "../vendor/jquery"
		"ractive": "../vendor/ractive"
		"soundcloud-api": "http://connect.soundcloud.com/sdk"
		"text"			: "../vendor/text"
		"rv"			: "../vendor/rv"
		"io": "http://192.168.0.10:1234/socket.io/socket.io"

	shim:
		app: ["jquery"]
		"io": export: "io"

		'soundcloud-api':
			exports: 'SC'

	stubModules: ["rv", "text"]


require ["app"], (App) -> new App()