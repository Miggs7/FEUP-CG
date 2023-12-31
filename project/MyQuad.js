import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
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
            2,3,1,          //DCB

			// face de tras
			0,1,2,          
			2,1,3           
		];

		this.texCoords = [
			0, 1,
			0, 0,
			1, 1,
			1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

	setFillMode() { 
		this.indices=this.indicesTris;
		this.primitiveType=this.scene.gl.TRIANGLES;
	}

	setLineMode() 
	{ 
		this.indices=this.indicesLines;
		this.primitiveType=this.scene.gl.LINES;
	};
}

