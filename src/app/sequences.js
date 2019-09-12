import w from './w'; 
import UI from './ui'; 
import CC from "./canvas";

export default {
  introduction: [
    {
      action: _ => {
        w.player.moveTo(w.bounds.getCenter());
        w.player.isDisabled = true; 
        w.entities.push(w.player);
        // UI.createDialog(); 
      }, 
      onTick: _ => {
        w.player.nextType(); 
      },
      tickInterval: 15,
      starttick: 0, 
      endtick: 1200,
    },
    {
      action: _ => {
        // UI.typeOut(UI._mainText, 'You were a shapeshifter.');
        let dialogNum = UI.createDialog({
          main: '', 
          sub: '',
          classes: ['top-center', 'small', 'wide', 't-left'],
          pos: [400, 10]
        });
        UI.typeOut(document.getElementById('main-' + dialogNum), 'You were a shapeshifter.');
      }, 
      tickInterval: 43,
      starttick: 1, 
      endtick: 200,
    },
    {
      action: _ => {
        let dialogNum = UI.createDialog({
          main: '', 
          sub: '',
          classes: ['small', 'wide', 't-left'],
          pos: [460, 50]
        });
        UI.typeOut(document.getElementById('main-' + dialogNum), 'You were CURSED, forced to occupy a single form.');
      }, 
      tickInterval: 43,
      starttick: 200, 
      endtick: 500,
    },
    {
      action: _ => {
        let dialogNum = UI.createDialog({
          main: '', 
          sub: '',
          classes: ['small', 'wide', 't-left'],
          pos: [50, 350]
        });
        UI.typeOut(document.getElementById('main-' + dialogNum), 'You were cast forward into the depths of the brower.');
      }, 
      tickInterval: 43,
      starttick: 500, 
      endtick: 800,
    },
    {
      action: _ => {
        let dialogNum = UI.createDialog({
          main: '', 
          sub: '',
          classes: ['small', 'wide', 't-left'],
          pos: [10, 280]
        });
        UI.typeOut(document.getElementById('main-' + dialogNum), 'Fight your way back . . . . .');
      }, 
      tickInterval: 43,
      starttick: 800, 
      endtick: 1100,
    },
  ],
  dead: [
    {
      action: _ => {
        // UI.createDialog({
        //   main: 'Final Score ' + w.tick,
        //   sub: 'Your deeds will be forever remembered in chrome.storage',
        //   button: 'Play Again?',
        //   classes: ['top', 'med', 'abs-center', 'visible', 'simple'],
        // })
      },
      onTick: _ => {
        // console.log('test');
        // w.player.nextType(); 
        UI.createDialog({
          ran: true,
        })
      },
      tickInterval: 250,
      starttick: 0, 
      endtick: 1000,
    }
  ]
}