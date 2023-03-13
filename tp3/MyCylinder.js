import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject{
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }

    initBuffers() {
        //console.log("this is cylinder");
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
                else if (j+1 > this.slices) {
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

        // indice das faces laterais
        for(var i = 0; i < this.vertices.length/3; i+=(this.slices+1)){
            for (var j = i+1; j <= i + this.slices; j++) {
                //console.log("j=" +j);
                if(j % (this.slices+1) == this.slices){
                    //console.log("j = " + j);
                    //console.log("i = " + i);
                    //console.log("j + this.slices + 1" + (j + this.slices + 1));
                    //console.log(j, i + 1, j + this.slices + 1);
                    //console.log(i+1, i+1+this.slices+1, j + this.slices + 1);
                    this.indices.push(j, i + 1, j + this.slices + 1);
                    this.indices.push(i+1, i+1+this.slices+1, j + this.slices + 1);
                }
                else {
                    //console.log(j,j+1,j + this.slices + 1);
                    this.indices.push(j, j + 1, j + this.slices + 1); //1,2,8
                    //console.log(j + 1, j + this.slices + 2, j + this.slices + 1);
                    this.indices.push(j + 1, j + this.slices + 2, j + this.slices + 1);
                }
                
            }
        }
        // normals
        var norm = 0; 
        for(var i = 0; i < this.vertices.length/(3); i+= (this.slices+1)){ //por cada base
            if (i == 0){
                this.normals.push(0,0,-1);
            }
            else {
                this.normals.push(0,0,1);
            }
            for(var j = i+1; j <= i + this.slices; j++) {
                if (j <= this.slices){
                   this.normals.push(Math.cos(norm), Math.sin(norm), -Math.cos(Math.PI/4)); 
                }
                else if (j >= this.stacks*this.slices + this.stacks) {
                    this.normals.push(Math.cos(norm), Math.sin(norm), Math.cos(Math.PI/4));
                }
                else {
                    this.normals.push(Math.cos(norm), Math.sin(norm), 0);
                }
                
                norm += alphaAng;
            }
        }

        console.log("vertices = " + this.vertices.length/3);
        console.log("normals = " + this.normals.length/3);
        //console.log("indices = " + this.indices.length/3);

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