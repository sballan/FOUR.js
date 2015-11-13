'use strict';

var Four = {};

Four.arrangements = [];

Four.addArrangement = function (arrangement) {
  this.arrangements.push(arrangement);
};

Four.Setup = function (options) {

  this.domSelector = "#webGL-container";
};

Four.Arrangement = function (preset) {
  if (!preset) preset = new Four.Preset('defaults');
  this.debugMode = true;

  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.lights = [];

  this.updates = [];

  //Call the init function when this is instantiated
  this.init(preset);
};

Four.Preset = function (options) {
  // options will be a string that will determine which preset is returned.
  if (!options) options = 'defaults';

  return this[options]();
};

Four.Pipeline = function () {
  this.TweenPipeline = [];
  this.BasicPipeline = [];
  this.masterTimeline = null;

  this.init();
};

Four.Help = function (arrangement) {
  var self = this;
  function response(question) {
    var arrangement = arrangement;
    if (!self.__proto__.hasOwnProperty(question) || !question) {
      self.generic();
      // console.log(self.__proto__.hasOwnProperty('help'))
    } else {
        self[question]();
      }
  }
  return response;
};

var p = {};
Four.Behavior = {
  moveTo: function moveTo(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo;
    //Give time a fallback value
    time = time || preset.time;

    target = Four.Behavior.toPoints(target);

    var tween = TweenMax.to(this.position, time, target);
    return tween;
  },
  moveFrom: function moveFrom(time, target) {
    var preset = new Four.Preset('defaults').behaviors.moveFrom;
    //Give time a fallback value
    time = time || preset.time;
    target = target || preset.target;

    var tween = TweenMax.from(this.position, time, target);
    return tween;
  },
  toPoints: function toPoints(v) {
    return {
      x: v.x,
      y: v.y,
      z: v.z,
      paused: true
    };
  }

};

Four.Mesh = {
  make: function make(string, preset) {
    if (!preset) preset = new Four.Preset('defaults').mesh;

    // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
    var makeNewMesh = Four.Mesh[string];

    // type will become the presets that should be passed to this new mesh
    var type = preset[string];

    return makeNewMesh(type);
  },
  //TODO This function currently not used.  Is meant to be a helper function for meshes to let them take a variable number of arguments.
  processArgs: function processArgs() {
    if (arguments.length === 3 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && typeof arguments[2] === 'number') {
      var point = THREE.Vector3(arguments[0], arguments[1], arguments[2]);
      return point;
    } else return false;
  }

};

Four.Mesh.sphere = function (preset) {
  if (!preset) preset = new Four.Preset('defaults').mesh.sphere;
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

  // Enable tweening
  s.timeline = new TimelineMax();
  s.tweens = [];

  s.makeBehavior = function (tweenString) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var tween = Four.Behavior[tweenString].apply(self, args);
    this.tweens.push(tween);
    return tween;
  };

  s.makeBehaviorAndAdd = function (tweenString) {
    var tween = this.makeBehavior.apply(this, arguments);
    this.tweens.push(tween);
    return tween;
  };

  s.addToTimeline = function (tween) {
    s.timeline.add(tween);
    return s;
  };

  s.pipe = function (index) {
    index = index || 0;
    Four.arrangements[index].pipeline.pushTweens(this.tweens);
    return s;
  };

  s.destroyTimeline = function () {
    s.timeline = new TimelineMax();
  };

  return s;
};

Four.Preset.prototype.simplePhysics = function () {
  var settings = new Four.Preset('defaults');

  settings.scene.physics = true;
  settings.mesh.sphere.physics = true;

  return settings;
};

Four.Setup.prototype.Camera = function (preset) {
  if (!preset) preset = new Four.Preset('defaults').camera;
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
  if (!preset) preset = new Four.Preset('defaults').lights;

  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;
  var color = preset.color;

  var light = new THREE.PointLight();

  light.position.set(positionX, positionY, positionZ);

  return [light];
};

Four.Setup.prototype.Renderer = function (preset) {
  if (!preset) preset = new Four.Preset('defaults').renderer;

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
  if (!preset) preset = new Four.Preset('defaults').scene;

  var scene; // Physics will be set on next line
  if (preset.physics) scene = new Physijs.Scene();else scene = new THREE.Scene();

  return scene;
};

Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function init(preset) {
    var self = this;
    var setup = new Four.Setup();

    this.scene = setup.Scene(preset.scene);
    this.camera = setup.Camera(preset.camera);
    this.renderer = setup.Renderer(preset.renderer);
    this.lights = setup.Lights(preset.lights);
    this.addToScene(this.lights[0]);

    //Setup a pipeline for this Arrangement
    this.pipeline = new Four.Pipeline();

    this.updates = preset.updates;

    // Make camera point at the scene, no matter where it is.
    if (preset.controls.lookAtScene) {
      this.camera.lookAt(this.scene.position);
    }
    // Turn on debug mode if the preset says to.
    this.debug(preset.debugMode);

    //Bind context to avoid confusion/errors with Orbit Controls
    var update = self.update.bind(self);

    //Sets up Orbit Controls
    if (preset.controls.OrbitControls) {
      var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      controls.addEventListener('change', update);
      controls.update();
    }

    // This is the internal render function.  Additional functions can be called from the public update funciton.
    var render = function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
      update();
    };

    TweenMax.ticker.addEventListener("tick", update);
    //TimelineMax.ticker.addEventListener("tick", update)
    render();

    // Add arrangement to the Four object
    Four.addArrangement(self);
  },
  // Whatever function is passed in here is called every time the scene updates.
  update: function update() {
    this.updates.forEach(function (update) {
      update.func();
    });
  },
  debug: function debug(preset) {
    if (preset === undefined) {
      preset = new Four.Preset('defaults').debugMode;
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
  start: function start() {
    this.pipeline.start();
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
    console.log(s);
    console.log(arrangement.scene);
  }

};

Four.Pipeline.prototype = {
  init: function init() {
    this.masterTimeline = new TimelineMax();
    this.masterTimeline.pause();
  },
  pushTimeline: function pushTimeline(timeline) {
    console.log("timeline", timeline);
    this.TweenPipeline.push(timeline);
    timeline.resume();
    console.log("timeline pipline", this.TweenPipeline);
  },
  pushTweens: function pushTweens(tweens) {
    var self = this;
    console.log("the tweens", tweens);
    tweens.forEach(function (tween) {
      tween.resume();
      self.masterTimeline.add(tween);
    });
  },
  pipe: function pipe() {
    var self = this;
    self.TweenPipeline.forEach(function (timeline) {
      self.masterTimeline.add(timeline);
      console.log("mytimeplien", timeline);
      timeline.resume();
    });
  },
  start: function start() {
    this.pipe();
    this.masterTimeline.play();
  }

};

//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.

Four.Preset.prototype = {
  defaults: function defaults() {
    var settings = {
      debugMode: true,
      controls: {
        OrbitControls: true,
        lookAtScene: true
      },
      renderer: {
        clearColor: 0x999999,
        shadowMap: true,
        shadowMapSoft: true,
        antialias: true
      },
      updates: [{ func: function func() {}
      }],
      lights: {
        positionX: 50,
        positionY: -20,
        positionZ: 50,
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
      },
      behaviors: {
        moveTo: {
          rate: 1,
          time: 2
        },
        moveFrom: {
          target: { x: -4, y: -5, z: 3 },
          time: 2
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

Four.Utils = {
  // Vectors
  toPoints: function toPoints(v) {
    return {
      x: v.x,
      y: v.y,
      z: v.z
    };
  }

};