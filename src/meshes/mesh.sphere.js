Four.Mesh.sphere = function(preset) {
		if(!preset) preset = new Four.Preset('defaults').mesh.sphere
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

		// Enable tweening
		s.tweens = []

		s.makeBehavior = function(tweenString) {
			var self = this
			var args = Array.prototype.slice.call(arguments, 1)
			var tween = Four.Behavior[tweenString].apply(self, args)
			this.tweens.push(tween);
			return tween;
		}

		s.makeBehaviorAndAdd = function(tweenString) {
			var tween = this.makeBehavior.apply(this, arguments)
			this.tweens.push(tween);
			return tween
		}

		s.pipe= function(index) {
			index = index || 0
			Four.arrangements[index].pipeline.pushTweens(this.tweens)
			return s;
		}

		s.removeBehaviors = function() {
			s.tweens = []
		}

		return s
}
