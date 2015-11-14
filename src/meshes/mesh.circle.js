Four.Mesh.Circle = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.circle

  var radius = preset.radius
  var segments = preset.segments

  preset.geometry = new THREE.CircleGeometry(radius, segments)
  Four.Mesh.call(this, preset)
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Circle.constructor = Four.Mesh.Circle
