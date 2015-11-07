Four.Setup.prototype.Camera = function(options) {
	 var o = options || {
      angle: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 500,
      positionX: 0,
      positionY: 0,
      positionZ: 80 
    }

    var camera = new THREE.PerspectiveCamera(o.angle, o.aspect, o.near, o.far);

    //Sets the camera to any position passed in the options
    camera.position.set(o.positionX, o.positionY, o.positionZ)


    return camera
}