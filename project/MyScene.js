
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyBird, BirdStates } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { EggStates, MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";


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
  }
  init(application) {
    super.init(application);
    this.cameraPosition = new vec3.fromValues(50,10,15);
    this.nestPosition = [30, -22, 30];

    this.eggpositions = [];
    this.generateEggPositions();
    this.MyTreeGroupPatchPosition = [35, -18, 50];
    this.MyTreeRowPatchPosition = [10, -18, 50];
    

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
    this.eggToCatch = null;
    this.initCameras();
    this.initLights();
    this.terrain = new MyTerrain(this);
    this.eggs =[];
    this.generateEggs();
    this.nest = new MyNest(this, this.nestPosition[0], this.nestPosition[1], this.nestPosition[2]);
    this.MyTreeGroupPatch = new MyTreeGroupPatch(this, this.MyTreeGroupPatchPosition[0], this.MyTreeGroupPatchPosition[1], this.MyTreeGroupPatchPosition[2]);
    this.MyTreeRowPatch = new MyTreeRowPatch(this, this.MyTreeRowPatchPosition[0], this.MyTreeRowPatchPosition[1], this.MyTreeRowPatchPosition[2]);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayPanorama = true;
    this.displayBird = true;
    this.displayTerrain = true;
    this.displayEggs = true;
    this.displayNest = true;
    this.displayTreeGroupPatch = true;
    this.displayTreeRowPatch = true;

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
    this.panoramShader = new CGFshader(this.gl, "./shaders/panoram.vert", "./shaders/panoram.frag");
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
        this.egg1 = new MyBirdEgg(this, 1, 10, 10);
        this.egg2 = new MyBirdEgg(this, 1, 10, 10);
        this.egg3 = new MyBirdEgg(this, 1, 10, 10);
        this.egg4 = new MyBirdEgg(this, 1, 10, 10);
        this.eggs = [this.egg1, this.egg2, this.egg3, this.egg4];
        
        this.nest.eggs = [];
    }

    if(this.gui.isKeyPressed("KeyP")){
      this.eggs.forEach(egg => {

        // if the egg is in range of the bird, catch it
        if (Math.abs(this.bird.position.x - egg.position.x) < 5 && Math.abs(this.bird.position.z - egg.position.z) < 5) {
          this.eggToCatch = egg;
          this.bird.setBirdState(BirdStates.CATCHING);
          //alert("you can catch!");
        }
      });
    }

    if (this.gui.isKeyPressed("KeyO") && this.bird.egg != null) {

      // checks if the bird is near the nest
      if (Math.abs(this.bird.position.x - this.nest.position.x) < 5 && Math.abs(this.bird.position.z - this.nest.position.z) < 5) {
        let egg = new MyBirdEgg(this, 1, 10, 10, this.bird.position.x, this.bird.position.y - 2, this.bird.position.z, this.bird.angleY, EggStates.FALLING);
        this.bird.egg = null;
        this.nest.addEgg(egg);
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

    this.pushMatrix();
    //this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.display_scene();
    this.popMatrix();

    // ---- BEGIN Primitive drawing section

    if (this.displayNormals){
      this.terrain.enableNormalViz();
      this.bird.enableNormalViz();
      this.panorama.enableNormalViz();
      this.eggs.forEach(egg => {
        egg.enableNormalViz();
      });
    } else {
      this.terrain.disableNormalViz();
      this.bird.disableNormalViz();
      this.panorama.disableNormalViz();	
      this.eggs.forEach(egg => {
        egg.disableNormalViz();
      });
    }

  // ---- END Primitive drawing section
  }
  
  display_scene(){
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
      this.setActiveShader(this.defaultShader);
      this.pushMatrix();
      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
      this.bird.display();
      this.popMatrix();
    }

    // Draw Terrain
    if (this.displayTerrain) {
      this.terrain.display();
    }

    // Draw Eggs
    if (this.displayEggs) {
      this.setActiveShader(this.defaultShader);
      this.eggs.forEach(egg => {
        egg.display();
      });
    }

    // Draw Nest
    if (this.displayNest) {
      this.setActiveShader(this.defaultShader);
      this.nest.display_nest();
    }

    if (this.displayTreeGroupPatch) {
      this.MyTreeGroupPatch.display();
    }

    if (this.displayTreeRowPatch) {
      this.MyTreeRowPatch.display();
    }
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
    this.nest.updateEggs();
    this.MyTreeGroupPatch.update(t);
    this.MyTreeRowPatch.update(t);
	}

  generateEggPositions(){
    // x -5 a 50, y = -22, z a 30 a 150
    let xmin = -5;
    let xmax = 50;
    let zmin = 30;
    let zmax = 150;
    
    for (let i = 0; i < 5; i++) {
      let xrand, zrand, isUnique;
    
      do {
        xrand = Math.random() * (xmax - xmin) + xmin;
        zrand = Math.random() * (zmax - zmin) + zmin;
    
        // Check uniqueness
        isUnique = true;
        for (let j = 0; j < this.eggpositions.length; j++) {
          if (
            this.eggpositions[j][0] === xrand &&
            this.eggpositions[j][2] === zrand
          ) {
            isUnique = false;
            break;
          }
        }
      } while (!isUnique);
    
      this.eggpositions.push([xrand, -22, zrand]);
    }
  }

  generateEggs(){
    this.eggpositions.forEach(position => {
      let egg = new MyBirdEgg(this, 1, 10, 10, position[0], position[1], position[2]);
      this.eggs.push(egg);
    });
  }

  generateNestPosition(){
    // x -5 a 50, y = -22, z a 30 a 150
    let xmin = -5;
    let xmax = 50;
    let zmin = 30;
    let zmax = 150;
    
    // check if nest is in egg positions
    let isUnique;
    do {
      let xrand = Math.random() * (xmax - xmin) + xmin;
      let zrand = Math.random() * (zmax - zmin) + zmin;

      this.nestPosition = [xrand, -22, zrand];

      // Check uniqueness
      isUnique = true;
      for (let j = 0; j < this.eggpositions.length; j++) {
        if (
          this.eggpositions[j][0] === xrand &&
          this.eggpositions[j][2] === zrand &&
          xrand === this.nestPosition[0] &&
          zrand === this.nestPosition[2]
        ) {
          isUnique = false;
          break;
        }
      }
    } while (!isUnique);
  }
}