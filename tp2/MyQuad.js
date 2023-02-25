import {CGFobject} from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject{
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
		this.vertices = [
			0,0,0,          //A 0
            0,1,0,          //B 1
            1,0,0,          //D 2
            1,1,0           //C 3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face ABCD
            0,2,1,          //ADB
            2,3,1           //DCB
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}