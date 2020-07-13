import * as UI from "./UI.js";
export default class BattleMenu {
  constructor(p, battleScreen){
    this.p = p;
    this.battleScreen = battleScreen;
    this.menuText = ">Fight\nRun";
    this.menuSelection = "fight";
    this.showingMovesMenu = false;
  }
  draw(){
    this.displayMoveList(this.battleScreen.playerPokemon.getMoveNames());
    UI.drawBottomTextPanel(this.p, this.menuText, {x: this.p.width - 256 + 32,
                                                   width: 256 - 48});
  }
  displayMoveList(moveNames){
    // only works with if pokemon 2 moves
    if(this.menuSelection === "move1"){
      this.menuText = ">" + moveNames[0] + "\n" + moveNames[1];
    }
    if(this.menuSelection === "move2"){
      this.menuText = moveNames[0] + "\n>" + moveNames[1];
    }
  }
  keyPressed(){
    if(this.showingMovesMenu) {
      if(this.p.keyCode === this.p.UP_ARROW) {
        this.menuSelection = "move1";
      }
      if(this.p.keyCode === this.p.DOWN_ARROW) {
        this.menuSelection = "move2";
      }
    } else {
      if(this.p.keyCode === this.p.UP_ARROW) {
        this.menuText = ">Fight\nRun";
        this.menuSelection = "fight";
      }
      if(this.p.keyCode === this.p.DOWN_ARROW) {
        this.menuText = "Fight\n>Run";
        this.menuSelection = "run";
      }
    }
    if(this.p.key === "x" && this.menuSelection === "fight") {
      // this.playerAttackStart();
      this.showingMovesMenu = true;
      this.menuSelection = "move1";
    }
    if(this.p.key === "x" && this.menuSelection === "run") {
      this.battleScreen.dialogueText = "You got away!";
      this.battleScreen.transitionOut();
      // this.state = "playerRun";
    }
  }
}