import * as p5 from 'p.ts';
class Particle {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(x: number, y: number) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0.1); // Gravity
    }

    update() {
        // Update velocity based on acceleration
        this.velocity.add(this.acceleration);
        // Update position based on velocity
        this.position.add(this.velocity);
    }

    display() {
        // Draw the particle
        (this.position.x, this.position.y, 16, 16);
    }

    applyForce(force: p5.Vector) {
        // Update acceleration based on force
        this.acceleration.add(force);
    }
}

let particles: Particle[] = [];
let numParticles = 50;
let canvas: p5;

function setup() {
    canvas = new p5(draw, document.body);
    canvas.createCanvas(640, 360);
    for (let i = 0; i < numParticles; i++) {
        let p = new Particle(canvas.width / 2, canvas.height / 2);
        particles.push(p);
    }
}

function draw() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }
}