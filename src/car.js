class Car {
    constructor(x, y, dir, isStatic = false) {
        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;

        this.x = x;
        this.y = y;
        this.dir = dir;
        this.turningSpeed = HALF_PI / 60;
        this.movingSpeed = 4;
        this.isStatic = isStatic
    }

    draw() {
        rectMode(CENTER);
        push();
        if (this.isStatic) {
            fill(255, 0, 0);
        } else {
            fill(0, 255, 0);
        }

        translate(this.x, this.y);

        strokeWeight(3);
        let verts = this.convertToPoly();

        beginShape(POINTS);
        for (let i = 0; i < verts.length; i++) {
            vertex(verts[i][0], verts[i][1]);
        }
        endShape();

        strokeWeight(1);
        rotate(this.dir);
        rect(0, 0, this.width, this.height);
        pop();


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
        let topRight = createVector(CAR_WIDTH / 2, CAR_HEIGHT / 2).rotate(this.dir);
        let topLeft = createVector(-CAR_WIDTH / 2, CAR_HEIGHT / 2).rotate(this.dir);
        let bottomRight = createVector(CAR_WIDTH / 2, -CAR_HEIGHT / 2).rotate(this.dir);
        let bottomLeft = createVector(-CAR_WIDTH / 2, -CAR_HEIGHT / 2).rotate(this.dir);

        return ([[topRight.x, topRight.y],
        [topLeft.x, topLeft.y],
        [bottomRight.x, bottomRight.y],
        [bottomLeft.x, bottomLeft.y]]);
    }
}