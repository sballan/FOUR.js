var p = {}
Four.Behavior = {
  toPoints: function(v) {
    return {
      x: v.x,
      y: v.y,
      z: v.z,
      paused: true
    }
  },
  moveTo: function(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    time = time || preset.time;

    target = Four.Behavior.toPoints(target)

    var tween = TweenMax.to(this.position, time, target)
    return tween;
  },
  moveFrom: function(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveFrom
    //Give time a fallback value
    time = time || preset.time;
    target = target || preset.target

    var tween = TweenMax.from(this.position, time, target)
    return tween;
  }


}
