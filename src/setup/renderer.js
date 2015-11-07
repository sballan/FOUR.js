Four.Setup.Renderer = function (options) {
  var o = options || {
    clearColor: 0x050505,
    shadowMap: true,
    shadowMapSoft: true
  }
  var renderer = new THREE.WebGLRenderer({
    antialias: false
  })
  renderer.setClearColor(o.clearColor);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = o.shadowMap;
  renderer.shadowMapSoft = o.shadowMapSoft;

  var selector = document.querySelector(this.domSelector);
  selector.appendChild(renderer.domElement)

  return renderer;
}