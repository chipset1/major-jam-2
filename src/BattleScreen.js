import Queue from "./Queue.js";
import TextEvent from "./TextEvent.js";

export default class BattleScreen{
  constructor(p){
    this.p = p;
    this.queue = new Queue();
    this.queue.push(new TextEvent(p, "hello1"));
    this.queue.push(new TextEvent(p, "hello2"));
    this.queue.push(new TextEvent(p, "hello3"));
    this.queue.push(new TextEvent(p, "hello4"));
  }
  update(){

  }
  draw(){

  }
}