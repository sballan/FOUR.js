Four.Mesh = {
  make:function(string, preset) {
    if(!preset) preset = Four.Presets.prototype.defaults().mesh;

    // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
    var makeNewMesh = Four.Mesh[string];

    // type will become the presets that should be passed to this new mesh
    var type = preset[string];


    return makeNewMesh(type);
  }

}
