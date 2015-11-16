var arrangement = new Four.Arrangement()

// demo01()
// demo02()
// demo03()
// demo04()
// demo05()
// demo06()
demo07()

function demo01() {
  //All you need is one line of code to get started
  new Four.Mesh.Sphere().addToScene() //adding can be chained
}

function demo02() {
  var s1 = new Four.Mesh.Box() //All objects are meshes
  arrangement.addToScene(s1) // Arrangements call also add meshes
  s1.position.setX(-100)

  // Make a new behavior for our mesh
  var b = s1.makeBehavior('moveBackAndForth', {x:10,y:10,z:0}, 3)

  // Add this behavior to the mesh's local timeline
  s1.addBehavior(b)

  // Send local timeline to master timeline
  s1.pipe()

  // Make a new behavior and add to local timeline
  s1.makeBehaviorAndAdd('flipFlop', {y:4}, 1)
  s1.pipe()

  // Chain the piping
  s1.makeBehaviorAndAdd('moveBackAndForth', {x:0, y:0, z:0}, 6)
  .pipe()

  // Start master timeline
  arrangement.start()

}

function demo03() {
  var s1 = new Four.Mesh.Box().addToScene()
  s1.position.setX(-100)

  // Create a set of meshes in a row, specified by number and spacing
  g = s1.createSetRow(10, {x:10})

  g.makeBehaviorAndAdd('moveBackAndForth', {x:10,y:10,z:0}, 3)
  g.pipe()

  // Animate the meshes in the group individually
  g.children.forEach(function(m) {
    m.makeBehaviorAndAdd('flipFlop', {y:4}, 1)
    m.makeBehaviorAndAdd('moveBackAndForth', {x:0, y:0, z:0}, 6)
    // Don't pipe to keep on local timeline; animation start immediately
  })
  g.pipe()

  arrangement.start()
}

function demo04() {
  var s1 = new Four.Mesh.Box().addToScene()
  s1.position.setX(-100)

  // Create a set of meshes in a circle, specified by number and radius
  g = s1.createSetCircle(20, 10)

  g.makeBehaviorAndAdd('moveBackAndForth', {x:10,y:10,z:0}, 3)
  g.pipe()

  // Animate the meshes in the group individually with a counter
  var counter = -100
  g.children.forEach(function(m) {
    m.makeBehaviorAndAdd('flipFlop', {y:4}, 1)
    m.makeBehaviorAndAdd('moveBackAndForth', {x:counter+=10, y:10, z:0}, 4)
    // Don't pipe to keep on local timeline; animation start immediately
  })
  g.pipe()

  arrangement.start()
}

function demo05() {
  var s = new Four.Mesh.Sphere().addToScene()

  //Set to random material
  s.material = Four.Preset.makeMaterial()

  //A data set preformatted to coordinates
  var counter = 1
  var data = [
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=1, z: 5},
    {x:counter -= 1, y:counter+=1, z: 5},
    {x:counter -= 1, y:counter+=1, z: 5},
    {x:counter -= 1, y:counter+=0, z: 5},
    {x:counter -= 1, y:counter+=0, z: 5},
    {x:counter -= 1, y:counter+=0, z: 5},
    {x:counter -= 1, y:counter-=0, z: 5},
    {x:counter += 4, y:counter-=0, z: 5},
    {x:counter += 4, y:counter-=0, z: 5},
    {x:counter += 4, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=2, z: 5},
    {x:counter += 2, y:counter-=4, z: 5},
    {x:counter += 4, y:counter-=4, z: 5},
    {x:counter += 4, y:counter-=4, z: 5},
    {x:counter -= 1, y:counter-=4, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5},
    {x:counter -= 1, y:counter+=2, z: 5}

  ]

  s.makePositionFromData(data)

  arrangement.start()
}

function demo06() {
  var b1 = new Four.Mesh.Box()
  .addToScene(b1)

  var b2 = b1.clone()
  b2.addToScene()

  b1.makeBehaviorAndAdd('flipFlop', {y:6}, 3)

  arrangement.addListener('mousemove', function(e) {
    var data = {
      x: e.clientX / 10,
      y: 50 + e.clientY / 10 * -1,
      z: 0
    }

    b1.makePositionContinously(data, function(d) {
      d.x -= 30
    })

    b2.makeRotationContinously(data, function(d) {
      d.y *= -1
    })
  })
}

function demo07 () {
  var t1 = new Four.Mesh.Torus({radius: 3}).addToScene()
  t1.material = Four.Preset.makeMaterial()


  var t2 = new Four.Mesh.Torus({radius: 6}).addToScene()
  t2.material = Four.Preset.makeMaterial()

  var t3 = new Four.Mesh.Torus({radius: 9}).addToScene()
  t3.material = Four.Preset.makeMaterial()

  var t4 = new Four.Mesh.Torus({radius: 12}).addToScene()
  t4.material = Four.Preset.makeMaterial()

  var t5 = new Four.Mesh.Torus({radius: 14}).addToScene()
  t5.material = Four.Preset.makeMaterial()

  var t6 = new Four.Mesh.Torus({radius: 16}).addToScene()
  t6.material = Four.Preset.makeMaterial()

  // t1.makeBehaviorAndAdd('flipFlop', {x:10, y:2}, 5)
  // t2.makeBehaviorAndAdd('flipFlop', {x:-2, y:10}, 5)
  // t3.makeBehaviorAndAdd('flipFlop', {x:14, y:5}, 5)
  // t4.makeBehaviorAndAdd('flipFlop', {x:10, y:2}, 5)
  // t5.makeBehaviorAndAdd('flipFlop', {x:-2, y:10}, 5)
  // t6.makeBehaviorAndAdd('flipFlop', {x:14, y:5}, 5)

  t1.makeBehaviorAndAdd('flipFlop', {x:3, y:2+ 10}, 8)
  t2.makeBehaviorAndAdd('flipFlop', {x:3, y:2+ 8}, 8)
  t3.makeBehaviorAndAdd('flipFlop', {x:3, y:2+ 6}, 8)
  t4.makeBehaviorAndAdd('flipFlop', {x:3, y:2+ 4}, 8)
  t5.makeBehaviorAndAdd('flipFlop', {x:3, y:2+ 3}, 8)
  t6.makeBehaviorAndAdd('flipFlop', {x:3, y:2}, 8)


  arrangement.start()

}

function demo08 () {
  var audiosrc = '/music.m4a'
  var t1 = new Four.Mesh.Torus({radius: 3}).addToScene()
  t1.material = Four.Preset.makeMaterial()


  var t2 = new Four.Mesh.Torus({radius: 7}).addToScene()
  t2.material = Four.Preset.makeMaterial()

  var t3 = new Four.Mesh.Torus({radius: 10}).addToScene()
  t3.material = Four.Preset.makeMaterial()

  t1.makeBehaviorAndAdd('flipFlop', {x:10, y:2}, 5)
  t2.makeBehaviorAndAdd('flipFlop', {x:-2, y:10}, 5)
  t3.makeBehaviorAndAdd('flipFlop', {x:14, y:5}, 5)


  arrangement.start()

}




// Place the new sphere object in the arrangement's scene
// arrangement.start()



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
