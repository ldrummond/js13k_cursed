import { getAngle } from './functions';
import w from './w'; 

export default class {
  constructor(opts = {}) {
    this._speed       = opts.speed  || 1; 
    this._health      = opts.health || 1; 
    this._damage      = opts.damage || 1; 
    this._pos         = opts.pos ? {...opts.pos} : {x: w.bounds.width / 2,  y: w.bounds.height / 2, angle: 0};
    this._vel         = opts.vel ? {...opts.vel} : {x: 0,  y: 0};
    this._constAngle  = opts.constAngle;
    this._collides    = opts.collides || true; 
    this._hitrad      = opts.hitrad || 5; 
    this._type        = opts.type || 'entity';

    this.isDead    = false; 
  }

  _shouldDie() {
    return false; 
    return this._health <= 0; 
  }

  _die() {
    
  }

  _checkCollisions() {
    let cols = w.entities.filter(e => w.sqDist(this._pos, e._pos) < w.sq(this._hitrad * 0.6) + w.sq(e._hitrad * 0.6) && e._collides)
    this._handleCollisions(cols);
  }

  _handleCollisions(cols) {
    
  }

  _outOfBounds() {
    if(this._pos.x - this._hitrad < 2){return 1}           
    if(this._pos.x + this._hitrad > w.bounds.width){return 1} 
    if(this._pos.y - this._hitrad < 2){return 2}             
    if(this._pos.y + this._hitrad > w.bounds.height){return 2}
  }

  _drawHitbox(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this._hitrad * 0.6, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
 
  update(ctx) {
    if(this.collides){this._checkCollisions()}; 

    this._pos.x     += this._vel.x * this._speed;
    this._pos.y     -= this._vel.y * this._speed;
    this._pos.angle = this._constAngle || getAngle(this._pos, this._target); 

    // Decrease vel
    this._vel.x     *= this._vel.x > 0.1 || this._vel.x < 0.1  ? 0.98 : 0; 
    this._vel.y     *= this._vel.y > 0.1 || this._vel.y < 0.1  ? 0.98 : 0; 

    this._render(ctx); 
  }
  
  _render(ctx) {
    ctx.fillRect(this._pos.x, this._pos.y, 20, 20);
  }
}