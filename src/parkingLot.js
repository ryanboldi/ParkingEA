class PARKINGLOT {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.parkingSpaces = 5;
        this.emptySpace = floor(random(0, this.parkingSpaces));
        this.staticCars = [];
        this.carGap = 15;
        this.startGap = ((this.h / 2) - (this.parkingSpaces * CAR_WIDTH) - ((this.parkingSpaces - 1) * this.carGap)) / 2;

        for (let i = 0; i < this.parkingSpaces; i++) {
            if (i !== this.emptySpace) {
                this.staticCars.push(new Car(undefined, this.w - 40 - this.startGap - (this.carGap / 2) - (CAR_HEIGHT / 2), (this.w / 4) + this.startGap + (CAR_WIDTH / 2) + (i * (CAR_WIDTH + this.carGap)), HALF_PI, true));
            }
        }

        this.collisionBoxes = []; //non-car collision boxes, top left corner x, y, w, h
        this.collisionBoxes[0] = [0, 0, 100, 800];
        this.collisionBoxes[1] = [300, 0, 140, 300];
        this.collisionBoxes[2] = [300, 500, 140, 300];
        this.collisionBoxes[3] = [440, 0, 360, 200];
        this.collisionBoxes[4] = [440, 600, 360, 200];
        this.collisionBoxes[5] = [760, 200, 40, 400];

        //for this to be a successfull parking, our car needs to be wholly encapsulated by this winbox
        this.winBox = [this.w - this.carGap - 40 - CAR_HEIGHT - (this.carGap / 2) - this.startGap, this.h / 4 + (this.carGap / 2) + this.startGap + ((this.emptySpace) * (this.carGap + CAR_WIDTH)) - this.carGap, CAR_HEIGHT + 2 * this.carGap, CAR_WIDTH + this.carGap]//depends on the parking space
    }

    draw() {
        push();
        noStroke();
        fill(180);
        rect(this.w / 4, this.h / 2, this.w / 4, this.h);
        rect(this.w / 2, this.h / 2, 0.75 * this.w, this.w / 4);
        rect(this.w * 0.75, this.h / 2, this.w * 0.4, this.h / 2);
        pop();

        push();
        rectMode(CORNER);
        noStroke();
        fill(144, 0, 0, 10);
        for (let i = 0; i < this.collisionBoxes.length; i++) {
            rect(this.collisionBoxes[i][0], this.collisionBoxes[i][1], this.collisionBoxes[i][2], this.collisionBoxes[i][3]);
        }
        fill(0, 144, 0, 40);
        rect(this.winBox[0], this.winBox[1], this.winBox[2], this.winBox[3]);

        stroke(1);
        let winPoly = topLeftToPoly(this.winBox);
        for (let i = 0; i < winPoly.length; i++) {
            line(this.winBox[0] + (this.winBox[2] / 2), this.winBox[1] + (this.winBox[3] / 2), winPoly[i].x, winPoly[i].y);
        }
        pop();

        push();
        stroke(255, 255, 0);
        fill(255, 255, 0);
        strokeWeight(2);
        for (let i = 0; i < this.parkingSpaces + 1; i++) {
            line(this.w - this.carGap - 40 - CAR_HEIGHT - (this.carGap / 2) - this.startGap, this.w / 4 + this.startGap + (this.carGap / 2) + ((i) * (this.carGap + CAR_WIDTH)) - this.carGap, this.w - this.carGap - 40, this.w / 4 + this.startGap + (this.carGap / 2) + ((i) * (this.carGap + CAR_WIDTH)) - this.carGap);
            //rect(this.w * 0.95, this.w / 4 + this.startGap + (CAR_WIDTH - 10) / 2 + (i * (CAR_WIDTH + this.carGap)), 10, CAR_WIDTH - 10);
        }
        //line(this.w - this.carGap - 40, this.w / 4 + this.startGap - (this.carGap / 2), this.w - this.carGap, (this.w / 4 * 3) - this.startGap + (this.carGap / 2))
        pop();

        for (let i = 0; i < this.staticCars.length; i++) {
            this.staticCars[i].draw();
        }


    }

    checkCar(carPoly) {
        push();
        rectMode(CORNER);
        let collided = false;
        //checks collision with the world around it
        for (let i = 0; i < this.collisionBoxes.length; i++) {
            let hit = collideRectPoly(this.collisionBoxes[i][0], this.collisionBoxes[i][1], this.collisionBoxes[i][2], this.collisionBoxes[i][3], carPoly);
            if (hit) {
                collided = true;
            }
        }
        for (let i = 0; i < this.staticCars.length; i++) {
            let hit = collidePolyPoly(this.staticCars[i].convertToPoly(), carPoly);
            if (hit) {
                collided = true;
            }
        }

        if (collided) {
            //kill the car or do something here
            console.log("CAR CRASHED");
        } else {
            let winPoly = topLeftToPoly(this.winBox);

            // if the car is colliding or top right corner
            if (collidePointPoly(carPoly[0].x, carPoly[0].y, winPoly)) {
                //check that each of the car's 4 corners are inside the win zone
                let wonSoFar = true;
                //console.log("collided");
                for (let i = 0; i < 4; i++) {
                    //console.log(carPoly, winPoly);
                    let collision = collidePointPoly(carPoly[i].x, carPoly[i].y, winPoly);
                    //console.log(`collision ${collision} ${i}`);
                    if (collision == false) {
                        wonSoFar = false;
                    }
                }
                if (wonSoFar) {
                    console.log("WON");
                    //do something here
                }
            }
        }
        pop();
    }
}