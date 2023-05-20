import { CGFobject, CGFappearance } from '../lib/CGF.js';

export const EggStates = {
    IN_NEST: 0,
    FALLING: 1,
    ON_GROUND: 2,
    STOP: 3
};

/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the sphere
 * @param stacks - number of divisions along the Y axis (latitude)
 * @param slices - number of divisions around the Y axis (longitude)
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene, radius, stacks, slices, x=0, y=0, z=0, angleY=0, eggState = EggStates.ON_GROUND) {
        super(scene);
        this.radius = radius;
        this.stacks = stacks;
        this.slices = slices;
        this.initBuffers();

        this.position = {x: x, y: y, z: z};
        this.angleY = angleY;
        this.eggState = eggState;

        this.eggtexture = new CGFappearance(this.scene);
        this.eggtexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.eggtexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggtexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.eggtexture.setShininess(10.0);

        this.eggtexture.loadTexture('images/egg.jpg');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var theta, phi;                         // angles
        var x, y, z;                            // coordinates
        var sinTheta, sinPhi, cosTheta, cosPhi; // sin and cos values for angles
        var texS, texT;                         // texture coordinates

    for (var i = 0; i <= this.stacks; i++) {

        // phi = angle along the XY
        phi = i * Math.PI / this.stacks;
        sinPhi = Math.sin(phi);
        cosPhi = Math.cos(phi);

        for (var j = 0; j <= this.slices; j++) {

            // theta = angle along the XZ
            theta = j * 2 * Math.PI / this.slices;
            sinTheta = Math.sin(theta);
            cosTheta = Math.cos(theta);
            
            // coodinates
            x = cosTheta * sinPhi;
            y = cosPhi;
            z = sinTheta * sinPhi;

            // scale the coordinates to create an egg shape
            x *= this.radius;
            if (y >= 0) {
                y *= this.radius * 1.5; // elongate along the Y-axis to form an oval top
            } else {
                y *= this.radius; // keep the bottom hemisphere spherical
            }
            z *= this.radius;

            this.vertices.push(x, y, z);
            
            // texCoords
            texS = j / this.slices;
            texT = i / this.stacks;
            this.texCoords.push(texS, texT);

            // normals
            this.normals.push(x, y, z);
        }
    }

    // indices
    for (var i = 0; i < this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {
            var first = i * (this.slices + 1) + j;
            var second = first + this.slices + 1;
            this.indices.push(first + 1, second, first );
            this.indices.push(second + 1, second, first + 1);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices and stacks
     */
    updateBuffers(complexity) {
        this.stacks = 2 + Math.round(8 * complexity);
        this.slices = 3 + Math.round(16 * complexity);

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
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

    display() {
        this.eggtexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.angleY, 0, 1, 0);
        super.display();
        this.scene.popMatrix();
    }
}
