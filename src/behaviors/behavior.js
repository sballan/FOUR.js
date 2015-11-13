var p = {}
Four.Behavior = {
  moveTo: function(mesh, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    time = time || preset.time;

    var target = Four.Utils.toPoints(mesh.position)

    var tween = TweenMax.to(this.position, time, target)
    return tween;
  },
  moveFrom: function(time, target) {
    var preset = new Four.Preset('defaults').behaviors.moveFrom
    //Give time a fallback value
    time = time || preset.time;
    target = target || preset.target

    var tween = TweenMax.from(this.position, time, target)
    return tween;
  }


}
