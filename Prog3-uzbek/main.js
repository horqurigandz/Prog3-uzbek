let colors = [
    [199, 236, 255], //blue 0  none     +
    [77, 84, 235], // dark blue 1 humans +
    [214, 35, 15], //red 2 robots +
    [255,215,0], // yellow 3 UI 
    [0, 189, 6], //green 4 soldiers     +
    [206, 21, 209], // pink 5 base
    [0,0,0], // black 6 dead +
    [7, 219, 0] // lime 7 tank +
    ];

var socket = io();
var cursor = null;
var data;
var shotsCount = 0;
let cursPos ={x:0,y:0}
let img;
function preload() {

     imgs =[
        loadImage('img/characters/soldier.png'),
        loadImage('img/characters/robot.png'),
        loadImage('img/characters/people.png'),
        loadImage('img/characters/tank.png'),
        loadImage('img/characters/dead.jpg'),
        loadImage('img/characters/base.png'),

        ];
}
function setup(){
    socket.on('send matrix properties', function(a){
        socket.emit('cursorDir',cursor.dir)
        data = a;
        cursor = {
            side : data.side,
            width : data.matrix[0].length,
            height :  data.matrix.length,
            posX : cursPos.x,
            posY : cursPos.y,
            curPosX:0,
            curPosY:0,
            dir : [false,false,false,false],//up,down,left,right

            drawX(){
                stroke(0);
                line(cursor.posX*cursor.side -cursor.side/2,cursor.posY*cursor.side-cursor.side/2,cursor.posX*cursor.side+cursor.side*3/2,cursor.posY*cursor.side+cursor.side*3/2);
                line(cursor.posX*cursor.side -cursor.side/2,cursor.posY*cursor.side+cursor.side*3/2,cursor.posX*cursor.side+cursor.side*3/2,cursor.posY*cursor.side-cursor.side/2);
            },
            direction(){
    
                let center = [cursor.side*cursor.width/2,cursor.side*cursor.height/2];
                let angle = createVector(center[0], 0).angleBetween(createVector(cursor.posX*cursor.side-center[0] , cursor.posY*cursor.side - center[1]))*180/Math.PI;
                    if(157.5>angle && angle>22.5 && cursor.posY*cursor.side>center[1]){
                    cursor.dir[1] = true;
                    cursor.dir[0] = false;
                    }   
                    else if(157.5>angle && angle>22.5 && cursor.posY*cursor.side<center[1]){
                        cursor.dir[1] = false;
                        cursor.dir[0] = true;
        
                    }          
                    if( angle>112.5  ){
                        cursor.dir[2] = true;
                        cursor.dir[3] = false;
                    }            
                    else if(angle <67.5) {
                        cursor.dir[2] = false;
                        cursor.dir[3]= true;
        
                    }
            },
            drawCursor(){
                cursor.drawX();
                //this.drawCube();
                cursor.direction();
            }
        };
        createMap(data);
        drawMatrix(data);
        UI(data.humansArr,data.time);
        if(shotsCount < 1){
                shotsCount += 0.1;
        }   
        cursor.drawCursor();
        
    });
    let animCount = null;
    socket.on('send end', function(a){
        if (animCount == null) animCount=data.side*data.matrix.length*0.7;
        else if (animCount-50<0) animCount = 0;
        else animCount-= 50;
        drawStats(data,a,animCount);
    });
}   
function createMap(obj) {
    createCanvas(obj.matrix[0].length*obj.side,obj.matrix.length*obj.side,);
}
function drawMatrix(obj) {
    obj.matrix.forEach((yElement, y) => { 
        obj.matrix[y].forEach((xElement,x) => { 
            if(xElement == 0 || xElement ==3){
                noStroke();
                fill(colors[xElement][0] ,colors[xElement][1],colors[xElement][2]);
                rect(x*obj.side,y*obj.side,obj.side,obj.side);
            }
            else{
                noStroke();
                        fill(255,255,255);
                        rect(x*obj.side,y*obj.side,obj.side,obj.side);
                        if(xElement == 1){
                            image(imgs[2] , x*obj.side , y*obj.side,obj.side, obj.side);
                        }
                        else if(xElement == 2){
                            image(imgs[1] , x*obj.side , y*obj.side,obj.side, obj.side);
                        }
                        else if(xElement == 4){
                            image(imgs[0] , x*obj.side , y*obj.side,obj.side, obj.side);
                        }
                        else if(xElement == 5){
                            image(imgs[5] , x*obj.side , y*obj.side,obj.side*1.4, obj.side*1.4);
                        }
                        else if(xElement == 6){
                            image(imgs[4] , x*obj.side , y*obj.side,obj.side, obj.side);
                        }
                        else if(xElement == 7){
                            image(imgs[3] , x*obj.side , y*obj.side,obj.side*1.2, obj.side*1.2);
                        }
            }
        })
    }) 

}
function drawStats(obj,stats,animCount) {
    let side = obj.side;
    createCanvas(stats.time*side,obj.matrix.length*obj.side);
    noStroke();
    strokeWeight(3);
    fill(102, 204, 255);
    let max = 0;
    for (let i = 0; i < stats.time; i++) {
        if (max <stats.humanKills[i]) max = stats.humanKills[i];
    }
    for (let i = 0; i < stats.time; i++) {
        let heightRect = stats.humanKills[i]*obj.side*obj.matrix.length*0.7/max;
        if (heightRect == 0) heightRect =1;
        rect(i*side,animCount+ obj.matrix.length*obj.side - heightRect,side*0.9,heightRect);
    }
}
window.onload =function(){
    document.body.onmousedown = function() { 
        // matrix.changeMatrix(cursor.cursY,cursor.cursX , cursor.setcolor);
        // matrix.getMatrix()[cursor.cursY][cursor.cursX] = cursor.setcolor;
        if(cursor!=null){
            cursPos.x = Math.floor( mouseX/cursor.side);
            cursPos.y= Math.floor( mouseY/cursor.side);
            compas();
        }
    }
    document.addEventListener('keydown', function(event) {
        if (event.key == "Enter" && Math.floor(shotsCount) >0) {
            socket.emit('send bomb', [cursor.posX,cursor.posY]);
            shotsCount --;
        }
    })
}

