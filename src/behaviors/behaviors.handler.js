Four.Behavior.Handler = {
  // Creates a new tween based on the based in string, and returns it
  makeBehavior: function(tweenString) {
    var self = this
    var args = Array.prototype.slice.call(arguments, 1)
    var tween = Four.Behavior.behaviors[tweenString].apply(self, args)
    this.tweens.push(tween);
    return tween;
  },

  // Adds a tween to this mesh's tweens array
  addBehavior: function(tween) {
    var self = this
    if(tween.constructor === Array) {
      tween.forEach(function(t){ self.tweens.push(t) })
    } else {
      self.tweens.push(tween)
    }
    return self
  },

  // Creates a new tween and immediately adds it to this mesh's tweens array
  makeBehaviorAndAdd: function() {
    var tween = this.makeBehavior.apply(this, arguments)
    this.addBehavior(tween);
    return this
  },
  // TODO Now only supports 60fps, should use realtime framerate
  makePositionContinously: function(data, func) {
    var self = this
    var fps = 1/60

    var copy = {
      x:data.x || 0,
      y:data.y || 0,
      z:data.z || 0
    }

    if(typeof func === 'function') func(copy)
    // We need to bypass the usual pipeline for this to work.
    // var tween = TweenMax.to(self.position, fps, data)

    // self.addBehavior(tween)
    // self.pipe()
    // self.__dirtyPosition = true
    self.position.set(copy.x, copy.y, copy.z)

  },
  makeRotationContinously: function(data, func) {
    var self = this
    var fps = 1/60

    var copy = {
      x:data.x || 0,
      y:data.y || 0,
      z:data.z || 0
    }

    if(typeof func === 'function') func(copy)

    self.rotation.set(copy.x, copy.y, copy.z)

  },
  // TODO Now only supports 60fps, should use realtime framerate
  makePositionFromData: function(data, options) {
    var self = this
    var fps = 1/60
    //Make Async?
    setTimeout(function(){
      console.log("in set timeout")
      data.forEach(function(p) {
        console.log("data = ", p)
        var tween = TweenMax.to(self.position, fps, p)
        self.addBehavior(tween)
      })
      self.pipe()
    }, 0)
  },

  // Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.  Defaults to pipe to arrangement at index 0, which will almost always be the arrangement you want to add to (and the only one there is).
  pipe: function() {
    var self = this
    var timeline = new TimelineMax()

    self.tweens.forEach(function(tween) {
      timeline.add(tween)
    })

    Four.current().pipeline.pushTimeline(timeline)
    self.removeBehaviors()
    return self;
  },

  // Removes all tweens from this mesh
  removeBehaviors: function() {
    this.tweens = []
  },

  physicsOn: function() {
    this.physics = true;
  },

  physicsOff: function() {
    this.physics = false;
  }



}
