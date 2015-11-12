var p = {}
Four.Behavior = {
  moveTo: function(mesh, time) {
    var preset = new Four.Preset('defaults').behaviors.moveTo
    //Give time a fallback value
    time = time || preset.time;

    var target = Four.Utils.toPoints(mesh.position)

    TweenMax.to(this.position, time, target)


  },
  moveFrom: function(time, target) {
    var preset = new Four.Preset('defaults').behaviors.moveFrom
    //Give time a fallback value
    time = time || preset.time;
    target = target || preset.target


    TweenMax.from(this.position, time, target)
  }


}
