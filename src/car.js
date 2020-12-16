class Car {
    constructor(x, y, dir, isStatic = false) {
        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;

        this.x = x;
        this.y = y;
        this.dir = dir;
        this.turningSpeed = HALF_PI / 120;
        this.movingSpeed = 2;
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
}