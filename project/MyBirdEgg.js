import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

export const EggStates = {
    IN_NEST: 0,
    FALLING: 1,
    ON_GROUND: 2,
    STOP: 3
};

export class MyBirdEgg extends CGFobject {
    constructor(scene, x=0, y=0, z=0, angleY=0, status=EggStates.ON_GROUND) {
        super(scene);
        this.eggtexture = new CGFappearance(this.scene);
        this.eggtexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.eggtexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggtexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.eggtexture.setShininess(10.0);

        this.eggtexture.loadTexture('images/egg.jpg');
        this.sphere = new MySphere(this.scene, 1, 4, 4);

        this.position = { x: x, y: y, z: z };
        this.angleY = angleY;
        this.status = status;
    }

    display() {
        this.eggtexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.angleY, 0, 1, 0);
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }

    setFillMode() { 
        this.sphere.setFillMode();
	}

	setLineMode() 
    { 
        this.sphere.setLineMode();
	};

    deleteInstance() {
        // Delete the reference to the current instance
        console.log("deleted");
        delete this;
    }
}

