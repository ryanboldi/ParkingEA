const WIDTH = 800,
    HEIGHT = 800;

const CAR_WIDTH = 60,
    CAR_HEIGHT = 100;

let c;
let environment;



function setup() {
    createCanvas(WIDTH, HEIGHT);

    c = new Car(WIDTH / 4, HEIGHT / 4 * 3.5, 0);
    environment = new PARKINGLOT(WIDTH, HEIGHT);
}


function draw() {
    background(220);
    environment.draw();
    c.draw();
    environment.checkCar(c.convertToPoly());

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
    c.move(l, r, u, d);
}

function mousePressed() {
    console.log(`x: ${mouseX}, y:${mouseY}`);
}


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