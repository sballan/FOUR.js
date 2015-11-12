Four.Pipeline = {
  TweenPipeline: [],
  BasicPipeline: [],
  pipe: function() {
    TweenPipeline.forEach(function(tween) {
      tween.start()
    })
  },
  mainTimeline: new TimelineMax()
}
