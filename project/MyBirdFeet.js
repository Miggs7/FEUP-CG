import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyBirdFeet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdFeet extends CGFobject{

    constructor(scene) {
		super(scene);

        this.initMaterials(this.scene);

        this.quad1 = new MyQuad(this.scene);
	}

    display() {

        this.pink.apply();
        // Front
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.75,1);
        this.quad1.display();
        this.scene.popMatrix();

        // Front 2
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,0.25,1);
        this.quad1.display();
        this.scene.popMatrix();
    }
    initMaterials(scene) {
        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(0.9, 0.6, 0.6, 1.0);
        this.pink.setDiffuse(0.9, 0.6, 0.6, 1.0);
        this.pink.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.pink.setShininess(10.0);
    }
    


    enableNormalViz() {
        this.quad1.enableNormalViz();
    }

    disableNormalViz() {
        this.quad1.disableNormalViz();
    }
}