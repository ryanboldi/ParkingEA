const WIDTH = 800,
    HEIGHT = 800;

let c;



function setup() {
    createCanvas(WIDTH, HEIGHT);

    c = new Car(500, 500, 1);
}


function draw() {
    background(220);
    c.draw();
}