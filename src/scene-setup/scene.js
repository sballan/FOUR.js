Four.Setup.prototype.Scene = function (preset) {
	if(!preset) preset = new Four.Preset('defaults').scene

	var scene;  // Physics will be set on next line
	if(preset.physics) scene = new Physijs.Scene
	else scene = new THREE.Scene()

	//Set's whether or not the scene has fog
	if(preset.fog.inScene) {
		var color = preset.fog.color;
		var near = preset.fog.near;
		var far = preset.fog.far;
		scene.fog = new THREE.Fog( color, near, far )
	}
  return scene
}
