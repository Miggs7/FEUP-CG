import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    /*top (+y) front(+z) right(+x) back(-z) left(-x) bottom(-y)
     */
    constructor(scene) {
		super(scene);
        
        this.quad1 = new MyQuad(this.scene);
        this.quad1.texCoords = [
            0,0,
            0,1,
            1,0,
            1,1
        ];
	}

    display() {
        // Front

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0.5);
        this.quad1.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Top

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0.5);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Back

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Left

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Bottom	
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.quad1.enableNormalViz();
    }

    disableNormalViz() {
        this.quad1.disableNormalViz();
    }

    setFillMode() { 
        this.quad1.setFillMode();
	}

	setLineMode() 
	{ 
        this.quad1.setLineMode();
	};
}