export default class TextEvent {
  constructor(p, msg){
    this.p = p;
    this.msg = msg;
    this.finished = false;
  }
  update(){
    // maybe move this into a draw function

    let padding = 16,
        width = this.p.width - (padding * 2),
        height = 128,
        y = this.p.height - height - padding;
    this.p.rect(padding, y, width, height);
    this.p.push();
    this.p.textSize(40);
    this.p.text(this.msg, padding, y + 32);
    this.p.pop();
  }
  keyPressed(){
    if(this.p.keyCode === this.p.ENTER){
      this.finished = true;
    }
  }
  isFinished(){
    return this.finished;
  }
}
