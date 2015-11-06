var arrangement = new Four.Arrangement();
var meshMaker = new Four.Mesh()

var sphere = meshMaker.sphere()

arrangement.addToScene(sphere)

var scene = arrangement.scene
var camera = arrangement.camera
var renderer = arrangement.renderer

//Setup Orbit Controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
//controls.update();

camera.lookAt(scene.position);

//var Pos = s.position
function update() {

}


function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera);
  //update()
}

render()
