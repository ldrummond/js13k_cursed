import w from './w'; 
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    super(opts); 

    this._maxrad      = opts._maxrad || 30; 
    this._collides    = false; 
    this._type        = 'explosion';
  }

  update(ctx) {
    this._build();
    if(this._hitrad > this._maxrad) {this._die()}
    this._render(ctx); 
  }

  _render(ctx) {
    ctx.save();
    ctx.translate(this._pos.x, this._pos.y); 
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 100, 0, ${0.6 - this._hitrad/ this._maxrad})`
    ctx.arc(0, 0, this._hitrad, 0, 2 * Math.PI);    
    ctx.stroke(); 
    ctx.restore(); 
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
