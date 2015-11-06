var Four = {};
Four.Arrangement = function() {
  this.debugMode = false;

  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.lights = [];


  //Call the init function when this is instantiated
  this.init()
}

Four.Arrangement.prototype = {
  init: function(options) {
    var setup = new Four.Setup()
    this.scene = setup.Scene()
    this.camera = setup.Camera()
    this.renderer = setup.Renderer()
    this.lights.push(setup.Lights())

    //Reads the flag for debug mode
    if(this.debugMode) this.debug()
  },
  debug: function() {
    var axis = new THREE.AxisHelper(10);
    scene.add(axis)

    var grid = new THREE.GridHelper(50, 5);
    grid.setColors("rgb(255,0,0)", 0x222222);
    scene.add(grid);
  },
  addToScene: function(mesh) {
  this.scene.add(mesh)
}



}


