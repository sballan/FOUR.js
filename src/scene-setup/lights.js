Four.Setup.prototype.Lights = function (preset) {
	if(!preset) preset = {}
	var defaults = new Four.Preset('defaults').lights
	Four.Preset.update(preset, defaults)

  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;
  //var color = preset.color;

  var light = new THREE.PointLight();
	Four.Behavior.Apply(light)


  light.position.set(positionX, positionY, positionZ)

  return [light]
}
