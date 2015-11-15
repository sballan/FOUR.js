Four.Mesh.Sphere = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.sphere

  var radius = preset.radius
  var widthSegments = preset.widthSegments
  var heightSegments = preset.heightSegments

  preset.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  Four.Mesh.call(this, preset)

  Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype)
  Four.Mesh.Circle.constructor = Four.Mesh.Sphere
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Sphere.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Sphere.constructor = Four.Mesh.Sphere
