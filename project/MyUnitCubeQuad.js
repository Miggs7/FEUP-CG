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
        this.texTop = top;
        this.texFront = front;
        this.texRight = right;
        this.texBack = back;
        this.texLeft = left;
        this.texBottom = bottom;

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
        this.material.texture = this.texFront;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0.5);
        this.quad1.display();
        this.scene.popMatrix();

        // Right
        this.material.texture = this.texRight;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Top
        this.material.texture = this.texTop;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0.5);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Back
        this.material.texture = this.texBack;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Left
        this.material.texture = this.texLeft;
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.quad1.display();
        this.scene.popMatrix();

        // Bottom	
        this.material.texture = this.texBottom;
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
        this.material.texture = this.texTop;
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz() {
        this.quad1.enableNormalViz();
    }

    disableNormalViz() {
        this.quad1.disableNormalViz();
    }
}