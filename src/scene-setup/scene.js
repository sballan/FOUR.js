Four.Setup.prototype.Scene = function (preset) {
	var scene;

	if(preset.physics) scene = new Physijs.Scene
	else scene = new THREE.Scene()

  return scene
}