// Make a new Preset,
var preset = new Four.Preset()
preset.scene.physics = true;
preset.mesh.sphere.physics = true;

// Make a new helper object, which can be queried from the browser console.  This is useful during debugging.
var helper = new Four.Help()

// Make a new arrangement, or "world" in which to create and control objects
var arrangement = new Four.Arrangement(preset);
var camera = arrangement.camera

var box = new Four.Mesh.Box()
arrangement.addToScene(box)

box.createSetCircle(8, 20)


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
