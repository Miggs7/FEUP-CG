import {CGFobject} from '../lib/CGF.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,   // -x-y-z H 0
            0.5, -0.5, -0.5,    // +x-y-z C 1
            0.5, 0.5, -0.5,     // +x+y-z B 2
            -0.5, 0.5, 0.5,     // -x+y+z F 3
            0.5, -0.5, 0.5,     // +x-y+z D 4
            -0.5, -0.5, 0.5,    // -x-y+z E 5
            -0.5, 0.5, -0.5,    // -x+y-z G 6
            0.5, 0.5, 0.5,      // +x+y+z A 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face ABCD
            7, 4, 1,    // ADC
            7, 1, 2,    // ACB
            // face ADEF
            7, 3, 4,    // AFD
            3, 5, 4,    // FED
            // face ABGF
            7, 6, 3,    // AGF
            7, 2, 6,    // ABG
            // face HCBG
            2, 1, 0,    // HCB
            6, 2, 0,    // HBG
            // face EFGH
            5, 3, 0,    // EFH
            0, 3, 6,    // HFG
            // face CDEH
            0, 1, 4,    // DCH
            5, 0, 4     // DHE

		];

        this.normals = [
            //TODO
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,

        ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}