import w from './w';
import cursors from './cursors';

class UI {
  constructor(opts = {}) {
    this._texts         = [];
    this._numTexts      = 100;

    this._backrgb       = {r: 251, g: 255, b: 241}
    this._finalrgb      = {r: 251, g: 255, b: 241}

    this._main          = document.getElementById('main-block');
    this._dialog        = document.getElementById('base-dialog');
    
    this._url           = document.getElementById('url');
    this._mainText      = document.getElementById('main-text');
    this._score         = document.getElementById('score');
    this._finalScoreBs  = document.getElementsByClassName('final-score');

    this._deathDialog   = document.getElementById('death-dialog');
    this._upgradeDialog = document.getElementById('upgrade-dialog');
    this._winDialog     = document.getElementById('win-dialog');

    this._choice1       = document.getElementById('choice1');
    this._upgrade1      = document.getElementById('upgrade-1');
    this._choice2       = document.getElementById('choice2');
    this._upgrade2      = document.getElementById('upgrade-2');

    this._typeOuts = [];

    for(let i=0; i<this._numTexts; i++) {
      let d = document.createElement('div');
      d.classList.add('back-text', 'abs');
      d.style = `top: ${w.ranInt(100)}vh; left:${w.ranInt(100)}vw;`;
      d.textContent = '/';
      this._texts.push(d); 
      document.body.appendChild(d);
    };

    setInterval(_ => {
      let text = this._texts[w.ranInt(this._numTexts)- 1];
      if(text) {text.textContent = String.fromCharCode(w.ranInt(42) + 48).toLowerCase()};
    }, 10);
  }

  setState(state) {
    this._prevState = this._state; 
    this._state = state;
    this._stateLoop();
  } 

  darken() {
    this._backrgb = {r: this._backrgb.r - 1, g: this._backrgb.g - 1, b: this._backrgb.b - 1};
    this._main.style.backgroundColor = `rgb(${this._backrgb.r} ${this._backrgb.g} ${this._backrgb.b})`;
  }

  typeOut(target, string) {
    if(!this._typeOuts[target.id]) {this._typeOuts[target.id] = []}
    else {
      this._typeOuts[target.id].map(t => clearTimeout(t));
    }
    target.textContent = '';
    for(let i = 0; i < string.length; i++) {
      this._typeOuts[target.id].push(setTimeout(_ => target.textContent += string[i], 65 * i));
    }
  }

  _stateLoop() {
    switch(this._state) {

      case 'INTRODUCTION':
        break;
      
      case 'WAIT_CHOOSE_BACK':
        if(this._prevState !== this._state) {
          this.typeOut(this._mainText, '^^^^ Level complete: travel back');
        }
        break;
        
      case 'WAIT_CHOOSE_UPGRADE':
        this._mainText.textContent = '';
        break;
        
      case 'START_LEVEL':
        this.clearDialogs(); 
        setTimeout(_ => {
          this.typeOut(this._url, '____cursed____/?level=' + (w._levels.length - w._level));
        }, 333);
        break;

      case 'START_WIN':
        this.clearDialogs(); 
        this._winDialog.classList.add('visible', 'flex-center');
        break;
        
      case 'PLAYING':
        if(this._prevState !== this._state) {
          // this._typeOuts.map(t => clearTimeout(t));
          this.typeOut(this._mainText, 'W, A, S, D, SPACE to shoot');
        }
        break;

      case 'DEAD':
        if(this._prevState !== this._state) {
          this.typeOut(this._mainText, '~~ sorry, you died :/ ~~');
          this._deathDialog.classList.add('visible', 'flex-center');
        }
        break;
    }
  }

  setScore(score) {
    this._score.textContent = score; 
  }

  setFinalScore(score) {
    for(let i=0; i< this._finalScoreBs.length; i++) {
      this._finalScoreBs[i].textContent = score;
    }
  }

  showUpgrades(opts = {}) {
    let {level, click1, click2} = opts; 
    this._upgradeDialog.classList.add('visible');

    this._choice1.src = cursors[level*2-1];
    this._choice2.src = cursors[level*2];

    this._upgrade1.onclick = click1; 
    this._upgrade2.onclick = click2; 
  }

  clearDialogs() {
    let dialogs = document.getElementsByClassName('dialog');
    for(let i=0; i<dialogs.length; i++) {
      let d = dialogs[i];
      if(d.classList.contains('visible')) {
        dialogs[i].classList.remove('visible');
      }
    }
  }

  createDialog(opts = {}) {
    let {
      main = 'Contratulations!', 
      sub = 'You have died', 
      button = false, 
      classes = [], 
      ran = false, 
      typeout = false,
      pos = [], 
    } = opts; 

    let d     = this._dialog.cloneNode(true);
    let num   = w.ranInt(100);

    d.id                        = d.id + '-' + num;
    d.childNodes[5].id          = 'main-' + num;
    d.childNodes[5].textContent = main; 
    d.childNodes[7].textContent = sub; 
    d.classList.add(...classes, 'active')
    setTimeout(_ => {
      d.classList.add('visible')
    },1)
    if(ran) {
      d.style = `top: ${20 + w.ranInt(60)}vh; left:${20 + w.ranInt(60)}vw; `;
    }
    if(pos) {
      d.style = `top: ${pos[1]}px; left:${pos[0]}px; `;
    }
    if(button) {
      // d.childNodes[9].textContent = 'button'; 
    }
    this._main.append(d);

    return num; 
  }

  setUrl(text) {
    this.typeOut(this._url, text);
  }
}

export default new UI(); 