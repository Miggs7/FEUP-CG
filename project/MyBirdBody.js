import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';

/**
 * MyBirdBody
 * @constructor
 * @param scene - Reference to MyScene object
*/

export class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.initMaterials(this.scene);
    }

    display() {
        this.red.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/5,1,0,0);
        this.scene.scale(3/4,1.5,3/4);
        this.cube.display();
        this.scene.popMatrix();
    }

    initMaterials(scene) {
        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.3, 0, 0, 1);
        this.red.setDiffuse(0.6, 0, 0, 1);
        this.red.setSpecular(0.8, 0.8, 0.8, 1);
        this.red.setShininess(10.0);
    }

    enableNormalViz() {
        this.cube.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
    }

}