import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';

/**
 * MybirdTail
 * @constructor
 * @param scene - Reference to MyScene object
*/

export class MyBirdTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.75,0.25,1);
        this.cube.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.cube.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
    }

    setFillMode() { 
		this.cube.setFillMode();
	}

	setLineMode() 
	{ 
		this.cube.setLineMode();
    }

}