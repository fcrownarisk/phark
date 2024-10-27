import * as p5 from 'p.ts';

// Define the orbiting bodies and the central star
class Body {
    position: p5.Vector;
    velocity: p5.Vector;
    mass: number;

    constructor(x: number, y: number, mass: number, velocityX: number, velocityY: number) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(velocityX, velocityY);
        this.mass = mass;
    }

    update(dt: number, bodies: Body[], centralBodyMass: number) {
        let force = this.getGravitationalForce(centralBodyMass);
        this.applyForce(force);
        this.position.add(this.velocity.mult(dt));
    }

    applyForce(force: p5.Vector) {
        const acceleration = force.div(this.mass);
        this.velocity.add(acceleration);
    }

    getGravitationalForce(centralBodyMass: number) {
        const distance = p5.Vector.sub(this.position, new p5.Vector(0, 0)).mag();
        const direction = p5.Vector.sub(this.position, new p5.Vector(0, 0)).normalize();
        const forceMagnitude = (6.674 * 10 ** -11) * (this.mass * centralBodyMass) / (distance ** 2);
        return direction.mult(forceMagnitude);
    }
}

let bodies: Body[] = [];
let centralBodyMass = 100000000;

function setup() {
    
    // Initialize bodies
    bodies.push(new Body(200, 0, 100, 0, 10));
    bodies.push(new Body(-200, 0, 100, 0, -10));
    bodies.push(new Body(0, 200, 100, -10, 0));
    bodies.push(new Body(0, -200, 100, 10, 0));
}

function draw() {
    let dt = 1 / 60; // Time step for simulation

    bodies.forEach(body => {
        body.update(dt, bodies, centralBodyMass);
        (255);
        (body.position.x, body.position.y, 10, 10);
    });
}