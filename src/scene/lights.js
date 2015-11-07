Four.Setup.prototype.Lights = function (options) {
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
}