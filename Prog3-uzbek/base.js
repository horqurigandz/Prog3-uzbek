const Soldiers = require("./soldiers");
const Tanks = require("./tanks");
module.exports = class Base{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 10;
        matrix.changeMatrix(this.y,this.x,5);
    }
    search(target){
        let points = [
             [this.x - 1, this.y - 1], //up left
             [this.x    , this.y - 1], //up
             [this.x + 1, this.y - 1], // up right
             [this.x - 1, this.y    ], //left
             [this.x + 1, this.y    ], //right
             [this.x - 1, this.y + 1], //down left
             [this.x    , this.y + 1], //down
             [this.x + 1, this.y + 1],  // down right
             [this.x - 2, this.y - 2], 
             [this.x - 1, this.y - 2], 
             [this.x    , this.y - 2], 
             [this.x + 1, this.y - 2], 
             [this.x - 2, this.y - 1], 
             [this.x + 2, this.y - 1], 
             [this.x - 2 ,this.y    ], 
             [this.x + 2, this.y    ],
             [this.x - 2, this.y + 1], 
             [this.x + 2, this.y + 1], 
             [this.x - 2, this.y + 2], 
             [this.x - 1, this.y + 2], 
             [this.x    , this.y + 2], 
             [this.x + 1, this.y + 2], 
             [this.x + 2, this.y + 2],
             [this.x + 2, this.y - 2]

        ];
        let emptyPoints = [];
        points.forEach(element => {
            if( matrix.getMatrix()[0].length > element[0] && element[0]>=0 && matrix.getMatrix().length > element[1] && element[1]>=0){
                target.forEach(tg => {
                    if(matrix.getMatrix()[element[1]][element[0]] == tg){
                        emptyPoints.push(element);
                    }
                }); 
            }
        });
        return emptyPoints;
    }
    dead(){
        if(matrix.getMatrix()[this.y][this.x] != 5){
            baseArr.splice(baseArr.indexOf(this),1);             
        }
    }
    spawn(){
        let detect = this.search([2]);
        let found = this.search([1])[Math.floor(Math.random()*this.search([1]).length)] ;
        if(found){
            this.multiply++;

        }
        if(detect.length > 0 && this.multiply >10){
            if(Math.round(Math.random()*4) == 1){
                enemyArr.push(new Tanks(found[0],found[1]))
            }
            else{
                enemyArr.push(new Soldiers(found[0],found[1]))
            }
            this.multiply = 0;
        }
    }
    update(){
        this.dead();
        this.spawn();
    }
}