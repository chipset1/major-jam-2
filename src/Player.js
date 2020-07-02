import Pokemon from "./Pokemon.js";

export default class Player {
  constructor(p, x, y){
    this.p = p;
    this.pos = this.p.createVector(x, y);
    this.speed = 6;
    this.size = 64;
    this.pokemon = new Pokemon(p);
  }
  getPokemon(){
    return this.pokemon;
  }
  update(){
    if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
      this.pos.x -= this.speed;
    }
    if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
      this.pos.x += this.speed;
    }
    if (this.p.keyIsDown(this.p.UP_ARROW)) {
      this.pos.y -= this.speed;
    }
    if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
      this.pos.y += this.speed;
    }
  }
  draw(){
    this.p.rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}
