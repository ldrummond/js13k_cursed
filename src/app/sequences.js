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
      tickInterval: 30,
      endtick: 1000
    },
    {
      action: _ => {

      }, 
      endtick: 10
    },
    {
      action: _ => {

      }, 
      endtick: 10
    },
  ]
}