import {CGFobject, CGFshader,CGFappearance} from '../lib/CGF.js';
import {MyBirdHead} from './MyBirdHead.js';
import {MyBirdBody} from './MyBirdBody.js';
import {MyBirdTail} from './MyBirdTail.js';
import {MyBirdWing} from './MyBirdWing.js';
import {MyBirdFeet} from './MyBirdFeet.js';
import {MyBirdEgg} from './MyBirdEgg.js';

export const BirdStates = {
    MOVING: 0,
    CATCHING: 1,
    RETURNING: 2
};

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        // bird parts
        this.head = new MyBirdHead(this.scene);
        this.body = new MyBirdBody(this.scene);
        this.tail = new MyBirdTail(this.scene);
        this.wing1 = new MyBirdWing(this.scene, 0);
        this.wing2 = new MyBirdWing(this.scene, 1);
        this.feet = new MyBirdFeet(this.scene);
        
        // bird properties
        this.speed = 0;                         // initial velocity
        this.angleY = 0;                        // initial angle
        this.position = { x: 0, y: 3, z: 0 };   // initial position
        this.time = 0;                          // initial time
        this.angleWing = 0;                     // initial wing angle
        this.angleWing2 = 0;                    // initial wing angle
        this.birdState = BirdStates.MOVING;     // initial state
        this.egg = null;                        // initial egg

        this.downspeed = 0;

    }

    display() {
       
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.angleY, 0, 1, 0);
        if (this.speed < 10)
            this.scene.rotate(Math.PI / 6 * (this.speed/10), 1, 0, 0);
        else 
            this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.display_bird();
        
        this.scene.popMatrix();

        if (this.egg != null) {
            this.scene.pushMatrix();
            this.egg.display();
            this.scene.popMatrix();
        }
        
    }

    display_bird() {
        this.scene.pushMatrix();
        this.scene.translate(0,0.9,0.65);
        this.head.display();
        this.scene.popMatrix();
        
        this.body.display();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-1);
        this.scene.rotate(-Math.PI/10,1,0,0);
        this.tail.display();
        this.scene.popMatrix();
        
        /*left wing*/
        this.scene.pushMatrix();
        this.scene.translate(0.44,0.5,0);
        //wing flap
        this.scene.rotate(this.angleWing,0,0,1);
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/5,1,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1,0.75,1);
        this.wing1.display();
        this.scene.popMatrix();

        /*right wing*/
        this.scene.pushMatrix();
        this.scene.translate(-0.44,0.5,0);
        //wing flap
        this.scene.rotate(-this.angleWing,0,0,1);
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/5,1,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1,0.75,1);
        this.wing2.display();
        this.scene.popMatrix();
        
        /*left feet*/
        this.scene.pushMatrix();
        this.scene.translate(0.12,-1.25,-0.25);
        this.feet.display();
        this.scene.popMatrix();

        /*right feet*/
        this.scene.pushMatrix();
        this.scene.translate(-0.37,-1.25,-0.25);
        this.feet.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.body.enableNormalViz();
        this.tail.enableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.feet.enableNormalViz();
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.tail.disableNormalViz();
        this.wing1.disableNormalViz();
        this.wing2.disableNormalViz();
        this.feet.disableNormalViz();
    }

    setFillMode() { 
		this.head.setFillMode();
        this.body.setFillMode();
        this.tail.setFillMode();
		this.wing1.setFillMode();
        this.wing2.setFillMode();
        this.feet.setFillMode();
    }

	setLineMode() 
	{ 
        this.head.setLineMode();
        this.body.setLineMode();
        this.tail.setLineMode();
		this.wing1.setLineMode();
        this.wing2.setLineMode();
        this.feet.setLineMode();
    }
    
    update(t, eggToCatch = null) {
        var deltaTime = t - this.time;
        var aux = t/(100*Math.PI/2) % (2*Math.PI);

        this.position.y = this.position.y - 0.15*Math.cos(aux);

        this.time = t;

        //console.log(eggToCatch);
        //console.log(this.birdState);
        //console.log(this.position);

        if (this.egg != null) {
            this.egg.position.x = this.position.x;
            this.egg.position.y = this.position.y - 2;
            this.egg.position.z = this.position.z;
        }

        switch (this.birdState) {
            case BirdStates.MOVING:
                this.position.x += this.speed * Math.sin(this.angleY) * deltaTime / 1000;
                this.position.z += this.speed * Math.cos(this.angleY) * deltaTime / 1000;
                break;

            case BirdStates.CATCHING:
                this.position.y -= this.downspeed;

                if(eggToCatch.position.y + 2  >= this.position.y){
                    this.egg = eggToCatch;
                    this.birdState = BirdStates.RETURNING;
                }
                break;

            case BirdStates.RETURNING:
                this.position.y += this.downspeed;

                if (this.position.y >= 3) {
                    this.birdState = BirdStates.MOVING;
                }
                break;
        }


        if (this.speed > 0) {
            this.angleWing = Math.sin((t/(100*Math.PI/2) % (2*Math.PI)) + this.speed) * Math.PI / 4 + Math.PI / 2;
            this.angleWing2 = Math.sin((t/(100*Math.PI/2) % (2*Math.PI)) + this.speed) * Math.PI / 6; 
        } else {
            this.angleWing = Math.sin(t/(100*Math.PI/2) % (2*Math.PI)) * Math.PI / 4 + Math.PI / 2;
            this.angleWing2 = Math.sin(t/(100*Math.PI/2) % (2*Math.PI)) * Math.PI / 6;
        }

        this.wing1.update(this.angleWing2);
        this.wing2.update(this.angleWing2);

    }

    turn(v) {
        this.angleY += v;
        if (this.egg != null) {
            this.egg.angleY += v;
        }
    }

    accelerate(v) {
        this.speed += v;
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    reset() {
        this.speed = 0;
        this.angleY = 0;
        this.position = { x: 0, y: 3, z: 0 };
        this.time = 0;
        this.angleWing = 0;
        this.angleWing2 = 0;
        this.birdState = BirdStates.MOVING;
        this.egg = null;
    }

    setBirdState(state) {
        this.birdState = state;
    }

    getPosition() {
        const p = this.position;
        return p;
    }
}