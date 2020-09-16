///////////////////////////////////////////
/* Cretures  prototype  */
///////////////////////////////////////////
function Creature(type,speed,initialLocation){ // initialize a base object with common properties
    this.type = type;
    this.speed = speed;
    this.initialLocation = initialLocation;
    this.currentLocation = initialLocation;
    this.moveDirection = 0;
}
Creature.prototype.move = function(gameState){
    if(gameState == 1){
        switch(this.moveDirection){
            case 0: // stop
            break
            case 1: // up
                this.changeCell(-24);
            break
            case 2: // down
                this.changeCell(24);
            break
            case 3: // left
                if((this.currentLocation -1) == 119){
                    this.changeCell(23);
                } else{
                    this.changeCell(-1);
                }
            break
            case 4: // right
                if((this.currentLocation + 1) == 144){
                    this.changeCell(-23);
                } else{
                    this.changeCell(1);
                }
            break
        }
    }
};

Creature.prototype.changeCell = function(cellDirection){ 
    let playboard = document.getElementById("playBoard");
    if( (this.type == "pacman" && playboard.childNodes[this.currentLocation + cellDirection].className == "ghost")|| // if pacman moves to ghost, lose
        (this.type == "ghost" && playboard.childNodes[this.currentLocation + cellDirection].className == "pacman")){ //  or if ghost moves to pacman
        document.getElementById("lose").style.display = "block";
        delete pacman;
        game.playing = 0;
        game.condition = 0;
        
    }else if(playboard.childNodes[cellDirection + this.currentLocation].className != "ghost" && //not moving to a ghost
     playboard.childNodes[cellDirection + this.currentLocation].className != "wall"){ //not moving to a wall
        switch(map[this.currentLocation]){
            case 0: // empty cell
                playboard.childNodes[cellDirection + this.currentLocation].className = this.type;  //change next cell class to type
                playboard.childNodes[this.currentLocation].className = "boardCell"; //change current cell to empty one
                this.currentLocation = cellDirection + this.currentLocation; //overwrite current location
            break
            case 1: // point cell
                if(this.type=="pacman"){ 
                    playboard.childNodes[this.currentLocation].className = "boardCell";
                    map[this.currentLocation] = 0;
                    game.points = game.points + 10;
                    //check if we win:
                    var countCells = 0;
                    for(var i = 0; i < map.length; ++i){
                        if(map[i] == 1)
                            countCells++;
                    }
                    if(countCells == 0){
                        document.getElementById("win").style.display = "block";
                        delete pacman;
                        game.playing = 0;
                        game.condition = 0;
                    }
                }else{
                    playboard.childNodes[this.currentLocation].className = "pointsCell"; 
                }
                playboard.childNodes[cellDirection + this.currentLocation].className = this.type;
                this.currentLocation = cellDirection + this.currentLocation;
            break
            case 3: // ghostlair cell,
            if(this.type!="pacman"){ 
                playboard.childNodes[cellDirection + this.currentLocation].className = this.type;
                playboard.childNodes[this.currentLocation].className = "ghostLair"; 
                this.currentLocation = cellDirection + this.currentLocation; 
            }
            break
        }
    }
}


//////////////////
/* Ghost object*/
//////////////////
function Ghost(...args){ // inherit the properties from creture
    Creature.apply(this, args); 
}
Ghost.prototype = Object.create(Creature.prototype); // inherit the methods from creture
Ghost.prototype.setMoveDirection = function(){
    this.moveDirection = Math.floor(Math.random()*4+1)
};

//////////////////
/* Pacman object*/
//////////////////
function Pacman(...args){ // inherit the properties from creture
    Creature.apply(this, args); 
}
Pacman.prototype = Object.create(Creature.prototype); // inherit the methods from creture
//Pacman.prototype.setMoveDirection = function(){
//    this.moveDirection = Math.floor(Math.random()*4+1);


