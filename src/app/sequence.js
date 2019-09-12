import w from './w';

export default class {
  constructor(sequence) {
    this._startticks  = w.tick || 0;
    this._sequence    = sequence || []; 
    this.isDone       = false; 
  }

  tick() {
    this._elapsedticks = w.tick - this._startticks;
    this._sequence = this._sequence.filter(s => !(this._elapsedticks > s.endtick));

    // If there are no actions left in sequence, move on 
    if(!this._sequence || this._sequence.length == 0) {
      this.isDone = true; return
    }
    
    this._sequence.map(s => {
      if(this._elapsedticks > s.starttick) {
        if(s && s.action && !s.executed) {
          s.action(); 
          s.executed = true; 
        }
        if(s && s.tickInterval && s.onTick) {
          if(this._elapsedticks % s.tickInterval == 0) {
            s.onTick(); 
          }
        }
      }
    })
  }
}