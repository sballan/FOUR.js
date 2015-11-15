// Make a new Preset,
var preset = new Four.Preset()

var arrangement = new Four.Arrangement(preset);
var camera = arrangement.camera
var light = arrangement.lights[0]

var setup = new Four.Setup()

var b1 = new Four.Mesh.Torus()
arrangement.addToScene(b1)

var g1 = b1.createSetRow(8, {x:10})
var g2 = b1.createSetRow(8, {y:10})
var g3 = b1.createSetRow(8, {x:-10})
var g4 = b1.createSetRow(8, {y:-10})

// g2.position.x += 10
// g4.position.x += 12
// g3.position.y += 10

arrangement.addToScene(g1)
arrangement.addToScene(g2)
arrangement.addToScene(g3)
arrangement.addToScene(g4)

var group = new Four.Object3D();
group.add(g1)
group.add(g2)
group.add(g3)
group.add(g4)

g1.makeBehaviorAndAdd('flipFlop', {y:2}, 2)
g1.pipe()
g1.children.forEach(function(obj) {
  obj.makeBehaviorAndAdd('flipFlop', {x:4}, 1)
  obj.pipe()
  obj.material = Four.Preset.makeMaterial()
})

arrangement.addToScene(group)

group.makeBehaviorAndAdd('moveBackAndForth', {x: -200, y:0, z: 0}, 3)
group.pipe()

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
