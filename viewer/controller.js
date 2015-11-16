var arrangement = new Four.Arrangement()

function demo01() {
  var b1 = new Four.Mesh.Box().addToScene()
}

// demo01()

function demo02() {
  //var preset = new Four.Preset('defaults')
  settings = {
    materialType: 'MeshPhongMaterial',
    materialOptions: {
      color: 0xA2222A,
      shininess: 10,
      reflectivity: 70
    }
  }
  var s1 = new Four.Mesh.Sphere(settings)
  var s2 = s1.clone()
  s2.position.x += 10

  arrangement.addToScene([s1, s2])
}

demo02()


function demo10() {


  var b1 = new Four.Mesh.Box()
  .addToScene(b1)

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



  window.addEventListener('mousemove', function(e) {
    var data = {
      x: e.clientX / 10,
      y: 50 + e.clientY / 10 * -1,
      z: 0
    }
    b1.makePositionContinously(data, function(d) {
      d.x -= 30
    })
  })

  // b1.makePositionFromData(p)


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
