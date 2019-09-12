import w from "./w";
import types from './types';
import Explosion from "./explosion";
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    // opts._vel = opts._vel || {x: 1, y: 1}
    super(opts)
    this._speed     = 4;
    this._hitrad    = 8;
    this._collides  = true;
    this._type      = types['projectile'];
    this._damage    = 1; 

    this._subTypes = [
      'bullet',
      'ripple',
      'bomb',
    ]
    this._subType = opts.subType || 'bullet';
    this._initProjectileType()
  }

  static getTypes() {
    return [
      'bullet',
      'ripple',
      'bomb',
      'mine', 
    ];
  }

  _initProjectileType() {
    switch(typeof(this._subType) === 'function' ? this._subType() : this._subType) {
      case 'bullet':
        this._draw = (ctx) => {
          ctx.fillStyle = 'rgba(2, 100, 2, 0.1)';
          ctx.fillRect(-this._hitrad, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
          ctx.fillStyle = 'rgba(2, 100, 2, 0.1)';
          ctx.fillRect(-this._hitrad / 2, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
          ctx.fillStyle = 'rgba(0, 20, 100, 0.8)';
          ctx.fillRect(0, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
        }
        break;

      case 'ripple':
        this._vel     = {x: 0, y: 0}
        this._hitrad  = 5; 
        this._maxrad  = 100;
        this._draw = (ctx) => {
          this._hitrad < this._maxrad ? this._hitrad+= 2 : this._die();  
          ctx.beginPath();
          // ctx.strokeStyle = `rgba(0, 100, 0, ${0.6 - this._hitrad/ this._maxrad})`
          ctx.arc(0, 0, this._hitrad * 0.6, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.closePath();
        }
        break;

      case 'bomb':
        this._vel     = {x: 0, y: 0}
        this._hitrad  = 20; 
        this._draw = (ctx) => {
          ctx.beginPath();
          ctx.fillStyle = '#4DC5F9'
          ctx.arc(0, 0, this._hitrad * 0.6, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();
        }
        break; 
    }
  }

  _die() {
    let e = new Explosion({pos: this._pos});
    w.entities.push(e);
    this.isDead = true;
  }

  _handleCollisions(cols) {
    cols.map(c => {
      switch(c._type) {
        case this._type:
        case this._parent:
          break;
        
        default:
          c.takeDamage(this._damage); 
          this._die(); 
      }
    })
  }

  update(ctx) {
    this._checkCollisions();
    if(this._checkBounds()) {this._die()};

    this._pos.x     += this._vel.x * this._speed;
    this._pos.y     -= this._vel.y * this._speed;
    this._pos.angle = this._constAngle;

    this._render(ctx); 
  }

  
}