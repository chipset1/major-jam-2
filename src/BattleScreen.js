import * as UI from "./UI.js";

export default class BattleScreen {
  constructor(p){
    this.p = p;
    this.state = "idle";
    this.dialogueText = "First message: Battle is\nstarting";
    this.menuText = ">Fight\nRun";
    this.menuSelection = "fight";
    this.damageAnimationLength = 1200;
    this.player = {pos: this.p.createVector(64, 256),
                   attack: 40,
                   health: 100,
                   maxHealth: 100};
    this.opponent = {pos: this.p.createVector(this.p.width - 64 - 80, 256),
                     attack: 20,
                     health: 100,
                     maxHealth: 100};
  }
  update(){
    if(this.state === "playerAttack"){
      this.opponent.health = this.p.max(this.damageMap(this.opponent, this.player), 0);
      if(this.opponent.health <= 0){
        this.dialogueText = "Opponent is dead\nYou won the battle";
        this.state = "won";
      }
      if(this.isDamageAnimationOver(this.opponent)){
        this.opponent.health = this.opponent.damageAnimationStartHealth - this.player.attack;
        this.enemyAttackStart();
        this.state = "enemyAttack";
      }
    }
    if(this.state === "enemyAttack"){
      this.player.health = this.p.max(this.damageMap(this.player, this.opponent), 0);
      if(this.player.health <= 0){
        this.dialogueText = "Player name died";
        this.state = "lost";
      }
      if(this.isDamageAnimationOver(this.player)){
        this.player.health = this.player.damageAnimationStartHealth - this.opponent.attack;
        this.dialogueText = "Choose an action:";
        this.state = "idle";
      }
    }
  }
  draw(){
    this.p.text("player health: " + this.player.health, this.player.pos.x, this.player.pos.y - 16);
    this.p.rect(64, 256, 50,50);

    this.p.text("opponent health: " + this.opponent.health, this.opponent.pos.x, this.opponent.pos.y - 16);
    this.p.rect(this.opponent.pos.x, this.opponent.pos.y, 50,50);
    UI.drawBottomTextPanel(this.p, this.menuText, {x: this.p.width - 256 + 32,
                                                   width: 256 - 48});
    UI.drawBottomTextPanel(this.p, this.dialogueText, {width: this.p.width - 256});
  }
  isDamageAnimationOver(entity){
    return this.p.millis() > entity.damageAnimationStart + this.damageAnimationLength;
  }
  damageMap(entity, attacker){
    return this.p.int(this.p.map(this.p.millis(),
                                 entity.damageAnimationStart,
                                 entity.damageAnimationStart + this.damageAnimationLength,
                                 entity.damageAnimationStartHealth,
                                 entity.damageAnimationStartHealth - attacker.attack));
  }
  playerAttackStart(){
    this.opponent.damageAnimationStart = this.p.millis();
    this.opponent.damageAnimationStartHealth = this.opponent.health;
    this.dialogueText = "Player name attacks!";
  }
  enemyAttackStart(){
    this.player.damageAnimationStart = this.p.millis();
    this.player.damageAnimationStartHealth = this.player.health;
    this.dialogueText = "Opponent name attacks!";
  }
  keyPressed(){
    if(this.state === "won" && this.p.key === "x") console.log("returning to over world");
    if(this.state === "lost" && this.p.key === "x") console.log("showing game over screen");
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
        this.state = "playerAttack";
      }
      if(this.p.key === "x" && this.menuSelection === "run"){
        this.state = "playerRun";
      }
    }
  }
}