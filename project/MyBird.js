import {CGFobject} from '../lib/CGF.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';
//import {MyBirdHead} from './MyBirdHead.js';

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        //this.cube = new MyUnitCubeQuad(this.scene);
        //this.head = new MyBirdHead(this.scene);
    }

    display() {

        //this.head.display();

    }
    enableNormalViz() {
        //this.head.enableNormalViz();
    }

    disableNormalViz() {
        //this.head.disableNormalViz();
    }

}