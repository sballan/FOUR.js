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
  makeContinously: function(data, options) {
    var self = this
    //Make Async?
    setTimeout(function(){
      while(data.active) {

      }
    }, 0)
  },
  // TODO Now only supports 60fps, should use realtime framerate
  makePositionFromData: function(data, options) {
    var self = this
    var fps = 1/60
    //Make Async?
    setTimeout(function(){
      data.forEach(function(p) {
        var tween = TweenMax.from(self.position, fps, p)
        self.addBehavior(tween)
      })
      self.pipe()
    }, 0)
  },

  // Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.  Defaults to pipe to arrangement at index 0, which will almost always be the arrangement you want to add to (and the only one there is).
  pipe: function(index) {
    index = index || 0
    var timeline = new TimelineMax()

    this.tweens.forEach(function(tween) {
      timeline.add(tween)
    })

    Four.current().pipeline.pushTimeline(timeline)
    this.removeBehaviors()
    return this;
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
