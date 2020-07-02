export default class Pokemon {
  constructor(p){
    this.p = p;
    this.attack = 10;
    this.health = 100;
    this.maxHealth = 100;
  }
  draw(x, y){
    this.p.text("this is a pokemon", x, y);
  }
}