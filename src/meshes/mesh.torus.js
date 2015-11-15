Four.Mesh.Torus = function(preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.torus
	Four.Preset.update(preset, defaults)

  var radius = preset.radius
  var tube = preset.tube
  var radialSegments = preset.radialSegments
  var tubularSegments = preset.tubularSegments
  var arc = preset.arc

  preset.geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
  Four.Mesh.call(this, preset)

  Four.Mesh.Torus.prototype = Object.create(Four.Mesh.prototype)
  Four.Mesh.Torus.prototype.constructor = Four.Mesh.Torus
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Torus.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Torus.constructor = Four.Mesh.Torus
