'use strict';

var Four = {};

Four.Setup = function (options) {

  this.domSelector = "#webGL-container";
};

Four.Arrangement = function (preset) {
  if (!preset) preset = new Four.Presets('defaults');
  this.debugMode = true;

  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.lights = [];

  //Call the init function when this is instantiated
  this.init(preset);
};

Four.Presets = function (options) {
  if (!options) options = 'defaults';

  return this[options]();
};

Four.Help = function () {
  var self = this;
  function response(question) {
    if (!self.__proto__.hasOwnProperty(question) || !question) {
      self.generic();
      // console.log(self.__proto__.hasOwnProperty('help'))
    } else {
        self[question]();
      }
  }
  return response;
};

Four.Mesh = {
  make: function make(string, preset) {
    if (!preset) preset = Four.Presets.prototype.defaults().mesh;

    // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
    var makeNewMesh = Four.Mesh[string];

    // type will become the presets that should be passed to this new mesh
    var type = preset[string];

    return makeNewMesh(type);
  }

};

Four.Mesh.sphere = function (preset) {
  if (!preset) preset = Four.Presets.prototype.defaults.mesh.sphere;
  var x = preset.x,
      y = preset.y,
      z = preset.z,
      radius = preset.radius,
      widthSegments = preset.widthSegments,
      heightSegments = preset.heightSegments,
      materialType = preset.materialType,
      materialOptions = preset.materialOptions;

  var center = new THREE.Vector3(x, y, z);

  var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  var material = new THREE[materialType](materialOptions);

  // New mesh may be physics enabled or not physics enabled
  var s;
  if (preset.physics) s = new THREE.Mesh(geometry, material);else s = new Physijs.SphereMesh(geometry, material);

  s.position.set(x, y, z);

  return s;
};
Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function init(preset) {
    if (!preset) preset = Four.Presets.prototype.defaults();
    var setup = new Four.Setup();

    this.scene = setup.Scene(preset.scene);
    this.camera = setup.Camera(preset.camera);
    this.renderer = setup.Renderer(preset.renderer);
    this.lights = setup.Lights(preset.lights);
    this.addToScene(this.lights[0]);

    this.debug(preset.debugMode);

    var self = this;
    //This is a private render function.
    //TODO decide if this should be private
    var render = function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
      self.update();
    };
    render();
  },
  debug: function debug(preset) {
    if (preset === undefined) {
      preset = Four.Presets.prototype.defaults().debugMode;
    }

    //If the preset value is false, do not use debug mode.
    if (!preset) return;

    var axis = new THREE.AxisHelper(10);
    this.scene.add(axis);

    var grid = new THREE.GridHelper(50, 5);
    grid.setColors("rgb(255,0,0)", 0x222222);
    this.scene.add(grid);
  },
  addToScene: function addToScene(mesh) {
    this.scene.add(mesh);
  },
  // Whatever function is passed in here is called every time the scene updates.
  update: function update(func) {
    if (typeof func === 'function') func();
  }

};

//I think it would be cool to write a function that can act as a reference for the developer.  As I imagine it, during the development the developer puts a Four.Help function in global scope, and can then pass different strings to it to find out different things about the particular scene being worked on or the frameworks in general.

Four.Help.prototype = {
  generic: function generic() {
    var s = "I'm sorry, but the query you have entered does not seem to be valid.  Try 'help' for details.";

    console.log(s);
  },
  help: function help() {
    var s = "Here are the currently supported queries:\n\n";
    for (var prop in this.__proto__) {
      if (prop === 'generic') continue;
      s += prop + "\n";
    }
    console.log(s);
  },
  scene: function scene() {
    var s = 'The children in this scene are: ';
    s += Four.Arrangement.scene;
    console.log(s);
  }

};

//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.

Four.Presets.prototype = {
  defaults: function defaults() {
    var settings = {
      debugMode: true,
      renderer: {
        clearColor: 0x555555,
        shadowMap: true,
        shadowMapSoft: true,
        antialias: true
      },
      lights: {
        positionX: 100,
        positionY: -20,
        positionZ: -30,
        color: 0xFFFFFF
      },
      camera: {
        angle: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 500,
        positionX: 0,
        positionY: 0,
        positionZ: 80
      },
      scene: {
        physics: false
      },
      mesh: {
        sphere: {
          physics: false,
          x: 0,
          y: 0,
          z: 0,
          radius: 5,
          widthSegments: 16,
          heightSegments: 16,
          materialType: 'MeshPhongMaterial',
          materialOptions: {
            color: this.randomColor(),
            specular: 0xb4b4b4b4,
            shininess: 2,
            reflectivity: 2
          }

        }
      }

    };
    return settings;
  },
  randomColor: function randomColor() {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = Math.floor(Math.random() * (max - min + 1)) + min;
    return r + g + b;
  }
};
Four.Setup.prototype.Camera = function (preset) {
  var angle = preset.angle;
  var aspect = preset.aspect;
  var near = preset.near;
  var far = preset.far;
  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;

  var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);

  //Sets the camera to any position passed in the options
  camera.position.set(positionX, positionY, positionZ);

  return camera;
};
Four.Setup.prototype.GUI = function (options) {
  var guiControls = new function () {
    //this.rotationX = 0.01;
    //this.rotationY = 0.1;
    //this.rotationZ = 0.01;
  }();

  var datGUI = new dat.GUI();
  //The values can now be between 0 and 1 for all these
  // datGUI.add(guiControls, 'rotationX', 0, 1)
  //datGUI.add(guiControls, 'rotationY', 0, 1)
  // datGUI.add(guiControls, 'rotationZ', 0, 1)

  //$(domSelector).append(viz.scene.renderer.domElement);

  return guiControls;
};
Four.Setup.prototype.Lights = function (preset) {
  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;
  var color = preset.color;

  var light = new THREE.PointLight();

  light.position.set(positionX, positionY, positionZ);

  return [light];
};
Four.Setup.prototype.Renderer = function (preset) {
  var clearColor = preset.clearColor;
  var shadowMap = preset.shadowMap;
  var shadowMapSoft = preset.shadowMapSoft;
  var antialias = preset.antialias;

  var renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setClearColor(clearColor);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = shadowMap;
  renderer.shadowMapSoft = shadowMapSoft;

  var selector = document.querySelector(this.domSelector);
  selector.appendChild(renderer.domElement);

  return renderer;
};
Four.Setup.prototype.Scene = function (preset) {
  var scene;

  if (preset.physics) scene = new Physijs.Scene();else scene = new THREE.Scene();

  return scene;
};