Four.Behavior = {
  moveTo: function(mesh, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    var self = this;
    // We want the rate to be per 1/60 of a second
    // var time = time || preset.time;
    var position = Four.Utils.toPoints(self.position)
    var target = Four.Utils.toPoints(mesh.position)

    var tween = new TWEEN.Tween(position).to(target, time)

    tween.onUpdate(function() {
      self.position.set(position.x, position.y, position.z)
    })

    tween.start()
  }

  // moveTo: function(mesh, time) {
  //   var preset = new Four.Preset('defaults').behaviors.moveTo
  //   // We want the rate to be per 1/60 of a second
  //   var rate = rate / 60 || preset.rate / 60;
  //   var position = this.position;
  //   var target = mesh.position
  //   var distance = position.distanceTo(target)
  //   var time = distace / rate
  //
  //   var tween = new TWEEN.Tween(position).to(target, time)
  //
  // }
}
