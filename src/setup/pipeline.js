Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax()
  },
  pushTimeline: function(timeline) {
    console.log("timeline", timeline)
    this.TweenPipeline.push(timeline)
    timeline.resume()
    console.log("timeline pipline", this.TweenPipeline)
  },
  pipe: function() {
    var self = this
    self.TweenPipeline.forEach(function(timeline) {
      self.masterTimeline.add(timeline)
      console.log("mytimeplien", timeline)
      timeline.resume()
    })
  },
  start: function() {
    this.pipe()
    this.masterTimeline.play()
  }

}