function  UI(humansArr,time){
    document.getElementById("day").innerText = time+' օր';
    document.getElementById("sliderH").style.width = (humansArr.length/1196)*300 +"px";
    if(shotsCount >= 1){
        document.getElementById("bomb").style.display = "block";
    }
    else{
        document.getElementById("bomb").style.display = "none";
    }
}
function compas() {
    //compas
    if(cursor.dir[0] == true && cursor.dir[2]== true){
        document.getElementById("compas").style.transform = "rotate(-90deg)"; 
    }
    else if(cursor.dir[0] == true && cursor.dir[3]== true){
        document.getElementById("compas").style.transform = "rotate(0deg)"; 
    }
    else if(cursor.dir[1] == true && cursor.dir[2]== true){
        document.getElementById("compas").style.transform = "rotate(-180deg)"; 
    }
    else if(cursor.dir[1] == true && cursor.dir[3]== true){
        document.getElementById("compas").style.transform = "rotate(90deg)"; 
    }
    else if(cursor.dir[0] == true){
        document.getElementById("compas").style.transform = "rotate(-45deg)"; 
    }
    else if(cursor.dir[1] == true){
        document.getElementById("compas").style.transform = "rotate(135deg)"; 
    }
    else if(cursor.dir[2] == true){
        document.getElementById("compas").style.transform = "rotate(-135deg)"; 
    }
    else if(cursor.dir[3] == true){
        document.getElementById("compas").style.transform = "rotate(45deg)"; 
    }
}
function start() {
document.getElementById('tb').style.display = "none";
document.getElementById('start').style.display = "none";
socket.emit('start');

}