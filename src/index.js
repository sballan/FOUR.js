var Four = {};


Four.Setup = function (options) {

	this.domSelector = "#webGL-container";

}

Four.Arrangement = function(preset) {
	if(!preset) preset = new Four.Presets('defaults')
	this.debugMode = true;

	this.scene = null;
	this.camera = null;
	this.renderer = null;
	this.lights = [];

	//Call the init function when this is instantiated
	this.init(preset)
}

Four.Presets = function(options) {
	if(!options) options = 'defaults';

	return this[options]()
}

Four.Help = function() {
	var self = this
	function response(question) {
		if(!self.__proto__.hasOwnProperty(question) || !question) {
				self.generic()
				// console.log(self.__proto__.hasOwnProperty('help'))
		} else {
			self[question]()
		}
	}
	return response
}