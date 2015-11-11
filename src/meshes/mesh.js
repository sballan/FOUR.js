Four.Mesh = {
  init: function() {

  },
  make:function(string, preset) {
    if(!preset) preset = Four.Presets.prototype.defaults().mesh;


    console.log(Four)
    var makeNewMesh = Four.Mesh[string];
    var type = preset[string];
    console.log('makeNewMesh', makeNewMesh)
    console.log("type", type);
    return makeNewMesh(type);
  }

}
