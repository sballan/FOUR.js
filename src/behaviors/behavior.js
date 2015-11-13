var p = {}
Four.Behavior = {
  toPoints: function(v) {
    return {
      x: v.x,
      y: v.y,
      z: v.z
    }
  },
  flipFlop: function(amount, time) {
    amount.repeat = 40
    amount.yoyo = true
    amount.delay = 1
    var tween = TweenMax.to(this.rotation, time, amount)
    return tween
  },
  moveTo: function(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    time = time || preset.time;

    target = Four.Behavior.toPoints(target)

    var tween = TweenMax.to(this.position, time, target)
    return tween;
  },
  moveBackAndForth: function(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveBackAndForth
    //Give time a fallback value
    time = time || preset.time;

    target = Four.Behavior.toPoints(target)
    target.repeat = 5
    target.yoyo = true

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
