//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.
Four.Preset.prototype.init = function() {
	Four.Preset.data.currentDefaults = Four.Preset.data.defaults
}

Four.Preset.prototype.defaults = function() {
		return Four.Preset.data.currentDefaults;
}

Four.Preset.update = function(preset, defaults) {
	if(!preset) {
		preset = defaults;
		return;
	}
	else {
		recurse(preset, defaults)
	}

	function recurse(preset, defaults) {
		if(!preset) return
		for(var d in defaults) {
			if(preset.hasOwnProperty(d)) {
				recurse(preset[d], defaults[d])
			} else {
				preset[d] = defaults[d]
			}
		}
	}
}

Four.Preset.changeDefaults = function(preset) {
	Four.Preset.data.currentDefaults = preset
}

Four.Preset.resetDefaults = function(preset) {
	Four.Preset.data.currentDefaults = Four.Preset.data.defaults
}

Four.Preset.makeMaterial = function() {
	return new THREE.MeshPhongMaterial({
		color: Four.Preset.randomColor(),
		specular: 0xb4b4b4b4,
		shininess: 2,
		reflectivity: 1
	})
}

Four.Preset.randomColor = function () {
  var min = 64;
  var max = 224;
  var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
  var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
  var b = (Math.floor(Math.random() * (max - min + 1)) + min);
  return r + g + b;
}
