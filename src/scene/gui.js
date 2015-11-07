Four.Setup.prototype.GUI = function (options) {
  var guiControls = new function () {
    //this.rotationX = 0.01;
    //this.rotationY = 0.1;
    //this.rotationZ = 0.01;
  }

  var datGUI = new dat.GUI();
  //The values can now be between 0 and 1 for all these
  // datGUI.add(guiControls, 'rotationX', 0, 1)
  //datGUI.add(guiControls, 'rotationY', 0, 1)
  // datGUI.add(guiControls, 'rotationZ', 0, 1)

  //$(domSelector).append(viz.scene.renderer.domElement);

  return guiControls;
}