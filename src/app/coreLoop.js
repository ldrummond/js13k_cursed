import w from './w'; 
import keys from './keys'; 
import Player from "./player";
import Enemy from "./enemy";
import CanvasController from "./canvas";


export default class {
  constructor() {
    // Canvas
    this._cc        = new CanvasController(); 
    this._canvas    = this._cc.canvas; 
    this._ctx       = this._cc.ctx;

    // Enemies
    // this.spawnPoints = [25, 25, 50, 50, 25, 75]
    w.entities.push(new Enemy());

    // Player
    w.player    = new Player(); 
    // w.entities.push(new Explosion({x: this._cc.width / 2}))

    w.entities.push(w.player);
    this._remaining = w.entities; 

    // Loop
    this._starttime = Date.now(); 
    this._framerate = 10; 
  }

  _drawReticule() {
    let size = 15; 
    this._ctx.beginPath(); 
    this._ctx.moveTo(this._cc.cursor.x - size / 2, this._cc.cursor.y);
    this._ctx.lineTo(this._cc.cursor.x + size / 2, this._cc.cursor.y);
    this._ctx.stroke(); 
    this._ctx.beginPath();     
    this._ctx.moveTo(this._cc.cursor.x, this._cc.cursor.y - size / 2);
    this._ctx.lineTo(this._cc.cursor.x, this._cc.cursor.y + size / 2);
    this._ctx.stroke(); 
    this._ctx.strokeRect(w.bounds.left, w.bounds.top, w.bounds.width, w.bounds.height);
  }

  _die() {
    
  }
  
  _update() {
    
  }
  
  _loop() {
    // If its been enough time since previous frame, do stuff.
    if((Date.now() - this._starttime) > this._framerate) {
      this._starttime = Date.now(); 

      this._cc.clear(); 
      // this._cc.drawLoader(); 
      this._cc.drawBackground(); 
      
      w.player._target = this._cc.cursor;
      
      // w.entities = this._remaining;
      this._remaining = []; 
      // Update all entities and remove dead ones. 
      for(let i=0;i<w.entities.length;i++){
        let e = w.entities[i];
        if(!e.isDead) {
          e.update(this._ctx);
          this._remaining.push(e); 
        }
      }
      w.entities = this._remaining;
      // Draw the reticule last
      this._drawReticule();

      w.tick++; 
    }
    requestAnimationFrame(_ => this._loop());
  }

  startLoop() {
    this._loop(); 
  }
}
