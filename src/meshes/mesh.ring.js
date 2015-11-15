Four.Mesh.Ring = function(preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.ring
	Four.Preset.update(preset, defaults)

  var innerRadius = preset.innerRadius
  var outerRadius = preset.outerRadius
  var thetaSegments = preset.thetaSegments

  preset.geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments)
  Four.Mesh.call(this, preset)

  Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype)
  Four.Mesh.Circle.constructor = Four.Mesh.Ring
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Ring.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Ring.constructor = Four.Mesh.Ring
