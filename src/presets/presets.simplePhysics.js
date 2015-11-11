Four.Presets.prototype.simplePhysics = function() {
	var settings = new Four.Presets('defaults')

	settings.scene.physics = true;
	settings.mesh.sphere.physics = true;

	return settings

}