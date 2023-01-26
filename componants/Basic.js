import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let x = 50;
let y = 50;
let y_velocity = 2;
let y_velocity1 = 2;
let y1 = 50;
let cnv;
let pressed = false;
const Basic = (props) => {
  const gravity = props.gravity;
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    cnv = p5.createCanvas(700, 700).parent(canvasParentRef);
    cnv.mousePressed(() => {
      {
        pressed = true;
        console.log("Pressed");
        x = p5.mouseX;
        y = p5.mouseY;
        y_velocity = 2;
      }
    });
  };

  const draw = (p5) => {
    p5.background(155);
    if (pressed) {
      p5.ellipse(x, y, 70, 70);
      y_velocity += gravity;
      y_velocity1 += 3;
      y1 += y_velocity1;
      y = y + y_velocity;
      // give the ellipse a little bounce when it hits the bottom
      if (Math.abs(y_velocity) < 0.1) {
        pressed = false;
      }
      if (y + 35 > p5.height) {
        y = p5.height - 35;
        y_velocity = y_velocity * -0.9;
      }
      console.log(y_velocity);
    } else p5.ellipse(p5.mouseX, p5.mouseY, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  return <Sketch setup={setup} draw={draw} />;
};
export default Basic;
