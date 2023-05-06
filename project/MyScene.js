import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyBird, BirdStates } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";


/**
 * getStringFromUrl(url)
 * Function to load a text file from a URL (used to display shader sources)
 */
function getStringFromUrl(url) {
	var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
    return xmlHttpReq.responseText;
}

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.texture = null;
		this.appearance = null;

    this.wireframe = false;
    this.selectedExampleShader = 0;
    this.showShaderCode = false;

    this.scaleFactor = 1;
		this.amplitudeFactor = 0.5;
  }
  init(application) {
    super.init(application);
    //this.cameraPosition = new vec3.fromValues(50,10,15);

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama4 = new CGFtexture(this,'images/panorama4.jpg');
    this.panorama = new MyPanorama(this, this.panorama4);
    this.bird = new MyBird(this);
    this.cameraPosition = new vec3.fromValues(5,5,5);
    this.eggToCatch = null;
    this.initCameras();
    this.initLights();
    this.terrain = new MyTerrain(this);
    this.egg1 = new MyBirdEgg(this, 100, -20, -100);
    this.egg2 = new MyBirdEgg(this,100, -20, -125);
    this.egg3 = new MyBirdEgg(this,125, -20, -100);
    this.egg4 = new MyBirdEgg(this,125, -20, -125);
    this.egg5 = new MyBirdEgg(this,0, 0, 0);
    this.eggs = [this.egg1, this.egg2, this.egg3, this.egg4, this.egg5];
    this.nest = new MyNest(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayPanorama = false;
    this.displayBird = true;
    this.displayTerrain = true;
    this.displayEggs = true;
    this.displayNest = true;

    // Factors
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);


    // Materials and textures initialization
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    // shaders initialization

    this.parrotShader = new CGFshader(this.gl, "./shaders/parrotanim.vert", "./shaders/parrotanim.frag");
    this.panoramShader = new CGFshader(this.gl, "./shaders/panoram.vert", "./shaders/panoram.frag");

    //this.parrotShader.setUniformsValues({ uSampler2: 1 });
		this.panoramShader.setUniformsValues({ uSampler: 2 });

    // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.setUpdatePeriod(50);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1,
      0.1,
      1000,
      this.cameraPosition,
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    if (this.bird.birdState == BirdStates.MOVING) {
      if (this.gui.isKeyPressed("KeyW")) {
          this.bird.accelerate(this.speedFactor);
      }
      if (this.gui.isKeyPressed("KeyS")) {
        this.bird.accelerate(-this.speedFactor - 0.2);
      }
      if (this.gui.isKeyPressed("KeyA")) {
          this.bird.turn(Math.PI / 90 * (this.speedFactor));
      }
      if (this.gui.isKeyPressed("KeyD")) {
          this.bird.turn(-Math.PI / 90 * (this.speedFactor));
      }
    }

    if (this.gui.isKeyPressed("KeyR")) {
        this.bird.reset();
        // clear all eggs
        this.egg1 = new MyBirdEgg(this, 100, -20, -100);
        this.egg2 = new MyBirdEgg(this,100, -20, -125);
        this.egg3 = new MyBirdEgg(this,125, -20, -100);
        this.egg4 = new MyBirdEgg(this,125, -20, -125);
        this.egg5 = new MyBirdEgg(this,0, 0, 0);
        this.eggs = [this.egg1, this.egg2, this.egg3, this.egg4, this.egg5];
    }

    if(this.gui.isKeyPressed("KeyP")){
      this.eggs.forEach(egg => {
        if(egg.position.x === this.bird.position.x && egg.position.z === this.bird.position.z){
          this.eggToCatch = egg;
          this.bird.setBirdState(BirdStates.CATCHING);
        }
      });
    }

    if (this.gui.isKeyPressed("KeyO") && this.bird.egg != null) {
      if (this.bird.egg.position.x === this.nest.position.x && this.bird.egg.position.z === this.nest.position.z) {
        //get the value of bird's position, and create a new egg in that position, that won't be affected by bird's movement
        let egg = new MyBirdEgg(this, this.bird.position.x, this.bird.position.y, this.bird.position.z);
        this.bird.egg = null;
        this.eggs.push(egg);
      }
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.texture.bind(1);
		this.panorama4.bind(2);

    // Draw axis
    if (this.displayAxis) {
      this.setActiveShader(this.defaultShader);
      this.axis.display();
    }
    
    // Draw Panorama
    if (this.displayPanorama) {
      this.setActiveShader(this.panoramShader);
      this.panorama.display();
    }

    // Draw Bird
    if (this.displayBird) {
      this.setActiveShader(this.parrotShader);
      this.pushMatrix();
      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
      this.bird.display();
      this.popMatrix();
    }

    // Draw Terrain
    if (this.displayTerrain) {
      //console.log(this.terrain);
      this.terrain.display();
      this.setActiveShader(this.defaultShader);
    }

    // Draw Eggs
    if (this.displayEggs) {
      this.egg1.display();
      this.eggs.forEach(egg => {
        egg.display();
      });
    }

    // Draw Nest
    if (this.displayNest) {
      this.nest.display_nest();
    }

    // ---- BEGIN Primitive drawing section

    if (this.displayNormals){
      this.bird.enableNormalViz();
      this.panorama.enableNormalViz();
      this.eggs.forEach(egg => {
        egg.enableNormalViz();
      });
    } else {
      this.bird.disableNormalViz();
      this.panorama.disableNormalViz();	
      this.eggs.forEach(egg => {
        egg.disableNormalViz();
      });
    }

  // ---- END Primitive drawing section
  }

  onWireframeChanged(v) {
		if (v){
			this.bird.setLineMode();
      this.panorama.setLineMode();
      this.terrain.setLineMode();
      this.eggs.forEach(egg => {
        egg.setLineMode();
      });

    } else {
      this.bird.setFillMode();
      this.panorama.setFillMode();
      this.terrain.setFillMode();
      this.eggs.forEach(egg => {
        egg.setFillMode();
      });
    }
			
	}

  // called when the scale factor changes on the interface
	onScaleFactorChanged(v) {
		this.scaleFactor = v;
	}

	onAmplitudeFactorChanged(v) {
		this.parrotShader.setUniformsValues({ amplitude: this.amplitudeFactor });
	}

  onSpeedFactorChanged(v){
    this.speedFactor = v;
  }

  // called periodically (as per setUpdatePeriod() in init())
	update(t) {
    // keyinputs
    this.checkKeys();
    this.bird.update(t, this.eggToCatch);

    // if the birds egg is one of the eggs in the scene, remove it from the scene
    if(this.eggToCatch != null){
      if (this.bird.birdState == BirdStates.RETURNING) {
        this.eggs = this.eggs.filter(egg => egg != this.eggToCatch);
        this.eggToCatch = null;
      }
    }

    // update scale factor
		this.onScaleFactorChanged(this.scaleFactor);
		this.onAmplitudeFactorChanged(this.amplitudeFactor);
		// only shader anim is using time factor
		// Dividing the time by 100 "slows down" the variation (i.e. in 100 ms timeFactor increases 1 unit).
		// Doing the modulus (%) by 100 makes the timeFactor loop between 0 and 99
		// ( so the loop period of timeFactor is 100 times 100 ms = 10s ; the actual animation loop depends on how timeFactor is used in the shader )
    this.parrotShader.setUniformsValues({ timeFactor: t/(100*Math.PI/2) % (2*Math.PI) });
	}
}
