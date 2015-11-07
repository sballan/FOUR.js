//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.

Four.Presets.prototype = {
	defaults: function() {
		var settings = {
			debugMode: true,
			renderer: {
				clearColor: 0x555555,
    		shadowMap: true,
    		shadowMapSoft: true,
    		antialias: false
			},
			lights: {
				positionX: 100,
    		positionY: -20,
    		positionZ: -30,
    		color: 0xFFFFFF
			},
			camera: {
				angle: 45,
	      aspect: window.innerWidth / window.innerHeight,
	      near: 0.1,
	      far: 500,
	      positionX: 0,
	      positionY: 0,
	      positionZ: 80 
			}

		}
		console.log(settings.lights.color)
		return settings
	},
	hey: function() {
		console.log('Whata/')
	}
}