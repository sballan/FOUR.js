"use strict";

var Four = {};
Four.Arrangement = function () {
  this.debugMode = false;

  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.lights = [];

  //Call the init function when this is instantiated
  this.init();
};

Four.Arrangement.prototype = {
  init: function init(options) {
    var setup = new Four.Setup();
    this.scene = setup.Scene();
    this.camera = setup.Camera();
    this.renderer = setup.Renderer();
    this.lights.push(setup.Lights());

    //Reads the flag for debug mode
    if (this.debugMode) this.debug();
  },
  debug: function debug() {
    var axis = new THREE.AxisHelper(10);
    scene.add(axis);

    var grid = new THREE.GridHelper(50, 5);
    grid.setColors("rgb(255,0,0)", 0x222222);
    scene.add(grid);
  },
  addToScene: function addToScene(mesh) {
    this.scene.add(mesh);
  }

};

Four.Mesh = function () {
  this.init();
};

Four.Mesh.prototype = {
  init: function init() {},
  randomColor: function randomColor() {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = Math.floor(Math.random() * (max - min + 1)) + min;
    return r + g + b;
  },
  sphere: function sphere(params) {
    if (!params) params = {};
    var x = params.x || 0,
        y = params.y || 0,
        z = params.z || 0,
        radius = params.radius || 5,
        widthSegments = params.widthSegments || 16,
        heightSegments = params.heightSegments || 16,
        materialType = params.materialType || 'MeshPhongMaterial';
    var materialParams = params.materialParams || {
      color: this.randomColor(),
      //ambient: 0x2d2d2d2d,
      specular: 0xb4b4b4b4,
      shininess: 2,
      reflectivity: 2
    };

    var center = new THREE.Vector3(x, y, z);

    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    var material = new THREE[materialType](materialParams);

    var s = new THREE.Mesh(geometry, material);
    s.position.set(x, y, z);

    return s;
  }
};

Four.Setup = function () {
  this.domSelector = "#webGL-container";
};

Four.Setup.prototype = {
  Scene: function Scene(options) {
    var scene = new THREE.Scene();

    return scene;
  },
  Camera: function Camera(options) {
    options = options || {
      angle: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000,
      positionX: 0,
      positionY: 0,
      positionZ: 80
    };

    var camera = new THREE.PerspectiveCamera(options.angle, options.aspect, options.near, options.far);

    //Sets the camera to any position passed in the options
    camera.position.x = options.positionX;
    camera.position.y = options.positionY;
    camera.position.z = options.positionZ;

    return camera;
  },
  Renderer: function Renderer(options) {
    var o = options || {
      clearColor: 0x050505,
      shadowMap: true,
      shadowMapSoft: true
    };
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor(o.clearColor);
    renderer.setSize(window.innerWidth, window.innerHeight - 110);
    renderer.shadowMap.enabled = o.shadowMap;
    renderer.shadowMapSoft = o.shadowMapSoft;

    //$(domSelector).append(renderer.domElement);
    var selector = document.querySelector(this.domSelector);
    selector.appendChild(renderer.domElement);

    return renderer;
  },
  Lights: function Lights(options) {
    var o = options || {
      positionX: 100,
      positionY: -20,
      positionZ: -30
    };

    var light = new THREE.PointLight(0xFFFFFF);

    light.position.x = o.positionX;
    light.position.y = o.positionY;
    light.position.z = o.positionZ;

    return light;
  },
  GUI: function GUI(options) {
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
  }

};