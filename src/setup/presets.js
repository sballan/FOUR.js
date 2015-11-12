//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.

Four.Preset.prototype = {
	defaults: function() {
		var settings = {
			debugMode: true,
			controls: {
				OrbitControls: true,
				lookAtScene: true
			},
			renderer: {
				clearColor: 0x555555,
    		shadowMap: true,
    		shadowMapSoft: true,
    		antialias: true
			},
			updates: [
				{func: TWEEN.update
				}
			],
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
			},
			scene: {
				physics: false
			},
			mesh: {
				sphere: {
					physics: false,
					x: 0,
					y: 0,
					z: 0,
					radius: 5,
					widthSegments: 16,
					heightSegments: 16,
					materialType: 'MeshPhongMaterial',
					materialOptions: {
						color: this.randomColor(),
						specular: 0xb4b4b4b4,
						shininess: 2,
						reflectivity: 2
					}

				}
			},
			behaviors: {
				moveTo: {
					rate: 1,
					time: 30000
				}
			}

		}
		return settings
	},
	randomColor: function () {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = (Math.floor(Math.random() * (max - min + 1)) + min);
    return r + g + b;
  },
}
