import * as UI from "./UI.js";

export default class BattleScreen {
  constructor(p){
    this.p = p;
    this.state = "idle";
    this.dialogueText = "Choose an action:";
    this.menuText = ">Fight\nRun";
    this.menuSelection = "fight";
    this.damageAnimationLength = 200;
    this.transitionLength = 2000; // half time fade in other half fade out
    this.drawScreen = false;
    this.active = false;
    this.playerPos = this.p.createVector(64, 256);
    this.opponentPos = this.p.createVector(this.p.width - 64 - 80, 256);
  }
  update(){
    if(this.state === "playerAttack"){
      this.opponentPokemon.health = this.p.max(this.damageMap(this.opponentPokemon, this.playerPokemon), 0);
      if(this.opponentPokemon.health <= 0){
        this.dialogueText = "Opponent is dead\nYou won the battle";
        this.state = "won";
      }
      if(this.isDamageAnimationOver(this.opponentPokemon)){
        this.opponentPokemon.health = this.opponentPokemon.damageAnimationStartHealth - this.playerPokemon.attack;
        this.enemyAttackStart();
      }
    }
    if(this.state === "enemyAttack"){
      this.playerPokemon.health = this.p.max(this.damageMap(this.playerPokemon, this.opponentPokemon), 0);
      if(this.playerPokemon.health <= 0){
        this.dialogueText = "Player name died";
        this.state = "lost";
      }
      if(this.isDamageAnimationOver(this.playerPokemon)){
        this.playerPokemon.health = this.playerPokemon.damageAnimationStartHealth - this.opponentPokemon.attack;
        this.dialogueText = "Choose an action:";
        this.state = "idle";
      }
    }
  }
  draw(){
    if(this.drawScreen){
      this.p.background(255);

      this.p.text("player health: " + this.playerPokemon.health, this.playerPos.x, this.playerPos.y - 16);
      this.p.rect(64, 256, 50,50);

      this.p.text("opponent health: " + this.opponentPokemon.health, this.opponentPos.x, this.opponentPos.y - 16);
      this.p.rect(this.opponentPos.x, this.opponentPos.y, 50,50);
      UI.drawBottomTextPanel(this.p, this.menuText, {x: this.p.width - 256 + 32,
                                                     width: 256 - 48});
      UI.drawBottomTextPanel(this.p, this.dialogueText, {width: this.p.width - 256});
    }
    this.drawTransitionToScreen();
  }
  isDamageAnimationOver(entity){
    return this.p.millis() > entity.damageAnimationStart + this.damageAnimationLength;
  }
  damageMap(entity, attacker){
    // this is not the right way to do this
    // small damage amount will take just as long as large damage amounts
    return this.p.int(this.p.map(this.p.millis(),
                                 entity.damageAnimationStart,
                                 entity.damageAnimationStart + this.damageAnimationLength,
                                 entity.damageAnimationStartHealth,
                                 entity.damageAnimationStartHealth - attacker.attack));
  }
  playerAttackStart(){
    this.opponentPokemon.damageAnimationStart = this.p.millis();
    this.opponentPokemon.damageAnimationStartHealth = this.opponentPokemon.health;
    this.dialogueText = "Player name attacks!";
    this.state = "playerAttack";
  }
  enemyAttackStart(){
    this.playerPokemon.damageAnimationStart = this.p.millis();
    this.playerPokemon.damageAnimationStartHealth = this.playerPokemon.health;
    this.dialogueText = "Opponent name attacks!";
    this.state = "enemyAttack";
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
    let transitionOver = ()=>{
      if(this.p.millis() > this.transitionStartTime+this.transitionLength){
        if(this.state === "transitionOut") {
          this.active = false;
        } else {
          this.fadeInOutAlpha = 0;
          this.state = "idle";
        }
      }
    };
    if(this.state === "transitionTo"){
      this.mapFadeInOutAlpha(true);
      transitionOver();
    }
    if(this.state === "transitionOut"){
      this.mapFadeInOutAlpha(false);
      transitionOver();
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
      if(this.p.keyCode === this.p.UP_ARROW) {
        this.menuText = ">Fight\nRun";
        this.menuSelection = "fight";
      }
      if(this.p.keyCode === this.p.DOWN_ARROW) {
        this.menuText = "Fight\n>Run";
        this.menuSelection = "run";
      }
      if(this.p.key === "x" && this.menuSelection === "fight"){
        this.playerAttackStart();
      }
      if(this.p.key === "x" && this.menuSelection === "run"){
        this.dialogueText = "You got away!";
        this.transitionOut();
        // this.state = "playerRun";
      }
    }
  }
}