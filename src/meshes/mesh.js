Four.Mesh = {
  make:function(string, preset) {
    if(!preset) preset = new Four.Preset('defaults').mesh;

    // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
    var makeNewMesh = Four.Mesh[string];

    // type will become the presets that should be passed to this new mesh
    var type = preset[string];


    return makeNewMesh(type);
  },
  //TODO This function currently not used.  Is meant to be a helper function for meshes to let them take a variable number of arguments.
  processArgs: function() {
  	if(arguments.length === 3 &&
  			typeof arguments[0] === 'number' &&
  			typeof arguments[1] === 'number' &&
  			typeof arguments[2] === 'number' ) {
  		var point = THREE.Vector3(arguments[0], arguments[1], arguments[2])
  		return point
  	}
  	else return false;

  }


}
