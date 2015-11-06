Four.Setup = function () {
  this.domSelector = "#webGL-container";

}

Four.Setup.prototype = {
  Scene: function (options) {
    var scene = new THREE.Scene()

    return scene
  },
  Camera: function (options) {
    options = options || {
      angle: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000,
      positionX: 0,
      positionY: 0,
      positionZ: 80
    }

    var camera = new THREE.PerspectiveCamera(options.angle, options.aspect, options.near, options.far);

    //Sets the camera to any position passed in the options
    camera.position.x = options.positionX;
    camera.position.y = options.positionY;
    camera.position.z = options.positionZ;

    return camera
  },
  Renderer: function (options) {
    var o = options || {
      clearColor: 0x050505,
      shadowMap: true,
      shadowMapSoft: true
    }
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setClearColor(o.clearColor);
    renderer.setSize(window.innerWidth, window.innerHeight - 110)
    renderer.shadowMap.enabled = o.shadowMap;
    renderer.shadowMapSoft = o.shadowMapSoft;

    //$(domSelector).append(renderer.domElement);
    var selector = document.querySelector(this.domSelector);
    selector.appendChild(renderer.domElement)

    return renderer;
  },
  Lights: function (options) {
    var o = options || {
      positionX: 100,
      positionY: -20,
      positionZ: -30
    }

    var light = new THREE.PointLight(0xFFFFFF);

    light.position.x = o.positionX;
    light.position.y = o.positionY;
    light.position.z = o.positionZ;

    return light
  },
  GUI: function (options) {
    var guiControls = new function () {
      //this.rotationX = 0.01;
      //this.rotationY = 0.1;
      //this.rotationZ = 0.01;
    }

    var datGUI = new dat.GUI();
    //The values can now be between 0 and 1 for all these
    // datGUI.add(guiControls, 'rotationX', 0, 1)
    //datGUI.add(guiControls, 'rotationY', 0, 1)
    // datGUI.add(guiControls, 'rotationZ', 0, 1)

    //$(domSelector).append(viz.scene.renderer.domElement);

    return guiControls;
  }


}
