Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax()
    this.masterTimeline.pause()
  },
  pushTweens: function(tweens) {
    var self = this
    console.log("the tweens", tweens)
    tweens.forEach(function(tween) {
      tween.resume()
      self.masterTimeline.add(tween)
    })
  },
  // pipe: function() {
  //   var self = this
  //   self.TweenPipeline.forEach(function(timeline) {
  //     self.masterTimeline.add(timeline)
  //     console.log("mytimeplien", timeline)
  //     timeline.resume()
  //   })
  // },
  start: function() {
    // this.pipe()
    this.masterTimeline.play()
  }

}
