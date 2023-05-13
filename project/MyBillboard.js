import {CGFobject} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.plane = new MyPlane(this.scene, 30);

        this.position = { x: x, y: y, z: z };
    }

    display() {
        this.scene.pushMatrix();// Translate to the billboard position
        // Translate to the billboard position
        //this.scene.translate(this.position.x, this.position.y, this.position.z);

        // camera position
        let cp = vec3.fromValues(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        // object position
        let p = vec3.fromValues(this.position.x, this.position.y, this.position.z);
        // normal vector
        let n = vec3.fromValues(this.plane.normals[0], this.plane.normals[1], this.plane.normals[2]);
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
        console.log("angle = " + angle);
        console.log("u = " + u);

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

}