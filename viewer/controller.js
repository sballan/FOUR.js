// Make a new Preset,
var preset = new Four.Preset()
preset.scene.physics = true;
preset.mesh.sphere.physics = true;

// Make a new helper object, which can be queried from the browser console.  This is useful during debugging.
var helper = new Four.Help()

// Make a new arrangement, or "world" in which to create and control objects
var arrangement = new Four.Arrangement(preset);

// Make a new sphere object
var sphere = new Four.Mesh.make('sphere')

var sphere2 = new Four.Mesh.Sphere();
sphere2.position.set(0, 0, 0);

sphere.makeBehaviorAndAdd('moveTo', {x:3,y:6,z:-10})
sphere.pipe()

sphere2.makeBehaviorAndAdd('moveTo', {x:-3,y:6,z:-10})
sphere2.pipe()




// Place the new sphere object in the arrangement's scene
arrangement.addToScene(sphere)
arrangement.addToScene(sphere2)
arrangement.start()
