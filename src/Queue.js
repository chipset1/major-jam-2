export default class Queue {
  constructor(){
    this.elements = [];
  }
  push(element){
    this.elements.push(element);
  }
  peek(){
    return this.elements[0];
  }
  poll(){
    return this.elements.shift();
  }
}