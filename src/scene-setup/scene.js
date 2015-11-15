Four.Setup.prototype.Scene = function (preset) {
	if(!preset) preset = {}
	var defaults = new Four.Preset('defaults').scene
	Four.Preset.update(preset, defaults)

	var scene;  // Physics will be set on next line
	if(preset.physics) {
		scene = new Physijs.Scene()
		scene.physics = true

	}
	else scene = new THREE.Scene(preset)

	//Set's whether or not the scene has fog
	if(preset.fog.inScene) {
		var color = preset.fog.color;
		var near = preset.fog.near;
		var far = preset.fog.far;
		scene.fog = new THREE.Fog( color, near, far )
	}
  return scene
}
