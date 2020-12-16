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
}