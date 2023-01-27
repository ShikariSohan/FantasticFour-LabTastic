import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});

let cnv;
let iWidth, iHeight, iX, iY,r=0,d=0,flag=0,dMagnify = 30000,img,back,magnify,zoomed;
let images = [], dis=[], dragging =[], xValues=[], yValues=[],inf=[],tmp=[], definition =[];
let manifest= "OMA AMI ETO CUTE KEMNE"

const Cell2 = () => {
    const setup = (p5, canvasParentRef) => {
        cnv = p5.createCanvas(1750, 760).parent(canvasParentRef);
        img = p5.loadImage('/0.jpg');
        images.push(img);
        img = p5.loadImage('/1.png');
        images.push(img);
        img = p5.loadImage('/2.png');
        images.push(img);
        img = p5.loadImage('/3.png');
        images.push(img);
        img = p5.loadImage('/4.png');
        images.push(img);
        img = p5.loadImage('/5.png');
        images.push(img);
        img = p5.loadImage('/6.png');
        images.push(img);
        img = p5.loadImage('/7.png');
        images.push(img);
        img = p5.loadImage('/8.png');
        images.push(img);
        img = p5.loadImage('/9.png');
        images.push(img);
        back = p5.loadImage('/back.png');
        magnify = p5.loadImage('/magnify.png')
        iWidth = 600;
        iHeight = 700;
        iX = p5.width/2 - p5.height/4;
        iY = 100;
        for(let i =0;i<15;i++)
        {
            dis.push(100);
            dragging.push(0);
            tmp.push(0);
            inf.push(3000);
        }
        xValues.push(30000);
        xValues.push(250);
        xValues.push(370);
        xValues.push(310);
        xValues.push(580);
        xValues.push(480);
        xValues.push(600);
        xValues.push(580);
        xValues.push(515);
        xValues.push(600);
        yValues.push(30000);
        yValues.push(435);
        yValues.push(260);
        yValues.push(200);
        yValues.push(455);
        yValues.push(335);
        yValues.push(320);
        yValues.push(370);
        yValues.push(200);
        yValues.push(420);
        dragging[0]=1
        tmp= xValues;
        setDefinition();


        cnv.mousePressed(() => {
            dMagnify = Math.max( Math.abs(p5.mouseX-815), Math.abs(p5.mouseY-95) );
            if(dMagnify<31) return;
            let cnt=0
            for(let i=0;i<10;i++)
            if(dis[i]<8) cnt++;
            if(!cnt) return
            for(let i=0;i<10;i++)
            {
            if(dis[i]<8) 
            {
                dragging[i]=1;
                if(i!=0)dragging[0]=0;
            }
            else 
            {
                if(i)dragging[i]=0;
            }
            }

        });
    }
    function setDefinition()
    {
        definition.push("Plant cell: Plant cells are the cells present in green plants, photosynthetic eukaryotes of the kingdom Plantae.")
        definition.push("Cell wall: The cell wall is the rigid outer cover of the plant cell with a significant role in protecting the plant cell, giving it its shape.")
        definition.push("Chloroplast: Chloroplast is a plastid in green plant cells containing chlorophyll and in which photosynthesis occurs.")
        definition.push("Vacuole: A vacuole is a membrane-bound cell organelle that helps maintain water balance. ")
        definition.push("Mitochondrion: mitochondrion is an organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur. ")
        definition.push("Endoplasomic Reticulum: Endoplasomic reticulum is a network of membranous tubules within the cytoplasm of a eukaryotic cell, continuous with the nuclear membrane. It usually has ribosomes attached and is involved in protein and lipid synthesis.")
        definition.push("Ribosome: A ribosome is an intercellular structure made of both RNA and protein, and it is the site of protein synthesis in the cell.")
        definition.push("Golgi body: golgi body is a complex of vesicles and folded membranes within the cytoplasm of most eukaryotic cells, involved in secretion and intracellular transport.")
        definition.push("Neucleous: The plant cell nucleus is a membrane bound organelle that contains the DNA of the cell. ")
        definition.push("Lysosome: A lysosome is a membrane-bound cell organelle that contains digestive enzymes.")
    }
    const draw = (p5) => {
        p5.background(255);
        p5.fill(255,180)
        p5.stroke(0, 64, 255)


        for(let i=0;i<10;i++)
        {   
          if(dragging[i]==1)
          {
            
            p5.push();
            p5.textSize(25);
            p5.fill(255)
            p5.stroke(255)
            p5.rect(0,921*.6, p5.width, p5.height)
        //    p5.textWrap(definition[i]);
            p5.fill(255,180)
            p5.stroke(0, 64, 255)
            p5.text(definition[i],50,921*.6+100,900)
            p5.pop()
            p5.image(images[i],0,0,p5.width,p5.height);
            
            if(i>0)
            {
                p5.image(back,10,10,30,30)
              
                xValues= inf;
                xValues[0]=25;
                yValues[0]=25;
            }
            else 
            {
              xValues = tmp
              xValues[0]=30000;
              yValues[0]=30000;
              
            }
          }
        }
        p5.image(magnify,800,80,30,30)
        if(dMagnify > 30)
          addTags(p5);
        else
        {
            if(p5.mouseX<1405*.6 && p5.mouseY <921*.6) 
            {
                p5.cursor('zoom-in')
              zoomed = p5.get(Math.max(0, p5.mouseX-50), Math.max(0, p5.mouseY-50),100,100)
              p5.image(zoomed, p5.mouseX-150, p5.mouseY-150,300,300)
            }
            else p5.cursor(p5.ARROW)
        }
        p5.text(p5.mouseX, 100, 100);
        p5.text(p5.mouseY, 130, 100);  
    }
    function addTags(p5) {
        p5.fill(255,180)
        p5.stroke(0, 64, 255)
        p5.strokeWeight(2);
        r+= 0.2
        if(r>20) r=0
        let flag = 0
        for(let i=0;i<11;i++) 
        {
          dis[i] = Math.max( Math.abs(p5.mouseX-xValues[i]), Math.abs(p5.mouseY - yValues[i]) );
          if(dragging[0]==1) p5.circle(xValues[i],yValues[i],r)
          if(dis[i]<8)  
          {
            flag = 1;
            if(i)
            {
                p5.push();
                p5.textSize(25);
                p5.fill(255)
                p5.stroke(255)
                p5.rect(0,921*.6, p5.width, p5.height)
                p5.fill(255,180)
                p5.stroke(0, 64, 255)
                p5.text(definition[i],50,921*.6+100,900)
                p5.pop()
            }
            
          }
        }
        let dMag = Math.max( Math.abs(p5.mouseX-815), Math.abs(p5.mouseY-95) );
        if(dMag<31) flag =1;
        if(flag == 1) 
        {
            p5.cursor(p5.HAND)
        }
        else p5.cursor(p5.ARROW)
    } 

    return <Sketch setup={setup} draw={draw} />;
};
export default Cell2;
