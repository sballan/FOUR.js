// Make a new Preset,
var preset = new Four.Preset()

var arrangement = new Four.Arrangement(preset);
var camera = arrangement.camera
var light = arrangement.lights[0]

light.makeBehaviorAndAdd('moveBackAndForth', {x:50, y:-30, z: -80}, 2)

var box = new Four.Mesh.Box()
box.position.x -= 70
arrangement.addToScene(box)

var counter = -50

var d = new Four.Mesh.Box()
arrangement.addToScene(d)

var group = box.createSetCircle(20, 30, function(mesh) {
  // mesh.material = Four.Preset.makeMaterial()
  //
  // mesh.makeBehaviorAndAdd('flipFlop', {x:5}, 1)
  // mesh.pipe()
  //
  // mesh.makeBehaviorAndAdd('moveBackAndForth', {x:counter+=5, y:5, z: 30}, 2)
  //
  // mesh.pipe()
})

// group.makeBehaviorAndAdd('moveTo', {x:10, y:10, z: 10})
// group.pipe()

// camera.makeBehaviorAndAdd('moveBackAndForth', {x: 40, y:20, z:-100}, 3)

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
