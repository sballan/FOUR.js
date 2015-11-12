var p = {}
Four.Behavior = {
  moveTo: function(mesh, time) {
    var tl = new TimelineMax()
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    var time = time || preset.time;

    var target = Four.Utils.toPoints(mesh.position)

    TweenMax.to(this.position, time, target)


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
