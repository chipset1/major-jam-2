export default class Map {
  constructor(p){
    this.p = p;
    this.tileSize = 64;
    // this.mapSection = [1, 1,]
    this.map = this.makeMap(50);
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
    for(let i = 0; i < 8; i++){
      map.push(emptyRow);
    }
    map.push(wallRow);
    return map;
  }
  update(){
  }
  draw(){
    for(let row = 0; row < this.map.length; row++){
      for(let col = 0; col < this.map[0].length; col++){
        if(this.map[row][col] === 1){
          this.p.rect(col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }
}