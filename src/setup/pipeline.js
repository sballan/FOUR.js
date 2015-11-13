Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax()
    this.masterTimeline.pause()
  },
  pushTimeline: function(timeline) {
    console.log("timeline", timeline)
    this.TweenPipeline.push(timeline)
    timeline.resume()
    console.log("timeline pipline", this.TweenPipeline)
  },
  pushTweens: function(tweens) {
    var self = this
    console.log("the tweens", tweens)
    tweens.forEach(function(tween) {
      tween.resume()
      self.masterTimeline.add(tween)
    })
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
