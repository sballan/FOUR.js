Four.Mesh.Circle = function(preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.circle
	Four.Preset.update(preset, defaults)

  var radius = preset.radius
  var segments = preset.segments

  preset.geometry = new THREE.CircleGeometry(radius, segments)
  Four.Mesh.call(this, preset)
  this.prototype = Object.create(Four.Mesh.prototype)
  this.constructor = Four.Mesh.Circle
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Circle.constructor = Four.Mesh.Circle
