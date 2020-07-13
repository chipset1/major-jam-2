export default class Pokemon {
  constructor(p, spriteSheet, data){
    this.p = p;
    this.attack = 40;
    this.health = 100;
    this.maxHealth = 100;

    this.spriteSheet = spriteSheet;
    this.data = data;
  }
  getMoveNames(){
    return Object.keys(this.data.moves);
  }
  draw(x, y){
    let sprite = this.data.sprite;
    this.p.image(this.spriteSheet, x, y, sprite.width * sprite.scale, sprite.height * sprite.scale,
                 sprite.x, sprite.y, sprite.width, sprite.height);
    // this.p.push();
    // this.p.noFill();
    // this.p.stroke(255);
    // this.p.rect(x, y, sprite.width, sprite.height);
    // this.p.pop();
  }
}