import { CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to be applied to the sphere
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.initMaterials(this.scene);

        this.sphere = new MySphere(this.scene, 200, 100, 100, 1);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    initMaterials(scene) {
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
        this.appearance.texture = this.texture;
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}