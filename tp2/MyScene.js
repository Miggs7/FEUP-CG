import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    //tp1
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.smallTriangle = new MyTriangleSmall(this);
    this.smallTriangle2 = new MyTriangleSmall(this);
    this.bigTriangle = new MyTriangleBig(this);
    this.bigTriangle2 = new MyTriangleBig(this);
    this.tangram = new MyTangram(this);

    //tp2
    this.diamond2 = new MyDiamond(this);

    //Objects connected to MyInterface
    this.displayAxis = true;

    this.displayDiamond = false;

    this.displayTriangle = false;

    this.displayParallelogram = false;

    this.displaySmallTriangle = false;
    this.displaySmallTriangle2 = false;

    this.displayBigTriangle = false;
    this.displayBigTriangle2 = false;

    this.displayTangram = true;

    //this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // Draw figures
    if (this.displayDiamond){ 
      this.pushMatrix();
      this.translate(0,-1,0);
      this.diamond.display();
      this.popMatrix();
    }

    if (this.displayTriangle) {
      this.pushMatrix();
      this.translate(-0.60, 3.60, 0);
      this.rotate(Math.PI/2 + Math.PI,0,0,1);
      this.triangle.display();
      this.popMatrix();
    }

    if (this.displayParallelogram) {
      this.pushMatrix();
      this.translate(-1.905, -1.920, 0);
      this.scale(-1,1,1);
      this.rotate(Math.PI/4, 0,0,1);
      this.parallelogram.display();
      this.popMatrix();
    }

    if (this.displaySmallTriangle) {
      this.pushMatrix();
      this.translate(-0.6,3.6,0);
      this.rotate(Math.PI/4 + Math.PI,0,0,1);
      this.smallTriangle.display();
      this.popMatrix();
    }

    if (this.displaySmallTriangle2) {
      this.pushMatrix();
      this.translate(0.5,-2.5,0);
      this.rotate(3*Math.PI/4,0,0,1);
      this.smallTriangle2.display();
      this.popMatrix();
    }

    if (this.displayBigTriangle) {
      this.pushMatrix();
      this.translate(-0.5,-0.5,0);
      this.rotate(Math.PI/4,0,0,1);
      this.bigTriangle.display();
      this.popMatrix();
    }

    if (this.displayBigTriangle2) {
      this.pushMatrix();
      this.translate(0.1,0.9,0);
      this.bigTriangle2.display();
      this.popMatrix();
    }

    if (this.displayTangram) {
      this.tangram.display();
    }

    this.setDefaultAppearance();

    /*
    var sca = [
      this.scaleFactor, 0.0, 0.0, 0.0,
      0.0, this.scaleFactor, 0.0, 0.0,
      0.0, 0.0, this.scaleFactor, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];

    this.multMatrix(sca);
    */

    // ---- BEGIN Primitive drawing section

    //this.diamond.display();
    //this.triangle.display();
    //this.parallelogram.display();

    // ---- END Primitive drawing section
  }
}
