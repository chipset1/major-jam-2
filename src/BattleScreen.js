import Queue from "./Queue.js";
import TextEvent from "./TextEvent.js";

export default class BattleScreen {
  constructor(p){
    this.p = p;
    this.queue = new Queue();
    this.currentEvent = undefined;
    this.queue.push(new TextEvent(p, "hello1"));
    this.queue.push(new TextEvent(p, "hello2"));
    this.queue.push(new TextEvent(p, "hello3"));
    this.queue.push(new TextEvent(p, "hello4"));
  }
  update(){
    while(this.currentEvent === undefined || this.currentEvent.isFinished()){
      if(this.queue.peek() === undefined){
        this.currentEvent = undefined;
        break;
      } else {
        this.currentEvent = this.queue.poll();
      }
    }
    if(this.currentEvent !== undefined) this.currentEvent.update();

  }
  draw(){

  }
  keyPressed(){
    if(this.currentEvent !== undefined) this.currentEvent.keyPressed();
  }
}