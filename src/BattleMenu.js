import * as UI from "./UI.js";
import * as Pokemon from "./Pokemon.js";

export default class BattleMenu {
  constructor(p, battleScreen){
    this.p = p;
    this.battleScreen = battleScreen;
    this.selectionIndex = 0;
    this.topMenuItems = ["fight", "run"];
    this.state = "top";
  }
  draw(){
    let menuText = "";
    if(this.state === "top"){
      menuText = this.getMenuText(this.topMenuItems);
    }
    if(this.state === "moves"){
      menuText = this.getMenuText(Pokemon.getMoveNames(this.battleScreen.playerPokemon));
    }
    UI.drawBottomTextPanel(this.p, menuText.toUpperCase(), {x: this.p.width - 256 + 32,
                                                            width: 256 - 48});
  }
  getMenuText(menuItems){
    let menuText = "";
    this.selectionIndex = this.p.constrain(this.selectionIndex, 0, menuItems.length -1);
    menuItems.forEach((e, i) => {
      if(i === this.selectionIndex) menuText += ">";
      menuText += e + "\n";
    });
    return menuText;
  }
  resetMenu(){
    this.selectionIndex = 0;
    this.state = "top";
  }
  topMenuSelection(){
    return this.topMenuItems[this.selectionIndex];
  }
  moveMenuSelection(){
    let moves = Pokemon.getMoveNames(this.battleScreen.playerPokemon);
    return moves[this.selectionIndex];
  }
  keyPressed(){
    if(this.p.keyCode === this.p.UP_ARROW) {
      this.selectionIndex--;
    }
    if(this.p.keyCode === this.p.DOWN_ARROW) {
      this.selectionIndex++;
    }
    if(this.p.key === "x"){
      if(this.state === "moves"){
        this.battleScreen.playerPreformMove(this.moveMenuSelection());
      }
      if(this.state === "top") {
        if(this.topMenuSelection() === "fight"){
          this.state = "moves";
        }
        if(this.topMenuSelection() === "run"){
          this.battleScreen.dialogueText = "You got away!";
          this.battleScreen.transitionOut();
        }
      }
    }
  }
}