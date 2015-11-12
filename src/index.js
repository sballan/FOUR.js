var Four = {};


Four.Setup = function (options) {

	this.domSelector = "#webGL-container";
Four.Preset
}

Four.Arrangement = function(preset) {
	if(!preset) preset = new Four.Preset('defaults')
	this.debugMode = true;

	this.scene = null;
	this.camera = null;
	this.renderer = null;
	this.lights = [];

	this.updates = [];

	//Call the init function when this is instantiated
	this.init(preset)
}

Four.Preset = function(options) {
	// options will be a string that will determine which preset is returned.
	if(!options) options = 'defaults';

	return this[options]()
}

Four.Help = function(arrangement) {
	var self = this
	function response(question) {
		var arrangement = arrangement;
		if(!self.__proto__.hasOwnProperty(question) || !question) {
				self.generic()
				// console.log(self.__proto__.hasOwnProperty('help'))
		} else {
			self[question]()
		}
	}
	return response
}

// Four.Behavior = function() {
//
// }
