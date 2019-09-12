import w from './w';

class UI {
  constructor() {
    this._texts     = [];
    this._numTexts  = 50;
    this._main      = document.getElementById('main-block');
    this._dialog    = document.getElementById('dialog');
    this._url       = document.getElementById('url');
    this._ui1       = document.getElementById('ui1');
    this._ui2       = document.getElementById('ui2');

    for(let i=0; i<this._numTexts; i++) {
      let d = document.createElement('div');
      d.style = `position: absolute; top: ${w.ranInt(100)}vh; left:${w.ranInt(100)}vw; color: #444; z-index: -1`;
      d.textContent = '/';
      this._texts.push(d); 
      document.body.appendChild(d);
    };

    setInterval(_ => {
      this._texts[w.ranInt(this._numTexts)- 1].textContent = String.fromCharCode(w.ranInt(42) + 48).toLowerCase()
    }, 100)
  }

  createDialog() {
    let d = this._dialog.cloneNode(true);
    d.style = `top: ${30 + w.ranInt(40)}vh; left:${30 + w.ranInt(40)}vw;`
    this._main.append(d);
  }

  death() {
    this.setMainText('You have died');
    this._showDialog(); 
  }

  setUrl(text) {
    this._url.textContent = text; 
  }

  setMainText(text) {
    this._ui1 = text;
  }

  setSecondaryText(text) {
    this._ui2 = text;
  }

  _showDialog() {
    this._dialog.classList.add('visible');
  }
}

export default new UI(); 