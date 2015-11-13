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

var sphere2 = new Four.Mesh.make('sphere');
sphere2.position.set(10, 2, 4);

sphere.makeBehaviorAndAdd('moveTo', sphere2.position);
sphere.makeBehaviorAndAdd('moveTo', sphere.position)
sphere.pipe()

var pos1 = {}

var b1 = sphere.makeBehavior('moveTo', {x:5, y:15, z:3});
var b2 = sphere.makeBehavior('moveTo', {x:6, y:4, z:-4});



sphere.addBehavior(b1)
  .addBehavior(b2)
  .pipe()




// Place the new sphere object in the arrangement's scene
arrangement.addToScene(sphere)
arrangement.addToScene(sphere2)
arrangement.start()
