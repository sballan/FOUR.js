Four.Setup.prototype.Renderer = function (preset) {
  if(!preset) preset = {}
  var defaults = new Four.Preset('defaults').renderer
	Four.Preset.update(preset, defaults)

  var clearColor = preset.clearColor;
  var shadowMap = preset.shadowMap;
  var shadowMapSoft = preset.shadowMapSoft;
  var antialias = preset.antialias

  var renderer = new THREE.WebGLRenderer({
    antialias: antialias
  })
  renderer.setClearColor(clearColor);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = shadowMap;
  renderer.shadowMapSoft = shadowMapSoft;

  var selector = document.querySelector(this.domSelector);
  selector.appendChild(renderer.domElement)

  return renderer;
}
