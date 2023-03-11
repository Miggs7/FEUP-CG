import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials(this.scene);

        this.diamond = new MyDiamond(this.scene);

        this.triangle = new MyTriangle(this.scene);

        this.parallelogram = new MyParallelogram(this.scene);

        this.bigTriangle = new MyTriangleBig(this.scene);
        this.bigTriangle2 = new MyTriangleBig(this.scene);

        this.smallTriangle = new MyTriangleSmall(this.scene);
        this.smallTriangle2 = new MyTriangleSmall(this.scene);
	}
	
    display() {

        // Figures
        // Diamond green
        this.scene.pushMatrix();
        //this.scene.translate(0,-1,0);
        var matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 1
          ]
        this.scene.multMatrix(matrix);
        //this.green.apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        // Triangle Normal pink
        this.scene.pushMatrix();
        this.scene.translate(-0.60, 3.60, 0);
        this.scene.rotate(Math.PI/2 + Math.PI,0,0,1);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();
      
        // Paralelogram Yellow 
        this.scene.pushMatrix();
        this.scene.translate(-1.905, -1.920, 0);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
      
        // Small Triangle red
        this.scene.pushMatrix();
        this.scene.translate(-0.6,3.6,0);
        this.scene.rotate(Math.PI/4 + Math.PI,0,0,1);
        this.red.apply();
        this.smallTriangle.display();
        this.scene.popMatrix();
      
        // Small Triangle Purple
        this.scene.pushMatrix();
        this.scene.translate(0.5,-2.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.purple.apply();
        this.smallTriangle2.display();
        this.scene.popMatrix();
      
        // Big Triangle orange
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.orange.apply();
        this.bigTriangle.display();
        this.scene.popMatrix();
      
        // Big Triangle Blue
        this.scene.pushMatrix();
        this.scene.translate(0.1,0.9,0);
        this.blue.apply();
        this.bigTriangle2.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.bigTriangle.enableNormalViz();
        this.bigTriangle2.enableNormalViz();
        this.smallTriangle.enableNormalViz();
        this.smallTriangle2.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.bigTriangle.disableNormalViz();
        this.bigTriangle2.disableNormalViz();
        this.smallTriangle.disableNormalViz();
        this.smallTriangle2.disableNormalViz();
    }

    initMaterials(scene){
    // Red 
    this.red = new CGFappearance(scene);
    this.red.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.red.setDiffuse(1, 0, 0, 1.0);
    this.red.setSpecular(1, 1, 1, 1.0);
    this.red.setShininess(10.0);

    // Green 
    this.green = new CGFappearance(scene);
    this.green.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.green.setDiffuse(0, 1, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);
    this.green.setShininess(10.0);

    // Blue
    this.blue = new CGFappearance(scene);
    this.blue.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.blue.setDiffuse(0, 0, 1, 1.0);
    this.blue.setSpecular(1, 1, 1, 1.0);
    this.blue.setShininess(10.0);

    // Orange 
    this.orange = new CGFappearance(scene);
    this.orange.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.orange.setDiffuse(255/255,140/255,0, 1.0);
    this.orange.setSpecular(1, 1, 1, 1.0);
    this.orange.setShininess(10.0);

    // Pink 
    this.pink = new CGFappearance(scene);
    this.pink.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.pink.setDiffuse(255/255,182/255,193/255, 1.0);
    this.pink.setSpecular(0, 0, 0, 1.0);
    this.pink.setShininess(10.0);

    // Yellow 
    this.yellow = new CGFappearance(scene);
    this.yellow.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.yellow.setDiffuse(1, 1, 0, 1.0);
    this.yellow.setSpecular(1, 1, 1, 1.0);
    this.yellow.setShininess(10.0);

    // Purple
    this.purple = new CGFappearance(scene);
    this.purple.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.purple.setDiffuse(0.5, 0, 0.5, 1.0);
    this.purple.setSpecular(1, 1, 1, 1.0);
    this.purple.setShininess(10.0);
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

