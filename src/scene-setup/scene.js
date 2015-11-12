Four.Setup.prototype.Scene = function (preset) {
	if(!preset) preset = new Four.Preset('defaults').scene

	var scene;  // Physics will be set on next line
	if(preset.physics) scene = new Physijs.Scene
	else scene = new THREE.Scene()

  return scene
}
