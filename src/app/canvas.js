import w from "./w";

class Canvas {
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
    this.ctx.imageSmoothingEnabled = false;
    
    w.bounds = {top: 0, left: 0, width: this._bounds.width, height: this._bounds.height};
    w.bounds.getCenter = _ => {
      return {x: w.bounds.width / 2, y: w.bounds.height / 2}
    } 
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
    })

    this.cursor     = {x: this.canvas.width / 2, y: this.canvas.height / 2}
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

 
  drawDeathScreen() {
    // this.ctx.fillStyle = '#222';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.fillStyle = '#DDD';
    this.ctx.fillRect(0, 0, 100, 50);
    this.ctx.fillRect(this._bounds.width - 50, 0, this._bounds.width, 50);
    this.ctx.fillRect(100, 0, this._bounds.width - 150, 15);
    this.ctx.fillRect(100, 35, this._bounds.width - 150, 15);

    this.ctx.fillStyle = '#EEE';
    // this.ctx.fillRect(100, 15, this._bounds.width - 150, 20);
  }

  drawBackButton(a = 0.2, tick = 1) {
    this.ctx.globalAlpha = a;
    this.ctx.fillStyle = '#FFF';
    this.ctx.fillRect(20, 15, 40, 20);
    this.ctx.strokeStyle = tick ? `hsl(${tick % 255}, 100%, 40%)` : '#888';
    this.ctx.strokeRect(20, 15, 40, 20);
    this.ctx.strokeStyle = '#888';
    this.ctx.beginPath();
    this.ctx.moveTo(40, 20);
    this.ctx.lineTo(35, 25);
    this.ctx.lineTo(40, 30);
    this.ctx.stroke(); 
    this.ctx.globalAlpha = 1;
  }

  drawReticule() {
    // let size = 15; 
    // this.ctx.beginPath(); 
    // this.ctx.moveTo(this.cursor.x - size / 2, this.cursor.y);
    // this.ctx.lineTo(this.cursor.x + size / 2, this.cursor.y);
    // this.ctx.stroke(); 
    // this.ctx.beginPath();     
    // this.ctx.moveTo(this.cursor.x, this.cursor.y - size / 2);
    // this.ctx.lineTo(this.cursor.x, this.cursor.y + size / 2);
    // this.ctx.stroke(); 
    // this.ctx.strokeRect(w.bounds.left, w.bounds.top, w.bounds.width, w.bounds.height);
  }

  drawFlash() {
    // this.ctx.fillStyle = '#000';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawLoader() {
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _getBounds() {
    this._bounds  = this.canvas.getBoundingClientRect();
  }
}

export default new Canvas();