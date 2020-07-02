export default class Map {
  constructor(p, x, y){
    this.p = p;
    this.tileSize = 64;
    // this.mapSection = [1, 1,]
    this.map = this.makeMap(40);
    this.x = x;
    this.y = y;
    this.width = 10 * this.tileSize;
    this.height = 10 * this.tileSize;
 }
  makeMap(w){
    let map = [],
        wallRow = [],
        emptyRow = [];
    for(let i = 0; i < w; i++){
      wallRow.push(1);
      emptyRow.push(0);
    }
    map.push(wallRow);
    for(let i = 0; i < w - 2; i++){
      map.push(emptyRow);
    }
    map.push(wallRow);
    return map;
  }
  makeStartingMap(){
  }

  drawMap(){
    for(let row = 0; row < this.map.length; row++){
      for(let col = 0; col < this.map[0].length; col++){
        if(this.map[row][col] === 1){
          this.p.rect(this.x + col * this.tileSize, this.y + row * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }
  draw(){
    // this.drawMap();
    // this.p.randomSeed(1);
    for(let x = 0; x < this.width; x+=this.tileSize){
      for(let y = 0; y < this.height; y+=this.tileSize){
        this.p.text("grass", x, y);
      }
    }
  }
}