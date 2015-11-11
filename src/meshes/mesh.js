Four.Mesh = function () {
  this.init()
}

Four.Mesh.prototype = {
  init: function() {

  },
  make:function(string, preset) {
    if(!preset) preset = Four.Presets.default.mesh;

    var makeNewMesh = this[string];
    var type = preset[string];

    return makeNewMesh(type);
  }

}
