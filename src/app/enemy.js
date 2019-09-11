import w from './w'; 
import { getAngle } from './functions';
import Projectile from './projectile';
import Entity from "./entity";

export default class extends Entity {
  constructor(opts = {}) {
    super(opts); 

    this._speed       = 0.5;
    this._eType       = opts._eType || 'floater';
    this._type        = 'enemy';
    this._hitrad = 30; 
  }

    // _capVel() {
    //   this._vel.x += this._vel.x > 0 ? Math.min(this._vel.x, 1) : Math.max(this._vel.x, -1); 
    //   this._vel.y += this._vel.y > 0 ? Math.min(this._vel.y, 1) : Math.max(this._vel.y, -1); 
    // }
    
  _shoot() {
    if(w.tick % 10 == 0) {
      let a = this._pos.angle + (w.ran() - 0.5) / 10; 
      this._proj = new Projectile({
        pos: this._pos, 
        vel: {x: Math.cos(a), y:  -Math.sin(a)}, 
        constAngle: a
      })

      w.entities.push(this._proj);
    }
  }

  update(ctx) {

    switch(this._eType) {
      case 'floater':
        if(w.oneIn(100)) {
          this._pos.angle = getAngle(this._pos, {x: Math.round(Math.random() * w.bounds.width), y: Math.round(Math.random() * w.bounds.height)});
        }
        this._vel.x += Math.cos(this._pos.angle) / 10;
        this._vel.y += -Math.sin(this._pos.angle) / 10;
        this._pos.x += this._vel.x * this._speed;
        this._pos.y -= this._vel.y * this._speed;
        break;

      case 'sniper':
        break; 
    }

    this._vel.x *= this._vel.x > 0.1 || this._vel.x < 0.1 ? 0.95 : 0; 
    this._vel.y *= this._vel.y > 0.1 || this._vel.y < 0.1 ? 0.95 : 0; 

    switch(this._outOfBounds()) {
      case 1: this._vel.x *= -1; break;
      case 2: this._vel.y *= -1; break;
    }

    this._render(ctx); 
  }


  _render(ctx) {
    ctx.save();
    ctx.translate(this._pos.x, this._pos.y); 
    ctx.strokeWidth = 2; 
    let r = this._hitrad
    
    switch(this._eType) {
      case 'floater':
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = 'white';
        ctx.fillRect(-r/ 2, -r/ 2, r, r);
        ctx.strokeRect(-r/ 2, -r/ 2, r, r);
        break;

      case 'sniper':
        break; 
    }

    // DEBUG
    if(w.DEBUG){this._drawHitbox(ctx)} 
    
    ctx.restore(); 
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
