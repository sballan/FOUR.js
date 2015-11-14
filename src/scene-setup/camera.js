Four.Setup.prototype.Camera = function(preset) {
  if(!preset) preset = new Four.Preset('defaults').camera
  var angle = preset.angle;
  var aspect = preset.aspect;
  var near = preset.near;
  var far = preset.far;
  var positionX = preset.positionX;
  var positionY = preset.positionY;
  var positionZ = preset.positionZ;

  var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);

  //Sets the camera to any position passed in the options
  camera.position.set(positionX, positionY, positionZ)

  Four.Behavior.Apply(camera)

    camera.makeBehaviorAndAdd('moveTo', {x: 40, y: 50, z: 10}, 5)
    camera.pipe()

  return camera
}
