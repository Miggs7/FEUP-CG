import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyBirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject{

    constructor(scene) {
		super(scene);

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
        //this.material.texture = this.texFront;
        this.red.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.25,-0.5,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();

        // Front 2
        //this.material.texture = this.texFront;
        //this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.25,0.25,0.5);
        this.scene.scale(0.5,0.25,1);
        this.quad1.display();
        this.scene.popMatrix();


        // Right 1
        //this.material.texture = this.texRight;
        //this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.25,-0.5,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();

        // right 2

        this.scene.pushMatrix();
        this.scene.translate(0.25,0.25,0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.25,1);
        this.quad1.display();
        this.scene.popMatrix();

        
        // Top
        //this.material.texture = this.texTop;
        //this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.25,0.5,0.5);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();
        

        this.scene.pushMatrix();
        this.scene.translate(-0.25,0.25,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();

        // Back
        //this.material.texture = this.texBack;
        //this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.25,-0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();

        // Left
        //this.material.texture = this.texLeft;
        //this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.25,-0.5,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(0.5,1,1);
        this.quad1.display();
        this.scene.popMatrix();

        // right 2

        this.scene.pushMatrix();
        this.scene.translate(-0.25,0.25,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.25,1);
        this.quad1.display();
        this.scene.popMatrix();

        // Bottom	
        //this.material.texture = this.texBottom;
        //this.material.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.25,-0.5,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,1);
        this.quad1.display();
        this.scene.popMatrix();

        //beak right
        this.darkGray.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.125,-0.2,0.45);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.45,0.45,1);
        this.quad1.display();
        this.scene.popMatrix();

        //beak left
        
        this.scene.pushMatrix();
        this.scene.translate(-0.125,-0.2,0);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(0.45,0.45,1);
        this.quad1.display();
        this.scene.popMatrix();

        //beak front

        this.scene.pushMatrix();
        this.scene.translate(-0.125,-0.2,0.45);
        this.scene.scale(0.25,0.45,1);
        this.quad1.display();
        this.scene.popMatrix();

        //beak bottom
        this.scene.pushMatrix();
        this.scene.translate(-0.125,-0.2,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,0.45,1);
        this.quad1.display();
        this.scene.popMatrix();

    }

    initMaterials(scene) {
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.texture = new CGFtexture(scene, 'images/packet/assets/minecraft/textures/entity/parrot/parrot_red_blue.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        // Red 
        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.red.setDiffuse(1, 0, 0, 1.0);
        this.red.setSpecular(1, 1, 1, 1.0);
        this.red.setShininess(10.0);

        // Dark Gray
        this.darkGray = new CGFappearance(scene);
        this.darkGray.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.darkGray.setDiffuse(0.2, 0.2, 0.2, 1.0);
        this.darkGray.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.darkGray.setShininess(10.0);

    }

    enableNormalViz() {
        this.quad1.enableNormalViz();
    }

    disableNormalViz() {
        this.quad1.disableNormalViz();
    }
}