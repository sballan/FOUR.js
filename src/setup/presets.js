//This function returns a preset object, which is used to create various preset arrangements.  If no preset is specified, the default preset is used to create a new Arrangement.
Four.Preset.prototype.init = function() {
	Four.Preset.data.currentDefaults = Four.Preset.data.defaults
}

Four.Preset.prototype.defaults = function() {
		return Four.Preset.data.currentDefaults;
}

Four.Preset.prototype.changeDefaults = function(preset) {
	Four.Preset.data.currentDefaults = preset
}

Four.Preset.prototype.resetDefaults = function(preset) {
	Four.Preset.data.currentDefaults = Four.Preset.data.defaults
}

Four.Preset.randomColor = function () {
  var min = 64;
  var max = 224;
  var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
  var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
  var b = (Math.floor(Math.random() * (max - min + 1)) + min);
  return r + g + b;
}
