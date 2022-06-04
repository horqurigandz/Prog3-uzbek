let color = [
[199, 236, 255], //blue 0  none     +
[77, 84, 235], // dark blue 1 humans +
[214, 35, 15], //red 2 robots +
[255,215,0], // yellow 3 UI 
[0, 189, 6], //green 4 soldiers     +
[206, 21, 209], // pink 5 base
[0,0,0], // black 6 dead +
[7, 219, 0] // lime 7 tank +
];
let imgs;
//settings
let mult = 16;
let mode = +prompt("!!!Ete uzumeq xax nkarnerov lini petqe ay fayl zapusk tal local serverov (orinak Visual Studio Code-i  'Live Server' rasshirenyaov) ev nshell Input-um 0 , isk guynerov tarberaki hamar nshell ayl tiv")
//create martix
let matrix = new Matrix(color,20,mode == 0 );
let cursor = new Cursor(matrix.side);
let robotsArr = [];
let humansArr = [];
let enemyArr = [];
let baseArr = [];
let shotsCount = 1;
let end = false;
function preload() {
    if(mode == 0){
     imgs =[
        loadImage('img/characters/soldier.png'),
        loadImage('img/characters/robot.png'),
        loadImage('img/characters/people.png'),
        loadImage('img/characters/tank.png'),
        loadImage('img/characters/dead.jpg'),
        loadImage('img/characters/base.png'),

        ];
    }
    }
function setup(){
    frameRate(5);
    createCanvas(matrix.getMatrix()[0].length*matrix.side,matrix.getMatrix().length*matrix.side);
    startObjs();
}    
function draw() {
    if(shotsCount < 1){
        shotsCount += 0.03;
    }


    clear();
    matrix.drawMatrix();
    //cursor

    cursor.drawCursor();  
    robotsArr.forEach(element => {
        element.update();
    }); 
    humansArr.forEach(element => {
        element.update();
    });  
    
    baseArr.forEach(element => {
        element.update();
    });
    enemyArr.forEach(element => {
        element.update();
    });
    UI();
    dificult();
    
    //win lose
if(end){
    document.getElementById("sliderH").style.backgroundColor = "grey";
    document.getElementById("sliderR").style.backgroundColor = "grey";
    document.getElementById("button").style.display = "block";
}
if(robotsArr.length == 0 && !end){
     matrix.end("lose");
    end = true;
}
if(humansArr.length == 0 && !end){
    matrix.end("win");
    end = true;
}

}

//input keys
document.addEventListener('keydown', function(event) {
    if (event.key == "Enter" && Math.floor(shotsCount) >0) {
        new Bomb(cursor.cursX,cursor.cursY).boom();
        shotsCount--;
    }
    
});
document.body.onmousedown = function() { 
    // matrix.changeMatrix(cursor.cursY,cursor.cursX , cursor.setcolor);
    // matrix.getMatrix()[cursor.cursY][cursor.cursX] = cursor.setcolor;
    cursor.posX  = cursor.cursX;
    cursor.posY = cursor.cursY;

}

function startObjs(){
    for (let y = 0; y < matrix.getMatrix().length; y++) {
        for (let x = 0; x < matrix.getMatrix()[y].length; x++) {
            if(matrix.getMatrix()[y][x] == 1){
                humansArr.push(new Humans(x,y));
            }
            if(matrix.getMatrix()[y][x] == 5){
                baseArr.push(new Base(x,y));

            }   
            if(matrix.getMatrix()[y][x] == 2){
                robotsArr.push(new Robots(x,y));
            }
        }
    }
}
function  UI(){
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
    document.getElementById("sliderH").style.width = (humansArr.length/1196)*300 +"px";
    if(shotsCount >= 1){
        document.getElementById("bomb").style.display = "block";
    }
    else{
        document.getElementById("bomb").style.display = "none";
    }
}
function dificult() {
    if((robotsArr.length/1218) <0.1){
        mult = 18;
    }
    else if(0.2>(robotsArr.length/1218) &&(robotsArr.length/1218) >0.1){
        mult = 14;
    }
    
    else if(0.4>(robotsArr.length/1218) &&(robotsArr.length/1218) >0.2){
        mult = 12;
    }
    else if(0.6>(robotsArr.length/1218) &&(robotsArr.length/1218) >0.4){
        mult = 10;
    }

}
//bombs

