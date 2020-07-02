export default class Pokemon {
  constructor(p, letterCode){
    this.p = p;
    this.attack = 40;
    this.health = 100;
    this.maxHealth = 100;
    this.size = 64;
    this.letterCode = letterCode;
    this.graphics = p.createGraphics(this.size, this.size);
    this.makeGraphics();
  }
  makeGraphics(){
    //https://twitter.com/Hau_kun/status/1246214256246177793
    //https://www.openprocessing.org/sketch/868094
    // this is not working completely
    let g = this.graphics;
    g.clear();
    g.textSize(64);
    g.text(g.char(this.letterCode), 0, 50);
    g.circle(this.size/2, this.size/2, 30);
    g.circle((this.size/2)-7, this.size/2, 6);
    g.push();
    g.scale(-1, 1);
    g.copy(0,0, this.size/2, this.size,
           -this.size, 0, this.size/2, this.size);
    g.pop();
  }
  draw(x, y){
    this.p.image(this.graphics, x, y);
  }
}