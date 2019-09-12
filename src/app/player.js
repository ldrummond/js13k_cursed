import w from './w'; 
import { getAngle } from './functions';
import cursors from './cursors';
import types from './types'
import Explosion from './explosion';
import Projectile from './projectile';
import Entity from "./entity";

export default class extends Entity {
  constructor(opts) {
    super(opts); 

    this._speed       = 0.5;
    this._cursorType  = 'basic'; 
    this._hitrad      = 15;
    this._type        = types['player'];

    this._subTypes      = [
      'cPointer',
      'cRapid', 
      'cDiagonal',
      'cCross',
      'cBomb',
      'cQuestion',
      'cFinger',
    ]

    this._subType     = this._subTypes[0]
    this._shots       = 1;
    this._firerate    = 14; 
    this._projType    = Projectile.getTypes()[0]; 
    this._imgLoaded   = false; 
    this._cursorImg   = new Image();

    this._cursorImg.onload = _ => {this._imgLoaded = true}
    this._initPlayerType(); 
    // console.log(this._subType);
    // console.log(this._projType);
  }
  
  _initPlayerType() {
    switch(this._subType) {
      case 'cPointer':
        this._cursorImg.src = cursors[0];
        break;
        
      case 'cRapid':
        this._cursorImg.src = cursors[1];
        this._shots         = 1;
        this._firerate      = 6; 
        break;

      case 'cDiagonal':
        this._cursorImg.src = cursors[2];
        this._shots         = 2;
        this._firerate      = 10; 
        break;

      case 'cCross':
        this._cursorImg.src = cursors[3];
        this._shots         = 4;
        this._firerate      = 8; 
        break;

      case 'cBomb':
        this._cursorImg.src = cursors[4];
        this._shots         = 1;
        this._firerate      = 50; 
        this._projType      = Projectile.getTypes()[2]; 
        break;

      case 'cQuestion':
        this._cursorImg.src = cursors[5];
        this._projType      = _ => Projectile.getTypes()[w.ranInt(Projectile.getTypes().length)]; 
        break;

      case 'cFinger':
        this._cursorImg.src = cursors[6];
        this._shots         = 1;
        this._firerate      = 50; 
        this._projType      = Projectile.getTypes()[1];
        break;

      default:
    }
  }

  _handleCollisions(cols) {
    cols.map(c => {
      if(c._type === types['enemy']) {this._die()}
    })
  }

  _die() {
    w.entities.push(new Explosion({pos: this._pos}))
    this.isDead = true;
  }

  _shoot() {
    if(w.tick % this._firerate == 0) {
      for(let i=0; i<this._shots; i++) {
        let a = (this._pos.angle + (w.ran() - 0.5) / 10) + (Math.PI * 2 / this._shots * i); 
        this._proj = new Projectile({
          parent: types['player'],
          subType: this._projType,
          pos: this._pos, 
          vel: {x: Math.cos(a), y:  -Math.sin(a)}, 
          constAngle: a 
        })
        w.entities.push(this._proj);
      }
    }
  }

  update(ctx) {
    this._checkCollisions();

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

    if(this._imgLoaded) {
      let w = this._cursorImg.width * 1.5;
      let h = this._cursorImg.height * 1.5;
      ctx.drawImage(this._cursorImg, -w / 2, -h / 2, w, h);
    } else {
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
