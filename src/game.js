import p5 from "p5";
import BattleScreen from "./BattleScreen.js";

let sketch = (p) =>{
  let battleScreen;
  p.setup = () => {
    p.createCanvas(624, 624);
    battleScreen = new BattleScreen(p);
  };

  p.draw = () => {
    p.background(255, 0, 0);
    p.text(p.int(p.frameRate()), 10, 10);
    p.rect(p.mouseX, p.mouseY, 50, 50);

    if(battleScreen.isActive()){
      battleScreen.update();
      battleScreen.draw();
    }
  };

  p.keyPressed = () => {
    battleScreen.keyPressed();
    if(p.keyCode === p.ENTER) battleScreen.transitionToScreen();
  };
};

function drawTextPanel(p, str){
  let padding = 16,
      width = p.width - (padding * 2),
      height = 128,
      y = p.height - height - padding;
  p.rect(padding, y, width, height);
  p.push();
  p.textSize(40);
  p.text(str, padding, y + 32);
  p.pop();
}


new p5(sketch);