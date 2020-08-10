import * as UI from "./UI.js";
import * as Pokemon from "./Pokemon.js";
import BattleMenu from "./BattleMenu.js";

export default class BattleScreen {
  constructor(p){
    this.p = p;
    this.battleMenu = new BattleMenu(p, this);
    this.state = "idle";
    this.dialogueText = "Choose an action:";
    this.transitionLength = 2000; // half time fade in other half fade out
    this.drawScreen = false;
    this.active = false;
    this.moveSelected = "";
    this.playerPos = this.p.createVector(64, 200);
    this.opponentPos = this.p.createVector(this.p.width - 64 - 180, 200);
  }
  update(){
    if(this.state === "playerMove"){
      let move = this.playerPokemon.moves[this.moveSelected];
      let moveIsFinished = move.preform(this.playerPokemon, this.opponentPokemon);
      if(this.opponentPokemon.health <= 0){
        this.dialogueText = this.opponentPokemon.name + " is dead.\nYou won the battle";
        this.state = "won";
      } else if(moveIsFinished) {
        this.enemyPreformMove();
      }
    }
    if(this.state === "enemyMove"){
      let move = this.opponentPokemon.moves[this.moveSelected];
      let moveIsFinished = move.preform(this.opponentPokemon, this.playerPokemon);
      if(this.playerPokemon.health <= 0){
        this.dialogueText = "Player " + this.playerPokemon.name + " died";
        this.state = "lost";
      } else if(moveIsFinished){
        this.battleMenu.resetMenu();
        this.dialogueText = "Choose an action:";
        this.state = "idle";
      }
    }
  }
  draw(spriteSheet){
    if(this.drawScreen){
      this.p.background(255);

      this.p.text("player " + this.playerPokemon.name + " health: " + this.playerPokemon.health, this.playerPos.x, this.playerPos.y - 16);
      Pokemon.draw(this.p, spriteSheet, this.playerPokemon, this.playerPos.x, this.playerPos.y);


      this.p.text(this.opponentPokemon.name + " health: " + this.opponentPokemon.health, this.opponentPos.x-32, this.opponentPos.y - 16);
      Pokemon.draw(this.p, spriteSheet, this.opponentPokemon, this.opponentPos.x, this.opponentPos.y);
      this.battleMenu.draw();
      UI.drawBottomTextPanel(this.p, this.dialogueText, {width: this.p.width - 256});
    }
    this.drawTransitionToScreen();
  }
  playerPreformMove(moveSelected){
    this.moveSelected = moveSelected;
    let move = this.playerPokemon.moves[this.moveSelected];
    move.start(this.opponentPokemon);
    this.dialogueText = "Player " + this.playerPokemon.name + " used " + this.moveSelected;
    this.state = "playerMove";
  }
  enemyPreformMove(){
    this.moveSelected = "tackle";
    let move = this.opponentPokemon.moves[this.moveSelected];
    move.start(this.playerPokemon);
    this.dialogueText = this.opponentPokemon.name + " used " + this.moveSelected;
    this.state = "enemyMove";
  }
  mapFadeInOutAlpha(drawScreen){
    if(this.p.millis() < this.transitionStartTime + (this.transitionLength/2)){
      this.fadeInOutAlpha = this.p.map(this.p.millis(),
                                       this.transitionStartTime,
                                       this.transitionStartTime + (this.transitionLength/2),
                                       0,
                                       255);
    } else{
      this.drawScreen = drawScreen;
      this.fadeInOutAlpha = this.p.map(this.p.millis(),
                                       this.transitionStartTime + (this.transitionLength/2),
                                       this.transitionStartTime+this.transitionLength,
                                       255,
                                       0);
    }
  }
  drawTransitionToScreen(){
    if(this.state === "transitionTo"){
      this.mapFadeInOutAlpha(true);
      if(this.p.millis() > this.transitionStartTime+this.transitionLength){
        this.fadeInOutAlpha = 0;
        this.state = "idle";
      }
    }
    if(this.state === "transitionOut"){
      this.mapFadeInOutAlpha(false);
      if(this.p.millis() > this.transitionStartTime+this.transitionLength){
        this.active = false;
      }
    }

    this.p.push();
    this.p.fill(255, this.fadeInOutAlpha);
    this.p.rect(0,0,this.p.width, this.p.height);
    this.p.pop();
  }
  transitionToScreen(playerPokemon, opponentPokemon){
    this.transitionStartTime = this.p.millis();
    this.playerPokemon = playerPokemon;
    this.opponentPokemon = opponentPokemon;
    this.active= true;
    this.drawScreen = false;
    this.state = "transitionTo";
    this.dialogueText = "Choose an action:";
    this.battleMenu.resetMenu();
  }
  transitionOut(){
    this.transitionStartTime = this.p.millis();
    this.state = "transitionOut";
  }
  isActive(){
    return this.active;
  }
  keyPressed(){
    if(this.state === "won" && this.p.key === "x") {
      this.dialogueText = "Returning to over world";
      this.transitionOut();
    }
    if(this.state === "lost" && this.p.key === "x") {
      this.dialogueText = "Returning to over world\nand healing pokemon";
      this.playerPokemon.health = this.playerPokemon.maxHealth;
      this.transitionOut();
    }
    if(this.state === "idle"){
      this.battleMenu.keyPressed();
    }
  }
}