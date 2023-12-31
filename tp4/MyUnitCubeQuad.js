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
    constructor(scene,top="", front = "",right ="",back = "",left = "",bottom="") {
		super(scene);
        this.mineTop = top;
        this.mineFront = front;
        this.mineRight = right;
        this.mineBack = back;
        this.mineLeft = left;
        this.mineBottom = bottom;

        this.initMaterials(this.scene);

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
        this.material.texture = this.mineFront;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0.5);
        this.quad1.display();
        this.scene.popMatrix();

        // Right
        this.material.texture = this.mineRight;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Top
        this.material.texture = this.mineTop;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0.5);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Back
        this.material.texture = this.mineBack;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Left
        this.material.texture = this.mineLeft;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Bottom	
        this.material.texture = this.mineBottom;
        this.material.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

    }

    initMaterials(scene) {
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.texture = this.mineTop;
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

}