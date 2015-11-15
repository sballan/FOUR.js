var Four = {};

Four.arrangements = []

Four.addArrangement = function(arrangement, setDefault) {
	if(setDefault) this.currentArrangement = arrangement

	this.arrangements.push(arrangement)
}

Four.currentArrangement = {}

Four.current = function() {
	return this.currentArrangement
}


Four.Setup = function (options) {
	this.domSelector = "#webGL-container";
}

Four.Mesh = function(preset) {
	preset = preset || new Four.Preset('defaults').mesh

	var geometry = preset.geometry
	var material;
	if(!preset.material) {
		var materialType = preset.materialType
		var materialOptions = preset.materialOptions
		material = new THREE[materialType](materialOptions)
	} else {
		material = preset.material
	}

	THREE.Mesh.call(this, geometry, material)

	// By adding behaviors this way, we can get the effects of modifying the underlying Object3D object without doing a lot of extra work.
	Four.Behavior.Apply(this)
	this.physics = !!preset.physics
}



// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.prototype = Object.create(THREE.Mesh.prototype)
Four.Mesh.constructor = Four.Mesh

Four.Object3D = function() {
	THREE.Object3D.call(this)
	Four.Behavior.Apply(this)
}

Four.Object3D.prototype = Object.create(THREE.Object3D.prototype)
Four.Object3D.constructor = Four.Object3D

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
	this.init()
	// options will be a string that will determine which preset is returned.
	if(!options) options = 'defaults';

	return this[options]()
}

Four.Behavior = {}

Four.Pipeline = function() {
  this.TweenPipeline = [];
	this.BasicPipeline = [];
	this.masterTimeline = null;

	this.init()
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
