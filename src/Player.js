import * as Pokemon from "./Pokemon.js";

export default class Player {
  constructor(p, spriteSheet, x, y){
    this.p = p;
    this.pos = this.p.createVector(x, y);
    this.speed = 6;
    this.size = 64;
    this.pokemon = Pokemon.create(spriteSheet, {name: "Saurbulb",
                                                sprite: {x: 0,
                                                         y: 39,
                                                         width:32,
                                                         height:32,
                                                         scale: 6},
                                                moves: {tackle: {},
                                                        growl: {}}});
    this.spriteSheet = spriteSheet;
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
    // this.p.push();
    // this.p.translate(this.pos.x+128, this.pos.y);
    // this.p.scale(-1, 1);
    // this.p.image(this.walkingDownImage, 0, 0, this.size, this.size*2, 16, 0, 16, 32);
    // this.p.pop();
    const srcImageWidth = 16,
          srcImageHeight = 16+6;
    this.p.image(this.spriteSheet, this.pos.x, this.pos.y, srcImageWidth*4, srcImageHeight*4,
                 0, 0, srcImageWidth, srcImageHeight);
  }
}
