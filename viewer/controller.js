// Make a new Preset,
var preset = new Four.Preset()
preset.scene.physics = true;
preset.mesh.sphere.physics = true;

var helper = new Four.Help()

var arrangement = new Four.Arrangement(preset);

var scene = arrangement.scene
var camera = arrangement.camera
var renderer = arrangement.renderer

var sphere = new Four.Mesh.make('sphere')

arrangement.addToScene(sphere)

//Setup Orbit Controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', arrangement.update );
controls.update();

camera.lookAt(scene.position);
