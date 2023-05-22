import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';
import {EggStates, MyBirdEgg} from './MyBirdEgg.js';

export class MyNest extends CGFobject {
    constructor(scene, x=0, y=0, z=0) {
        super(scene);

        this.position = { x: x, y: y, z: z };

        this.plane = new MyPlane(this.scene, 1);

        this.nesttexture = new CGFappearance(this.scene);
        this.nesttexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.nesttexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nesttexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.nesttexture.setShininess(10.0);
        this.nesttexture.loadTexture('images/hay.jpg');
        
        this.eggs = [];
    }

    display_nest(){
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(5, 1.5, 5);
        this.display();
        this.scene.popMatrix();

        this.eggs.forEach(egg => {
            egg.display();
        });
    }

    display() {
        this.nesttexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.45);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 0.1, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.45);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 0.1, 1);
        this.plane.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.45, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(0.9, 0.1, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.45, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(0.9, 0.1, 1);
        this.plane.display();
        this.scene.popMatrix();

        //interior
        this.scene.pushMatrix();
        this.scene.translate(0, 0.25, -0.45);
        this.scene.scale(0.9, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 0.45);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.9, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.45, 0.25, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.9, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.45, 0.25, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.9, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.9, 0.9, 1);
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

    addEgg(egg) {
        this.eggs.push(egg);
    }

    updateEggs(){
        this.eggs.forEach(egg => {
          switch (egg.eggState) {
            case EggStates.FALLING:
                if (egg.position.y <= this.position.y + 1.2) {
                    egg.eggState = EggStates.IN_NEST;
                    break;
                }
                egg.position.y -= 0.5;
                break;
            case EggStates.IN_NEST:
                let index = this.eggs.indexOf(egg) + 1;
                switch (index){
                    case 1:
                        egg.position.x = this.position.x + 1;
                        egg.position.z = this.position.z + 1;
                        break;
                    case 2:
                        egg.position.x = this.position.x + 1;
                        egg.position.z = this.position.z - 1;
                        break;
                    case 3:
                        egg.position.x = this.position.x - 1;
                        egg.position.z = this.position.z + 1;
                        break;
                    case 4:
                        egg.position.x = this.position.x - 1;
                        egg.position.z = this.position.z - 1;
                        break;
                    default:
                        break;
                }
                egg.eggState = EggStates.STOP;
                break;
            default:
                break;
            }
        });
      }
}
