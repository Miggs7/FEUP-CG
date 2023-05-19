import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';
import {MyPrism} from './MyPrism.js';

/**
 * MyBirdWing
 * @constructor
 * @param scene - Reference to MyScene object
*/

export class MyBirdWing extends CGFobject {
    constructor(scene, side) {
        super(scene);

        this.initMaterials(this.scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.prism = new MyPrism(this.scene, 3, 1);
        this.angle = 0;
        // 0 left wing, 1 right wing
        this.side = side;
    }

    display() {
        this.red.apply();
        this.scene.pushMatrix();
        this.scene.scale(1,1,0.125);
        this.cube.display();
        this.scene.popMatrix();

        this.darkGray.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        if (this.side == 0)
            this.scene.rotate(this.angle, 0, 1, 0);
        else
            this.scene.rotate(-this.angle, 0, 1, 0);
        this.scene.translate(0.3,0,-0.0625);
        this.scene.scale(0.6,0.578,0.125);
        this.prism.display();
        this.scene.popMatrix();
    }

    initMaterials(scene) {
        /*
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.texture = new CGFtexture(scene, 'images/packet/assets/minecraft/textures/entity/parrot/parrot_red_blue.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');*/

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
        this.cube.enableNormalViz();
        this.prism.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
        this.prism.disableNormalViz();
    }

    setFillMode() { 
		this.cube.setFillMode();
        this.prism.setFillMode();
	}

	setLineMode() 
	{ 
		this.cube.setLineMode();
        this.prism.setLineMode();
    }

    update(angle) {
        this.angle = angle;
    }
}