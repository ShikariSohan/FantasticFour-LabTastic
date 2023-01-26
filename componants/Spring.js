import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let bob;
let anchor;
let initHeight = 200;
let boxLength = 64;
let curLength;
let boxHeight = 32;
let pixelPerMeter = 200;
// Constants
let k = 2.69;
let TorsionalSpringConstant = 7.86e-4;
let Inertia = 1.45e-4;
let Epsilon = 9.28e-3;
let Mass = 0.5164;

// here is the z0 and theta0 I picked
let z0 = 10;
let theta0 = 0;
let t = 0;
let deltaT = 0.05;

let wave1 = []; // visualize one side line position of the rect
let wave2 = []; // visualize the current height of the rect
let width;
let height;
let w1;
let w2;
let r;
const Spring = (props) => {
  const gravity = props.gravity;
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    width = p5.width;
    height = p5.height;
    p5.createCanvas(800, 400).parent(canvasParentRef);
    bob = p5.createVector(width / 2, initHeight);
    anchor = p5.createVector(width / 2, 0);

    // init the omega1 and omega2 and r via equations
    w1 = p5.pow(
      TorsionalSpringConstant / Inertia +
        Epsilon / p5.pow(Mass * Inertia, 1 / 2),
      1 / 2
    );
    w2 = p5.pow(
      TorsionalSpringConstant / Inertia -
        Epsilon / p5.pow(Mass * Inertia, 1 / 2),
      1 / 2
    );
    r = p5.pow(Mass / Inertia, 1 / 2);
  };

  const draw = (p5) => {
    p5.background(112, 50, 126);
    p5.strokeWeight(4);
    p5.stroke(255);
    p5.fill(45, 197, 244);

    // update the time and corresponding shape
    t += deltaT;
    bob.y = initHeight + pixelPerMeter * z(t);
    p5.line(anchor.x, anchor.y, bob.x, bob.y);
    p5.circle(anchor.x, anchor.y, 32);
    curLength = boxLength * Math.cos(theta(t));
    p5.rect(bob.x - curLength / 2, bob.y, curLength, boxHeight);
    p5.fill(197, 45, 244);
    p5.ellipse(
      bob.x + curLength / 2,
      bob.y + boxHeight,
      curLength / 4,
      boxHeight / 2
    );

    // if you prefer to see the top view, uncomment this block
    // fill(45, 197, 244);
    // ellipse(bob.x-100, height/2+boxHeight/2, boxLength, boxLength);
    // fill(197, 45, 244);
    // ellipse(bob.x-100+boxLength/2*cos(theta(t)), height/2+boxHeight/2+boxLength/2*sin(theta(t)), boxHeight/2, boxHeight/2);

    // data visualizations
    wave1.unshift(bob.x - curLength / 2 + curLength);
    wave2.unshift(bob.y);
    p5.stroke(255, 100);
    p5.strokeWeight(2);
    // visualize one side line position of the rect
    p5.beginShape();
    p5.noFill();
    for (let i = 0; i < wave1.length; i++) {
      p5.vertex(wave1[i], i + bob.y + boxHeight);
    }
    p5.endShape();
    // visualize the current height of the rect
    p5.beginShape();
    p5.noFill();
    for (let i = 0; i < wave2.length; i++) {
      p5.vertex(i + bob.x + boxLength / 2, wave2[i]);
    }
    p5.endShape();
    if (wave1.length > 1500) {
      wave1.pop();
      wave2.pop();
    }
  };
  function z(t) {
    let val =
      (((z0 / 2) * 1) / r) * (Math.cos(w1 * t) - Math.cos(w2 * t)) +
      (theta0 / 2) * (Math.cos(w1 * t) + Math.cos(w2 * t));
    return val;
  }

  // Equation for val theta
  function theta(t) {
    let val =
      (theta0 / 2) * r * (Math.cos(w1 * t) - Math.cos(w2 * t)) +
      (z0 / 2) * (Math.cos(w1 * t) + Math.cos(w2 * t));
    return val;
  }
  return <Sketch setup={setup} draw={draw} />;
};
export default Spring;
