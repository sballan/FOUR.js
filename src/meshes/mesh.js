//Class method to make a new mesh
Four.Mesh.make = function(string, preset) {
  if(!preset) preset = new Four.Preset('defaults').mesh;

  // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
  var makeNewMesh = Four.Mesh[string];

  // type will become the presets that should be passed to this new mesh
  var type = preset[string];

  return new makeNewMesh(type);
}

// createSet will create a number of clones of a given mesh, and place them in the scene at intervals determined by the targetSpacing. TargetSpacing is a Vector3, and so has x, y, and z fields.
Four.Mesh.prototype.createSet = function(number, spacing, cb) {
  var self = this;
  var scene = Four.arrangements[0].scene;
  var meshes = []

  var p = self.position
  var pSave = self.position
  spacing = new THREE.Vector3(spacing.x, spacing.y, spacing.z)

  for(var i = 0; i < number; i++) {
    var mesh = this.clone()
    mesh.position.set(p.x, p.y, p.z)
    mesh.position.add(spacing)
    scene.add(mesh)
    meshes.push(mesh)
    p.add(spacing)
    
    if(cb) cb(mesh)
  }
  self.position.set(pSave.x, pSave.y, pSave.z)
  return meshes
}

Four.Mesh.prototype.clone = function() {
  var preset = new Four.Preset('defaults').mesh
  preset.geometry = this.geometry
  preset.material = this.material

  return new Four.Mesh.constructor(preset)
}



//TODO This function currently not used.  Is meant to be a helper function for meshes to let them take a variable number of arguments.
Four.Mesh.prototype.processArgs = function() {
	if(arguments.length === 3 &&
			typeof arguments[0] === 'number' &&
			typeof arguments[1] === 'number' &&
			typeof arguments[2] === 'number' ) {
		var point = THREE.Vector3(arguments[0], arguments[1], arguments[2])
		return point
	}
	else return false;

}
