import w from './w'; 
import ui from './ui'; 

export default {
  introduction: [
    {
      action: _ => {
        w.player.moveTo(w.bounds.getCenter());
        w.player.isDisabled = true; 
        w.entities.push(w.player);
        // ui.createDialog(); 
      }, 
      onTick: _ => {
        w.player.nextType(); 
      },
      tickInterval: 15,
      starttick: 0, 
      endtick: 100,
    },
    {
      // action: _ => {
      //   ui.createDialog({
      //     main: 'cursor',
      //     sub: '',
      //     button: 'Play Again?',
      //     classes: ['top-center', 'small', 'visible'],
      //   });
      // }, 
      starttick: 0, 
      endtick: 100,
    },
    {
      action: _ => {

      }, 
      endtick: 10
    },
  ],
  dead: [
    {
      action: _ => {
        // ui.createDialog({
        //   main: 'Final Score ' + w.tick,
        //   sub: 'Your deeds will be forever remembered in chrome.storage',
        //   button: 'Play Again?',
        //   classes: ['top', 'med', 'abs-center', 'visible', 'simple'],
        // })
      },
      onTick: _ => {
        // console.log('test');
        // w.player.nextType(); 
        ui.createDialog({
          ran: true,
        })
      },
      tickInterval: 250,
      starttick: 0, 
      endtick: 1000,
    }
  ]
}