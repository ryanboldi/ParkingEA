class PARKINGLOT {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }

    draw() {
        push();
        noStroke();
        fill(180);
        rect(this.w / 4, this.h / 2, this.w / 4, this.h);
        rect(this.w / 2, this.h / 2, 0.75 * this.w, this.w / 4);
        rect(this.w * 0.8, this.h / 2, this.w * 0.4, this.h / 2);
        pop();
    }
}