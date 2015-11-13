var p = {}
Four.Behavior = {
  moveTo: function(target, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    time = time || preset.time;

    target = {
      x: target.x,
      y: target.y,
      z: target.z
    }

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
  },
  toPoints: function(mesh) {
    return {
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z
    }
  }


}
