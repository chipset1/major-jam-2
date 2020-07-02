import p5 from "p5";
import BattleScreen from "./BattleScreen.js";
import Player from "./Player.js";

let sketch = (p) =>{
  let battleScreen, player;
  p.setup = () => {
    p.createCanvas(640, 640);
    player = new Player(p, p.width / 2, p.height / 2);
    battleScreen = new BattleScreen(p);
  };

  p.draw = () => {
    p.background(255, 0, 0);
    p.text(p.int(p.frameRate()), 10, 10);
    player.update() ;
    player.draw() ;

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