Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function(preset) {
    var self = this

    // Add arrangement to the Four object
    Four.addArrangement(self)

    //Setup a pipeline for this Arrangement
    this.pipeline = new Four.Pipeline();

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

    // Set auto-resize for when the user changes the window's size
    if(preset.controls.resize) {
      //Set the proper context
      var resize = self.resize.bind(self)
      window.addEventListener("resize", resize);
    }
    // Turn on debug mode if the preset says to.
    this.debug(preset.debugMode)

    //Bind context to avoid confusion/errors with Orbit Controls
    var update = self.update.bind(self)

    // Make Camera look at scene continuously
    if(preset.controls.lookAtSceneContinously) {
      self.updates.push(function(){
        self.camera.lookAt(self.scene.position)
      })
    }

    //Sets up Orbit Controls
    if (preset.controls.OrbitControls) {
       var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      controls.addEventListener( 'change', update );
      controls.update()
    }

    // This is the internal render function.  Additional functions can be called from the public update funciton.
    var render = function() {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera);
      update()
    }

    TweenMax.ticker.addEventListener("tick", update)
    //TimelineMax.ticker.addEventListener("tick", update)
    render()


  },
  // Whatever function is passed in here is called every time the scene updates.
  update: function() {
    this.updates.forEach(function(func) {
      if(typeof func ==='function') func()
      else func.func()
    })

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
  },
  resize: function() {
    var self = this
    var width = window.innerWidth;
    var height = window.innerHeight;
    self.camera.aspect = width / height;
    self.camera.updateProjectionMatrix();
    self.renderer.setSize(width, height)
  },
  start: function() {
    this.pipeline.start()
  }



}
