class Car {
    constructor(brain = undefined, isStatic = false) {
        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;
        //WIDTH / 4, HEIGHT / 4 * 3.5, 0
        this.x = WIDTH / 4;
        this.y = HEIGHT / 4 * 3.5;
        this.dir = 0;
        this.turningSpeed = HALF_PI / 60;
        this.movingSpeed = 4;
        this.isStatic = isStatic

        if (brain !== undefined) {
            this.brain = brain;
        }

        this.alive = true;
    }

    draw() {
        rectMode(CENTER);
        push();
        if (this.isStatic || this.alive == false) {
            fill(255, 0, 0);
        } else {
            fill(0, 255, 0, 50);
        }

        let poly = this.convertToPoly();
        for (let i = 0; i < poly.length; i++) {
            line(this.x, this.y, poly[i].x, poly[i].y);
        }

        translate(this.x, this.y);

        rotate(this.dir);
        rect(0, 0, this.width, this.height);
        pop();


    }

    think() {

    }

    move(l, r, u, d) {
        if (l == 1) {
            this.dir -= this.turningSpeed;
        }
        if (r == 1) {
            this.dir += this.turningSpeed;
        }
        if (u == 1) {
            this.x += sin(this.dir) * this.movingSpeed;
            this.y -= cos(this.dir) * this.movingSpeed;
        }
        if (d == 1) {
            this.x -= sin(this.dir) * this.movingSpeed;
            this.y += cos(this.dir) * this.movingSpeed;
        }
    }
    //returns an array of the real world coords of the car's corners
    convertToPoly() {
        let carPoly = [];

        let topRight = createVector(CAR_WIDTH / 2, CAR_HEIGHT / 2).rotate(this.dir);
        let topLeft = createVector(-CAR_WIDTH / 2, CAR_HEIGHT / 2).rotate(this.dir);
        let bottomRight = createVector(CAR_WIDTH / 2, -CAR_HEIGHT / 2).rotate(this.dir);
        let bottomLeft = createVector(-CAR_WIDTH / 2, -CAR_HEIGHT / 2).rotate(this.dir);

        //[[topRight.x, topRight.y],
        //[topLeft.x, topLeft.y],
        //[bottomRight.x, bottomRight.y],
        //[bottomLeft.x, bottomLeft.y]]

        carPoly[0] = topRight;
        carPoly[1] = bottomRight;
        carPoly[2] = bottomLeft;
        carPoly[3] = topLeft;

        for (let i = 0; i < carPoly.length; i++) {
            carPoly[i].x += this.x;
            carPoly[i].y += this.y;
        }

        return carPoly;
    }
}