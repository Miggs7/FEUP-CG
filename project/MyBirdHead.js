import { CGFobject } from "../lib/CGF";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

export class MyBirdHead extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display() {
        //head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.5, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, -0.125);
        this.scene.scale(0.5, 0.2, 0.25);
        this.cube.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 0);
        this.scene.scale(0.35, 0.2, 0.25);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 0.125);
        this.scene.scale(0.25, 0.2, 0.25);
        this.cube.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.cube.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
    }
}