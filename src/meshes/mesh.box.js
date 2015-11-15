Four.Mesh.Box = function(preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').mesh.box
	Four.Preset.update(preset, defaults)

  var width = preset.width
  var height = preset.height
  var depth = preset.depth

  preset.geometry = new THREE.BoxGeometry(width, height, depth)

  if(preset.physics) {
    var materialType = preset.materialType
    var materialOptions = preset.materialOptions
    preset.material = new THREE[materialType](materialOptions)
    Physijs.BoxMesh.call(this, preset.geometry, preset.material)
    Four.Behavior.Apply(this)
  }else {
    Four.Mesh.call(this, preset)
  }
    this.prototype = Object.create(Four.Mesh.prototype)
    this.constructor = Four.Mesh.Box


}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Box.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Box.constructor = Four.Mesh.Box
