Four.Preset.data = {
  currentDefaults: {},
  defaults: {
    debugMode: true,
    controls: {
      OrbitControls: true,
      lookAtScene: true,
      lookAtSceneContinously: false,
      resize: true,
      mouse: false
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
      position: {
        x: 20,
        y: 20,
        z: 50
      },
      color: 0xFFFFFF
    },
    camera: {
      angle: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 500,
      positionX: 100,
      positionY: 10,
      positionZ: 100
    },
    scene: {
      physics: false,
      fog: {
        inScene: true,
        color: 0x222222,
        near: 50,
        far: 400
      }
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
          color: 0x54f454,
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
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        },
        physics: false
      },
      circle: {
        radius: 5,
        segments: 32,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      cylinder: {
        radiusTop: 5,
        radiusBottom: 5,
        height: 20,
        radiusSegments: 32,
        heightSegments: 1,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      ring: {
        innerRadius: 3,
        outerRadius: 5,
        thetaSegments: 32,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      torus: {
        radius: 3,
        tube: 1,
        radialSegments: 10,
        tubularSegments: 50,
        arc: Math.PI * 2,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
          specular: 0xb4b4b4b4,
          shininess: 2,
          reflectivity: 2
        }
      },
      torusKnot: {
        radius: 10,
        tube: 3,
        radialSegments: 30,
        tubularSegments: 50,
        p: 2,
        q: 3,
        heightScale: 1,
        materialType: 'MeshPhongMaterial',
        materialOptions: {
          color: 0x54f454,
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
