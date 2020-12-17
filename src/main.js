const WIDTH = 800,
    HEIGHT = 800;

const CAR_WIDTH = 60,
    CAR_HEIGHT = 100,
    CAR_EYE_LENGTH = 150;

const DRAW_EYES = false;

let environment;
let cars = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    environment = new PARKINGLOT(WIDTH, HEIGHT);
    initNeat();
    startEvaluation();
}


function draw() {
    background(220);
    environment.draw();

    for (let c in cars) {
        cars[c].draw();
        if (cars[c].alive) {
            result = environment.checkCar(cars[c].convertToPoly());
            if (result == "DEATH") {
                cars[c].alive = false;
            } else if (result == "WON") {
                cars[c].brain.score = 100;
            } else {
                let dist = environment.getDistToGoal(cars[c].x, cars[c].y);
                //scale between 0 and 50
                cars[c].brain.score = normalizeBetweenTwoRanges(dist, 0, 1132, 0, 50);
            }

            for (let eye in cars[c].eyes) {
                //set eye value to the environment's check collision of this line
                //console.log(cars[c].eyes);
                cars[c].eyeValues[eye] = environment.checkLineCollision(cars[c].x, cars[c].y, cars[c].eyes[eye].x + cars[c].x, cars[c].eyes[eye].y + cars[c].y);
            }
            cars[c].think();
        }
    }

    let l = 0,
        r = 0,
        u = 0,
        d = 0;

    if (keyIsPressed) {
        if (keyIsDown(UP_ARROW)) {
            u = 1;
        }
        if (keyIsDown(DOWN_ARROW)) {
            d = 1;
        }
        if (keyIsDown(LEFT_ARROW)) {
            l = 1;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            r = 1;
        }
    }
    cars[0].move(l, r, u, d);
}

function mousePressed() {
    //console.log(`x: ${mouseX}, y:${mouseY}`);
}

let normalizeBetweenTwoRanges = (val, minVal, maxVal, newMin, newMax) => {
    return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
};


function topLeftToPoly(arr) {
    let x = arr[0];
    let y = arr[1];
    let w = arr[2];
    let h = arr[3];

    let poly = [];
    poly[0] = createVector(x, y);
    poly[1] = createVector(x + w, y);
    poly[2] = createVector(x + w, y + h);
    poly[3] = createVector(x, y + h);

    return poly;
}