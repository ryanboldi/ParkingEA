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