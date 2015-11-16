'use strict';

var Four = {};

Four.arrangements = [];

Four.addArrangement = function (arrangement, setDefault) {
  if (setDefault) this.currentArrangement = arrangement;

  this.arrangements.push(arrangement);
};

Four.currentArrangement = {};

Four.current = function () {
  return this.currentArrangement;
};

Four.Setup = function (options) {
  this.domSelector = "#webGL-container";
};

Four.Mesh = function (preset) {
  // FIXME We don't update the preset in the same way here; it was causing errors.  This should be fixed
  if (!preset) preset = new Four.Preset('defaults').mesh;

  var geometry = preset.geometry;
  var material;
  if (!preset.material) {
    var materialType = preset.materialType;
    var materialOptions = preset.materialOptions;
    material = new THREE[materialType](materialOptions);
  } else {
    material = preset.material;
  }

  // Superclass depends on whether or not physics is enabled
  if (preset.physics) Physijs.Mesh.call(this, geometry, material);else THREE.Mesh.call(this, geometry, material);

  // By adding behaviors this way, we can get the effects of modifying the underlying Object3D object without doing a lot of extra work.
  Four.Behavior.Apply(this);
  this.physics = !!preset.physics;

  this.prototype = Object.create(THREE.Mesh.prototype);
  this.constructor = Four.Mesh;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.prototype = Object.create(THREE.Mesh.prototype);
Four.Mesh.constructor = Four.Mesh;

Four.Object3D = function () {
  THREE.Object3D.call(this);
  Four.Behavior.Apply(this);
};

Four.Object3D.prototype = Object.create(THREE.Object3D.prototype);
Four.Object3D.constructor = Four.Object3D;

Four.Arrangement = function (preset) {
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults');
  Four.Preset.update(preset, defaults);

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
  this.init();
  // options will be a string that will determine which preset is returned.
  if (!options) options = 'defaults';

  return this[options]();
};

Four.Behavior = {};

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

Four.Preset.data = {
  currentDefaults: {},
  defaults: {
    debugMode: true,
    controls: {
      OrbitControls: true,
      lookAtScene: true,
      lookAtSceneContinously: false,
      resize: true,
      mouse: false
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
      position: {
        x: 20,
        y: 20,
        z: 50
      },
      color: 0xFFFFFF
    },
    camera: {
      angle: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 500,
      positionX: 100,
      positionY: 10,
      positionZ: 100
    },
    scene: {
      physics: false,
      fog: {
        inScene: true,
        color: 0x222222,
        near: 50,
        far: 400
      }
    },
    mesh: {
      geometry: new THREE.SphereGeometry(5, 16, 16),
      materialType: 'MeshPhongMaterial',
      materialOptions: {
        color: 0x556677,
        specular: 0xb4b4b4b4,
        shininess: 2,
        reflectivity: 2
      },
      physics: false,
      sphere: {
        physics: false,
        x: 0,
        y: 0,
        z: 0,
        radius: 5,
        widthSegments: 16,
        heightSegments: 16,
        geometry: new THREE.SphereGeometry(5, 16, 16),
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }

      },
      box: {
        height: 5,
        width: 5,
        depth: 5,
        geometry: new THREE.BoxGeometry(10, 10, 10),
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        },
        physics: false
      },
      circle: {
        radius: 5,
        segments: 32,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      cylinder: {
        radiusTop: 5,
        radiusBottom: 5,
        height: 20,
        radiusSegments: 32,
        heightSegments: 1,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      ring: {
        innerRadius: 3,
        outerRadius: 5,
        thetaSegments: 32,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      torus: {
        radius: 3,
        tube: 1,
        radialSegments: 10,
        tubularSegments: 50,
        arc: Math.PI * 2,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      torusKnot: {
        radius: 10,
        tube: 3,
        radialSegments: 30,
        tubularSegments: 50,
        p: 2,
        q: 3,
        heightScale: 1,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      }
    },
    behaviors: {
      moveTo: {
        time: 2
      },
      moveFrom: {
        target: { x: -4, y: -5, z: 3 },
        time: 2
      },
      moveBackAndForth: {
        time: 2
      }
    }
  }

};

Four.Preset.prototype.simplePhysics = function () {
  var settings = new Four.Preset('defaults');

  settings.scene.physics = true;
  settings.mesh.sphere.physics = true;

  return settings;
};

Four.Mesh.Box = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.box;
  Four.Preset.update(preset, defaults);

  var width = preset.width;
  var height = preset.height;
  var depth = preset.depth;

  preset.geometry = new THREE.BoxGeometry(width, height, depth);

  if (preset.physics) {
    var materialType = preset.materialType;
    var materialOptions = preset.materialOptions;
    preset.material = new THREE[materialType](materialOptions);
    Physijs.BoxMesh.call(this, preset.geometry, preset.material);
    Four.Behavior.Apply(this);
  } else {
    Four.Mesh.call(this, preset);
    self.prototype = Object.create(Four.Mesh.prototype);
    self.prototype.constructor = Four.Mesh.Box;
  }
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Box.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Box.constructor = Four.Mesh.Box;

Four.Mesh.Circle = function (preset) {
  var self = this;

  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.circle;
  Four.Preset.update(preset, defaults);

  var radius = preset.radius;
  var segments = preset.segments;

  preset.geometry = new THREE.CircleGeometry(radius, segments);
  Four.Mesh.call(this, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.constructor = Four.Mesh.Circle;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Circle.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Circle.constructor = Four.Mesh.Circle;

Four.Mesh.Cylinder = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.cylinder;
  Four.Preset.update(preset, defaults);

  var radiusTop = preset.radiusTop;
  var radiusBottom = preset.radiusBottom;
  var height = preset.height;
  var radiusSegments = preset.radiusSegments;
  var heightSegments = preset.heightSegments;

  preset.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments);
  Four.Mesh.call(self, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.Cylinder;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Cylinder.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Cylinder.constructor = Four.Mesh.Cylinder;

Four.Mesh.prototype.addToScene = function () {
  var self = this;
  Four.current().addToScene(self);
  return self;
};

// createSet is a generic function that will create a a number of clones of the mesh that calls it, and pass them into a callback.
Four.Mesh.prototype.createSet = function (number, cb) {
  var self = this;

  for (var i = 0; i < number; i++) {
    var mesh = self.clone();
    cb(mesh);
  }
};

// createSetRow will create a number of clones of a given mesh, and place them in the scene at intervals determined by the spacing. spacing is a Vector3, and so has x, y, and z fields.
Four.Mesh.prototype.createSetRow = function (number, spacing, cb) {
  var self = this;
  var save = self.position;
  var scene = Four.current().scene;
  var group = new Four.Object3D();
  group.add(self);

  var p = self.position;
  spacing = new THREE.Vector3(spacing.x || 0, spacing.y || 0, spacing.z || 0);

  function createRow(mesh) {
    p.add(spacing);
    mesh.position.set(p.x, p.y, p.z);
    group.add(mesh);
    //mesh.material.color.setHex(Four.Preset.randomColor())
    if (typeof cb === 'function') cb(mesh);
  }

  self.createSet(number, createRow);

  scene.add(group);

  self.position.set(save.x, save.y, save.z);
  return group;
};

// Be aware that this function will hide the original object
Four.Mesh.prototype.createSetCircle = function (number, radius, cb) {
  var self = this;
  self.visible = false;
  var scene = Four.current().scene;
  var group = new Four.Object3D();
  group.add(self);

  var angleSize = Math.PI * 2 / number;
  var angle = angleSize;
  var center = self.position.clone().sub({ x: -radius, y: 0, z: 0 });

  function createCircle(mesh, p) {
    var x = center.x + radius * Math.cos(angle);
    var y = center.y + radius * Math.sin(angle);

    mesh.position.setX(x);
    mesh.position.setY(y);
    group.add(mesh);

    angle += angleSize;

    if (typeof cb === 'function') cb(mesh);
  }

  self.createSet(number, createCircle);

  scene.add(group);

  return group;
};

Four.Mesh.prototype.clone = function () {
  // if(!preset) preset = {}
  // var defaults = new Four.Preset('defaults').mesh
  // Four.Preset.update(preset, defaults)

  var self = this;
  var preset = {};
  preset.geometry = self.geometry;
  preset.material = self.material;

  return new self.constructor(preset);
};

//TODO This function currently not used.  Is meant to be a helper function for meshes to let them take a variable number of arguments.
Four.Mesh.prototype.processArgs = function () {
  if (arguments.length === 3 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && typeof arguments[2] === 'number') {
    var point = THREE.Vector3(arguments[0], arguments[1], arguments[2]);
    return point;
  } else return false;
};

Four.Mesh.Ring = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.ring;
  Four.Preset.update(preset, defaults);

  var innerRadius = preset.innerRadius;
  var outerRadius = preset.outerRadius;
  var thetaSegments = preset.thetaSegments;

  preset.geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
  Four.Mesh.call(this, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.Ring;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Ring.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Ring.constructor = Four.Mesh.Ring;

Four.Mesh.Sphere = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.sphere;
  Four.Preset.update(preset, defaults);

  var radius = preset.radius;
  var widthSegments = preset.widthSegments;
  var heightSegments = preset.heightSegments;

  preset.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  Four.Mesh.call(self, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.Sphere;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Sphere.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Sphere.constructor = Four.Mesh.Sphere;
Four.Mesh.Sphere.prototype.constructor = Four.Mesh.Sphere;

Four.Mesh.Torus = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.torus;
  Four.Preset.update(preset, defaults);

  var radius = preset.radius;
  var tube = preset.tube;
  var radialSegments = preset.radialSegments;
  var tubularSegments = preset.tubularSegments;
  var arc = preset.arc;

  preset.geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
  Four.Mesh.call(self, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.Torus;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Torus.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.Torus.constructor = Four.Mesh.Torus;

Four.Mesh.TorusKnot = function (preset) {
  var self = this;
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').mesh.torusKnot;
  Four.Preset.update(preset, defaults);

  var radius = preset.radius;
  var tube = preset.tube;
  var radialSegments = preset.radialSegments;
  var tubularSegments = preset.tubularSegments;
  var p = preset.p;
  var q = preset.q;
  var heightScale = preset.heightScale;

  preset.geometry = new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale);
  Four.Mesh.call(this, preset);

  self.prototype = Object.create(Four.Mesh.prototype);
  self.prototype.constructor = Four.Mesh.TorusKnot;
};

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.TorusKnot.prototype = Object.create(Four.Mesh.prototype);
Four.Mesh.TorusKnot.constructor = Four.Mesh.TorusKnot;

Four.Arrangement.prototype = {
  //The Arrangement is initialized using preset settings.  A Preset object is used to set these values.
  init: function init(preset) {
    var self = this;

    // Add arrangement to the Four object, and set it to the default
    Four.addArrangement(self, true);

    //Setup a pipeline for this Arrangement
    this.pipeline = new Four.Pipeline();

    var setup = new Four.Setup();

    this.scene = setup.Scene(preset.scene);
    this.camera = setup.Camera(preset.camera);
    this.renderer = setup.Renderer(preset.renderer);
    this.lights = setup.Lights(preset.lights);
    this.addToScene(this.lights[0]);

    this.updates = preset.updates;

    // Make camera point at the scene, no matter where it is.
    if (preset.controls.lookAtScene) {
      this.camera.lookAt(this.scene.position);
    }

    // Set auto-resize for when the user changes the window's size
    if (preset.controls.resize) {
      //Set the proper context
      var resize = self.resize.bind(self);
      window.addEventListener("resize", resize);
    }
    // Turn on debug mode if the preset says to.
    this.debug(preset.debugMode);

    //Bind context to avoid confusion/errors with Orbit Controls
    var update = self.update.bind(self);

    // Make Camera look at scene continuously
    if (preset.controls.lookAtSceneContinously) {
      self.updates.push(function () {
        self.camera.lookAt(self.scene.position);
      });
    }

    //Sets up Orbit Controls
    if (preset.controls.OrbitControls) {
      var controls = new THREE.OrbitControls(self.camera, self.renderer.domElement);
      controls.addEventListener('change', update);
      controls.update();
    }

    // This is the internal render function.  Additional functions can be called from the public update funciton.
    var render = function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
      update();
      if (self.scene.physics) {
        self.scene.traverse(function (obj) {
          obj.__dirtyPosition = true;
        });
        self.scene.simulate();
      }
    };

    TweenMax.ticker.addEventListener("tick", update);
    //TimelineMax.ticker.addEventListener("tick", update)
    render();
  },
  // Whatever function is passed in here is called every time the scene updates.
  update: function update() {
    var self = this;
    self.updates.forEach(function (func) {
      if (typeof func === 'function') func();else func.func();

      if (self.scene.physics) {
        self.scene.traverse(function (obj) {
          obj.__dirtyPosition = true;
        });
        self.scene.simulate();
      }
    });
  },
  addToUpdate: function addToUpdate(func) {
    this.updates.push(func);
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
    var self = this;
    if (mesh.constructor === Array) {
      mesh.forEach(function (o) {
        self.scene.add(o);
      });
    } else {
      self.scene.add(mesh);
    }
  },
  resize: function resize() {
    var self = this;
    var width = window.innerWidth;
    var height = window.innerHeight;
    self.camera.aspect = width / height;
    self.camera.updateProjectionMatrix();
    self.renderer.setSize(width, height);
  },
  start: function start() {
    this.pipeline.start();
  },
  addListener: function addListener(event, func, context) {
    if (!context) context = this;

    window.addEventListener(event, func);
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
    this.masterTimeline = new TimelineMax({ paused: true });
  },
  pushBehavior: function pushBehavior(tweens) {
    var self = this;
    self.masterTimeline.add(tweens, 0);
  },
  pushTimeline: function pushTimeline(timeline) {
    var self = this;
    self.masterTimeline.add(timeline, 0);
  },
  start: function start() {
    this.masterTimeline.play();
  }

};

//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.
Four.Preset.prototype.init = function () {
  Four.Preset.data.currentDefaults = Four.Preset.data.defaults;
};

Four.Preset.prototype.defaults = function () {
  return Four.Preset.data.currentDefaults;
};

Four.Preset.update = function (preset, defaults) {
  if (!preset) {
    for (var elem in defaults) preset[elem] = defaults[elem];
    return;
  } else {
    for (var prop in preset) {
      if (!defaults.hasOwnProperty(prop)) {
        debugger;
        console.error("Improper Preset object used.");
      }
    }
    recurse(preset, defaults);
  }

  function recurse(preset, defaults) {
    if (!preset) return;
    for (var d in defaults) {
      if (preset.hasOwnProperty(d)) {
        // We use setTimeout here to avoid overflowing the stack
        setTimeout(function () {
          recurse(preset[d], defaults[d]);
        }, 0);
      } else {
        preset[d] = defaults[d];
      }
    }
  }
};

Four.Preset.changeDefaults = function (preset) {
  Four.Preset.update(preset, Four.Preset.data.currentDefaults);
  Four.Preset.data.currentDefaults = preset;
};

Four.Preset.resetDefaults = function (preset) {
  Four.Preset.data.currentDefaults = Four.Preset.data.defaults;
};

Four.Preset.makeMaterial = function () {
  return new THREE.MeshLambertMaterial({
    color: Four.Preset.randomColor(),
    // specular: 0xb4b4b4b4,
    // shininess: 2,
    reflectivity: 10
  });
};

Four.Preset.randomColor = function () {
  var min = 64;
  var max = 224;
  var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
  var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
  var b = Math.floor(Math.random() * (max - min + 1)) + min;
  return r + g + b;
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

var p = {};
Four.Behavior.behaviors = {
  flipFlop: function flipFlop(amount, time, repeat) {
    repeat = repeat || -1;
    amount.repeat = repeat;
    amount.yoyo = true;
    amount.delay = 0;
    amount.ease = Power2.easeInOut;
    var tween = TweenMax.to(this.rotation, time, amount);
    return tween;
  },
  moveTo: function moveTo(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo;
    //Give time a fallback value
    time = time || preset.time;

    target = Four.Behavior.toPoints(target);

    var tween = TweenMax.to(this.position, time, target);
    return tween;
  },
  moveBackAndForth: function moveBackAndForth(target, time, repeat) {
    var preset = new Four.Preset('defaults').behaviors.moveBackAndForth;
    //Give time a fallback value
    time = time || preset.time;
    repeat = repeat || -1;
    target = Four.Behavior.toPoints(target);
    target.repeat = repeat;
    target.yoyo = true;

    var tween = TweenMax.to(this.position, time, target);

    return tween;
  },
  moveFrom: function moveFrom(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveFrom;
    //Give time a fallback value
    time = time || preset.time;
    target = target || preset.target;

    var tween = TweenMax.from(this.position, time, target);
    return tween;
  },
  data: function data(_data, options) {}

};

Four.Behavior.toPoints = function (v) {
  return {
    x: v.x,
    y: v.y,
    z: v.z
  };
};

Four.Behavior.Apply = function (mesh) {
  var handlers = Four.Behavior.Handler;

  for (var handler in handlers) {
    mesh[handler] = handlers[handler];
    mesh.tweens = [];
  }
};

Four.Behavior.Handler = {
  // Creates a new tween based on the based in string, and returns it
  makeBehavior: function makeBehavior(tweenString) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var tween = Four.Behavior.behaviors[tweenString].apply(self, args);
    this.tweens.push(tween);
    return tween;
  },

  // Adds a tween to this mesh's tweens array
  addBehavior: function addBehavior(tween) {
    var self = this;
    if (tween.constructor === Array) {
      tween.forEach(function (t) {
        self.tweens.push(t);
      });
    } else {
      self.tweens.push(tween);
    }
    return self;
  },

  // Creates a new tween and immediately adds it to this mesh's tweens array
  makeBehaviorAndAdd: function makeBehaviorAndAdd() {
    var tween = this.makeBehavior.apply(this, arguments);
    this.addBehavior(tween);
    return this;
  },
  // TODO Now only supports 60fps, should use realtime framerate
  makePositionContinously: function makePositionContinously(data, func) {
    var self = this;
    var fps = 1 / 60;

    var copy = {
      x: data.x || 0,
      y: data.y || 0,
      z: data.z || 0
    };

    if (typeof func === 'function') func(copy);
    // We need to bypass the usual pipeline for this to work.
    // var tween = TweenMax.to(self.position, fps, data)

    // self.addBehavior(tween)
    // self.pipe()
    // self.__dirtyPosition = true
    self.position.set(copy.x, copy.y, copy.z);
  },
  makeRotationContinously: function makeRotationContinously(data, func) {
    var self = this;
    var fps = 1 / 60;

    var copy = {
      x: data.x || 0,
      y: data.y || 0,
      z: data.z || 0
    };

    if (typeof func === 'function') func(copy);

    self.rotation.set(copy.x, copy.y, copy.z);
  },
  // TODO Now only supports 60fps, should use realtime framerate
  makePositionFromData: function makePositionFromData(data, options) {
    var self = this;
    var fps = 1 / 60;
    //Make Async?
    setTimeout(function () {
      console.log("in set timeout");
      data.forEach(function (p) {
        console.log("data = ", p);
        var tween = TweenMax.to(self.position, fps, p);
        self.addBehavior(tween);
      });
      self.pipe();
    }, 0);
  },

  // Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.  Defaults to pipe to arrangement at index 0, which will almost always be the arrangement you want to add to (and the only one there is).
  pipe: function pipe() {
    var self = this;
    var timeline = new TimelineMax();

    self.tweens.forEach(function (tween) {
      timeline.add(tween);
    });

    Four.current().pipeline.pushTimeline(timeline);
    self.removeBehaviors();
    return self;
  },

  // Removes all tweens from this mesh
  removeBehaviors: function removeBehaviors() {
    this.tweens = [];
  },

  physicsOn: function physicsOn() {
    this.physics = true;
  },

  physicsOff: function physicsOff() {
    this.physics = false;
  }

};

Four.Setup.prototype.Camera = function (preset) {
  if (!preset) preset = {};
  if (!preset) preset = new Four.Preset('defaults').camera;
  var defaults = new Four.Preset('defaults').camera;

  Four.Preset.update(preset, defaults);
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

  Four.Behavior.Apply(camera);

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
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').lights;
  Four.Preset.update(preset, defaults);

  var x = preset.position.x;
  var y = preset.position.y;
  var z = preset.position.z;
  //var color = preset.color;

  var light = new THREE.PointLight();
  Four.Behavior.Apply(light);

  light.position.set(x, y, z);

  return [light];
};

Four.Setup.prototype.Renderer = function (preset) {
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').renderer;
  Four.Preset.update(preset, defaults);

  var clearColor = preset.clearColor;
  var shadowMap = preset.shadowMap;
  var shadowMapSoft = preset.shadowMapSoft;
  var antialias = preset.antialias;

  var renderer = new THREE.WebGLRenderer({
    antialias: antialias
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
  if (!preset) preset = {};
  var defaults = new Four.Preset('defaults').scene;
  Four.Preset.update(preset, defaults);

  var scene; // Physics will be set on next line
  if (preset.physics) {
    scene = new Physijs.Scene();
    scene.physics = true;
  } else scene = new THREE.Scene(preset);

  //Set's whether or not the scene has fog
  if (preset.fog.inScene) {
    var color = preset.fog.color;
    var near = preset.fog.near;
    var far = preset.fog.far;
    scene.fog = new THREE.Fog(color, near, far);
  }
  return scene;
};