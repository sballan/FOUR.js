Four.Mesh.Cylinder = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.cylinder

  var radiusTop = preset.radiusTop
  var radiusBottom = preset.radiusBottom
  var height = preset.height
  var radiusSegments = preset.radiusSegments
  var heightSegments = preset.heightSegments

  preset.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments)
  Four.Mesh.call(this, preset)
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Cylinder.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Cylinder.constructor = Four.Mesh.Cylinder
