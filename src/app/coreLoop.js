import w from './w'; 
import keys from './keys'; 
import types from './types'; 
import levels from './levels';
import sequences from './sequences';
import Enemy from "./enemy";
import Player from "./player";
import UIController from './ui'; 
import CanvasController from "./canvas";
import SequenceController from "./sequence";

export default class {
  constructor() {
    // Canvas
    this._cc        = new CanvasController(); 
    this._canvas    = this._cc.canvas; 
    this._ctx       = this._cc.ctx;

    // UI
    this._ui        = new UIController(); 

    // Enemies
    this.spawnPoints = [
      
    ]

    // Initialize Game State;
    this._introSeq      = false; 
    this._state         = 'INTRODUCTION'; 
    this._level         = 0; 
    this._levels        = levels;

    // Player
    w.player      = new Player(); 

    // Track Entities
    this._remaining = w.entities; 

    // Loop
    this._prevtime = Date.now(); 
    this._framerate = 100; 
  }



  _startLevel(i) {
    let level = this._levels[i]; 

    // Add player
    w.player = new Player(); 
    w.entities.push(w.player);

    // Add enemies
    Object.keys(level.enemies).map(eType => {
      let eCount = level.enemies[eType]; 
      for(let i=0; i<eCount; i++) {
        w.entities.push(new Enemy({
          pos: {x: w.ran(w.bounds.width), y: w.ran(w.bounds.height), angle: 0},
          type: eType, 
        }));      
      }
    });
  }

  _stateLoop() {
    // If its been enough time since previous frame--
    if((Date.now() - this._prevtime) > this._framerate) {
      this._prevtime = Date.now(); 

      // Change state
      switch(this._state) {

        case 'INTRODUCTION':
          if(!this._introSeq) {
            this._introSeq = new SequenceController(sequences['introduction']);
          } else if(this._introSeq) {
            this._introSeq.tick();
            if(this._introSeq.isDone) {
              console.log('isdone')
              this._state = 'START_LEVEL';
            }
          }
          break; 

        case 'START_LEVEL':
          this._startLevel(this._level);
          this._state = 'PLAYING';
          break;

        case 'LEVEL_CLEAR':
          w.entities = [];
          this._level++;
          this._state = 'START_LEVEL'
          break; 

        case 'DEAD':
          this._cc.drawDeathScreen();
          this._ui.death();
          this._state = 'PLAYING'; 
          break; 
        
        case 'PLAYING':
          if(w.player.isDead) {
            this._state = 'DEAD'; 
            // break; 
          }
          if(w.entities.filter(e => e._type === types['enemy']).length === 0) {
            this._state = 'LEVEL_CLEAR'; 
            // break; 
          }
          this._play();
          break; 
      }
      w.tick++; 
    }
    requestAnimationFrame(_ => this._stateLoop());
  }


  _play() {
      this._cc.clear(); 
      this._cc.drawBackground(); 
      
      w.player._target = this._cc.cursor;
      w.entities = w.entities.sort((a,b) => a._type - b._type);

      this._remaining = []; 
      for(let i=0;i<w.entities.length;i++){
        let e = w.entities[i];
        if(!e.isDead) {
          e.update(this._ctx);
          this._remaining.push(e); 
        }
      }
      w.entities = this._remaining;

      this._cc.drawReticule();
  }

  startLoop() {
    this._stateLoop(); 
  }
}
