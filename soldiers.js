class Soldiers{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.calldown = 0;
        matrix.changeMatrix(this.y,this.x,4); 
    }
    
    search(target,what){
        let points;
        if(what == "move"){
         points = [
             [this.x - 1, this.y - 1], //up left
             [this.x    , this.y - 1], //up
             [this.x + 1, this.y - 1], // up right
             [this.x - 1, this.y    ], //left
             [this.x + 1, this.y    ], //right
             [this.x - 1, this.y + 1], //down left
             [this.x    , this.y + 1], //down
             [this.x + 1, this.y + 1]  // down right
            
        ];
    }
    else if(what == "shot"){
         points = [
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
    }
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
    attack(){
        let found = random(this.search([1],"move"));
        let found1 = random(this.search([2,6],"shot"));
        if(found1){
            this.calldown++;
        }
        if( found1 && this.calldown > 4){
            matrix.changeMatrix(found1[1],found1[0],6);
            
        }
        else if( !found1&&found && Math.round(Math.random()*3) ==1){
            humansArr.push(new Humans(this.x,this.y));
            this.x = found[0];
            this.y = found[1];
            matrix.changeMatrix(this.y,this.x,4); 

        }

    }
  
    dead(){
        if(matrix.getMatrix()[this.y][this.x] !=4){
            enemyArr.splice(enemyArr.indexOf(this),1);
            matrix.changeMatrix(this.y,this.x,6); 
    
        }
    }
    update(){
        this.attack();
        this.dead();
    }
}