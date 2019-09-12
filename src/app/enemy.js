import w from './w'; 
import types from './types'; 
import { getAngle } from './functions';
import Entity from "./entity";
import Projectile from './projectile';
import Explosion from "./explosion";

export default class extends Entity {
  constructor(opts = {}) {
    super(opts); 

    this._subType     = opts.subType || 'floater';
    this._speed       = 0.5;
    this._type        = types['enemy'];

    switch(this._subType) {
      case 'floater':
        this._maxrad = 30;
        this._hitrad = 1;
        this._health = 1;
        break; 

      case 'sniper':
        opts.health = 2;
        break;
    }


  }

  _die() {
    w.entities.push(new Explosion({pos: this._pos}))
    this.isDead = true;
  }
    
  _shoot() {
    if(w.tick % 10 == 0) {
      let a = this._pos.angle + (w.ran() - 0.5) / 10; 
      this._proj = new Projectile({
        parent: types['enemy'],
        pos: this._pos, 
        vel: {x: Math.cos(a), y:  -Math.sin(a)}, 
        constAngle: a
      })

      w.entities.push(this._proj);
    }
  }

  _changeTarget() {
    this._pos.angle = getAngle(this._pos, {x: Math.round(Math.random() * w.bounds.width), y: Math.round(Math.random() * w.bounds.height)});
  }

  update(ctx) {
    if(this._buildIn)       {this._build()}
    if(this._health === 0)  {this._die()}
    this._checkCollisions();

    switch(this._subType) {
      case 'floater':
        if(w.oneIn(100)) {this._changeTarget()}
        this._vel.x += Math.cos(this._pos.angle) / 10;
        this._vel.y += -Math.sin(this._pos.angle) / 10;
        this._pos.x += this._vel.x * this._speed;
        this._pos.y -= this._vel.y * this._speed;
        break;

      case 'sniper':
        break; 
    }

    this._bounce(); 
    this._updateVel();
    this._render(ctx); 
  }

  _draw(ctx) {
    ctx.strokeWidth = 2; 
    let r = this._hitrad;
    
    switch(this._subType) {
      case 'floater':
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = 'white';
        ctx.fillRect(-r/ 2, -r/ 2, r, r);
        ctx.strokeRect(-r/ 2, -r/ 2, r, r);
        break;

      case 'sniper':
        break; 
    }
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
