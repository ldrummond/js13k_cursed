import w from './w'; 
import keys from './keys'; 
import types from './types'; 
import levels from './levels';
import sequences from './sequences';
import Explosion from './explosion';
import Enemy from "./enemy";
import Player from "./player";
import UIController from './ui'; 
import CanvasController from "./canvas";
import SequenceController from "./sequence";

export default class {
  constructor() {
    // Canvas
    this._cc        = CanvasController; 
    this._canvas    = this._cc.canvas; 
    this._ctx       = this._cc.ctx;

    // UI
    this._ui        = UIController; 

    // Restart Buttons
    this._restartBs = document.getElementsByClassName('b-restart');
    for(let i = 0; i < this._restartBs.length; i++) {
      this._restartBs[i].addEventListener('click', _ => this._restart());
    }

    // Enemies
    this.spawnPoints = [
      
    ]

    this._score     = 0;
    this._backAlpha = 0.2 // Transparency of back button

    // Active Sequences
    this.activeSequences = [];

    // Initialize Game State;
    this._introSeq      = false; 
    this._state         = 'INTRODUCTION'; 
    this._level         = 0; 
    this._levels        = levels;
    w._level            = 0;
    w._levels           = levels; 

    // Player
    w.player      = new Player({
      buildIn: true,
      hitrad: 15,
      maxrad: 15,
    }); 
    w.entities.push(w.player);

    // Back Button
    this._backPos = {x: 25, y: 20}

    // Track Entities
    this._remaining = w.entities; 

    // Loop
    this._prevtime = Date.now(); 
    this._framerate = 10; 
  }

  _restart() {
    w._entities = [];
    this._level = 0; 
    this._state = 'START_LEVEL';
    w.player.reset();
    this._ui.setState(this._state);
    this.stateLoop(); 
  }

  _startLevel(i) {
    w.entities  = []; 
    w._level    = i; 
    let level   = this._levels[i];

    // Add player
    w.player.reset();
    w.entities.push(player); 

    // Add enemies
    Object.keys(level.enemies).map(eType => {
      let eCount = level.enemies[eType]; 
      for(let i=0; i<eCount; i++) {
        setTimeout(_ => w.entities.push(new Enemy({
          pos: {x: w.ran(w.bounds.width), y: w.ran(w.bounds.height), angle: 0},
          type: eType, 
          buildIn: true,
        })), 150 * i);      
      }
    });
  }

  stateLoop() {
    // If its been enough time since previous frame--
    if((Date.now() - this._prevtime) > this._framerate) {
      this._prevtime  = Date.now(); 
      this._ui.setState(this._state);

      // Change state
      switch(this._state) {

        case 'INTRODUCTION':
          if(!this._introSeq) {
            this._introSeq = new SequenceController(sequences['introduction']);
          } else if(this._introSeq) {
            this._introSeq.tick();
            if(this._introSeq.isDone) {
              w.player.setType('cPointer');
              this._state = 'START_LEVEL';
            }
          }
          this._play();
          break; 

        case 'START_CHOOSE_UPGRADES':
          this._ui.showUpgrades({
            level: this._level,
            click1: _ => {
              w.player.setType(w.player.subTypes[this._level*2 - 1])
              this._state = 'START_LEVEL';
            },
            click2: _ => {
              w.player.setType(w.player.subTypes[this._level*2])
              this._state = 'START_LEVEL';
            },
          }); 
          this._state = 'WAIT_CHOOSE_UPGRADES';
          break; 

        case 'WAIT_CHOOSE_UPGRADES':
          this._play();
          break;

        case 'START_LEVEL':
          this._backAlpha = 0.2;
          this._startLevel(this._level);
          this._state = 'PLAYING';
          break;

        case 'LEVEL_CLEAR':
          console.log(this._level, this._levels.length)
          if(this._level + 1 < this._levels.length) {
            this._level++;
            this._state = 'WAIT_CHOOSE_BACK';
            w.entities.push(new Explosion({pos: this._backPos}))
          } else {
            this._state = 'START_WIN';
          }
          break; 

        case 'WAIT_CHOOSE_BACK':
          if(w.player.collides(this._backPos, 50)) {
            w.entities.push(new Explosion({
              pos: this._backPos, 
              fill: '#111', 
              maxrad: 100000, 
              buildSpeed: 5
            }))
            this._state     = 'START_CHOOSE_UPGRADES';
          }
          this._play();
          this._cc.drawBackButton(1, w.tick); 
          break; 

        case 'START_WIN':
          this._ui.setFinalScore(this._score);
          this._state = 'WAIT_WIN';
          break; 

        case 'WAIT_WIN':
          this._play();
          break; 

        case 'DEAD':
          if(!this._deathSequence) {
            this._deathSequence = new SequenceController(sequences['dead']);
            this._ui.setFinalScore(this._score);
          } else if(this._deathSequence) {
            this._deathSequence.tick();
          }
          this._play();
          break; 
        
        case 'PLAYING':
          this._score++; 

          if(w.player.isDead) {
            this._state = 'DEAD'; 
          }
          if(w.entities.filter(e => e._type === types['enemy']).length === 0) {
            this._state = 'LEVEL_CLEAR'; 
          }
          this._play();
          break; 

        default: 
          this._play();
          break;
      }
      w.tick++; 
      this._ui.setScore(this._score);
    }
    requestAnimationFrame(_ => this.stateLoop());
  }


  _play() {
      this._cc.ctx.beginPath();
      this._cc.clear(); 
      this._cc.drawBackground(); 
      
      w.player._target = this._cc.cursor;
      w.entities = w.entities.sort((a,b) => a._type - b._type);

      this._remaining = []; 
      for(let i=0; i<w.entities.length; i++){
        let e = w.entities[i];
        if(!e.isDead) {
          e.update(this._ctx);
          this._remaining.push(e); 
        }
      }
      w.entities = this._remaining;

      // this._cc.drawReticule();
  }
}
