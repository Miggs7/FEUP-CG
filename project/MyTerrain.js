import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject{

    constructor(scene) {
		super(scene);

        this.plane = new MyPlane(this.scene, 30);

        this.terrainTexture = new CGFtexture(this.scene, "./images/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "./images/heightmap2.jpg");
        this.terrainGradient = new CGFtexture(this.scene, "./images/altimetry.png");
        
        this.terrainShader = new CGFshader(this.scene.gl, "./shaders/terrain.vert", "./shaders/terrain.frag");

        this.terrainShader.setUniformsValues({terrainTexture: 0});
        this.terrainShader.setUniformsValues({terrainHeightMap: 1});
        this.terrainShader.setUniformsValues({terrainGradient: 2});

	}

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTexture.bind(0);
        this.terrainMap.bind(1);
        this.terrainGradient.bind(2);
        this.scene.translate(0,-50,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.plane.enableNormalViz();
    }

    disableNormalViz() {
        this.plane.disableNormalViz();
    }

    setFillMode() { 
        this.plane.setFillMode();
	}

	setLineMode() { 
        this.plane.setLineMode();
    }
}