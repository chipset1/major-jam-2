import Queue from "./Queue.js";

export default class EventQueue {
  constructor(){
    this.queue = new Queue();
    this.currentEvent = undefined;
  }
  push(element){
    this.queue.push(element);
  }
  update(){
    // there must be a better way to do this
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
  keyPressed(){
    if(this.currentEvent !== undefined) this.currentEvent.keyPressed();
  }
}