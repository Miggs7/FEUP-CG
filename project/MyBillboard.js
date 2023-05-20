import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    constructor(scene, x = 0, y = 0, z = 0) {
        super(scene);
        this.plane = new MyPlane(this.scene, 30);

        this.position = { x: x, y: y, z: z };
        /*
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/billboardtree.png');*/

        this.treeTexture = new CGFtexture(this.scene, 'images/billboardtree.png');

        this.treeShader = new CGFshader(this.scene.gl, "./shaders/tree.vert", "./shaders/tree.frag");
        this.treeShader.setUniformsValues({ treeTexture: 0 });
        this.treeShader.setUniformsValues({ timeFactor: 0 });
        this.treeShader.setUniformsValues({ uWindIntensity: 0.6 });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.treeShader);
        this.treeTexture.bind(0);

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(5,10,5);
        // camera position
        let cp = vec3.fromValues(this.scene.camera.position[0], 0, this.scene.camera.position[2]);
        // object position
        let p = vec3.fromValues(this.position.x, 0, this.position.z);
        // normal vector
        let n = vec3.fromValues(this.plane.normals[0], 0, this.plane.normals[2]);
        // vector v, from object to camera
        let v = vec3.create();
        vec3.sub(v, cp, p);
        vec3.normalize(v, v);
        // vector u, perpendicular to v and n
        let u = vec3.create();
        vec3.cross(u, v, n);
        vec3.normalize(u, u);
        // cos angle between v and n
        let cos_angle = vec3.dot(v, n);
        // the angle
        let angle = Math.acos(cos_angle);

        // Rotate the plane so that it faces the camera
        this.scene.rotate(-angle, u[0], u[1], u[2]);

        // Display the plane
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

    update(t){
        this.treeShader.setUniformsValues({timeFactor: t / 100 % 1000});
    }

}