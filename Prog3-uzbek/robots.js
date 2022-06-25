module.exports =class Robots{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        matrix.changeMatrix(this.y,this.x,2);
    }
    search(target){
        let points = [
            // [this.x - 1, this.y - 1], //up left
            // [this.x    , this.y - 1], //up
            // [this.x + 1, this.y - 1], // up right
            // [this.x - 1, this.y    ], //left
            // [this.x + 1, this.y    ], //right
            // [this.x - 1, this.y + 1], //down left
            // [this.x    , this.y + 1], //down
            // [this.x + 1, this.y + 1]  // down right
            
        ];
        let emptyPoints = [];
        if(cursorDir != null){
            if(cursorDir[0] == true){
                points.push([this.x, this.y - 1]);
                points.push([this.x, this.y - 1]);
                points.push([this.x, this.y - 1]);
                points.push([this.x, this.y - 1]);
                points.push([this.x - 1, this.y - 1]);
                points.push([this.x - 1, this.y - 1]);
                points.push([this.x + 1, this.y - 1]);
                points.push([this.x + 1, this.y - 1]);
            }
            else if(cursorDir[1] == true){
                points.push([this.x    , this.y + 1]);
                points.push([this.x    , this.y + 1]);
                points.push([this.x    , this.y + 1]);
                points.push([this.x    , this.y + 1]);
                points.push([this.x - 1, this.y + 1]);
                points.push([this.x - 1, this.y + 1]);
                points.push([this.x + 1, this.y + 1]);
                points.push([this.x + 1, this.y + 1]);
            }
            if(cursorDir[2] == true){
                points.push([this.x - 1, this.y    ]);
                points.push([this.x - 1, this.y    ]);
                points.push([this.x - 1, this.y    ]);
                points.push([this.x - 1, this.y    ]);
                points.push([this.x - 1, this.y - 1]);
                points.push([this.x - 1, this.y - 1]);
                points.push([this.x - 1, this.y + 1]);
                points.push([this.x - 1, this.y + 1]);
            }
            else if(cursorDir[3] == true){
                points.push([this.x + 1, this.y    ]);
                points.push([this.x + 1, this.y    ]);
                points.push([this.x + 1, this.y    ]);
                points.push([this.x + 1, this.y    ]);
                points.push([this.x + 1, this.y - 1]);
                points.push([this.x + 1, this.y - 1]);
                points.push([this.x + 1, this.y + 1]);
                points.push([this.x + 1, this.y + 1]);
            }
        }
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
    attack(){
        let found = this.search([1,4,5,6,7])[Math.floor(Math.random()*this.search([1,4,5,6,7]).length)] ;
        if(found){
            this.multiply++;
            }
        else{
            this.multiply = 0;
        }
        if(this.multiply >= 5 && found){
            robotsArr.push(new Robots(found[0],found[1]));
            this.multiply = 0;

        }
        

    } 
    dead(){
        if(matrix.getMatrix()[this.y][this.x] != 2){
            
            robotsArr.splice(robotsArr.indexOf(this),1)   ;
                  
        }
    }
    update(){
        this.attack();
        this.dead();
    }
}
