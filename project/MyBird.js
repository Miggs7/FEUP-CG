import {CGFobject} from '../lib/CGF.js';
import {MyBirdHead} from './MyBirdHead.js';
import {MyBirdBody} from './MyBirdBody.js';
import {MyBirdTail} from './MyBirdTail.js';
import {MyBirdWing} from './MyBirdWing.js';
import {MyBirdFeet} from './MyBirdFeet.js';

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.head = new MyBirdHead(this.scene);
        this.body = new MyBirdBody(this.scene);
        this.tail = new MyBirdTail(this.scene);
        this.wing = new MyBirdWing(this.scene);
        this.feet = new MyBirdFeet(this.scene);
    }

    display() {
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
        this.scene.translate(0.44,0,0);
        this.scene.rotate(Math.PI/5,1,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1,0.75,1);
        this.wing.display();
        this.scene.popMatrix();

        /*right wing*/
        this.scene.pushMatrix();
        this.scene.translate(-0.44,0,0);
        this.scene.rotate(Math.PI/5,1,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1,0.75,1);
        this.wing.display();
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
        this.wing.enableNormalViz();
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.tail.disableNormalViz();
        this.wing.disableNormalViz();
    }
}