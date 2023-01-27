import React from "react";
import dynamic from "next/dynamic";
//import styles from "../styles/lensStyle.module.css";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});
let fSlider;
let oSlider;
let hSlider;
let btnSave;
let inputs = [];
let height = 700;
let width = 700;
let cX, cY;
let draggingL, draggingO;

const LensLab = (props) => {
    const setup = (p5, canvasParentRef) => {
        let cnv = p5.createCanvas(1800, 790).parent(canvasParentRef);
        height = p5.height;
        width = p5.width;
        fSlider = getSlider(p5, (p5.windowWidth-p5.width)/2 + 150 + 40, height - 170 + 165, -300, 300);
        oSlider = getSlider(p5, (p5.windowWidth-p5.width)/2 + 150 + 250, height - 170 + 165, 50, 820);
        hSlider = getSlider(p5, (p5.windowWidth-p5.width)/2 + 150 + 445, height - 170 + 165, -145, 145);
        cX = width / 2;
        cY = height / 2;

        draggingL = draggingO = 0;

        btnSave = p5.createButton("Save Image");
        btnSave.position(0, 0);
        btnSave.style("width", "100px");
        btnSave.style("height", "35px");
        btnSave.style("color", "blue");
        btnSave.mousePressed(() => {
            p5.saveCanvas(cnv, "myCanvas", "jpg");
        });

        cnv.mouseReleased(() => {
            draggingL = 0;
            draggingO = 0;
        });
        cnv.mousePressed(() => {
            let mouseX = p5.mouseX;
            let mouseY = p5.mouseY;
            if (fSlider.value() > 0) {
                let a = 30 + (150 - fSlider.value()) / 15;
                let b = 300;
                let d =
                ((mouseX - cX) * (mouseX - cX)) / ((a * a) / 4.0) +
                ((mouseY - cY) * (mouseY - cY)) / ((b * b) / 4.0) -
                1;

            if (d <= 0) {
                p5.cursor("grab");
                draggingL = 1;
            } else {
                p5.cursor(p5.ARROW);
                draggingL = 0;
            }
        } else {
            let x1 = cX - 15,
            x2 = cX + 15,
            y1 = cY - 150,
            y2 = cY + 150;
            if (x1 <= mouseX && mouseX <= x2 && y1 <= mouseY && mouseY <= y2) {
                p5.cursor("grab");
                draggingL = 1;
            } else {
                p5.cursor(p5.ARROW);
                draggingL = 0;
            }
        }

        if (draggingL == 1) {
            return;
        }
        //Object Moving
        let x = cX - oSlider.value();
        let y1 = cY - hSlider.value(), y2 = cY;
        if (y1 > y2) {
            let tmp = y1;
            y1 = y2;
            y2 = tmp;
        }
        if (y1 <= mouseY && mouseY <= y2 && x - 5 <= mouseX && mouseX <= x + 5) {
            p5.cursor("grab");
            draggingO = 1;
        } else {
            p5.cursor(p5.ARROW);
            draggingO = 0;
        }
    });
};

const draw = (p5) => {
    p5.background(230, 238, 255);
    createLens(p5);
    createObject(p5);
    incidentRay(p5);
    rePosition(p5);
    refractionRay(p5);
    menu(p5);
};

function getSlider(p5, x, y, mn, mx) {
    let mySlider;
    let myInput;
    mySlider = p5.createSlider(mn, mx, mx, 0.1);
    mySlider.position(x, y);
    mySlider.style("width", "150px");
    myInput = p5.createInput(mySlider.value());
    myInput.position(x + 35, y + 30);
    myInput.style(
        "font-size:30px;height:50px;width:80px;text-align:center;border:none"
    );
    myInput.style(
        "color: #ffffff; background-color: #27383F;text-shadow: #7a7a7a 4px 3px 0;"
    );
    myInput.input(() => {
        mySlider.value(myInput.value());
    });
    mySlider.input(() => {
        myInput.value(mySlider.value());
    });

    inputs.push(myInput);

    return mySlider;
}

function createLens(p5) {
    if (draggingL == 1) {
        oSlider.value(oSlider.value() - (cX - p5.mouseX));
        cX = p5.mouseX;
        //cY = mouseY;
        inputs[1].value(oSlider.value() - (cX - p5.mouseX));
    }

    p5.fill(255, 102, 102);
    p5.stroke(230, 238, 255);
    if (fSlider.value() > 0) {
        p5.ellipse(cX, cY, 30 + (150 - fSlider.value()) / 15, 300);
    } else {
        p5.rect(cX - 40, cY - 150, 80, 300);
        p5.fill(230, 238, 255);
        p5.stroke(230, 238, 255);
        p5.ellipse(cX - 40, cY, 60 + (45 + fSlider.value()) / 15, 300);
        p5.ellipse(cX + 40, cY, 60 + (45 + fSlider.value()) / 15, 300);
    }
    p5.strokeWeight(2);
    p5.stroke(0);
    p5.line(5, cY, p5.width-5, cY);
    p5.fill(255, 102, 102);
    p5.stroke(0);
    p5.line(cX, cY - 148, cX, cY + 148);
    p5.circle(cX - fSlider.value(), cY, 10);
    p5.circle(cX + fSlider.value(), cY, 10);
    p5.circle(cX - 2 * fSlider.value(), cY, 10);
    p5.circle(cX + 2 * fSlider.value(), cY, 10);
}
function createObject(p5) {
    if (draggingO == 1) {
        oSlider.value(cX - p5.mouseX);
        inputs[1].value(cX - p5.mouseX);
    }

    //strokeWeight(3);
    p5.line(
        cX - oSlider.value(),
        cY,
        cX - oSlider.value(),
        cY - hSlider.value()
    );
    p5.fill(0, 0, 250);
    p5.circle(cX - oSlider.value(), cY - hSlider.value(), 15);
}
function incidentRay(p5) {
    p5.line(
        cX - oSlider.value(),
        cY - hSlider.value(),
        cX,
        cY - hSlider.value()
    );
}
function refractionRay(p5) {
    let x = oSlider.value() * (cX + fSlider.value()) - cX * fSlider.value();
    x /= oSlider.value() - fSlider.value();
    let y = (hSlider.value() * (x - cX)) / oSlider.value();
    y += cY;
    p5.line(x, y, x, cY);
    let r = Math.abs(x - cX) * 15;
    r /= oSlider.value();
    p5.circle(x, y, r);
    if (fSlider.value() < oSlider.value()) {
        p5.push();
        if (fSlider.value() > 0) p5.stroke(163, 194, 194);
        p5.line(
            cX - 100 * fSlider.value(),
            cY - 101 * hSlider.value(),
            cX,
            cY - hSlider.value()
        );
        p5.pop();
        p5.push();
        if (fSlider.value() < 0) p5.stroke(163, 194, 194);
        p5.line(cX, cY - hSlider.value(), x, y);
        p5.pop();
        p5.push();
        p5.stroke(163, 194, 194);
        p5.line(x, y, cX + 101 * fSlider.value(), cY + 100 * hSlider.value());
        p5.pop();

        p5.push();
        p5.stroke(163, 194, 194);
        p5.line(
            cX - 100 * oSlider.value(),
            cY - 100 * hSlider.value(),
            cX - oSlider.value(),
            cY - hSlider.value()
        );
        p5.pop();
        p5.line(cX - oSlider.value(), cY - hSlider.value(), x, y);
        p5.push();
        p5.stroke(163, 194, 194);
        p5.line(x, y, cX + 100 * oSlider.value(), cY + 100 * hSlider.value());
        p5.pop();
        } else {
        p5.push();
        if (fSlider.value() > 0) p5.stroke(163, 194, 194);
        p5.line(
            cX - 100 * fSlider.value(),
            cY - 101 * hSlider.value(),
            cX,
            cY - hSlider.value()
        );
        p5.pop();
        p5.line(
            cX,
            cY - hSlider.value(),
            cX + 100 * fSlider.value(),
            cY + 101 * hSlider.value()
        );

        p5.push();
        if (fSlider.value() > 0) p5.stroke(163, 194, 194);
        p5.line(
            cX - 100 * oSlider.value(),
            cY - 100 * hSlider.value(),
            cX - oSlider.value(),
            cY - hSlider.value()
        );
        p5.pop();
        p5.line(
            cX - oSlider.value(),
            cY - hSlider.value(),
            cX + 100 * oSlider.value(),
            cY + 100 * hSlider.value()
        );
    }

    let x1 = x.toString(); //If it's not already a String
    x1 = x1.slice(0, x1.indexOf(".") + 3); //With 3 exposing the hundredths place
    let y1 = y.toString(); //If it's not already a String
    y1 = y1.slice(0, y1.indexOf(".") + 3);
    let caption = x1 + " , " + y1;
    p5.text(caption, x, y - 30);
}

function rePosition(p5) {
    let mouseX = p5.mouseX;
    let mouseY = p5.mouseY;
    let draggingL_ = 0;
    if (fSlider.value() > 0) {
        let a = 30 + (150 - fSlider.value()) / 15;
        let b = 300;
        let d =
            ((mouseX - cX) * (mouseX - cX)) / ((a * a) / 4.0) +
            ((mouseY - cY) * (mouseY - cY)) / ((b * b) / 4.0) -
            1;

        if (d <= 0) {
            p5.cursor("grab");
            draggingL_ = 1;
        } else {
            p5.cursor(p5.ARROW);
            draggingL = 0;
        }
    } else {
        let x1 = cX - 15,
        x2 = cX + 15,
        y1 = cY - 150,
        y2 = cY + 150;
        if (x1 <= mouseX && mouseX <= x2 && y1 <= mouseY && mouseY <= y2) {
            p5.cursor("grab");
            draggingL_ = 1;
        } else {
            p5.cursor(p5.ARROW);
            draggingL = 0;
        }
    }

    if (draggingL_ == 1) {
        return;
    }

    //Object Moving
    let x = cX - oSlider.value();
    let y1 = cY - hSlider.value(), y2 = cY;
    if (y1 > y2) {
        let tmp = y1;
        y1 = y2;
        y2 = tmp;
    }
    if (y1 <= mouseY && mouseY <= y2 && x - 5 <= mouseX && mouseX <= x + 5) {
        p5.cursor("grab");
      //draggingO = 1;
    } else {
        p5.cursor(p5.ARROW);
        draggingO = 0;
    }
}
function menu(p5) {
    p5.push();
    p5.fill(255, 230, 255);
    p5.stroke(255, 128, 255);
    p5.strokeWeight(0.5);
    p5.rect(150, height - 170, width - 300, 150, 10);
    p5.pop();

    p5.push();
    p5.translate(150, height - 170);

    p5.textFont("Comic Sans MS", 20);
    p5.text("Focal Length", 50, 50);
    p5.text("Object Distance", 250, 50);
    p5.text("Object Height", 450, 50);

    p5.fill(15);
    p5.strokeWeight(0.5);
    p5.text(fSlider.value(), 85, 110);
    p5.text(oSlider.value(), 300, 110);
    p5.text(hSlider.value(), 500, 110);

    p5.pop();
}

    return <Sketch setup={setup} draw={draw} />;
};
export default LensLab;