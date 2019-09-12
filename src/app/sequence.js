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
    
    let s = this._sequence[0];
    if(s && s.action && !s.executed) {
      s.action(); 
      s.executed = true; 
    }
  }
}