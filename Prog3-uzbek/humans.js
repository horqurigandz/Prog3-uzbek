module.exports = class Humans{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        matrix.changeMatrix(this.y,this.x,1);
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
             [this.x + 1, this.y + 1]  // down right
            
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
    attack(){
        let found = this.search([2,6])[Math.floor(Math.random()*this.search([2,6]).length)];
        if(found){
            this.multiply++;
            }
        else{
            this.multiply = 0;
        }
        
        if(this.multiply >= mult && found ){
            humansArr.push(new Humans(found[0],found[1]));
            
            this.multiply = 0;

        }
    }
    dead(){
        if(matrix.getMatrix()[this.y][this.x] != 1){
            humansArr.splice(humansArr.indexOf(this),1);
            inform.humanKills[inform.time]++;
        }
    }
    update(){
        this.attack();
        this.dead();
    }
}