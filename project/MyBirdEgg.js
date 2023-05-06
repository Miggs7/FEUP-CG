import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

export class MyBirdEgg extends CGFobject {
    constructor(scene, x=0, y=0, z=0, angleY=0) {
        super(scene);
        this.eggtexture = new CGFappearance(this.scene);
        this.sphere = new MySphere(this.scene, 1, 20, 40);

        this.position = { x: x, y: y, z: z };
        this.angleY = angleY;
    }

    display() {
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

