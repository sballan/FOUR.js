Four.Mesh.sphere = function(preset) {
		if(!preset) preset = Four.Presets.prototype.defaults.mesh.sphere
		var x = preset.x,
			y = preset.y,
			z = preset.z,
			radius = preset.radius,
			widthSegments = preset.widthSegments,
			heightSegments = preset.heightSegments,
			materialType = preset.materialType,
			materialOptions = preset.materialOptions

		var center = new THREE.Vector3(x, y, z)

		var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
		var material = new THREE[materialType](materialOptions)


		// New mesh may be physics enabled or not physics enabled
		var s;
		if(preset.physics) s = new THREE.Mesh(geometry, material)
			else s = new Physijs.SphereMesh(geometry, material)

		s.position.set(x, y, z)

		return s
}