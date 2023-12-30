let bgColor = 0;
let bgDirection = 1;

let WIDTH = 500;
let HEIGHT = 500;
let DIAM = 25;
let spheres = [];
let isPaused = false;

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
}

function draw() {
    background(bgColor);
    bgColor += bgDirection;

    if (bgColor === 255 || bgColor === 0) {
        bgDirection *= -1;
    }
    
    for (let sph of spheres) {
        sph.draw();
        sph.bounce();

        if (!isPaused) {
            sph.move();
        }
    }
}

let pause = () => isPaused = !isPaused;

function createSphere() {
    let sphere = new Sphere(WIDTH/2, HEIGHT/2, 13, 10);

    spheres.push(sphere);
}

function createRandomSphere() {
    let randX = Math.random()*(WIDTH - 2*DIAM) + DIAM;
    let randY = Math.random()*(HEIGHT - 2*DIAM) + DIAM;
    let randDir = Math.random()*360;
    let randVel = Math.random()*20;

    let sphere = new Sphere(randX, randY, randDir, randVel);
    spheres.push(sphere);
}

class Sphere {
    constructor(x, y, direction, velocity) {
        this.x = x;
        this.y = y;
        this.diam = DIAM;
        this.radio = this.diam/2;
        let c = parseInt(Math.random()*255);
        this.color = `rgb(${c}, ${c}, ${c})`;
        this.direction = direction*Math.PI/180;
        this.velocity = velocity;
    }

    draw() {
        fill(this.color);
        noStroke();

        circle(this.x, this.y, this.diam);
    }

    move() {
        this.x += Math.cos(this.direction)*this.velocity;
        this.y += Math.sin(this.direction)*this.velocity;
    }

    bounce() {
        if (this.x - this.radio < 0 || this.x + this.radio > WIDTH) {
            this.direction = Math.PI - this.direction;
        }
        if (this.y - this.radio < 0 || this.y + this.radio > HEIGHT) {
            this.direction = -this.direction;
        }
    }
}
