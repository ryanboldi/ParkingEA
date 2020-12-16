class PARKINGLOT {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.parkingSpaces = 5;
        this.emptySpace = 45//floor(random(0, this.parkingSpaces));
        this.staticCars = [];
        this.carGap = 15;
        this.startGap = ((this.h / 2) - (this.parkingSpaces * CAR_WIDTH) - ((this.parkingSpaces - 1) * this.carGap)) / 2;

        for (let i = 0; i < this.parkingSpaces; i++) {
            if (i !== this.emptySpace) {
                this.staticCars.push(new Car(this.w - 10 - (CAR_HEIGHT / 2), (this.w / 4) + this.startGap + (CAR_WIDTH / 2) + (i * (CAR_WIDTH + this.carGap)), HALF_PI, true))
            }

        }

        this.collisionBoxes = []; //non-car collision boxes
    }

    draw() {
        push();
        noStroke();
        fill(180);
        rect(this.w / 4, this.h / 2, this.w / 4, this.h);
        rect(this.w / 2, this.h / 2, 0.75 * this.w, this.w / 4);
        rect(this.w * 0.8, this.h / 2, this.w * 0.4, this.h / 2);
        pop();

        for (let i = 0; i < this.staticCars.length; i++) {
            this.staticCars[i].draw();
        }

        for (let i = 0; i < this.collisionBoxes.length; i++) {
            break;
        }
    }
}