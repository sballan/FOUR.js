Four.Mesh.Sphere = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.sphere
  Four.Mesh.call(this, preset)
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Sphere.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Sphere.constructor = Four.Mesh.Sphere

//Class method to make a new mesh
Four.Mesh.make = function(string, preset) {
  if(!preset) preset = new Four.Preset('defaults').mesh;

  // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
  var makeNewMesh = Four.Mesh[string];

  // type will become the presets that should be passed to this new mesh
  var type = preset[string];


  return new makeNewMesh(type);
}

Four.Mesh.prototype.createSet = function(number, targetSpacing) {
  var self = this;
  var scene = Four.arrangements[0].scene;
  var meshes = []

  targetSpacing = new THREE.Vector3(targetSpacing.x, targetSpacing.y, targetSpacing.z)

  var spacing = targetSpacing;
  for(var i = 0; i < number; i++) {
    var mesh = this.clone()
    mesh.position.add(spacing)
    scene.add(mesh)
    meshes.push(mesh)
    console.log(spacing)
    spacing.add(targetSpacing)
  }
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
