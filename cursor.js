class Cursor{
    constructor(side){
        
        this.setcolor = 1;   
        this.side = side;
        this.posX = matrix.getMatrix()[0].length/2;
        this.posY = matrix.getMatrix().length/2;

    }
    drawCursor(){
        this.cursY = Math.floor( mouseY/this.side);
        this.cursX = Math.floor( mouseX/this.side);
        stroke(0);
        //this.drawCube();
        this.drawX();
        this.direction();
    }
    drawX(){
        
        line(this.posX*this.side -this.side/2,this.posY*this.side-this.side/2,this.posX*this.side+this.side*3/2,this.posY*this.side+this.side*3/2);
        // line(this.cursX*this.side+this.side*2,this.cursY*this.side,this.cursX*this.side,this.cursY*this.side+this.side*2);
        line(this.posX*this.side -this.side/2,this.posY*this.side+this.side*3/2,this.posX*this.side+this.side*3/2,this.posY*this.side-this.side/2);

    }
    drawCube(){
        
        line(this.cursX*this.side, this.cursY*this.side, this.cursX*this.side+this.side, this.cursY*this.side);
        line(this.cursX*this.side, this.cursY*this.side+this.side, this.cursX*this.side+this.side, this.cursY*this.side+this.side);
        line(this.cursX*this.side, this.cursY*this.side, this.cursX*this.side, this.cursY*this.side+this.side);
       line(this.cursX*this.side+this.side, this.cursY*this.side, this.cursX*this.side+this.side, this.cursY*this.side+this.side);
    }
    direction(){
        this.dir = [false,false,false,false];//up,down,left,right
        let center = [this.side*matrix.getMatrix()[0].length/2,this.side*matrix.getMatrix().length/2];
        let angle = createVector(center[0], 0).angleBetween(createVector(this.posX*this.side-center[0] , this.posY*this.side - center[1]))*180/Math.PI;
            if(157.5>angle && angle>22.5 && this.posY*this.side>center[1]){
               this.dir[1] = true;
               this.dir[0] = false;
               }   
            else if(157.5>angle && angle>22.5 && this.posY*this.side<center[1]){
                this.dir[1] = false;
                this.dir[0] = true;

            }          
            if( angle>112.5  ){
                this.dir[2] = true;
                this.dir[3] = false;
               }            
            else if(angle <67.5) {
                this.dir[2] = false;
                this.dir[3]= true;

            }
    }
}
