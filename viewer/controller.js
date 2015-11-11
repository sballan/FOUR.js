
var preset = new Four.Presets()
var helper = new Four.Help()

var arrangement = new Four.Arrangement();


var meshMaker = new Four.Mesh.make('sphere')

var scene = arrangement.scene
var camera = arrangement.camera
var renderer = arrangement.renderer

var sphere = meshMaker.sphere()

arrangement.addToScene(sphere)

//Setup Orbit Controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', arrangement.update );
controls.update();

camera.lookAt(scene.position);


arrangement.render()