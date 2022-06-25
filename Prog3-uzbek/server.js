var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


humansArr = [];
baseArr = [];
robotsArr = [];
enemyArr = []

mult = 16;
cursorDir = [false,false,false,false];
const Matrix = require("./matrix");
matrix = new Matrix(['color'],20, false);
const Robots = require("./robots");
const Base = require("./base");
const Humans = require('./humans');
const Bomb = require('./bomb');
var end = false;
var endTime = 0;
var sec =0;
inform = {
    time:1,
    humanKills:{},
}

function start(){
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
function update(){
    sec +=0.2;
    if(!end){
        inform.time = Math.floor(sec);
        inform.humanKills[inform.time]=0
        humansArr.forEach(element => {
            element.update()
        });
        robotsArr.forEach(element => {
            element.update()
        });
        baseArr.forEach(element => {
            element.update()
        });
        enemyArr.forEach(element => {
            element.update()
        });
        if(robotsArr.length == 0 && !end ){
            endTime = inform.time;
            matrix.end("lose");
            end = true;
        }
        if(humansArr.length == 0 && !end ){
            endTime = inform.time;
            matrix.end("win");
            end = true;
        }
        io.sockets.emit('send matrix properties', {
            matrix: matrix.getMatrix(),
            side: matrix.side,
            humansArr:humansArr,
            time:inform.time,
        });
    }    
    
        
    if(end && Math.floor(sec) >endTime+1){
        io.sockets.emit('send end', inform);
    } 
}
io.on('connection', function(socket) {
    socket.on('send bomb', function(cord){
        if(!end){
            let b = new Bomb(cord[0],cord[1]);
            b.boom();
        }
    })
    socket.on('cursorDir',function(a){cursorDir =a})
    socket.on('start',function(){
        start();
        setInterval(update, 500);
    })
});
