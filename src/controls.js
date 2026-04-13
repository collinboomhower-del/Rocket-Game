export class Controls {
  constructor(){
    this.keys={};
    addEventListener("keydown",e=>this.keys[e.key]=true);
    addEventListener("keyup",e=>this.keys[e.key]=false);
  }
}
