
import CoreLoop from './coreLoop';

window.coot = function(message, d) {
  if(Math.round(Math.random() * d) == d) {
    console.log(message); 
  }
}

var game = new CoreLoop(); 
game.stateLoop(); 