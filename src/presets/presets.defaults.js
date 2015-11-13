Four.Preset.data = {
  currentDefaults: {},
  defaults: {
    debugMode: true,
    controls: {
      OrbitControls: true,
      lookAtScene: true
    },
    renderer: {
      clearColor: 0x999999,
      shadowMap: true,
      shadowMapSoft: true,
      antialias: true
    },
    updates: [
      {func: function(){}
      }
    ],
    lights: {
      positionX: 50,
      positionY: -20,
      positionZ: 50,
      color: 0xFFFFFF
    },
    camera: {
      angle: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 500,
      positionX: 0,
      positionY: 0,
      positionZ: 80 
    },
    scene: {
      physics: false
    },
    mesh: {
      geometry: new THREE.SphereGeometry(5, 16, 16),
      materialType: 'MeshPhongMaterial',
      materialOptions: {
        color: 0x556677,
        specular: 0xb4b4b4b4,
        shininess: 2,
        reflectivity: 2
      },
      physics: false,
      sphere: {
        physics: false,
        x: 0,
        y: 0,
        z: 0,
        radius: 5,
        widthSegments: 16,
        heightSegments: 16,
        geometry: new THREE.SphereGeometry(5, 16, 16),
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0xb4b4b4b4,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }

      },
      box: {
        height: 5,
        width: 5,
        depth: 5,
        geometry: new THREE.BoxGeometry(10, 10, 10),
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x000000,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      }
    },
    behaviors: {
      moveTo: {
        time: 2
      },
      moveFrom: {
        target: {x: -4, y: -5, z: 3},
        time: 2
      },
      moveBackAndForth: {
        time: 2
      }
    }
  }

}
