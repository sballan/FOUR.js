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
    this.tweens.push(tween)
    return this
  },

  // Creates a new tween and immediately adds it to this mesh's tweens array
  makeBehaviorAndAdd: function() {

    var tween = this.makeBehavior.apply(this, arguments)
    this.addBehavior(tween);
    return this
  },

  // Sends all of this mesh's tweens to the Pipeline where they will be added to the masterTimeline, then destroys this mesh's tweens array.  Defaults to pipe to arrangement at index 0, which will almost always be the arrangement you want to add to (and the only one there is).
  pipe: function(index) {
    index = index || 0
    var timeline = new TimelineMax()

    timeline.insertMultiple(this.tweens)

    Four.arrangements[index].pipeline.pushTimeline(timeline)
    this.removeBehaviors()
    return this;
  },

  // Removes all tweens from this mesh
  removeBehaviors: function() {
    this.tweens = []
  }

}
