import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene) {
		super(scene);

        this.quad1 = new MyQuad(this.scene);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0.5);
        this.quad1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0.5);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();
    }
}