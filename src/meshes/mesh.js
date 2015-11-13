//Class method to make a new mesh
Four.Mesh.make = function(string, preset) {
  if(!preset) preset = new Four.Preset('defaults').mesh;

  // makeNewMesh will became a function that returns a mesh of the type specified in the 'string' parameter
  var makeNewMesh = Four.Mesh[string];

  // type will become the presets that should be passed to this new mesh
  var type = preset[string];


  return new makeNewMesh(type);
}

Four.Mesh.Sphere = function(preset) {
  preset = preset || new Four.Preset('defaults').mesh.sphere
  Four.Mesh.call(this, preset)
}

// Setup the prototype and constructor for purposes of inheritance
Four.Mesh.Sphere.prototype = Object.create(Four.Mesh.prototype)
Four.Mesh.Sphere.constructor = Four.Mesh.Sphere

// Creates a new tween based on the based in string, and returns it
Four.Mesh.prototype.makeBehavior = function(tweenString) {

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var tween = Four.Behavior[tweenString].apply(self, args)
  this.tweens.push(tween);
  return tween;
}

// Adds a tween to this mesh's tweens array
Four.Mesh.prototype.addBehavior = function(tween) {
  this.tweens.push(tween)
  return this
}

// Creates a new tween and immediately adds it to this mesh's tweens array
Four.Mesh.prototype.makeBehaviorAndAdd = function(tweenString) {
  
  var tween = this.makeBehavior.apply(this, arguments)
  this.addBehavior(tween);
  return this
}

// Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.  Defaults to pipe to arrangement at index 0, which will almost always be the arrangement you want to add to (and the only one there is).
Four.Mesh.prototype.pipe= function(index) {
  index = index || 0
  var timeline = new TimelineMax()

  timeline.insertMultiple(this.tweens)

  Four.arrangements[index].pipeline.pushTimeline(timeline)
  this.removeBehaviors()
  return this;
}

// Removes all tweens from this mesh
Four.Mesh.prototype.removeBehaviors = function() {
  this.tweens = []
}



//TODO This function currently not used.  Is meant to be a helper function for meshes to let them take a variable number of arguments.
Four.Mesh.prototype.processArgs = function() {
	if(arguments.length === 3 &&
			typeof arguments[0] === 'number' &&
			typeof arguments[1] === 'number' &&
			typeof arguments[2] === 'number' ) {
		var point = THREE.Vector3(arguments[0], arguments[1], arguments[2])
		return point
	}
	else return false;

}
