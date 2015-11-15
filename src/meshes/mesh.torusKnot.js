Four.Mesh.TorusKnot = function(preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.torusKnot
	Four.Preset.update(preset, defaults)

  var radius = preset.radius;
  var tube = preset.tube;
  var radialSegments = preset.radialSegments;
  var tubularSegments = preset.tubularSegments;
  var p = preset.p;
  var q = preset.q;
  var heightScale = preset.heightScale;

  preset.geometry = new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
  Four.Mesh.call(this, preset)

  Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype)
  Four.Mesh.Circle.constructor = Four.Mesh.TorusKnot
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.TorusKnot.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.TorusKnot.constructor = Four.Mesh.TorusKnot
