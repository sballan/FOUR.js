Four.Setup.prototype.Lights = function (preset) {
  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;
  var color = preset.color;

  var light = new THREE.PointLight();
  debugger

  light.position.x = positionX;
  light.position.y = positionY;
  light.position.z = positionZ;

  return [light]
}