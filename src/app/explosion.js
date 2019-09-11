import w from './w'; 
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    super(opts); 

    this._size        = 0; 
    this._maxsize     = 30; 
    this._collides    = false; 
    this._type        = 'explosion';
  }

  update(ctx) {
    this._size++ 
    if(this._size === this._maxsize) {this.isDead = true}
    this._render(ctx); 
  }


  _render(ctx) {
    ctx.save();
    ctx.translate(this._pos.x, this._pos.y); 
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 100, 0, ${0.6 - this._size/ this._maxsize})`
    ctx.arc(0, 0, this._size, 0, 2 * Math.PI);    
    ctx.stroke(); 
    ctx.restore(); 
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
