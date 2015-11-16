Four.Mesh.prototype.addToScene = function() {
  var self = this
  Four.current().addToScene(self)
}

// createSet is a generic function that will create a a number of clones of the mesh that calls it, and pass them into a callback.
Four.Mesh.prototype.createSet = function(number, cb) {
  var self = this;

  for(var i = 0; i < number; i++) {
    var mesh = self.clone()
    cb(mesh)
  }
}

// createSetRow will create a number of clones of a given mesh, and place them in the scene at intervals determined by the spacing. spacing is a Vector3, and so has x, y, and z fields.
Four.Mesh.prototype.createSetRow = function(number, spacing, cb) {
  var self = this;
  var save = self.position
  var scene = Four.current().scene;
  var group = new Four.Object3D()
  group.add(self)

  var p = self.position
  spacing = new THREE.Vector3(spacing.x || 0, spacing.y || 0, spacing.z || 0)

  function createRow(mesh) {
    p.add(spacing)
    mesh.position.set(p.x, p.y, p.z)
    group.add(mesh)
    //mesh.material.color.setHex(Four.Preset.randomColor())
    if(typeof cb === 'function') cb(mesh)
  }

  self.createSet(number, createRow)

  scene.add(group)

  self.position.set(save.x, save.y, save.z)
  return group
}

// Be aware that this function will hide the original object
Four.Mesh.prototype.createSetCircle = function(number, radius, cb) {
  var self = this;
  self.visible = false
  var scene = Four.current().scene;
  var group = new Four.Object3D()
  group.add(self)

  var angleSize = Math.PI * 2 / number
  var angle = angleSize
  var center = self.position.clone().sub({x: -radius, y: 0, z:0})

  function createCircle(mesh, p) {
    var x = center.x + (radius * Math.cos(angle))
    var y = center.y + (radius * Math.sin(angle))

    mesh.position.setX(x)
    mesh.position.setY(y)
    group.add(mesh)

    angle += angleSize

    if(typeof cb === 'function') cb(mesh)
  }

  self.createSet(number, createCircle)

  scene.add(group)

  return group
}


Four.Mesh.prototype.clone = function() {
  // if(!preset) preset = {}
  // var defaults = new Four.Preset('defaults').mesh
  // Four.Preset.update(preset, defaults)

  var self = this
  var preset = {}
  preset.geometry = self.geometry
  preset.material = self.material

  return new self.constructor(preset)
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
