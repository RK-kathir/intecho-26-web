import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import './Hyperspeed.css';

const DEFAULT_EFFECT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'xyDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 3,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 30,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.02, 0.05],
  lightStickHeight: [0.3, 0.7],
  movingAwaySpeed: [20, 50],
  movingCloserSpeed: [-150, -230],
  carLightsLength: [400 * 0.05, 400 * 0.2],
  carLightsRadius: [0.03, 0.08],
  carWidthPercentage: [0.1, 0.5],
  carShiftX: [-0.5, 0.5],
  carFloorSeparation: [0, 0.1],
  colors: {
    roadColor: 0x050505,
    islandColor: 0x0a0a0a,
    background: 0x050505,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xff2d2d, 0xa90519, 0xff102a], 
    rightCars: [0x6a5acd, 0x483d8b, 0x7b68ee], 
    sticks: 0xff2d2d
  }
};

const Hyperspeed = ({ effectOptions = DEFAULT_EFFECT_OPTIONS }) => {
  const hyperspeed = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      const container = document.getElementById('lights');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    }
    const xyUniforms = {
      uFreq: { value: new THREE.Vector2(5, 2) },
      uAmp: { value: new THREE.Vector2(25, 15) }
    };

    let nsin = val => Math.sin(val) * 0.5 + 0.5;

    const distortions = {
      xyDistortion: {
        uniforms: xyUniforms,
        getDistortion: `
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,
        getJS: (progress, time) => {
          let movementProgressFix = 0.02;
          let uFreq = xyUniforms.uFreq.value;
          let uAmp = xyUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
              Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
              Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,
            0
          );
          let lookAtAmp = new THREE.Vector3(2, 0.4, 1);
          let lookAtOffset = new THREE.Vector3(0, 0, -3);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      }
    };

    class App {
      constructor(container, options = {}) {
        this.options = options;
        if (this.options.distortion == null) {
          this.options.distortion = {
            uniforms: distortion_uniforms,
            getDistortion: distortion_vertex
          };
        }
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.composer = new EffectComposer(this.renderer);
        container.append(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.z = -5;
        this.camera.position.y = 8;
        this.camera.position.x = 0;
        this.scene = new THREE.Scene();
        this.scene.background = null;

        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } };
        this.clock = new THREE.Clock();
        this.assets = {};
        this.disposed = false;

        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.leftSticks = new LightsSticks(this, options);

        this.fovTarget = options.fov;
        this.speedUpTarget = 0;
        this.speedUp = 0;
        this.timeOffset = 0;

        this.tick = this.tick.bind(this);
        this.init = this.init.bind(this);
        this.setSize = this.setSize.bind(this);
        window.addEventListener('resize', this.onWindowResize.bind(this));
      }

      onWindowResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(width, height);
      }

      initPasses() {
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: 1 }));
        const smaaPass = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM, searchImage: SMAAEffect.searchImageDataURL, areaImage: SMAAEffect.areaImageDataURL }));
        this.renderPass.renderToScreen = false;
        this.bloomPass.renderToScreen = false;
        smaaPass.renderToScreen = true;
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(smaaPass);
      }

      loadAssets() {
        const assets = this.assets;
        return new Promise(resolve => {
          const manager = new THREE.LoadingManager(resolve);
          const searchImage = new Image();
          const areaImage = new Image();
          assets.smaa = {};
          searchImage.addEventListener('load', function () { assets.smaa.search = this; manager.itemEnd('smaa-search'); });
          areaImage.addEventListener('load', function () { assets.smaa.area = this; manager.itemEnd('smaa-area'); });
          manager.itemStart('smaa-search');
          manager.itemStart('smaa-area');
          searchImage.src = SMAAEffect.searchImageDataURL;
          areaImage.src = SMAAEffect.areaImageDataURL;
        });
      }

      init() {
        this.initPasses();
        const options = this.options;
        this.road.init();
        this.leftCarLights.init();
        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));
        this.tick();
      }

      update(delta) {
        let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
        this.timeOffset += this.speedUp * delta;
        let time = this.clock.elapsedTime + this.timeOffset;
        this.rightCarLights.update(time);
        this.leftCarLights.update(time);
        this.leftSticks.update(time);
        this.road.update(time);

        let updateCamera = false;
        let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);
        if (fovChange !== 0) {
          this.camera.fov += fovChange * delta * 6;
          updateCamera = true;
        }

        if (this.options.distortion.getJS) {
          const distortion = this.options.distortion.getJS(0.025, time);
          this.camera.lookAt(new THREE.Vector3(this.camera.position.x + distortion.x, this.camera.position.y + distortion.y, this.camera.position.z + distortion.z));
          updateCamera = true;
        }
        if (updateCamera) {
          this.camera.updateProjectionMatrix();
        }
      }

      render(delta) { this.composer.render(delta); }

      dispose() {
        this.disposed = true;
        if (this.renderer) this.renderer.dispose();
        if (this.composer) this.composer.dispose();
        if (this.scene) this.scene.clear();
        window.removeEventListener('resize', this.onWindowResize.bind(this));
      }

      setSize(width, height, updateStyles) { this.composer.setSize(width, height, updateStyles); }

      tick() {
        if (this.disposed || !this) return;
        if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
          const canvas = this.renderer.domElement;
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
          this.camera.updateProjectionMatrix();
        }
        const delta = this.clock.getDelta();
        this.render(delta);
        this.update(delta);
        requestAnimationFrame(this.tick);
      }
    }

    const distortion_uniforms = {
      uDistortionX: { value: new THREE.Vector2(80, 3) },
      uDistortionY: { value: new THREE.Vector2(-40, 2.5) }
    };

    const distortion_vertex = `
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        progress = clamp(progress, 0., 1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
          xAmp * nsin(progress * PI * xFreq - PI / 2.),
          yAmp * nsin(progress * PI * yFreq - PI / 2.),
          0.
        );
      }
    `;

    const random = base => {
      if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
      return Math.random() * base;
    };

    const pickRandom = arr => {
      if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
      return arr;
    };

    function lerp(current, target, speed = 0.1, limit = 0.001) {
      let change = (target - current) * speed;
      if (Math.abs(change) < limit) change = target - current;
      return change;
    }

    class CarLights {
      constructor(webgl, options, colors, speed, fade) {
        this.webgl = webgl;
        this.options = options;
        this.colors = colors;
        this.speed = speed;
        this.fade = fade;
      }
      init() {
        const options = this.options;
        let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;
        let laneWidth = options.roadWidth / options.lanesPerRoad;

        let aOffset = [];
        let aMetrics = [];
        let aColor = [];

        let colors = this.colors;
        if (Array.isArray(colors)) colors = colors.map(c => new THREE.Color(c));
        else colors = new THREE.Color(colors);

        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
          let radius = random(options.carLightsRadius);
          let length = random(options.carLightsLength);
          let speed = random(this.speed);
          let carLane = i % options.lanesPerRoad;
          let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;
          let carWidth = random(options.carWidthPercentage) * laneWidth;
          let carShiftX = random(options.carShiftX) * laneWidth;
          laneX += carShiftX;
          let offsetY = random(options.carFloorSeparation) + radius * 1.3;
          let offsetZ = -random(options.length);

          aOffset.push(laneX - carWidth / 2); aOffset.push(offsetY); aOffset.push(offsetZ);
          aOffset.push(laneX + carWidth / 2); aOffset.push(offsetY); aOffset.push(offsetZ);
          aMetrics.push(radius); aMetrics.push(length); aMetrics.push(speed);
          aMetrics.push(radius); aMetrics.push(length); aMetrics.push(speed);
          let color = pickRandom(colors);
          aColor.push(color.r); aColor.push(color.g); aColor.push(color.b);
          aColor.push(color.r); aColor.push(color.g); aColor.push(color.b);
        }

        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));

        let material = new THREE.ShaderMaterial({
          fragmentShader: carLightsFragment, vertexShader: carLightsVertex, transparent: true,
          uniforms: Object.assign({ uTime: { value: 0 }, uTravelLength: { value: options.length }, uFade: { value: this.fade } }, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        material.onBeforeCompile = shader => { shader.vertexShader = shader.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion); };
        let mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(time) { this.mesh.material.uniforms.uTime.value = time; }
    }

    const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor; varying vec2 vUv; uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute vec3 aOffset; attribute vec3 aMetrics; attribute vec3 aColor;
      uniform float uTravelLength; uniform float uTime;
      varying vec2 vUv; varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r; float myLength = aMetrics.g; float speed = aMetrics.b;
        transformed.xy *= radius; transformed.z *= myLength;
        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv; vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    class LightsSticks {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; }
      init() {
        const options = this.options;
        const geometry = new THREE.PlaneGeometry(1, 1);
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        let totalSticks = options.totalSideLightSticks;
        instanced.instanceCount = totalSticks;
        let stickoffset = options.length / (totalSticks - 1);
        const aOffset = []; const aColor = []; const aMetrics = [];
        let colors = options.colors.sticks;
        if (Array.isArray(colors)) colors = colors.map(c => new THREE.Color(c)); else colors = new THREE.Color(colors);

        for (let i = 0; i < totalSticks; i++) {
          let width = random(options.lightStickWidth); let height = random(options.lightStickHeight);
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
          let color = pickRandom(colors);
          aColor.push(color.r); aColor.push(color.g); aColor.push(color.b);
          aMetrics.push(width); aMetrics.push(height);
        }
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));

        const material = new THREE.ShaderMaterial({
          fragmentShader: sideSticksFragment, vertexShader: sideSticksVertex, side: THREE.DoubleSide,
          uniforms: Object.assign({ uTravelLength: { value: options.length }, uTime: { value: 0 } }, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        material.onBeforeCompile = shader => { shader.vertexShader = shader.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion); };
        const mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(time) { this.mesh.material.uniforms.uTime.value = time; }
    }

    const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute float aOffset; attribute vec3 aColor; attribute vec2 aMetrics;
      uniform float uTravelLength; uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) { return mat4(cos(angle),0,sin(angle),0, 0,1.0,0,0, -sin(angle),0,cos(angle),0, 0,0,0,1); }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x; float height = aMetrics.y;
        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);
        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
        transformed.z += - uTravelLength + time;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        transformed.y += height / 2.; transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor); gl_FragColor = vec4(color,1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    class Road {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; this.uTime = { value: 0 }; }
      createPlane(side, width, isRoad) {
        const options = this.options;
        const geometry = new THREE.PlaneGeometry(isRoad ? options.roadWidth : options.islandWidth, options.length, 20, 100);
        let uniforms = { uTravelLength: { value: options.length }, uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) }, uTime: this.uTime };
        if (isRoad) {
          uniforms = Object.assign(uniforms, { uLanes: { value: options.lanesPerRoad }, uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) }, uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) }, uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage }, uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage }, uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage } });
        }
        const material = new THREE.ShaderMaterial({
          fragmentShader: isRoad ? roadFragment : islandFragment, vertexShader: roadVertex, side: THREE.DoubleSide,
          uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        material.onBeforeCompile = shader => { shader.vertexShader = shader.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion); };
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; mesh.position.z = -options.length / 2; mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;
        this.webgl.scene.add(mesh); return mesh;
      }
      init() {
        this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
        this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
        this.island = this.createPlane(0, this.options.islandWidth, false);
      }
      update(time) { this.uTime.value = time; }
    }

    const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv; uniform vec3 uColor; uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
        vec2 uv = vUv; vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const islandFragment = roadBaseFragment.replace('#include <roadMarkings_fragment>', '').replace('#include <roadMarkings_vars>', '');

    const roadMarkings_vars = `
      uniform float uLanes; uniform vec3 uBrokenLinesColor; uniform vec3 uShoulderLinesColor; uniform float uShoulderLinesWidthPercentage; uniform float uBrokenLinesWidthPercentage; uniform float uBrokenLinesLengthPercentage;
    `;

    const roadMarkings_fragment = `
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes; float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage; float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
      brokenLines = mix(brokenLines, sideLines, uv.x);
    `;

    const roadFragment = roadBaseFragment.replace('#include <roadMarkings_fragment>', roadMarkings_fragment).replace('#include <roadMarkings_vars>', roadMarkings_vars);

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime; ${THREE.ShaderChunk['fog_pars_vertex']} uniform float uTravelLength; varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x; transformed.z += distortion.y; transformed.y += -1. * distortion.z;  
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.); gl_Position = projectionMatrix * mvPosition; vUv = uv;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    function resizeRendererToDisplaySize(renderer, setSize) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth; const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) setSize(width, height, false);
      return needResize;
    }

    (function () {
      const container = document.getElementById('lights');
      const options = { ...DEFAULT_EFFECT_OPTIONS, ...effectOptions, colors: { ...DEFAULT_EFFECT_OPTIONS.colors, ...effectOptions.colors } };
      options.distortion = distortions[options.distortion];
      const myApp = new App(container, options);
      appRef.current = myApp;
      myApp.loadAssets().then(myApp.init);
    })();

    return () => { if (appRef.current) appRef.current.dispose(); };
  }, [effectOptions]);

  return <div id="lights" ref={hyperspeed}></div>;
};

export default Hyperspeed;
