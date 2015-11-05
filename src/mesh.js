Four.Mesh = function () {



  init()
}

Four.Mesh.prototype = {
  randomColor: function () {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = (Math.floor(Math.random() * (max - min + 1)) + min);
    return r + g + b;
  },
  sphere: function (params) {
    var x = params.x || 0,
      y = params.y || 0,
      z = params.z || 0,
      radius = params.radius || 5,
      widthSegments = params.widthSegments || 16,
      heightSegments = params.heightSegments || 16,
      materialType = params.materialType || 'MeshPhongMaterial'
    materialParams = params.materialParams || {
      color: randomFairColor(),
      //ambient: 0x2d2d2d2d,
      specular: 0xb4b4b4b4,
      shininess: 2,
      reflectivity: 2
    }

    var center = new THREE.Vector(x, y, z)

    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

    var material = new THREE[materialType](materialParams)

    var s = new THREE.Mesh(geometry, material)
    s.position = new THREE.Vector3(x, y, z)

    return s
  }
}
