import w from "./w";

export default class {
  constructor() {
    this.canvas     = document.getElementById('_canvas'); 
    this.cursor     = {x: 0, y: 0}
    this._scale();    
    this._listen(); 
  }

  _scale() {
    var dpr            = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    this._bounds       = this.canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    this.canvas.width  = this._bounds.width * dpr;
    this.canvas.height = this._bounds.height * dpr;
    this.ctx = this.canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    this.ctx.scale(dpr, dpr);
    w.bounds = {top: 0, left: 0, width: this._bounds.width, height: this._bounds.height}; 
  }

  _resize() {
    this._bounds          = this.canvas.getBoundingClientRect();
    this.canvas.width     = this._bounds.width * dpr;
    this.canvas.height    = this._bounds.height * dpr;
    // Globally set bounds
    w.bounds              = {top: 0, left: 0, width: this.canvas.width, height: this.canvas.height}; 
  }
  
  _listen() {
    document.addEventListener('mousemove', e => {
      this.cursor = {
        x: e.clientX - this._bounds.left,
        y: e.clientY - this._bounds.top
      };
      // window.coot(this.cursor, 10);
    })

    this.cursor     = {x: this.canvas.width / 2, y: this.canvas.height / 2}
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    // this.ctx.beginPath();
    // this.ctx.moveTo(1, 1);
    // this.ctx.lineTo(1, this.canvas.height-1);
    // this.ctx.lineTo(this.canvas.height-1, this.canvas.height-1);
    // this.ctx.lineTo(this.canvas.height-1, 1);
    // this.ctx.lineTo(1, 1);
    // this.ctx.strokeWidth = 10;
    this.ctx.fillStyle = '#DEE1E6';
    this.ctx.fillRect(0, 0, this.canvas.width, 50);
    this.ctx.fillStyle = '#EEE';
    this.ctx.fillRect(0, 50, this.canvas.width, 90);
    this.ctx.stroke();
  }

  drawLoader() {
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _getBounds() {
    this._bounds  = this.canvas.getBoundingClientRect();
  }
}