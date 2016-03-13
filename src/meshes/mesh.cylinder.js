Four.Mesh.Cylinder = function(preset) {
  var self = this
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.cylinder
	Four.Preset.update(preset, defaults)

  var radiusTop = preset.radiusTop
  var radiusBottom = preset.radiusBottom
  var height = preset.height
  var radiusSegments = preset.radiusSegments
  var heightSegments = preset.heightSegments

  preset.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments)
  Four.Mesh.call(self, preset)

  self.prototype = Object.create(Four.Mesh.prototype)
  self.prototype.constructor = Four.Mesh.Cylinder


}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Cylinder.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Cylinder.constructor = Four.Mesh.Cylinder
