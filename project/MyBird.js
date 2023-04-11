import {CGFobject} from '../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(this.scene, 20);
    }

    display() {
        this.plane.display();
    }
    enableNormalViz() {
        this.plane.enableNormalViz();
    }

    disableNormalViz() {
        this.plane.disableNormalViz();
    }

}