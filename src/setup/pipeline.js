Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax()
  },
  pushTimeline: function(timeline) {
    this.TweenPipeline.push(timeline)
  },
  pipe: function() {
    this.TweenPipeline.forEach(function(timeline) {
      this.masterTimeline.add(timeline)
    })
  },
  start: function() {
    this.masterTimeline.active = true
  }

}
