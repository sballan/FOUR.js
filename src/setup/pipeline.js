Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax({paused: true})

  },
  pushBehavior: function(tweens) {
    var self = this
    self.masterTimeline.add(tweens, 0)
  },
  pushTimeline: function(timeline) {
    var self = this
    self.masterTimeline.add(timeline, 0)
  },
  start: function() {
    this.masterTimeline.play()
  }

}
