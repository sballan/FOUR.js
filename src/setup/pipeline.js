Four.Pipeline.prototype = {
  init: function() {
    this.masterTimeline = new TimelineMax({paused: true})

  },
  pushTweens: function(tweens) {
    var self = this
    // tweens.forEach(function(tween) {
    //   tween.resume()
    //   self.masterTimeline.add(tween)
    // })
    self.masterTimeline.add(tweens, 0)
    tweens.resume()
  },
  start: function() {
    this.masterTimeline.play()
  }

}
