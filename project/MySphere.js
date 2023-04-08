import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the sphere
 * @param stacks - number of divisions along the Y axis (latitude)
 * @param slices - number of divisions around the Y axis (longitude)
 */
export class MySphere extends CGFobject {
    constructor(scene, radius, stacks, slices) {
        super(scene);
        this.radius = radius;
        this.stacks = stacks;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var theta, phi; // angles
        var x, y, z; // coordinates
        var sinTheta, sinPhi, cosTheta, cosPhi; // sin and cos values for angles
        var texS, texT; // texture coordinates

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

            // maybe scaling(radius) would ve been good idea?
            this.vertices.push(this.radius * x, this.radius * y, this.radius * z);

            // textCoords
            texS = 1 - j / this.slices;
            texT = 1 - i / this.stacks;
            this.texCoords.push(texS, texT);

            // normals
            this.normals.push(x, y, z);
        }
    }

    for (var i = 0; i < this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {
            var first = i * (this.slices + 1) + j;
            var second = first + this.slices + 1;
            this.indices.push(first, second, first + 1);
            this.indices.push(second, second + 1, first + 1);
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
}
