import w from "./w";
import Explosion from "./explosion";
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    // opts._vel = opts._vel || {x: 1, y: 1}
    super(opts)
    this._speed = 4;
    this._hitrad = 8;
    this._collides = true;
    this._type  = 'projectile';
  }

  _die() {
    w.entities.push(new Explosion({pos: this._pos}))
    this.isDead = true; 
  }

  _handleCollisions(cols) {
    cols.map(c => {
      if(c._type !== 'projectile' && c._type !== 'player') {this._die()}
    })
  }

  update(ctx) {
    this._checkCollisions();

    if(this._outOfBounds()) {this._die()};

    switch(this._outOfBounds()) {
      case 1: this._vel.x *= -1;  break;
      case 2: this._vel.y *= -1;  break;
    }

    this._pos.x     += this._vel.x * this._speed;
    this._pos.y     -= this._vel.y * this._speed;
    this._pos.angle = this._constAngle;

    this._render(ctx); 
  }

  _render(ctx) {
    ctx.save();
    ctx.translate(this._pos.x, this._pos.y); 
    ctx.rotate(this._pos.angle);
    ctx.fillStyle = 'rgba(2, 100, 2, 0.1)';
    ctx.fillRect(-this._hitrad, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
    ctx.fillStyle = 'rgba(2, 100, 2, 0.1)';
    ctx.fillRect(-this._hitrad / 2, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
    ctx.fillStyle = 'rgba(0, 20, 100, 0.8)';
    ctx.fillRect(0, -this._hitrad/2, -this._hitrad / 2, this._hitrad / 2);
    // 
    if(w.DEBUG){
      ctx.beginPath();
      ctx.arc(0, 0, this._hitrad, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }  
    ctx.restore(); 
  }
}