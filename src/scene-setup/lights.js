Four.Setup.prototype.Lights = function (preset) {
	if(!preset) preset = {}
	var defaults = new Four.Preset('defaults').lights
	Four.Preset.update(preset, defaults)

  var x = preset.position.x;
  var y = preset.position.y;
  var z = preset.position.z;
  //var color = preset.color;

  var light = new THREE.PointLight();
	Four.Behavior.Apply(light)


  light.position.set(x, y, z)

  return [light]
}
