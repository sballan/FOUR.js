Four.Mesh.Sphere = function(preset) {
  var self = this
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.sphere
	Four.Preset.update(preset, defaults)

  var radius = preset.radius
  var widthSegments = preset.widthSegments
  var heightSegments = preset.heightSegments

  preset.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  Four.Mesh.call(self, preset)

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.Sphere;
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Sphere.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Sphere.constructor = Four.Mesh.Sphere
Four.Mesh.Sphere.prototype.constructor = Four.Mesh.Sphere
