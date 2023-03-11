import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject{
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }

    initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for (var i = 0; i <= this.stacks; i++) {
            ang = 0;
            if (i == 0)
                var center = i*this.slices;
            else
                var center = i*this.slices+i;
            this.vertices.push(0, 0, i); // stack center
            for (var j = 1; j <= this.slices; j++) { //ex: 6 lados, 1, 2, 3, 4, 5, 6
                this.vertices.push(Math.cos(ang), Math.sin(ang), i);
                
                if (i == 0) {
                    if (j+1 > this.slices) {
                        this.indices.push(center,1,center+(j));
                    } else {
                        this.indices.push(center,center+j+1,center+(j));
                    }
                }

                if (j+1 > this.slices) {
                    //hexagono
                    // center, vertice do angulo atual e vertice inicial
                    this.indices.push(center,center+j,center+1);
                } else {
                    //hexagono
                    // center, vertice do angulo atual e proximo vertice
                    this.indices.push(center,center+j,center+(j+1));
                }
  
                ang+=alphaAng;
            }
        }
        
        for (var i = 0; i < this.vertices.length; i++) {
            console.log("i = " + i  +" value = "+ this.vertices[i]);
        }
        /*for(var i = 0; i < this.indices.length; i++){
            console.log("i = " + this.indices[i]);
        }*/

        // indice das faces laterais
        for(var i = 0; i < this.vertices.length; i+=(this.slices+1)){
            for (var j = i+1; j <= i + this.slices; j++) {
                if(j % (this.slices+1) == 6){
                    //console.log("j = " + j);
                    //console.log("i = " + i);
                    //console.log("j + this.slices + 1" + (j + this.slices + 1));
                    this.indices.push(j, i + 1, j + this.slices + 1);
                    this.indices.push(i+1, i+1+this.slices+1, j + this.slices + 1);
                }
                //console.log(j,j+1,j + this.slices + 1);
                this.indices.push(j, j + 1, j + this.slices + 1);
                //console.log(j + 1, j + this.slices + 2, j + this.slices + 1);
                this.indices.push(j + 1, j + this.slices + 2, j + this.slices + 1);
            }
        }

        // normals
        var norm = alphaAng/2;
        
        
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}