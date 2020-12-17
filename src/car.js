class Car {
    constructor(brain = undefined, x = undefined, y = undefined, dir = undefined, isStatic = false) {
        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;
        //WIDTH / 4, HEIGHT / 4 * 3.5, 0

        if (x === undefined) {
            this.x = WIDTH / 4;
        } else {
            this.x = x;

        }
        if (y === undefined) {
            this.y = HEIGHT / 4 * 3.5;
        } else {
            this.y = y;
        }

        if (dir === undefined) {
            this.dir = 0;
        } else {
            this.dir = dir;
        }

        this.turningSpeed = HALF_PI / 60;
        this.movingSpeed = 4;
        this.isStatic = isStatic

        if (brain !== undefined) {
            this.brain = brain;
            this.brain.score = 0;
        }

        this.alive = true;
        this.won = false;
        this.eyes = []; //acutal vectors of these eyes
        this.eyeValues = []; //values of the 8 eyes a car will have.
    }

    draw() {
        rectMode(CENTER);
        push();
        if (this.isStatic) {
            fill(255, 0, 0);
        } else if (this.alive == false) {
            fill(255, 0, 0, 50);
        } else if (this.won) {
            fill(0, 255, 0, 70);
        } else {
            fill(0, 255, 0, 50);
        }

        let poly = this.convertToPoly();
        for (let i = 0; i < poly.length; i++) {
            line(this.x, this.y, poly[i].x, poly[i].y);
        }

        translate(this.x, this.y);

        this.eyes = [];

        if (!this.isStatic) {
            //draw first 5 lines
            for (let i = 0; i < 5; i++) {
                this.eyes.push(createVector(0, CAR_EYE_LENGTH).rotate(this.dir + PI + - QUARTER_PI + (i * QUARTER_PI / 2)));
            }
            this.eyes.push(createVector(0, CAR_EYE_LENGTH).rotate(this.dir + HALF_PI));
            this.eyes.push(createVector(0, CAR_EYE_LENGTH).rotate(this.dir + -HALF_PI));
            this.eyes.push(createVector(0, CAR_EYE_LENGTH).rotate(this.dir + 0));

            if (DRAW_EYES) {
                for (let i = 0; i < this.eyes.length; i++) {
                    line(0, 0, this.eyes[i].x, this.eyes[i].y);
                }
            }
        }

        rotate(this.dir);
        rect(0, 0, this.width, this.height);


        pop();
    }

    think() {
        let input = this.eyeValues; //TODO
        let output = this.brain.activate(input);

        //if outputs are bigger than 0.5, set them, to 1;
        let l = ((output[0] > 0.5) ? 1 : 0);
        let r = ((output[1] > 0.5) ? 1 : 0);
        let u = ((output[2] > 0.5) ? 1 : 0);
        let d = ((output[3] > 0.5) ? 1 : 0);

        this.move(l, r, u, d);
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