import w from './w'; 
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    super(opts); 

    this._maxrad      = opts.maxrad || 30; 
    this._collides    = false; 
    this._type        = 'explosion';
    this._fill        = opts.fill;
  }

  update(ctx) {
    this._build();
    if(this._hitrad >= this._maxrad) {this._die(); return}
    this._render(ctx); 
  }

  _draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 100, 0, ${0.6 - this._hitrad/ this._maxrad})`
    ctx.arc(0, 0, this._hitrad, 0, 2 * Math.PI);    
    ctx.stroke(); 
    if(this._fill) {
      ctx.fillStyle = this._fill;
      ctx.fill();
    }
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
