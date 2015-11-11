Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function(preset) {
    var setup = new Four.Setup()
    this.scene = setup.Scene(preset.scene)
    this.camera = setup.Camera(preset.camera)
    this.renderer = setup.Renderer(preset.renderer)
    this.lights = setup.Lights(preset.lights)
    this.addToScene(this.lights[0])

    this.debug(preset.debugMode)

    var self = this
    //This is a private render function.
    //TODO decide if this should be private
    var render = function() {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera);
      self.update()
    }
    render()
  },
  debug: function(preset) {
    //If the preset value is value, do not use debug mode.
    console.log(preset)
    if(!preset) return

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

