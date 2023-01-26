import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});

let iWidth, iHeight, iX, iY, bX, bY;
let hSolution;

let vSlider, mSlider;
let sel;
let solute;
let M, molarity;

let R, G, B, a1, a2, a3;

let cnv;
let img;

const Molarity = () => {
    const setup = (p5, canvasParentRef) => {
        cnv = p5.createCanvas(1080, 820).parent(canvasParentRef);
        img = p5.loadImage('/beaker.png');
        vSlider = getSlider(p5, (p5.windowWidth-p5.width)/2-240, 490, 0.1, 1.5)
        mSlider = getSlider(p5, (p5.windowWidth-p5.width)/2-110, 490, 0.0, 1.0)

        iWidth = 600;
        iHeight = 700;
        iX = p5.width/2 - p5.height/3;
        iY = 100;
        bX = iX+2.8*iWidth/5.0;
        bY = iY+17.2*iHeight/18.0;

        hSolution = 500;
        solute = "NaCl";
        M = 58.44;
        molarity = 0;

        R = G = B = 242;
        a1 = a2 = a3 = 30;

        //dropdown
        sel = p5.createSelect();
        sel.position((p5.windowWidth-p5.width)/2+p5.width/2 - 65, 110);
        sel.style('background-color', 'rgb(128,155,127)');
        sel.style('border-radius', '3px');
        sel.style('width', '200px');
        sel.style('padding', '0.5em');
        sel.changed(mySelectEvent);

        sel.option('NaCl');
        sel.option('NaOH');
        sel.option('MgO');
        sel.option('HCl');
        sel.option('HBr');
    };

    const draw = (p5) => {
        p5.background(230, 238, 255)
        addImage(p5);
        
        hSolution = 10*vSlider.value()*(iHeight/20.0);
        molarity = mSlider.value()*1000*vSlider.value()/M;
        molarity = Math.trunc(molarity*10000)/10000;
        
        p5.textFont("Comic Sans MS", 23);
        p5.text("Volumn\n(Liters)", 25,42);
        p5.text("Amount\n  (kg)", 160,42);
        p5.text("Solute:", p5.width/2 - 15, 40);
        p5.text(solute, p5.width/2, p5.height/2);
        p5.text("Molarity", p5.width-p5.width/6,42);
        p5.text(molarity, p5.width-p5.width/6,70);
        
        //text(hSolution, width/2, 400);
    };

    function addImage(p5) {
        p5.image(img, iX, iY, iWidth, iHeight);
        
        p5.push();
        p5.noStroke();
        p5.fill(R-a1*mSlider.value(), G-a2*mSlider.value(), B-a1*mSlider.value());
        p5.rect(bX - (iWidth-iWidth/4)/2, bY-hSolution, iWidth-iWidth/4, hSolution);
        
        p5.stroke(0, 95);
        
        //fill(255, colSolution, colSolution);
        p5.ellipse(bX, bY, iWidth-iWidth/4, 50);
        p5.ellipse(bX, bY - hSolution, iWidth-iWidth/4, 50);
        //line(bX - (iWidth-iWidth/4)/2, bY-hSolution, bX - (iWidth-iWidth/4)/2, bY);
        //line(bX + (iWidth-iWidth/4)/2, bY-hSolution, bX + (iWidth-iWidth/4)/2, bY);
        p5.pop();
        
        p5.fill(0);
        for(let i=0; i<=15; i++) {
            let mul = 1;
            if(i%5 == 0) mul = 2;
            
            p5.line(bX - (iWidth-iWidth/4)/2, bY - i*(iHeight/20.0), bX - (iWidth-iWidth/4)/2 + mul*20, bY - i*(iHeight/20.0));
        }
        
        // circle(iX, iY, 10);
        // circle(iX+iWidth, iY, 10);
        // circle(iX, iY+iHeight, 10);
        // circle(iX+iWidth, iY+iHeight, 10);
        
        
    }
    
    function getSlider(p5, x, y, mn, mx) {
        let mySlider;
        let myInput;
        mySlider = p5.createSlider(mn, mx, (mn+mx)/2.0, 0.01);
        mySlider.position(x,y);
        mySlider.style('width', '600px');
        //mySlider.style('height', '200px');
        myInput = p5.createInput(mySlider.value());
        myInput.position(x-45+300, y-350);
        myInput.style('font-sze:30px;height:50px;width:80px;text-align:center;border:none');
        myInput.style("color: #ffffff; background-color: #27383F;text-shadow: #7a7a7a 4px 3px 0;");
        mySlider.style("transform", "rotate(-90deg)");
        myInput.input(()=>{mySlider.value(myInput.value());});
        mySlider.input(()=>{myInput.value(mySlider.value());} );
        
        return mySlider;
    }
    function mySelectEvent() {
        solute = sel.value();
        
        if(solute == 'NaCl') {
            M = 58.5;
            R = G = B = 242;
            a1 = a2 = a3 = 30;
        }
        else if(solute == 'NaOH') {
            M = 40;
            R = G = 113;
            B = 218;
            a1 = a2 = 30;
            a3 = 0;
        }
        else if(solute == 'MgO') {
            M = 40;
            R = G = 128;
            B = 255;
            a1 = a2 = 30;
            a3 = 0;
        }
        else if(solute == 'HCl') {
            M = 36.5;
            R = 179;
            G = 0;
            B = 179;
            a1 = a3 = 25;
            a2 = 0;
        }
        else if(solute == 'HBr') {
            M = 81;
            R = 255;
            G = 128;
            B = 213;
            a1 = 0;
            a2 = a3 = 30;
        }
        
    }

    return <Sketch setup={setup} draw={draw} />;
};
export default Molarity;
