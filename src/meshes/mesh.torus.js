Four.Mesh.Torus = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.torus

  var radius = preset.radius
  var tube = preset.tube
  var radialSegments = preset.radialSegments
  var tubularSegments = preset.tubularSegments
  var arc = preset.arc

  preset.geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
  Four.Mesh.call(this, preset)
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Torus.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Torus.constructor = Four.Mesh.Torus
