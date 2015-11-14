Four.Behavior.Apply = function(mesh) {
  var handlers = Four.Behavior.Handler

  for(var handler in handlers) {
    mesh[handler] = handlers[handler]
    mesh.tweens = []

  }

}
