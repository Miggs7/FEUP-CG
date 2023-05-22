import {CGFobject} from '../lib/CGF.js';
import {MyBillboard} from './MyBillboard.js';

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject{
    constructor(scene, x=0, y=0, z=0) {
        super(scene);

        // 9 trees that compose the patch in a 3x3 grid
        this.trees = [];

        // 3x3 grid of positions
        this.position = { x: x, y: y, z: z };

        const gridPositions = [
            [-7, 0, -7],
            [0 , 0, -7],
            [7 , 0, -7],
            [-7, 0, 0 ],
            [0 , 0, 0 ],
            [7 , 0, 0 ],
            [-7, 0, 7 ],
            [0 , 0, 7 ],
            [7 , 0, 7 ]
        ];
        
        console.log(gridPositions);
        // random number of trees
        for (let i = 0; i < 9 ; i++){
            const max = 2;
            const min = -2;
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

    setFillMode() {
        this.trees.forEach(tree => {
            tree.setFillMode();
        });
	}

	setLineMode() {
        this.trees.forEach(tree => {
            tree.setLineMode();
        });
	};

    enableNormalViz() {
        this.trees.forEach(tree => {
            tree.enableNormalViz();
        });
    }

    disableNormalViz(){
        this.trees.forEach(tree => {
            tree.disableNormalViz();
        });
    }

}