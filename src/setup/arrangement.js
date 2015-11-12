Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function(preset) {
    var setup = new Four.Setup()

    this.scene = setup.Scene(preset.scene)
    this.camera = setup.Camera(preset.camera)
    this.renderer = setup.Renderer(preset.renderer)
    this.lights = setup.Lights(preset.lights)
    this.addToScene(this.lights[0])

    this.updates = preset.updates


    // Make camera point at the scene, no matter where it is.
    if(preset.controls.lookAtScene) {
      this.camera.lookAt(this.scene.position);
    }

    // Turn on debug mode if the preset says to.
    this.debug(preset.debugMode)

    //Sets up Orbit Controls
    if(preset.controls.OrbitControls) {
      var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      controls.addEventListener( 'change', this.update );
      controls.update();
    }

    // This is the internal render function.  Additional functions can be called from the public update funciton.
    var self = this
    var render = function() {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera);
      self.update(preset.render.update)
    }
    render()

  },
  // Whatever function is passed in here is called every time the scene updates.
  update: function(func) {
    if(typeof func === 'function') func()
    // this.updates.forEach(function(update) {
    //   update()
    // })

    for(var update in this.updates) {
      this.updates[update]()
    }


  },
  debug: function(preset) {
    if(preset === undefined) {
      preset = new Four.Preset('defaults').debugMode
    }

    //If the preset value is false, do not use debug mode.
    if(!preset) return

    var axis = new THREE.AxisHelper(10);
    this.scene.add(axis)

    var grid = new THREE.GridHelper(50, 5);
    grid.setColors("rgb(255,0,0)", 0x222222);
    this.scene.add(grid);
  },
  addToScene: function(mesh) {
    this.scene.add(mesh)
  }



}
