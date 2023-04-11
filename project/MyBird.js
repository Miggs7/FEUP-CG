import {CGFobject} from '../lib/CGF.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display() {

        //minecraft parrot
        //head
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.5, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(0, 0.7, 0.5);
        this.scene.scale(0.5, 0.4, 0.25);
        this.cube.display();
        this.scene.popMatrix();
        

        //body
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(7*Math.PI/10,1,0,0);
        this.scene.scale(0.5, 0.5, 1);
        //this.cube.display();
        this.scene.popMatrix();

    }
    enableNormalViz() {
        this.cube.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
    }

}