import w from './w'; 
import { getAngle } from './functions';
import cursors from './cursors';

import Projectile from './projectile';
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    super(opts); 

    this._speed       = 0.5;
    this._cursorType  = 'basic'; 
    this._hitrad      = 15;
    this._type        = 'player';

    // this._imgLoaded   = false; 
    // this._cursorImg   = new Image();
    // this._cursorImg.onload = _ => {this._imgLoaded = true}
    // this._cursorImg.src = cursors[0];
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
    // console.log(this._checkCollisions());
    // this._checkCollisions();

    this._pos.x     += this._vel.x * this._speed;
    this._pos.y     -= this._vel.y * this._speed;
    this._pos.angle = this._constAngle || getAngle(this._pos, this._target); 

    if(w.keyMap&w.keys[87]) {this._vel.y += this._speed} // W
    if(w.keyMap&w.keys[65]) {this._vel.x -= this._speed} // A
    if(w.keyMap&w.keys[83]) {this._vel.y -= this._speed} // S
    if(w.keyMap&w.keys[68]) {this._vel.x += this._speed} // D
    if(w.keyMap&w.keys[32]) {this._shoot()} // Space

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
    ctx.rotate(this._pos.angle + Math.PI / 2);

      // if(this._imgLoaded) {
      //   ctx.drawImage(this._cursorImg, -this._cursorImg.width, this._cursorImg.height);
      // } else {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    // ctx.moveTo(0, -this._hitrad);
    ctx.moveTo(-this._hitrad, 0);
    ctx.lineTo(0, -this._hitrad);
    ctx.lineTo(this._hitrad, 0);
    // ctx.lineTo(this._hitrad, 0);
    // ctx.closePath();
    ctx.strokeRect(-this._hitrad / 2, -this._hitrad / 2, this._hitrad, this._hitrad);
    ctx.stroke(); 

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
