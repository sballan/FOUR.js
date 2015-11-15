// Make a new Preset,
var preset = new Four.Preset()

var arrangement = new Four.Arrangement(preset);
var camera = arrangement.camera
var light = arrangement.lights[0]

var setup = new Four.Setup()

var b1 = new Four.Mesh.Box()
arrangement.addToScene(b1)

var counter = 1
var p = [
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
  {x:counter += 4, y:2, z: 5},
]

// b1.makeBehaviorAndAdd('moveBackAndForth', {x: -100, y:0, z: 0}, 3, 2).pipe()
// b1.makeBehaviorAndAdd('flipFlop', {y:2}, 2)
// b1.pipe()

b1.makePositionFromData(p)


// Place the new sphere object in the arrangement's scene
arrangement.start()



/*
preset.mesh.box.height = 0.5
preset.mesh.box.width = 8
preset.mesh.box.depth = 8



var box = new Four.Mesh.Box()

box.position.setZ(-80)
box.position.setX(-80)
var counter = 1
var cb = function(mesh) {
  mesh.material = Four.Preset.makeMaterial()
  mesh.makeBehaviorAndAdd('flipFlop', {x: counter += 0.1}, 3)
  mesh.pipe()
}

for(var i = 0; i < 16; i++) {
  box.position.setX(-80)
  box.position.z+=10
  box.createSet(16, {x:10, y:0, z: 0}, cb)
}
*/
