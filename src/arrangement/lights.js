Four.Setup.prototype.Lights = function (preset) {
  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;
  var color = preset.color;

  var light = new THREE.PointLight();


  light.position.set(positionX, positionY, positionZ)

  return [light]
}