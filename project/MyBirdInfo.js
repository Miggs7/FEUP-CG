import {CGFinterface} from '../lib/CGF.js';
import {MyBird} from './MyBird.js'

export class MyBirdInfo extends CGFobject {
    constructor(scene) {
        super(scene);

        this.bird = new MyBird(this.scene);

        this.speed = 0;
        this.rotationAngle = 0;
        this.posX = 0;
        this.posY = initialPosY;
        this.posZ = 0;

        this.lastTime = 0;
    }

    rotate(angle) {
        this.angle+=angle;
    }

    speedUp(value) {
        this.speed += value;
    }

    reset() {
        this.speed = 0;
        this.rotationAngle = 0;
        this.posX = 0;
        this.posY = initialPosY;
        this.posZ = 0;
    }

    update(t) {
    var deltaT = t - this.previousTime;

    this.posX += Math.sin(this.angleY) * this.velocity;
    this.posZ += Math.cos(this.angleY) * this.velocity;
    
    this.position += this.velocity * (deltaT / 1000);

    this.previousTime = t;
    }
}
