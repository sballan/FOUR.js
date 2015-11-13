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
		if(!preset.physics) s = new THREE.Mesh(geometry, material)
			else s = new Physijs.SphereMesh(geometry, material)

		s.position.set(x, y, z)

		// ---- Enable tweening ----
		s.tweens = []

		// Creates a new tween based on the based in string, and returns it
		s.makeBehavior = function(tweenString) {
			var self = this
			var args = Array.prototype.slice.call(arguments, 1)
			var tween = Four.Behavior[tweenString].apply(self, args)
			this.tweens.push(tween);
			return tween;
		}

		// Adds a tween to this mesh's tweens array
		s.addBehavior = function(tween) {
			s.tweens.push(tween)
			return this
		}

		// Creates a new tween and immediately adds it to this mesh's tweens array
		s.makeBehaviorAndAdd = function(tweenString) {
			var tween = this.makeBehavior.apply(this, arguments)
			this.addBehavior(tween);
			return this
		}

		// Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.
		s.pipe= function(index) {
			index = index || 0
			Four.arrangements[index].pipeline.pushTweens(this.tweens)
			s.removeBehaviors()
			return s;
		}

		// Removes all tweens from this mesh
		s.removeBehaviors = function() {
			s.tweens = []
		}

		return s
}
