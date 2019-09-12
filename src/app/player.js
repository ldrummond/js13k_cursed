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

    this.subTypes      = [
      'cPointer',
      'cRapid', 
      'cDiagonal',
      'cCross',
      'cBomb',
      'cQuestion',
      'cFinger',
    ]
    
    this._type        = types['player'];
    this._subType     = this.subTypes[0];
    this._projType    = Projectile.getTypes()[0]; 

    this._speed       = 0.5;
    this._shots       = 1;
    this._firerate    = 14; 
    this._imgLoaded   = false; 
    this._cursorImg   = new Image();
    this.isDisabled  = false; 
    
    this._cursorImg.onload = _ => {this._imgLoaded = true}
    this._initPlayerType(); 
  }
  
  _initPlayerType() {

    switch(this._subType) {
      case 'cPointer':
        this._cursorImg.src = cursors[0];
        this._shots       = 1;
        this._firerate    = 14; 
        this._projType    = Projectile.getTypes()[0]; 
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

  reset() {
    this.isDisabled = false; 
    this.isDead     = false; 
    this._pos.x     = w.bounds.getCenter().x;
    this._pos.y     = w.bounds.getCenter().y;
    this._vel.x     = 0;
    this._vel.y     = 0;
  }

  nextType() {
    this._subType = w.next(this.subTypes, this._subType);
    this._initPlayerType();
  }

  setType(type) {
    this._subType = type;
    this._initPlayerType();
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
    if(this._buildIn)     {this._build()}
    this._checkCollisions();
    this._updatePos();

    if(!player.isDisabled) {
      if(w.keyMap&w.keys[87]) {this._vel.y += this._speed} // W
      if(w.keyMap&w.keys[65]) {this._vel.x -= this._speed} // A
      if(w.keyMap&w.keys[83]) {this._vel.y -= this._speed} // S
      if(w.keyMap&w.keys[68]) {this._vel.x += this._speed} // D
      if(w.keyMap&w.keys[32]) {this._shoot()} // Space
    }

    this._updateVel();
    this._bounce(); 
    this._render(ctx); 
  }

  _render(ctx) {
    ctx.save();
    ctx.translate(this._pos.x, this._pos.y); 
    ctx.rotate(this._pos.angle + Math.PI / 2);

    if(this._imgLoaded) {
      let w = this._cursorImg.width * 1.5 * this._hitrad / this._maxrad;
      let h = this._cursorImg.height * 1.5 * this._hitrad / this._maxrad;
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
    // if(w.DEBUG){this._drawHitbox(ctx)} 

    ctx.restore(); 
  }
}


/*
*
* Cursors from https://tobiasahlin.com/blog/common-mac-os-x-lion-cursors/
*
*/
