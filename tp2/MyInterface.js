import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');
        
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');
        
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');
        
        this.gui.add(this.scene, 'displaySmallTriangle').name('Display SmallTriangle');
        this.gui.add(this.scene, 'displaySmallTriangle2').name('Display SmallTriangle2');

        this.gui.add(this.scene, 'displayBigTriangle').name('Display BigTriangle');
        this.gui.add(this.scene, 'displayBigTriangle2').name('Display BigTriangle2');
        
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');
        this.gui.add(this.scene, 'displayCube').name('Display Cube');
        this.gui.add(this.scene, 'displayEx3_5').name('Display Ex3_5');

        this.gui.add(this.scene, 'displayCubeQuad').name('Display Cube Quad');
        this.gui.add(this.scene, 'displayEx4_3').name('Display Ex4_3');

        //Slider element in GUI
        //this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}