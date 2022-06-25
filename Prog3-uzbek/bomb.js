module.exports =class Bomb{
    constructor(x,y){
        this.x = x;
        this.y = y;
 }   
    boom(){
        let points = [
            [this.x - 1, this.y - 1], //up left
            [this.x    , this.y - 1], //up
            [this.x + 1, this.y - 1], // up right
            [this.x - 1, this.y    ], //left
            [this.x + 1, this.y    ], //right
            [this.x - 1, this.y + 1], //down left
            [this.x    , this.y + 1], //down
            [this.x + 1, this.y + 1],  // down right
            [this.x + 2, this.y    ], 
            [this.x - 2, this.y    ], 
            [this.x    , this.y + 2], 
            [this.x    , this.y - 2],  
            [this.x    , this.y ],  

       ];
       points.forEach(element => {
        if( matrix.getMatrix()[0].length > element[0] && element[0]>=0 && matrix.getMatrix().length > element[1] && element[1]>=0){
                if(matrix.getMatrix()[element[1]][element[0]] !=  0 ){
                    matrix.getMatrix()[element[1]][element[0]] = 6;
                }
        }
    });
    
    }
}