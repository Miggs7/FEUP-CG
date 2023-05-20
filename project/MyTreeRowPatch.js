import {CGFobject} from '../lib/CGF.js';
import {MyBillboard} from './MyBillboard.js';

/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeRowPatch extends CGFobject{
    constructor(scene, x=0, y=0, z=0) {
        super(scene);

        // 6 trees that compose the patch in a 1x6 grid
        this.trees = [];

        // 1x6 grid of positions
        this.position = { x: x, y: y, z: z };

        const gridPositions = [
            [-15, 0, 0],
            [-9, 0, 0],
            [-3, 0, 0],
            [3 , 0, 0],
            [9 , 0, 0],
            [15 , 0, 0]
        ];
        
        //console.log(gridPositions);
        // random number of trees
        for (let i = 0; i < 6 ; i++){
            const max = 3;
            const min = -3;
            let x_randomFloat = Math.random() * (max - min) + min;
            let z_randomFloat = Math.random() * (max - min) + min;
            this.trees.push(
                new MyBillboard(
                    scene, 
                    this.position.x + x_randomFloat + gridPositions[i][0],
                    this.position.y + 0 + gridPositions[i][1],
                    this.position.z + z_randomFloat + gridPositions[i][2]
                )
            );
        }
    }

    display() {
        this.trees.forEach(tree => {
            tree.display();
        });
    }

    update(t) {
        this.trees.forEach(tree => {
            tree.update(t);
        });
    }
}