import p5 from "p5";

let sketch = (p) =>{
  p.setup = () => {
    p.createCanvas(624, 624);
  };

  p.draw = () => {
    p.background(255);
    p.text(p.int(p.frameRate()), 10, 10);
  };
};

new p5(sketch);