Pacman.prototype.setMoveDirection = function(input){     // must be an argument from 1 to 4
    if(input == 1 || input == 2 || input == 3 || input == 4 ){ // if button input, return it
        direction = input;
    }else{
        input = input || window.event;
        switch(input.keyCode){ // Apply move function bassed on keybord input
            case 38: // up arrow
                direction = 1;
            break
            case 87: // up  W character
                direction = 1;
            break
            case 40: //  down arrow
                direction = 2;
            break
            case 83: // down  S character
                direction = 2;
            break
            case 37: // left arrow
                direction = 3;
            break
            case 65: // left A character
                direction = 3;
            break
            case 39: // right arrow
                direction = 4;
            break
            case 68: // right with D character
                direction = 4;
            break
        }
    }
    pacman.moveDirection = direction;
}


//////////////////////////
/* Create the playboard */
//////////////////////////
var mapCreate = {
    type: "map",
    inputCell: function(cell){
        const newDiv = document.createElement("div"); // create a new div element 
        newDiv.classList.add(cell); // give it the cell class  
        playBoard.appendChild(newDiv);  // add cell to playboard
    },
    createMap: function(){
        for (var i = 0; i < this.mapTemplate.length; i++) {  //input the map
            switch(this.mapTemplate[i]){ // Apply move function bassed on keybord input
                case 0: 
                    this.inputCell("boardCell");
                break
                case 1: 
                    this.inputCell("pointsCell");
                break
                case 2: 
                    this.inputCell("wall"); 
                break
                case 3: 
                    this.inputCell("ghostLair");
                break
                case 4: 
                    this.inputCell("pacmanPosition");
                break
            }
        }
    },

    mapTemplate:   [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,// create the map structure
                    2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,
                    2,0,2,2,2,1,2,2,1,2,2,2,2,2,1,2,2,1,1,2,2,2,0,2,
                    2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,
                    2,2,2,1,2,1,2,1,2,2,2,3,2,2,2,1,2,1,1,2,1,2,2,2,
                    1,1,1,1,2,1,1,1,2,3,3,3,3,3,2,1,1,1,2,2,1,1,1,1,
                    2,2,2,1,2,1,2,1,2,3,3,3,3,3,2,1,2,1,1,2,1,2,2,2,
                    2,1,1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,2,1,1,1,1,1,2,
                    2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,
                    2,0,2,2,2,1,2,2,1,2,0,2,0,2,1,2,2,1,2,2,2,2,0,2,
                    2,0,0,1,1,1,1,1,1,2,0,0,0,2,1,1,1,1,1,1,1,0,0,2,
                    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
} 
///////////////
/* Game State*/
///////////////
var game = {
    type: "state",
    playing: 0,
    gameOver: 0,
    points:0,
    pointsLeft: 0,
    play: function(){
        this.playing = 1;
        document.getElementById("stop").style.display = "none";
      },
    pause: function(){
        this.playing = 0;
        document.getElementById("stop").style.display = "block";
    },
    reset: function(){
        location.reload();
    },
    displayPoints: function(){
        document.getElementById("points").innerHTML = game.points;
    }
}


////////////////////////
/* Creating setting */
//////////////////////////
mapCreate.createMap(); // create map
var map = mapCreate.mapTemplate;

pacman = new Pacman("pacman",250,251); // create pacman
ghosts =[ // create ghosts
    new Ghost("ghost",250,131),
    new Ghost("ghost",300,132),
    new Ghost("ghost",350,153),
    new Ghost("ghost",200,157),
];

document.getElementById("playBoard").childNodes[251].className = "pacman"; // add packman to map
for(var i = 0; i< ghosts.length; i++){ // add ghosts to map
    document.getElementById("playBoard").childNodes[ghosts[i].initialLocation].className = ghosts[i].type;
}

//////////////////////
/* Moving Creatures */
//////////////////////
document.onkeydown = pacman.setMoveDirection;  // Pacman key press 
setInterval(function(){pacman.move(game.playing);}, pacman.speed); // move packman

for(var i = 0; i< ghosts.length; i++){ // Ghosts moves
    setInterval(
        function(j){
            return function(){
                ghosts[j].setMoveDirection();
                ghosts[j].move(game.playing);};
        }(i),ghosts[i].speed)
}

setInterval(game.displayPoints, pacman.speed); // update points 
