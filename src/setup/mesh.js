Four.Mesh = function () {
  this.init()
}

Four.Mesh.prototype = {
  init: function() {

  },
  randomColor: function () {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = (Math.floor(Math.random() * (max - min + 1)) + min);
    return r + g + b;
  },
  sphere: function (options) {
    if(!options) options = {};
    var x = options.x || 0,
      y = options.y || 0,
      z = options.z || 0,
      radius = options.radius || 5,
      widthSegments = options.widthSegments || 16,
      heightSegments = options.heightSegments || 16,
      materialType = options.materialType || 'MeshPhongMaterial'
    var materialOptions = options.materialOptions || {
      color: this.randomColor(),
      //ambient: 0x2d2d2d2d,
      specular: 0xb4b4b4b4,
      shininess: 2,
      reflectivity: 2
    }

    var center = new THREE.Vector3(x, y, z)

    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

    var material = new THREE[materialType](materialOptions)

    var s = new THREE.Mesh(geometry, material)
    s.position.set(x, y, z)

    return s
  }
}
