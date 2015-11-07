Four.Arrangement = function() {
  this.debugMode = true;

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

    this.addToScene(this.lights[0])

    //Reads the flag for debug mode
    if(this.debugMode) this.debug()

    var self = this
    var render = function() {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera);
      self.update()
    }
    render()
  },
  debug: function(options) {
    if(options) this.debugMode = true
      else this.debugMode = false

    var axis = new THREE.AxisHelper(10);
    this.scene.add(axis)

    var grid = new THREE.GridHelper(50, 5);
    grid.setColors("rgb(255,0,0)", 0x222222);
    this.scene.add(grid);
  },
  addToScene: function(mesh) {
    this.scene.add(mesh)
  },
  update: function(func) {
    if(typeof func === 'function') func()
  }



}


