import {CGFobject} from '../lib/CGF.js';
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
        // Diamond 
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.diamond.display();
        this.scene.popMatrix();
        
        // Triangle Normal 
        this.scene.pushMatrix();
        this.scene.translate(-0.60, 3.60, 0);
        this.scene.rotate(Math.PI/2 + Math.PI,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();
      
        // Paralelogram
        this.scene.pushMatrix();
        this.scene.translate(-1.905, -1.920, 0);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.parallelogram.display();
        this.scene.popMatrix();
      
        // Small Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.6,3.6,0);
        this.scene.rotate(Math.PI/4 + Math.PI,0,0,1);
        this.smallTriangle.display();
        this.scene.popMatrix();
      
        // Small Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(0.5,-2.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.smallTriangle2.display();
        this.scene.popMatrix();
      
        // Big Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.bigTriangle.display();
        this.scene.popMatrix();
      
        // Big Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(0.1,0.9,0);
        this.bigTriangle2.display();
        this.scene.popMatrix();
    }
}

