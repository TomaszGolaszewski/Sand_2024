"use strict";
 
const pixelSize = 5; // int: pixel edge length
const cursorSize = 3; // int: cursor edge lenght

let mapWidth; // int: number of pixels in a row
let mapHeight; // int: number of pixels in the column
let map; // 2D int array


function setup() {
// run once at the beginning
    console.log("p5.js setup");
    
    createCanvas(600, 500);
    noSmooth();
    // noCursor();

    mapWidth = width / pixelSize;
    mapHeight = height / pixelSize;
    map = Array2D(mapWidth, mapHeight)
    map[1][0] = 1;
    map[3][0] = 1;
    map[5][0] = 1;
    map[5][2] = 1;
    map[5][5] = 1;
    map[5][6] = 1;
}
  
function draw() {
// run with every frame
    console.time();
    console.log("p5.js draw");

    background(100);
    drawSand()
    moveSand()

    console.timeEnd();
}

function mouseDragged() {
// handle mouse when dragged
    let mouseCoordX = floor(mouseX / pixelSize);
    let mouseCoordY = floor(mouseY / pixelSize);
    let cursorOffset = floor(cursorSize / 2);
    for (let i = -cursorOffset; i <= cursorOffset; i++) {
        for (let j = -cursorOffset; j <= cursorOffset; j++) {
            if (random(1) < 0.5) {
                let x = mouseCoordX + i;
                let y = mouseCoordY + j;
                if (x >= 0 && x <= mapWidth-1 && y >= 0 && y <= mapHeight-1) {
                    map[x][y] = 1;
                }
            }
        }
    }
}

function Array2D(cols, rows) {
// create and return new 2D Array
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function drawSand(){
// draw the sand
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            noStroke();
            if (map[x][y] > 0) {
                fill(255, 200, 0);
                square(x * pixelSize, y * pixelSize, pixelSize);
            }
        }
    }
}

function moveSand(){
// simulate movement of grain of sand
    for (let y = mapHeight-2; y >= 0; y--) {
        for (let x = 0; x < mapWidth; x++) {
            if (map[x][y] > 0) { // if there is grain of sand
                if (!map[x][y+1]) { // if there is not grain of sand below
                    map[x][y] = 0
                    map[x][y+1] = 1
                } else {
                    if (x > 0 && !map[x-1][y+1]) { // if there is not grain of sand below left side
                        map[x][y] = 0
                        map[x-1][y+1] = 1
                    } else if (x < mapWidth-1 && !map[x+1][y+1]) { // if there is not grain of sand below right side
                        map[x][y] = 0
                        map[x+1][y+1] = 1
                    }
                }
            }
        }
    }
}

function moveStone(){
// simulate movement of grain of sand
    for (let y = mapHeight-2; y >= 0; y--) {
        for (let x = 0; x < mapWidth; x++) {
            if (map[x][y] > 0) { // if there is grain of sand
                if (!map[x][y+1]) { // if there is not grain of sand below
                    map[x][y] = 0
                    map[x][y+1] = 1
                }
            }
        }
    }
}

