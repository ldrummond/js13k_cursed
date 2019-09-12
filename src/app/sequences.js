import w from './w'; 

export default {
  introduction: [
    {
      action: _ => {
        w.player.moveTo(w.bounds.getCenter());
        console.log(w.bounds.center)
      }, 
      endtick: 10
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