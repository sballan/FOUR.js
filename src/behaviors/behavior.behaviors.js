var p = {}
Four.Behavior.behaviors = {
  flipFlop: function(amount, time, repeat) {
    repeat = repeat || -1
    amount.repeat = repeat
    amount.yoyo = true
    amount.delay = 0
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
  moveBackAndForth: function(target, time, repeat) {
    var preset = new Four.Preset('defaults').behaviors.moveBackAndForth
    //Give time a fallback value
    time = time || preset.time;
    repeat = repeat || -1
    target = Four.Behavior.toPoints(target)
    target.repeat = repeat
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
  },
  data: function(data, options) {

  }


}
