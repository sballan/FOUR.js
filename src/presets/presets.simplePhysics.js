Four.Preset.prototype.simplePhysics = function() {
	var settings = new Four.Preset('defaults')

	settings.scene.physics = true;
	settings.mesh.sphere.physics = true;

	return settings

}
