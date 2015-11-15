Four.Mesh.Box = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.box

  var width = preset.width
  var height = preset.height
  var depth = preset.depth

  preset.geometry = new THREE.BoxGeometry(width, height, depth)
  Four.Mesh.call(this, preset)

  this.prototype = Object.create(Four.Mesh.prototype)
  this.constructor = Four.Mesh.Box

}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Box.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Box.constructor = Four.Mesh.Box
